import Container from "@/components/ui/Container";
import { differentials } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

// Visual do pacote "Scroll Imobiliario": fundo escuro, título serifado e
// cards numerados com borda fina — com os diferenciais reais da Evoluc.

export default function Differentials() {
  return (
    <section className="bg-ink-950 py-20 sm:py-28">
      <Container>
        <div className="mb-10 max-w-xl sm:mb-16">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-300">
            Por que a Evoluc
          </p>
          <h2 className="font-serif-display mt-4 text-3xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl">
            Mais do que apartamentos.
            <br />
            <em className="italic text-ink-300">Novas histórias.</em>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
          {differentials.map((item, i) => (
            <div
              key={item.title}
              className="group relative min-h-[150px] bg-ink-950 p-3 transition-colors hover:bg-ink-900 sm:min-h-[260px] sm:p-7"
            >
              <span className="text-[0.6rem] font-medium tracking-[0.1em] text-copper-300 sm:text-xs sm:tracking-[0.15em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif-display mt-3 max-w-[14rem] text-[0.8rem] font-medium leading-tight text-white sm:mt-9 sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 hidden max-w-[16rem] text-sm leading-relaxed text-ink-300 sm:block">
                {item.description}
              </p>
              <ArrowUpRight
                className="absolute right-3 top-3 h-3.5 w-3.5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:right-7 sm:bottom-7 sm:top-auto sm:h-5 sm:w-5"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
