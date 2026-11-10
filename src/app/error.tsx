"use client";

import { useEffect } from "react";
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
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-300">
            Erro
          </p>
          <h1 className="font-display mt-4 text-3xl leading-[1.1] text-white sm:text-[2.6rem]">
            Não foi possível carregar esta página
          </h1>
          <p className="mt-4 text-ink-300">
            Ocorreu um erro inesperado. Tente novamente em alguns
            instantes ou volte para a página inicial.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button onClick={() => reset()} variant="light" size="lg">
              Tentar novamente
            </Button>
            <Button href="/" variant="ghost" size="lg">
              Voltar ao início
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
