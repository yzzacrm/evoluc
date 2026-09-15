"use client";

import { FormEvent, useId, useState } from "react";
import { Loader2, CheckCircle2, XCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

function formatCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatCurrency(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const n = Number(digits) / 100;
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function LeadForm({
  empreendimento,
  origem,
  variant = "light",
  ctaLabel = "Quero receber mais informações",
  extended = false,
  compact = false,
}: {
  empreendimento: string;
  origem: string;
  variant?: "light" | "dark";
  ctaLabel?: string;
  extended?: boolean;
  compact?: boolean;
}) {
  const idPrefix = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [primeiroImovel, setPrimeiroImovel] = useState<"Sim" | "Não" | "">("");
  const [cpf, setCpf] = useState("");
  const [renda, setRenda] = useState("");
  const [fgts, setFgts] = useState("");
  const [temFgts, setTemFgts] = useState<"Sim" | "Não" | "">("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setFeedback(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.get("nome"),
          email: data.get("email"),
          telefone: data.get("telefone"),
          primeiroImovel,
          empreendimento,
          origem,
          ...(extended
            ? {
                cpf,
                rendaMensal: renda,
                temFgts,
                saldoFgts: temFgts === "Sim" ? fgts : undefined,
              }
            : {}),
        }),
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        setFeedback(json.message);
        form.reset();
        setPrimeiroImovel("");
        setCpf("");
        setRenda("");
        setFgts("");
        setTemFgts("");
      } else {
        setStatus("error");
        setFeedback(json.message ?? "Erro ao processar seu cadastro.");
      }
    } catch {
      setStatus("error");
      setFeedback(
        "Erro ao processar seu cadastro. Tente novamente ou fale pelo WhatsApp."
      );
    }
  }

  const fieldPad = compact ? "px-3 py-2" : "px-4 py-3";
  const fieldCls =
    variant === "dark"
      ? `w-full rounded-lg border border-white/15 bg-white/5 ${fieldPad} text-sm text-white placeholder:text-ink-400 focus:border-copper-500 focus:outline-none`
      : `w-full rounded-lg border border-ink-200 bg-white ${fieldPad} text-sm text-ink-900 placeholder:text-ink-400 focus:border-copper-500 focus:outline-none`;

  const labelCls =
    variant === "dark"
      ? "text-xs font-semibold text-ink-300"
      : "text-xs font-semibold text-ink-500";

  const toggleCls = (active: boolean) =>
    `flex-1 rounded-lg border ${compact ? "px-3 py-2" : "px-4 py-2.5"} text-sm font-semibold transition-colors ${
      active
        ? "border-copper-500 bg-copper-500/10 text-copper-600"
        : variant === "dark"
          ? "border-white/15 text-ink-300 hover:border-white/30"
          : "border-ink-200 text-ink-500 hover:border-ink-300"
    }`;

  if (status === "success") {
    return (
      <div
        className={`flex items-start gap-3 rounded-xl p-5 ${
          variant === "dark" ? "bg-white/10 text-white" : "bg-emerald-50 text-emerald-900"
        }`}
      >
        <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={22} />
        <p className="text-sm leading-relaxed">{feedback}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-2" : "space-y-3"}>
      {extended && !compact && (
        <div className="rounded-lg border-l-4 border-copper-500 bg-copper-50 p-4 text-sm text-ink-700">
          <p className="font-semibold text-ink-900">
            Para calcular seu poder de compra, precisamos de:
          </p>
          <ul className="mt-1 space-y-0.5 text-ink-600">
            <li>
              <strong>CPF</strong> — para consultar seu FGTS e histórico de
              crédito
            </li>
            <li>
              <strong>Renda</strong> — para determinar qual imóvel cabe no
              seu orçamento
            </li>
            <li>
              <strong>FGTS</strong> — para maximizar sua entrada
            </li>
          </ul>
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor={`${idPrefix}-nome`} className={labelCls}>
          Nome completo
        </label>
        <input
          id={`${idPrefix}-nome`}
          required
          name="nome"
          placeholder="Digite seu nome completo"
          className={fieldCls}
        />
      </div>
      <div className="space-y-1">
        <label htmlFor={`${idPrefix}-email`} className={labelCls}>
          E-mail
        </label>
        <input
          id={`${idPrefix}-email`}
          required
          type="email"
          name="email"
          placeholder="seu@email.com"
          className={fieldCls}
        />
      </div>
      <div className="space-y-1">
        <label htmlFor={`${idPrefix}-telefone`} className={labelCls}>
          WhatsApp
        </label>
        <input
          id={`${idPrefix}-telefone`}
          required
          name="telefone"
          placeholder="(11) 99999-9999"
          className={fieldCls}
        />
      </div>

      {extended && (
        <>
          <div className="space-y-1">
            <label htmlFor={`${idPrefix}-cpf`} className={labelCls}>
              CPF
            </label>
            <input
              id={`${idPrefix}-cpf`}
              required
              name="cpf"
              inputMode="numeric"
              placeholder="000.000.000-00"
              className={fieldCls}
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor={`${idPrefix}-renda`} className={labelCls}>
              Renda mensal
            </label>
            <input
              id={`${idPrefix}-renda`}
              required
              name="rendaMensal"
              inputMode="numeric"
              placeholder="R$ 0,00"
              className={fieldCls}
              value={renda}
              onChange={(e) => setRenda(formatCurrency(e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <span className={labelCls}>Possui FGTS?</span>
            <div className="flex gap-2">
              {(["Sim", "Não"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setTemFgts(opt)}
                  className={toggleCls(temFgts === opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          {temFgts === "Sim" && (
            <div className="space-y-1">
              <label htmlFor={`${idPrefix}-fgts`} className={labelCls}>
                Saldo do FGTS
              </label>
              <input
                id={`${idPrefix}-fgts`}
                name="saldoFgts"
                inputMode="numeric"
                placeholder="R$ 0,00"
                className={fieldCls}
                value={fgts}
                onChange={(e) => setFgts(formatCurrency(e.target.value))}
              />
            </div>
          )}
        </>
      )}

      <div className="space-y-1">
        <span className={labelCls}>Este é o seu primeiro imóvel?</span>
        <div className="flex gap-2">
          {(["Sim", "Não"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setPrimeiroImovel(opt)}
              className={toggleCls(primeiroImovel === opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <XCircle className="mt-0.5 shrink-0" size={16} />
          {feedback}
        </div>
      )}

      {extended && (
        <div
          className={`flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 text-green-800 ${
            compact ? "p-2 text-[11px]" : "p-3 text-xs"
          }`}
        >
          <Lock size={14} className="shrink-0" />
          Seus dados estão seguros e serão usados apenas para análise de
          crédito.
        </div>
      )}

      <Button
        size={compact ? "md" : "lg"}
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Enviando...
          </>
        ) : (
          ctaLabel
        )}
      </Button>
      {!extended && (
        <p className="text-center text-xs text-ink-400">
          Seus dados estão protegidos e serão usados apenas para contato
          sobre este empreendimento.
        </p>
      )}
    </form>
  );
}
