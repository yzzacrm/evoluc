import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PortalLoginForm from "@/components/forms/PortalLoginForm";
import {
  HardHat,
  MessageSquare,
  BellRing,
  FileText,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Área do Morador",
  description:
    "Acesse a Área do Morador Evoluc: acompanhamento de obra, mensagens, lembretes e documentos em um só lugar.",
};

const features = [
  {
    icon: HardHat,
    title: "Acompanhamento de obra",
    description:
      "Fotos e relatórios de andamento, com marcos do cronograma físico-financeiro.",
  },
  {
    icon: MessageSquare,
    title: "Mensagens diretas",
    description: "Um canal direto com a equipe Evoluc para dúvidas sobre contrato e obra.",
  },
  {
    icon: BellRing,
    title: "Lembretes e prazos",
    description: "Avisos de vencimento e de documentos pendentes.",
  },
  {
    icon: FileText,
    title: "Documentos centralizados",
    description: "Contrato, boletos e manuais sempre à mão.",
  },
];

export default function AreaDoMoradorPage() {
  return (
    <div className="bg-ink-950 pb-24 pt-36 sm:pt-40">
      <Container>
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 text-copper-300">
              <ShieldCheck size={14} />
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em]">
                Acesso individual
              </span>
            </div>
            <h1 className="font-display mt-4 text-4xl leading-[1.1] text-white sm:text-5xl">
              Área do Morador
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-300 sm:text-lg">
              Cada cliente Evoluc recebe um acesso próprio para acompanhar o
              seu imóvel, da assinatura do contrato ao pós-entrega.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70">
                    <Icon size={16} />
                  </div>
                  <h3 className="font-display mt-3 text-base text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <PortalLoginForm />
        </div>
      </Container>
    </div>
  );
}
