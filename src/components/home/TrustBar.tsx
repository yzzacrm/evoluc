import Container from "@/components/ui/Container";
import { ShieldCheck, Building2, Users, Award } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const items = [
  {
    icon: Building2,
    title: `Desde ${siteConfig.founded}`,
    subtitle: "Construindo em São Paulo",
  },
  {
    icon: ShieldCheck,
    title: "Certificação PBQP-H",
    subtitle: "Qualidade construtiva avaliada",
  },
  {
    icon: Users,
    title: "Atendimento dedicado",
    subtitle: "Comercial e pós-venda",
  },
  {
    icon: Award,
    title: "Área do Morador",
    subtitle: "Acompanhamento exclusivo de obra",
  },
];

export default function TrustBar() {
  return (
    <div className="relative z-10 -mt-16 pb-4">
      <Container>
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-xl shadow-ink-950/5 sm:grid-cols-4 sm:p-8">
          {items.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex flex-col items-start gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper-50 text-copper-600">
                <Icon size={20} />
              </div>
              <p className="font-display text-sm font-bold text-ink-900 sm:text-base">
                {title}
              </p>
              <p className="text-xs text-ink-500">{subtitle}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
