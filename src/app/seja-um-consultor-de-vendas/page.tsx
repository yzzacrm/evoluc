import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import ConsultantForm from "@/components/forms/ConsultantForm";
import { TrendingUp, Users2, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Seja um Consultor de Vendas",
  description:
    "Faça parte da rede de consultores de vendas da Evoluc.",
};

const benefits = [
  {
    icon: TrendingUp,
    title: "Comissionamento competitivo",
    text: "Condições comerciais atrativas para corretores e consultores parceiros.",
  },
  {
    icon: GraduationCap,
    title: "Treinamento sobre os empreendimentos",
    text: "Material completo de vendas e apoio da equipe Evoluc em cada lançamento.",
  },
  {
    icon: Users2,
    title: "Rede de relacionamento",
    text: "Acesso a uma carteira de lançamentos ativos na Zona Leste de São Paulo.",
  },
];

export default function SejaConsultorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Carreira"
        title="Seja um consultor de vendas Evoluc"
        description="Faça parte da rede de corretores parceiros e venda os lançamentos Evoluc com todo o suporte comercial da construtora."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            <div>
              <div className="space-y-6">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-copper-400">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-ink-900">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ConsultantForm />
          </div>
        </Container>
      </section>
    </>
  );
}
