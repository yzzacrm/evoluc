import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  MessageSquare,
  BellRing,
  HardHat,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: HardHat,
    title: "Acompanhamento de obra",
    description:
      "Fotos, relatórios e marcos do cronograma físico-financeiro atualizados pela equipe de engenharia.",
  },
  {
    icon: MessageSquare,
    title: "Mensagens diretas",
    description:
      "Canal direto com o time Evoluc para dúvidas sobre o contrato, obra ou pós-entrega.",
  },
  {
    icon: BellRing,
    title: "Lembretes e prazos",
    description:
      "Alertas de vencimento, documentação pendente e datas importantes do seu processo.",
  },
  {
    icon: FileText,
    title: "Documentos centralizados",
    description:
      "Contrato, boletos e manuais do proprietário disponíveis a qualquer momento.",
  },
];

export default function PortalTeaser() {
  return (
    <section className="bg-ink-950 py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-copper-400">
              Área do Morador
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Uma plataforma exclusiva para cada cliente Evoluc
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-300">
              Cada comprador recebe um acesso individual e seguro para
              acompanhar tudo sobre o seu imóvel: da assinatura do contrato
              ao pós-entrega, em um só lugar — sem depender de grupos de
              WhatsApp ou e-mails espalhados.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/area-do-morador" size="lg">
                Acessar Área do Morador
              </Button>
              <Button href="/fale-conosco" variant="ghost" size="lg">
                Quero ser cliente Evoluc
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-copper-600/20 text-copper-400">
                  <Icon size={18} />
                </div>
                <h3 className="font-display mt-4 text-sm font-bold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
