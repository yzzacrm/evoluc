import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { differentials } from "@/lib/data";
import {
  ShieldCheck,
  ClipboardCheck,
  MapPin,
  Headphones,
  LayoutGrid,
  HeartHandshake,
} from "lucide-react";

const icons = [
  ShieldCheck,
  ClipboardCheck,
  MapPin,
  Headphones,
  LayoutGrid,
  HeartHandshake,
];

export default function Differentials() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Por que a Evoluc"
          title="Engenharia com processo, não improviso"
          description="Cada empreendimento segue um mesmo padrão de qualidade, transparência e cuidado com o morador — do lançamento até muito depois da entrega das chaves."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-ink-100 p-7 transition-colors hover:border-copper-200 hover:bg-copper-50/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900 text-copper-400 transition-colors group-hover:bg-copper-600 group-hover:text-white">
                  <Icon size={20} />
                </div>
                <h3 className="font-display mt-5 text-lg font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
