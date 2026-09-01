"use client";

import { useEffect } from "react";
import { RefreshCcw, Home } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center bg-ink-950 pt-24">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-copper-400">
            Ops
          </p>
          <h1 className="font-display mt-3 text-2xl font-bold text-white">
            Algo deu errado
          </h1>
          <p className="mt-3 text-ink-300">
            Ocorreu um erro inesperado ao carregar esta página. Tente
            novamente ou volte para o início.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button onClick={() => reset()} size="lg">
              <RefreshCcw size={18} />
              Tentar novamente
            </Button>
            <Button href="/" variant="ghost" size="lg">
              <Home size={18} />
              Voltar ao início
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
