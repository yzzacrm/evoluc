import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Differentials from "@/components/home/Differentials";
import PortalTeaser from "@/components/home/PortalTeaser";

export const metadata: Metadata = {
  title: "Diferenciais",
  description:
    "Conheça os diferenciais da Evoluc: qualidade certificada, transparência e a Área do Morador.",
};

export default function DiferenciaisPage() {
  return (
    <>
      <PageHeader
        eyebrow="Diferenciais"
        title="Por que comprar com a Evoluc"
        description="Engenharia com processo, comunicação transparente durante a obra e uma plataforma exclusiva para acompanhar cada etapa do seu imóvel."
      />
      <Differentials />
      <PortalTeaser />
    </>
  );
}
