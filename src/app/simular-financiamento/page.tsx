import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import FinancingSimulator from "@/components/finance/FinancingSimulator";
import { financingFaq } from "@/lib/data";

export const metadata: Metadata = {
  title: "Simular Financiamento",
  description:
    "Veja quanto você pode financiar pelo Minha Casa, Minha Vida a partir da sua renda familiar.",
};

export default function SimularFinanciamentoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Simulador · Minha Casa, Minha Vida"
        title="Simule o seu financiamento"
        description="Informe a renda familiar e o valor do imóvel, até R$ 500 mil, e veja quanto você pode financiar, o valor da entrada e a parcela mensal."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <FinancingSimulator />
        </Container>
      </section>

      <section className="bg-ink-50 py-20">
        <Container>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-600">
            Dúvidas
          </p>
          <h2 className="font-display mt-4 text-3xl leading-[1.1] text-ink-950 sm:text-[2.6rem]">
            Perguntas frequentes
          </h2>
          <div className="mt-8 space-y-6">
            {financingFaq.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-ink-100 bg-white p-6"
              >
                <h3 className="font-display text-lg leading-[1.2] text-ink-950">
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
