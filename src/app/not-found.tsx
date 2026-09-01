import { Home, Building2 } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-ink-950 pt-24">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="font-display text-7xl font-extrabold text-copper-500">
            404
          </p>
          <h1 className="font-display mt-4 text-2xl font-bold text-white">
            Página não encontrada
          </h1>
          <p className="mt-3 text-ink-300">
            O endereço que você tentou acessar não existe ou foi movido.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/" size="lg">
              <Home size={18} />
              Voltar ao início
            </Button>
            <Button href="/lancamentos" variant="ghost" size="lg">
              <Building2 size={18} />
              Ver empreendimentos
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
