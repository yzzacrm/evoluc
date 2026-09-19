"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Loader2, Lock } from "lucide-react";

export default function LeadsLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const json = await res.json().catch(() => ({}));
      setError(json.message ?? "Não foi possível entrar.");
    } catch {
      setError("Erro de conexão. Tente novamente.");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-ink-950 px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <Image
          src="/images/brand/logo.webp"
          alt="Evoluc"
          width={271}
          height={72}
          className="h-9 w-auto"
        />
        <div className="mt-6 flex items-center gap-2 text-copper-600">
          <Lock size={18} />
          <h1 className="font-display text-lg font-bold text-ink-900">
            Central de Leads
          </h1>
        </div>
        <p className="mt-1 text-sm text-ink-500">
          Acesso restrito à equipe Evoluc.
        </p>

        {!configured ? (
          <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
            O acesso ainda não foi ativado. Defina a variável de ambiente{" "}
            <strong>ADMIN_PASSWORD</strong> (mínimo 8 caracteres) no Vercel.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha de acesso"
              className="w-full rounded-lg border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-copper-500 focus:outline-none"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-copper-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-copper-700 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
