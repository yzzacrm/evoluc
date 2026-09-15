"use client";

import { FormEvent, useId, useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm({
  empreendimento,
  origem,
  variant = "light",
  ctaLabel = "Quero receber mais informações",
}: {
  empreendimento: string;
  origem: string;
  variant?: "light" | "dark";
  ctaLabel?: string;
}) {
  const idPrefix = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [primeiroImovel, setPrimeiroImovel] = useState<"Sim" | "Não" | "">("");

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
        }),
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        setFeedback(json.message);
        form.reset();
        setPrimeiroImovel("");
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

  const fieldCls =
    variant === "dark"
      ? "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-400 focus:border-copper-500 focus:outline-none"
      : "w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-copper-500 focus:outline-none";

  const labelCls =
    variant === "dark"
      ? "text-xs font-semibold text-ink-300"
      : "text-xs font-semibold text-ink-500";

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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label htmlFor={`${idPrefix}-nome`} className={labelCls}>
          Nome completo
        </label>
        <input
          id={`${idPrefix}-nome`}
          required
          name="nome"
          placeholder="Seu nome completo"
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
      <div className="space-y-1">
        <span className={labelCls}>Este é o seu primeiro imóvel?</span>
        <div className="flex gap-2">
          {(["Sim", "Não"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setPrimeiroImovel(opt)}
              className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                primeiroImovel === opt
                  ? "border-copper-500 bg-copper-500/10 text-copper-600"
                  : variant === "dark"
                    ? "border-white/15 text-ink-300 hover:border-white/30"
                    : "border-ink-200 text-ink-500 hover:border-ink-300"
              }`}
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

      <Button
        size="lg"
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
      <p className={`text-center text-xs ${variant === "dark" ? "text-ink-400" : "text-ink-400"}`}>
        Seus dados estão protegidos e serão usados apenas para contato sobre este empreendimento.
      </p>
    </form>
  );
}
