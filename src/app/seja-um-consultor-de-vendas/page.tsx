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
    text: "Condições comerciais claras para corretores e consultores parceiros.",
  },
  {
    icon: GraduationCap,
    title: "Preparo sobre cada empreendimento",
    text: "Material de vendas completo e o apoio da equipe Evoluc em cada lançamento.",
  },
  {
    icon: Users2,
    title: "Rede de relacionamento",
    text: "Acesso aos lançamentos ativos da Evoluc na Zona Leste de São Paulo.",
  },
];

export default function SejaConsultorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Parceria comercial"
        title="Venda os empreendimentos Evoluc"
        description="Faça parte da nossa rede de corretores parceiros, com o suporte comercial da construtora em cada lançamento."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-600">
                O que oferecemos
              </p>
              <h2 className="font-display mt-4 text-3xl leading-[1.1] text-ink-950 sm:text-[2.6rem]">
                Uma parceria com estrutura
              </h2>
              <div className="mt-10 space-y-6">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink-100 text-ink-500">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg leading-[1.2] text-ink-950">
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
