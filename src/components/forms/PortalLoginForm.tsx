"use client";

import { FormEvent, useState } from "react";
import { Lock, Mail, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20";

export default function PortalLoginForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-8 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-50 text-copper-600">
        <Lock size={20} />
      </div>
      <h2 className="font-display mt-5 text-xl font-bold text-ink-900">
        Acessar Área do Morador
      </h2>
      <p className="mt-2 text-sm text-ink-500">
        Acesso individual para clientes com unidade adquirida em
        empreendimentos Evoluc.
      </p>

      {submitted ? (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-copper-200 bg-copper-50 p-4">
          <Info className="mt-0.5 shrink-0 text-copper-600" size={18} />
          <p className="text-sm leading-relaxed text-copper-900">
            A Área do Morador está em fase final de desenvolvimento. Assim
            que o acesso for liberado, você receberá suas credenciais por
            e-mail. Enquanto isso, fale com nosso time comercial.
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
            <a href="/fale-conosco" className="font-semibold text-copper-600">
              Fale com a gente
            </a>
          </p>
        </form>
      )}
    </div>
  );
}
