import { NextResponse } from "next/server";
import { isStoreConfigured, saveLead } from "@/lib/leads-store";

const CV_CRM_ENDPOINT = "https://evoluc.cvcrm.com.br/api/v1/comercial/leads";
const GENERIC_ERROR =
  "Erro ao processar seu cadastro. Tente novamente ou fale pelo WhatsApp.";

type LeadPayload = {
  nome: string;
  email: string;
  telefone: string;
  primeiroImovel?: string;
  empreendimento: string;
  origem: string;
  cpf?: string;
  rendaMensal?: string;
  temFgts?: string;
  saldoFgts?: string;
  mensagem?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// "R$ 5.000,00" -> 5000 | "R$ 4.000" -> 4000
function parseCurrency(value?: string) {
  const digits = (value ?? "").replace(/\D/g, "");
  if (!digits) return undefined;
  return (value ?? "").includes(",") ? Number(digits) / 100 : Number(digits);
}

async function forwardToCvCrm(
  fields: { nome: string; email: string; telefone: string },
  observacao: string
): Promise<"ok" | "duplicate" | "skipped" | "failed"> {
  const cvCrmEmail = process.env.CV_CRM_EMAIL;
  const cvCrmToken = process.env.CV_CRM_TOKEN;
  if (!cvCrmEmail || !cvCrmToken) return "skipped";

  try {
    const res = await fetch(CV_CRM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: cvCrmEmail,
        token: cvCrmToken,
      },
      body: JSON.stringify({
        ...fields,
        telefone_ddi: "+55",
        observacao,
      }),
    });
    if (res.ok) return "ok";
    const text = await res.text().catch(() => "");
    if (text.toLowerCase().includes("erro_ao_alterar_lead")) return "duplicate";
    console.error("[CV CRM] Falha ao enviar lead", res.status, text);
    return "failed";
  } catch (error) {
    console.error("[CV CRM] Erro de rede ao enviar lead", error);
    return "failed";
  }
}

export async function POST(request: Request) {
  let body: Partial<LeadPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Dados inválidos." },
      { status: 400 }
    );
  }

  const nome = (body.nome ?? "").trim();
  const email = (body.email ?? "").trim();
  const telefoneDigits = (body.telefone ?? "").replace(/\D/g, "");
  const empreendimento = (body.empreendimento ?? "").trim();
  const origem = (body.origem ?? "Site").trim() || "Site";

  if (!nome || !isValidEmail(email) || telefoneDigits.length < 10) {
    return NextResponse.json(
      { success: false, message: "Preencha nome, e-mail e WhatsApp válidos." },
      { status: 400 }
    );
  }

  const observacao = [
    body.primeiroImovel ? `Primeiro imóvel: ${body.primeiroImovel}` : null,
    body.cpf ? `CPF: ${body.cpf}` : null,
    body.rendaMensal ? `Renda mensal: ${body.rendaMensal}` : null,
    body.temFgts ? `Possui FGTS: ${body.temFgts}` : null,
    body.saldoFgts ? `Saldo FGTS: ${body.saldoFgts}` : null,
    body.mensagem ? `Mensagem: ${body.mensagem.slice(0, 1000)}` : null,
    `Origem: ${origem}`,
    empreendimento ? `Empreendimento: ${empreendimento}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  // O CPF vai apenas para o CRM; a central de leads guarda só o necessário.
  let stored = false;
  if (isStoreConfigured()) {
    try {
      await saveLead({
        nome,
        email,
        telefone: telefoneDigits,
        origem,
        empreendimento: empreendimento || undefined,
        primeiroImovel: body.primeiroImovel || undefined,
        rendaMensal: parseCurrency(body.rendaMensal),
        temFgts: body.temFgts || undefined,
        mensagem: body.mensagem?.slice(0, 1000) || undefined,
      });
      stored = true;
    } catch (error) {
      console.error("[Leads] Falha ao salvar", error);
    }
  }

  const crm = await forwardToCvCrm(
    { nome, email, telefone: telefoneDigits },
    observacao
  );

  if (!stored && crm !== "ok" && crm !== "duplicate") {
    console.error("[Leads] Lead não foi salvo em nenhum destino", { origem });
    return NextResponse.json(
      { success: false, message: GENERIC_ERROR },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    duplicate: crm === "duplicate",
    message:
      crm === "duplicate"
        ? "Você já está cadastrado! Em breve entraremos em contato."
        : "Cadastro realizado com sucesso! Em breve nossa equipe entrará em contato.",
  });
}
