"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Loader2, Lock } from "lucide-react";

export default function LeadsLogin({
  configured,
  askUsername,
}: {
  configured: boolean;
  askUsername: boolean;
}) {
  const [username, setUsername] = useState("");
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
        body: JSON.stringify({ username, password }),
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
    <div
      className="relative flex min-h-full flex-col items-center justify-center px-6 pb-12 pt-28"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #0d3222 0%, #051a10 40%, #010604 100%)",
      }}
    >
      <div className="absolute inset-x-0 top-0 flex justify-center pt-8">
        <Image
          src="/images/brand/dom-logo.webp"
          alt="DOM Partner Growth"
          width={1000}
          height={404}
          priority
          className="h-auto w-28 sm:w-32"
        />
      </div>

      <div className="flex flex-col items-center">
        <Image
          src="/images/brand/logo.webp"
          alt="Evoluc Construtora"
          width={271}
          height={72}
          className="h-12 w-auto brightness-0 invert sm:h-14"
        />
      </div>

      <div className="mt-8 w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-[#d4a63a]/30">
        <div className="flex items-center gap-2 text-[#1f5a3a]">
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
            {askUsername && (
              <input
                required
                autoFocus
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuário"
                className="w-full rounded-lg border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-[#1f5a3a] focus:outline-none"
              />
            )}
            <input
              type="password"
              required
              autoFocus={!askUsername}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha de acesso"
              className="w-full rounded-lg border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-[#1f5a3a] focus:outline-none"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f5a3a] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#174a2f] disabled:opacity-60"
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

      <p className="mt-8 text-xs tracking-wide text-white/50">
        Desenvolvido por DOM Partner Growth
      </p>
    </div>
  );
}
