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

        <div className="mt-14 grid grid-cols-3 gap-2 sm:gap-6">
          {differentials.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={item.title}
                className="group rounded-lg border border-ink-100 p-2 transition-colors hover:border-copper-200 hover:bg-copper-50/40 sm:rounded-2xl sm:p-7"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900 text-copper-400 transition-colors group-hover:bg-copper-600 group-hover:text-white sm:h-11 sm:w-11 sm:rounded-xl">
                  <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </div>
                <h3 className="font-display mt-2 text-[11px] font-bold leading-tight text-ink-900 sm:mt-5 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 hidden text-sm leading-relaxed text-ink-500 sm:block">
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
