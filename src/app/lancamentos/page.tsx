import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import DevelopmentCard from "@/components/developments/DevelopmentCard";
import { developments } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lançamentos",
  description:
    "Lançamentos da Evoluc na Zona Leste de São Paulo: plantas, lazer e localização de cada empreendimento.",
};

export default function LancamentosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Lançamentos"
        title="Empreendimentos com unidades à venda"
        description="Apartamentos na Zona Leste de São Paulo, com plantas flexíveis, lazer completo e localização estratégica."
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
