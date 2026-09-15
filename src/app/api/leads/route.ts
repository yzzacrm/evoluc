import { NextResponse } from "next/server";

const CV_CRM_ENDPOINT = "https://evoluc.cvcrm.com.br/api/v1/comercial/leads";

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
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const cvCrmEmail = process.env.CV_CRM_EMAIL;
  const cvCrmToken = process.env.CV_CRM_TOKEN;

  if (!cvCrmEmail || !cvCrmToken) {
    console.error(
      "[CV CRM] CV_CRM_EMAIL / CV_CRM_TOKEN não configurados nas variáveis de ambiente."
    );
    return NextResponse.json(
      {
        success: false,
        message:
          "Erro ao processar seu cadastro. Tente novamente ou fale pelo WhatsApp.",
      },
      { status: 500 }
    );
  }

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
    `Origem: ${body.origem || "Landing Page"}`,
    empreendimento ? `Empreendimento: ${empreendimento}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const cvResponse = await fetch(CV_CRM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: cvCrmEmail,
        token: cvCrmToken,
      },
      body: JSON.stringify({
        nome,
        email,
        telefone: telefoneDigits,
        telefone_ddi: "+55",
        observacao,
      }),
    });

    if (!cvResponse.ok) {
      const text = await cvResponse.text().catch(() => "");
      if (text.toLowerCase().includes("erro_ao_alterar_lead")) {
        return NextResponse.json({
          success: true,
          message: "Você já está cadastrado! Em breve entraremos em contato.",
          duplicate: true,
        });
      }
      console.error("[CV CRM] Falha ao enviar lead", cvResponse.status, text);
      return NextResponse.json(
        {
          success: false,
          message:
            "Erro ao processar seu cadastro. Tente novamente ou fale pelo WhatsApp.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Cadastro realizado com sucesso! Em breve nossa equipe entrará em contato.",
    });
  } catch (error) {
    console.error("[CV CRM] Erro de rede ao enviar lead", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Erro ao processar seu cadastro. Tente novamente ou fale pelo WhatsApp.",
      },
      { status: 502 }
    );
  }
}
