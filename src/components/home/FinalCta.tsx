import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export default function FinalCta() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-ink-950 px-8 py-16 text-center sm:px-16 sm:py-20">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-300">
            Financiamento
          </p>
          <h2 className="font-display mx-auto mt-5 max-w-xl text-3xl leading-[1.1] text-white sm:text-[2.6rem]">
            Descubra quanto você pode financiar
          </h2>
          <p className="mx-auto mt-5 max-w-md text-ink-300">
            Uma simulação rápida mostra as condições possíveis para o seu
            apartamento Evoluc.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Button href="/simular-financiamento" variant="light" size="lg">
              Simular financiamento
            </Button>
            <a
              href={`tel:+55${siteConfig.phone.replace(/\D/g, "")}`}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              ou ligue {siteConfig.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
