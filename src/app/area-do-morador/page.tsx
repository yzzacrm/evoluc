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
    description: "Canal com o time Evoluc para dúvidas sobre contrato e obra.",
  },
  {
    icon: BellRing,
    title: "Lembretes e prazos",
    description: "Alertas de vencimento e documentação pendente.",
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
            <div className="flex items-center gap-2 text-copper-400">
              <ShieldCheck size={18} />
              <span className="text-sm font-semibold uppercase tracking-[0.25em]">
                Acesso exclusivo
              </span>
            </div>
            <h1 className="font-display mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Área do Morador
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-300">
              Cada cliente Evoluc tem um acesso individual para acompanhar
              tudo sobre o seu imóvel, do contrato ao pós-entrega.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-copper-600/20 text-copper-400">
                    <Icon size={16} />
                  </div>
                  <h3 className="font-display mt-3 text-sm font-bold text-white">
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
