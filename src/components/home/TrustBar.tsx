import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

const items = [
  {
    title: `Desde ${siteConfig.founded}`,
    subtitle: "Construindo em São Paulo",
  },
  {
    title: "PBQP-H",
    subtitle: "Qualidade construtiva certificada",
  },
  {
    title: "Do contrato ao pós-obra",
    subtitle: "Um time dedicado a cada cliente",
  },
];

export default function TrustBar() {
  return (
    <div className="relative z-10 -mt-16 pb-4">
      <Container>
        <div className="grid grid-cols-1 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white shadow-xl shadow-ink-950/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map(({ title, subtitle }) => (
            <div key={title} className="px-6 py-6 sm:px-8 sm:py-8">
              <p className="font-serif-display text-xl text-ink-950 sm:text-2xl">
                {title}
              </p>
              <p className="mt-1.5 text-xs tracking-wide text-ink-500">{subtitle}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
