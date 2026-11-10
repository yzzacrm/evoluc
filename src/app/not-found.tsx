import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-ink-950 pt-24">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="font-display text-7xl leading-none text-white/25">
            404
          </p>
          <h1 className="font-display mt-6 text-3xl leading-[1.1] text-white sm:text-[2.6rem]">
            Página não encontrada
          </h1>
          <p className="mt-4 text-ink-300">
            O endereço que você procura não existe ou mudou de lugar.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/" variant="light" size="lg">
              Voltar ao início
            </Button>
            <Button href="/lancamentos" variant="ghost" size="lg">
              Ver empreendimentos
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
