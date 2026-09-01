"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    // TODO (Fase 2): enviar para API real (e-mail/CRM) quando o backend
    // da plataforma estiver disponível.
    setTimeout(() => setStatus("sent"), 900);
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-ink-100 bg-ink-50 px-8 py-14 text-center">
        <CheckCircle2 className="text-copper-600" size={36} />
        <h3 className="font-display mt-4 text-lg font-bold text-ink-900">
          Mensagem enviada!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-ink-500">
          Nossa equipe vai retornar em breve pelos dados informados.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          required
          name="name"
          placeholder="Nome completo"
          className={inputClasses}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="E-mail"
          className={inputClasses}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          required
          name="phone"
          placeholder="Telefone / WhatsApp"
          className={inputClasses}
        />
        <input name="subject" placeholder="Assunto" className={inputClasses} />
      </div>
      <textarea
        required
        name="message"
        placeholder="Mensagem"
        rows={5}
        className={inputClasses}
      />
      <label className="flex items-start gap-2 text-xs text-ink-500">
        <input required type="checkbox" className="mt-0.5" />
        Li e concordo com a{" "}
        <a href="/politica-de-privacidade" className="font-semibold text-copper-600">
          Política de Privacidade
        </a>{" "}
        do site.
      </label>
      <Button size="lg" className="mt-2" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Enviando...
          </>
        ) : (
          "Enviar mensagem"
        )}
      </Button>
    </form>
  );
}
