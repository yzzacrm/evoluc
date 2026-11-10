import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DevelopmentCard from "@/components/developments/DevelopmentCard";
import { developments, deliveredExamples, Development } from "@/lib/data";

const featuredSlugs = ["terras-raras-vila-carrao", "oberon-itaquera", "vista-livre"];
const videoOrderSlugs = ["terras-raras-vila-carrao", "oberon-itaquera", "vista-livre"];

const allDevelopments: Development[] = [...developments, ...deliveredExamples];
const featured = featuredSlugs
  .map((slug) => allDevelopments.find((d) => d.slug === slug))
  .filter((d): d is Development => Boolean(d));
const videos = videoOrderSlugs
  .map((slug) => allDevelopments.find((d) => d.slug === slug))
  .filter((d): d is Development => Boolean(d?.constructionVideo));

export default function DevelopmentsPreview() {
  return (
    <section className="bg-ink-50 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Empreendimentos"
            title="Endereços pensados para viver bem"
            description="Lançamentos em obra e projetos já entregues, com o mesmo padrão de execução do primeiro ao último andar."
          />
          <Link
            href="/lancamentos"
            className="inline-flex shrink-0 items-center gap-1 border-b border-ink-950/20 pb-1 text-sm font-medium text-ink-950 hover:border-ink-950"
          >
            Ver todos
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="scrollbar-hide -mx-6 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4">
          {featured.map((dev, i) => (
            <div
              key={dev.slug}
              className={
                i === 0
                  ? "w-[90vw] shrink-0 snap-start sm:w-[440px]"
                  : "w-[85vw] shrink-0 snap-start sm:w-96"
              }
            >
              <DevelopmentCard dev={dev} featured={i === 0} />
            </div>
          ))}
        </div>

        {videos.length > 0 && (
          <div className="mt-16 border-t border-ink-200 pt-16">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-600">
              Em obra
            </p>
            <h3 className="font-serif-display mt-3 text-2xl text-ink-950 sm:text-3xl">
              Acompanhe cada canteiro
            </h3>
            <p className="mt-2 max-w-xl text-ink-500">
              Imagens reais das nossas obras e dos prédios já entregues.
            </p>

            <div className="scrollbar-hide -mx-6 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4">
              {videos.map((dev) => (
                <div
                  key={dev.slug}
                  className="w-[85vw] shrink-0 snap-start sm:w-[520px]"
                >
                  <div className="overflow-hidden rounded-2xl bg-ink-950">
                    <video
                      className="aspect-video w-full"
                      src={dev.constructionVideo!.src}
                      poster={dev.constructionVideo!.poster}
                      aria-label={
                        dev.status === "entregue"
                          ? `Vídeo do empreendimento — ${dev.name}`
                          : `Vídeo da obra — ${dev.name}`
                      }
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </div>
                  <p className="font-display mt-4 text-lg font-bold text-ink-900">
                    {dev.name}
                  </p>
                  <p className="text-sm text-ink-500">
                    {dev.neighborhood} — {dev.city}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
