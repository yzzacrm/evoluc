import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import { developments, deliveredExamples, Development } from "@/lib/data";
import { getWhatsappUrl } from "@/lib/site-config";
import {
  LandPlot,
  Car,
  Home,
  MapPin,
  CheckCircle2,
  View,
  BadgeCheck,
} from "lucide-react";

const allDevelopments: Development[] = [...developments, ...deliveredExamples];

const statusLabel: Record<string, string> = {
  lancamento: "Lançamento",
  "em-obras": "Em obras",
  entregue: "Entregue",
};

export function generateStaticParams() {
  return allDevelopments.map((dev) => ({ slug: dev.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dev = allDevelopments.find((d) => d.slug === slug);
  if (!dev) return {};
  return {
    title: dev.name,
    description: dev.tagline,
    alternates: { canonical: `/empreendimentos/${dev.slug}` },
    openGraph: {
      title: dev.name,
      description: dev.tagline,
      images: dev.heroImage ? [dev.heroImage] : undefined,
    },
  };
}

export default async function DevelopmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dev = allDevelopments.find((d) => d.slug === slug);
  if (!dev) notFound();

  const developmentJsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: dev.name,
    description: dev.description,
    url: `https://www.evolucengenharia.com.br/empreendimentos/${dev.slug}`,
    numberOfAccommodationUnits: dev.units || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: dev.address ?? dev.neighborhood,
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    image: (dev.gallery?.length ? dev.gallery : [dev.heroImage]).map(
      (src) => `https://www.evolucengenharia.com.br${src}`
    ),
    amenityFeature: dev.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
    })),
  };

  return (
    <>
      <JsonLd data={developmentJsonLd} />
      <div className="relative overflow-hidden bg-ink-950 pb-16 pt-36 sm:pt-40">
        {dev.heroVideo && (
          <>
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={dev.heroVideo.src}
              poster={dev.heroVideo.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </>
        )}
        <Container className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full border border-white/40 bg-black/20 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white backdrop-blur [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
              {statusLabel[dev.status]}
            </span>
            {dev.soldOut && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/40 bg-black/20 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white backdrop-blur [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                <BadgeCheck size={13} className="text-white/70" />
                100% vendido
              </span>
            )}
          </div>
          <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_4px_16px_rgba(0,0,0,0.75),0_12px_40px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
            {dev.name}
          </h1>
          <p className="mt-5 flex items-center gap-2 text-sm text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_12px_rgba(0,0,0,0.7)]">
            <MapPin size={16} className="text-white/80" />
            {dev.address ?? `${dev.neighborhood} — ${dev.city}`}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg">{dev.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            {dev.soldOut ? (
              <Button href="/lancamentos" variant="light" size="lg">
                Ver lançamentos
              </Button>
            ) : (
              <Button href="/simular-financiamento" variant="light" size="lg">
                Simular financiamento
              </Button>
            )}
            <Button
              href={getWhatsappUrl(
                `Olá! Tenho interesse no ${dev.name} e quero falar com um consultor.`
              )}
              variant="ghost"
              size="lg"
            >
              Falar com um consultor
            </Button>
            {dev.tour3dUrl && (
              <Button href={dev.tour3dUrl} variant="ghost" size="lg">
                <View size={16} />
                Tour virtual 360°
              </Button>
            )}
          </div>
        </Container>
      </div>

      {(() => {
        const stats = [
          dev.landArea && dev.landArea !== "—"
            ? { icon: LandPlot, label: "Área do terreno", value: dev.landArea }
            : null,
          dev.units > 0
            ? { icon: Home, label: "Unidades", value: String(dev.units) }
            : null,
          dev.parkingSpots > 0
            ? { icon: Car, label: "Vagas", value: String(dev.parkingSpots) }
            : null,
          dev.typologies && dev.typologies !== "—"
            ? { icon: Home, label: "Plantas", value: dev.typologies }
            : null,
        ].filter((s): s is NonNullable<typeof s> => Boolean(s));

        if (stats.length === 0) return null;

        return (
          <section className="py-16">
            <Container>
              <div className="grid grid-cols-2 gap-6 rounded-2xl border border-ink-100 p-6 sm:grid-cols-4 sm:p-8">
                {stats.map((s) => (
                  <Stat
                    key={s.label}
                    icon={s.icon}
                    label={s.label}
                    value={s.value}
                  />
                ))}
              </div>
            </Container>
          </section>
        );
      })()}

      <section className="pb-16">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl leading-[1.1] text-ink-950 sm:text-4xl">
                Sobre o empreendimento
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-600">
                {dev.description}
              </p>

              {dev.story && (
                <div className="mt-10 rounded-2xl border border-ink-100 bg-ink-50 p-6 sm:p-8">
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-600">
                    Uma história Evoluc
                  </p>
                  <h3 className="font-serif-display text-2xl leading-[1.1] text-ink-950 mt-3">
                    {dev.story.title}
                  </h3>
                  <div className="mt-4 space-y-3">
                    {dev.story.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-sm leading-relaxed text-ink-600"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {dev.highlights.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-serif-display text-2xl leading-[1.1] text-ink-950">
                    Destaques
                  </h3>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {dev.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-ink-300"
                        />
                        <span className="text-sm leading-relaxed text-ink-600">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {dev.constructionVideo && (
                <div className="mt-12">
                  <h3 className="font-serif-display text-2xl leading-[1.1] text-ink-950">
                    Conheça o projeto
                  </h3>
                  <div className="mt-4 overflow-hidden rounded-xl bg-ink-950">
                    <video
                      className="aspect-video w-full"
                      src={dev.constructionVideo.src}
                      poster={dev.constructionVideo.poster}
                      aria-label={`Conheça o projeto — ${dev.name}`}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>
              )}

              {dev.advancedConstructionVideo && (
                <div className="mt-12">
                  <h3 className="font-serif-display text-2xl leading-[1.1] text-ink-950">
                    Obra em estágio avançado
                  </h3>
                  <div className="mt-4 overflow-hidden rounded-xl bg-ink-950">
                    <video
                      className="aspect-video w-full"
                      src={dev.advancedConstructionVideo.src}
                      poster={dev.advancedConstructionVideo.poster}
                      aria-label={`Obras avançadas — ${dev.name}`}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>
              )}

              {dev.gallery && dev.gallery.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-serif-display text-2xl leading-[1.1] text-ink-950">
                    Galeria
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {dev.gallery.map((src, i) => (
                      <div
                        key={src}
                        className="relative aspect-square overflow-hidden rounded-xl bg-ink-100"
                      >
                        <Image
                          src={src}
                          alt={`${dev.name} — foto ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(min-width: 640px) 33vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dev.plans && dev.plans.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-serif-display text-2xl leading-[1.1] text-ink-950">
                    Plantas
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {dev.plans.map((plan) => (
                      <div
                        key={plan.label}
                        className="overflow-hidden rounded-xl border border-ink-100"
                      >
                        <div className="relative aspect-[4/3] bg-ink-50">
                          <Image
                            src={plan.image}
                            alt={plan.label}
                            fill
                            className="object-contain p-2"
                            sizes="(min-width: 640px) 50vw, 100vw"
                          />
                        </div>
                        <p className="border-t border-ink-100 px-4 py-3 text-center text-sm font-medium text-ink-950">
                          {plan.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dev.progress && dev.progress.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-serif-display text-2xl leading-[1.1] text-ink-950">
                    {dev.status === "entregue"
                      ? "Obra concluída"
                      : "Acompanhe a obra"}
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">
                    {dev.status === "entregue"
                      ? "Todas as etapas da construção foram concluídas antes da entrega das chaves."
                      : "Andamento atualizado, com os mesmos dados que o morador vê na Área do Morador."}
                  </p>
                  <div className="mt-5 space-y-4">
                    {dev.progress.map((p) => (
                      <div key={p.stage}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-ink-800">
                            {p.stage}
                          </span>
                          <span className="tabular-nums text-ink-500">
                            {p.percent}%
                          </span>
                        </div>
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ink-100">
                          <div
                            className="h-full rounded-full bg-ink-950"
                            style={{ width: `${p.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside>
              {dev.amenities.length > 0 && (
                <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6">
                  <h3 className="font-serif-display text-2xl leading-[1.1] text-ink-950">
                    Lazer e infraestrutura
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {dev.amenities.map((a) => (
                      <li
                        key={a}
                        className="flex items-center gap-2 text-sm text-ink-600"
                      >
                        <span className="h-1 w-1 rounded-full bg-ink-300" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 rounded-2xl bg-ink-900 p-6 text-white">
                <h3 className="font-serif-display text-2xl leading-[1.1]">
                  {dev.soldOut ? "Conheça os lançamentos disponíveis" : "Receba a tabela de preços"}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {dev.soldOut
                    ? "Este empreendimento está 100% vendido. Nossa equipe apresenta a você as unidades disponíveis hoje."
                    : "Fale com a equipe comercial e receba a tabela de preços e a disponibilidade de unidades."}
                </p>
                <Button
                  href={getWhatsappUrl(
                    dev.soldOut
                      ? `Olá! Vi que o ${dev.name} está 100% vendido e quero conhecer os lançamentos disponíveis.`
                      : `Olá! Quero saber mais sobre o ${dev.name} — tabela de preços e disponibilidade de unidades.`
                  )}
                  variant="light"
                  className="mt-6 w-full"
                >
                  Falar com um consultor
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof LandPlot;
  label: string;
  value: string;
}) {
  return (
    <div>
      <Icon size={18} strokeWidth={1.5} className="text-ink-400" />
      <p className="font-serif-display mt-3 text-2xl leading-[1.1] text-ink-950">
        {value}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ink-500">{label}</p>
    </div>
  );
}
