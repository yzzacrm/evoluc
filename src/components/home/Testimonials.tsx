import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="bg-ink-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Depoimentos"
          title="O que dizem os moradores Evoluc"
          align="center"
        />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="flex flex-col rounded-2xl border border-ink-100 bg-white p-7"
            >
              <Quote className="text-copper-500" size={24} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-600">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-ink-100 pt-4">
                <p className="text-sm font-semibold text-ink-900">
                  {t.name}
                </p>
                <p className="text-xs text-ink-400">{t.development}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
