import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import DevelopmentCard from "@/components/developments/DevelopmentCard";
import Testimonials from "@/components/home/Testimonials";
import { deliveredExamples } from "@/lib/data";

export const metadata: Metadata = {
  title: "Empreendimentos Entregues",
  description:
    "Histórico de empreendimentos entregues pela Evoluc em São Paulo.",
};

export default function EntreguesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Entregues"
        title="Empreendimentos já entregues pela Evoluc"
        description="Um histórico de obras concluídas com o mesmo padrão de qualidade dos lançamentos atuais."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {deliveredExamples.map((dev) => (
              <DevelopmentCard key={dev.slug} dev={dev} />
            ))}
          </div>
        </Container>
      </section>

      <Testimonials />
    </>
  );
}
