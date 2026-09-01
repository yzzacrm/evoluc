"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20";

export default function ConsultantForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("sent"), 900);
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-ink-100 bg-ink-50 px-8 py-14 text-center">
        <CheckCircle2 className="text-copper-600" size={36} />
        <h3 className="font-display mt-4 text-lg font-bold text-ink-900">
          Cadastro recebido!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-ink-500">
          Nossa equipe comercial vai avaliar seu perfil e retornar em breve.
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
        <input
          required
          name="creci"
          placeholder="CRECI (se possuir)"
          className={inputClasses}
        />
      </div>
      <select required name="experience" className={inputClasses} defaultValue="">
        <option value="" disabled>
          Experiência em vendas de imóveis
        </option>
        <option value="nenhuma">Nenhuma experiência ainda</option>
        <option value="menos-1-ano">Menos de 1 ano</option>
        <option value="1-3-anos">1 a 3 anos</option>
        <option value="mais-3-anos">Mais de 3 anos</option>
      </select>
      <textarea
        name="message"
        placeholder="Conte um pouco sobre sua experiência (opcional)"
        rows={4}
        className={inputClasses}
      />
      <Button size="lg" className="mt-2" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Enviando...
          </>
        ) : (
          "Quero ser consultor Evoluc"
        )}
      </Button>
    </form>
  );
}
