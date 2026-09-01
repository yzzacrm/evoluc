import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import FinancingSimulator from "@/components/finance/FinancingSimulator";
import { financingFaq } from "@/lib/data";

export const metadata: Metadata = {
  title: "Simular Financiamento",
  description:
    "Simule quanto você pode financiar pelo Minha Casa, Minha Vida com base na sua renda familiar.",
};

export default function SimularFinanciamentoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Simulador · Minha Casa, Minha Vida"
        title="Simule seu financiamento"
        description="Informe sua renda familiar e o valor do imóvel (até R$ 500 mil) e descubra quanto você pode financiar, sua entrada e a parcela mensal."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <FinancingSimulator />
        </Container>
      </section>

      <section className="bg-ink-50 py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Perguntas frequentes
          </h2>
          <div className="mt-8 space-y-6">
            {financingFaq.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-ink-100 bg-white p-6"
              >
                <h3 className="font-display text-base font-bold text-ink-900">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
