import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import { RevealGroup } from "@/components/ui/Reveal";
import DevelopmentCard from "@/components/developments/DevelopmentCard";
import { deliveredExamples } from "@/lib/data";

export const metadata: Metadata = {
  title: "Empreendimentos Entregues",
  description:
    "Empreendimentos que a Evoluc já entregou em São Paulo.",
};

export default function EntreguesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Entregues"
        title="O que já entregamos"
        description="Obras concluídas com o mesmo padrão de qualidade que você encontra nos lançamentos atuais."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <RevealGroup variant="scale" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {deliveredExamples.map((dev) => (
              <DevelopmentCard key={dev.slug} dev={dev} />
            ))}
          </RevealGroup>
        </Container>
      </section>

    </>
  );
}
