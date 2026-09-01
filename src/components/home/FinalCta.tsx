import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { Phone, Calculator } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-copper-600 to-copper-700 px-8 py-14 text-center sm:px-16">
          <Calculator className="mx-auto text-white/90" size={32} />
          <h2 className="font-display mx-auto mt-5 max-w-xl text-3xl font-extrabold text-white sm:text-4xl">
            Faça sua simulação e descubra seu potencial de financiamento
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-copper-50">
            Em poucos minutos você entende as condições possíveis para
            conquistar seu apartamento Evoluc.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/simular-financiamento"
              variant="secondary"
              size="lg"
            >
              Simular agora
            </Button>
            <a
              href={`tel:+55${siteConfig.phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              <Phone size={16} />
              ou ligue {siteConfig.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
