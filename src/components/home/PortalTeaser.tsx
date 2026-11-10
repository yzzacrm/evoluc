import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Reveal, { RevealGroup } from "@/components/ui/Reveal";
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
      "Fotos, relatórios e as etapas do cronograma, atualizados pela nossa engenharia.",
  },
  {
    icon: MessageSquare,
    title: "Mensagens diretas",
    description:
      "Um canal direto com a Evoluc para dúvidas sobre contrato, obra e pós-entrega.",
  },
  {
    icon: BellRing,
    title: "Lembretes e prazos",
    description:
      "Vencimentos, documentos pendentes e as datas que importam no seu processo.",
  },
  {
    icon: FileText,
    title: "Documentos centralizados",
    description:
      "Contrato, boletos e manual do proprietário, sempre à mão.",
  },
];

export default function PortalTeaser() {
  return (
    <section className="bg-ink-950 py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal variant="left">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-300">
              Área do Morador
            </p>
            <h2 className="font-display mt-4 text-3xl leading-[1.1] text-white sm:text-[2.6rem]">
              Tudo sobre o seu imóvel, em um só lugar
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-300">
              Cada cliente recebe um acesso individual para acompanhar a obra,
              falar com a nossa equipe e consultar documentos, da assinatura
              do contrato ao pós-entrega. Sem grupos de mensagem nem e-mails
              dispersos.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/fale-conosco" variant="light" size="lg">
                Falar com a Evoluc
              </Button>
            </div>
          </Reveal>

          <RevealGroup
            variant="scale"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white/70">
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
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
