import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import DevelopmentCard from "@/components/developments/DevelopmentCard";
import { developments } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lançamentos",
  description:
    "Conheça os lançamentos imobiliários da Evoluc na Zona Leste de São Paulo.",
};

export default function LancamentosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Lançamentos"
        title="Empreendimentos abertos para venda"
        description="Unidades com plantas flexíveis, área de lazer completa e localização estratégica na Zona Leste de São Paulo."
      />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {developments.map((dev) => (
              <DevelopmentCard key={dev.slug} dev={dev} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
