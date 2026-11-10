"use client";

import { FormEvent, useState } from "react";
import { Lock, Mail, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-950/10";

export default function PortalLoginForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-8 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-100 text-ink-500">
        <Lock size={20} />
      </div>
      <h2 className="font-display mt-5 text-2xl leading-[1.15] text-ink-950">
        Acessar Área do Morador
      </h2>
      <p className="mt-2 text-sm text-ink-500">
        Acesso individual para clientes com unidade adquirida em um
        empreendimento Evoluc.
      </p>

      {submitted ? (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-ink-100 bg-ink-50 p-4">
          <Info className="mt-0.5 shrink-0 text-ink-400" size={18} />
          <p className="text-sm leading-relaxed text-ink-600">
            A Área do Morador está em fase final de desenvolvimento. Assim
            que o acesso for liberado, você receberá as suas credenciais por
            e-mail. Até lá, nossa equipe comercial está à disposição.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <Mail
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              required
              type="email"
              placeholder="E-mail cadastrado"
              className={`${inputClasses} pl-11`}
            />
          </div>
          <div className="relative">
            <Lock
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              required
              type="password"
              placeholder="Senha"
              className={`${inputClasses} pl-11`}
            />
          </div>
          <Button size="lg" className="w-full">
            Entrar
          </Button>
          <p className="text-center text-xs text-ink-400">
            Ainda não tem acesso?{" "}
            <a href="/fale-conosco" className="border-b border-ink-950/20 pb-0.5 font-medium text-ink-950 hover:border-ink-950">
              Falar com a Evoluc
            </a>
          </p>
        </form>
      )}
    </div>
  );
}
