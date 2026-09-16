import type { Metadata } from "next";
import Image from "next/image";
import {
  MapPin,
  Home as HomeIcon,
  TrendingUp,
  Train,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/landing/LeadForm";
import Countdown from "@/components/landing/Countdown";
import { developments } from "@/lib/data";
import { getWhatsappUrl } from "@/lib/site-config";

const dev = developments.find((d) => d.slug === "terras-raras-vila-carrao")!;

// Próxima edição do evento presencial de vendas.
const FEIRAO_DATE = new Date("2026-10-03T00:00:00-03:00");

export const metadata: Metadata = {
  title: "Mega Feirão da Casa Própria | Terras Raras Vila Carrão | Evoluc",
  description:
    "Dias 3 e 4 de outubro: apartamentos a partir de R$255.000 na Vila Carrão, dentro do Minha Casa, Minha Vida. Descubra seu poder de compra grátis.",
  alternates: { canonical: "/lp/terras-raras-vila-carrao" },
  robots: { index: false, follow: true },
};

const destaques = [
  {
    icon: MapPin,
    title: "Localização Privilegiada",
    description: "Vila Carrão — Zona Leste de SP",
  },
  {
    icon: HomeIcon,
    title: "Apartamentos de 1, 2 e 3 Dormitórios",
    description: "A partir de R$ 255.000",
  },
  {
    icon: TrendingUp,
    title: "Financiamento Facilitado",
    description: "Use seu FGTS + Financiamento Caixa",
  },
];

const pontosDeInteresse = [
  {
    categoria: "Transporte",
    icon: Train,
    itens: ["Terminal Carrão", "Estação Penha"],
  },
  {
    categoria: "Comércio",
    icon: ShoppingBag,
    itens: ["Shopping Aricanduva", "Supermercado Extra"],
  },
  {
    categoria: "Educação",
    icon: GraduationCap,
    itens: ["Colégio Carrão", "EMEF Vila Carrão"],
  },
  {
    categoria: "Saúde",
    icon: HeartPulse,
    itens: ["Hospital Cema", "UBS Vila Carrão"],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  name: dev.name,
  description: dev.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: dev.address,
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  numberOfAccommodationUnits: dev.units,
};

export default function TerrasRarasLandingPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    dev.address ?? dev.name
  )}&output=embed`;

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/lp-terras-raras-hero.mp4"
          poster="/videos/lp-terras-raras-hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <Container className="relative pb-16 pt-28 lg:pb-20 lg:pt-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <h1 className="font-display text-2xl font-black uppercase tracking-wide text-copper-400 sm:text-3xl">
                Feirão da Casa Própria
              </h1>
              <p className="font-display mt-2 text-2xl font-black text-white sm:text-3xl">
                A partir de R$ 255.000
              </p>
              <p className="mt-1 text-base text-white/80 sm:text-lg">
                Apartamentos com varanda na Vila Carrão
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Countdown target={FEIRAO_DATE} />
                <Button href="#formulario" size="lg" className="md:hidden">
                  Quero fazer a minha análise
                </Button>
              </div>

              <p className="mt-6 max-w-lg text-sm text-white/70">
                Para você que sonha em trocar um apartamento comum por um
                clube particular e ainda ganhar horas no seu dia. Descubra o
                projeto com as melhores condições do Minha Casa, Minha Vida.
              </p>
              {dev.tour3dUrl && (
                <Button href={dev.tour3dUrl} size="lg" className="mt-4">
                  <HomeIcon size={18} />
                  Fazer Tour Virtual 360°
                </Button>
              )}
            </div>

            <div className="hidden md:col-span-2 md:block">
              <div className="rounded-2xl bg-white p-5 shadow-2xl">
                <h2 className="font-display text-base font-bold text-ink-900">
                  Descubra o que cabe no seu bolso
                </h2>
                <p className="mt-1 text-xs text-ink-500">
                  Preencha seus dados e receba uma análise gratuita e
                  personalizada de financiamento.
                </p>
                <div className="mt-4">
                  <LeadForm
                    empreendimento={dev.name}
                    origem="LP Hero"
                    ctaLabel="Quero fazer a minha análise"
                    extended
                    compact
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cards de destaque */}
      <section className="bg-white py-10">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {destaques.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-xl border border-ink-100 p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-copper-50 text-copper-600">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink-900">{title}</p>
                  <p className="text-sm text-ink-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Vídeo de apresentação */}
      {dev.constructionVideo && (
        <section className="bg-white py-16 lg:py-24">
          <Container>
            <h2 className="font-display text-center text-3xl font-black text-ink-900 sm:text-5xl">
              Conheça o Empreendimento
            </h2>
            <div className="mx-auto mt-8 aspect-video max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
              <video
                className="h-full w-full object-cover"
                src={dev.constructionVideo.src}
                poster={dev.constructionVideo.poster}
                controls
                playsInline
              />
            </div>
          </Container>
        </section>
      )}

      {/* Galeria */}
      {dev.gallery && dev.gallery.length > 0 && (
        <section className="bg-ink-950 py-16 lg:py-24">
          <Container>
            <h2 className="font-display text-center text-3xl font-black text-white sm:text-5xl">
              Área de Lazer e Estrutura
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dev.gallery.slice(0, 6).map((src) => (
                <div
                  key={src}
                  className="relative aspect-video overflow-hidden rounded-xl shadow-lg"
                >
                  <Image
                    src={src}
                    alt={dev.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm italic text-white/50">
              *Imagens ilustrativas da área comum do empreendimento
            </p>
          </Container>
        </section>
      )}

      {/* Plantas */}
      {dev.plans && dev.plans.length > 0 && (
        <section className="bg-white py-16 lg:py-24">
          <Container>
            <h2 className="font-display text-center text-3xl font-black text-ink-900 sm:text-5xl">
              Plantas Disponíveis
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-ink-500">
              {dev.typologies} — escolha a que combina com o seu momento de
              vida.
            </p>

            <div className="mx-auto mt-8 flex max-w-2xl items-center gap-4 rounded-xl bg-copper-600 p-6 text-white shadow-lg">
              <HomeIcon size={40} className="shrink-0" />
              <div>
                <p className="font-display text-lg font-bold">
                  Encontre a sua!
                </p>
                <p className="text-sm text-white/90">
                  Faça sua pré-análise e descubra qual planta cabe no seu
                  orçamento
                </p>
              </div>
              <Button
                href="#formulario"
                variant="secondary"
                className="ml-auto shrink-0"
              >
                Simular agora
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dev.plans.map((plan) => (
                <div
                  key={plan.label}
                  className="overflow-hidden rounded-xl bg-white shadow-lg"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={plan.image}
                      alt={plan.label}
                      fill
                      className="object-contain p-4"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <p className="border-t border-ink-100 p-4 text-center text-sm font-bold text-ink-900">
                    {plan.label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Localização */}
      <section className="bg-ink-50 py-16 lg:py-24">
        <Container>
          <h2 className="font-display text-center text-3xl font-black text-ink-900 sm:text-5xl">
            Localização Privilegiada
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-500">
            {dev.address}. Perto de transporte público, comércio, escolas e
            hospitais — sem abrir mão da vida na cidade.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="overflow-hidden rounded-2xl shadow-lg lg:col-span-3">
              <iframe
                src={mapSrc}
                className="h-80 w-full lg:h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa — ${dev.name}`}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
              {pontosDeInteresse.map(({ categoria, icon: Icon, itens }) => (
                <div
                  key={categoria}
                  className="rounded-xl bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-copper-600">
                    <Icon size={18} />
                    <span className="text-sm font-semibold uppercase tracking-wide">
                      {categoria}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-ink-600">
                    {itens.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Por que confiar na Evoluc */}
      <section className="bg-white py-16">
        <Container className="text-center">
          <h2 className="font-display text-2xl font-black text-ink-900 sm:text-3xl">
            Por que confiar na Evoluc Construtora
          </h2>
          <div className="mx-auto mt-6 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-ink-600">
            <span>14+ anos no mercado</span>
            <span className="text-copper-400">•</span>
            <span>Certificação PBQP-H</span>
            <span className="text-copper-400">•</span>
            <span>Financiamento pela Caixa Econômica Federal</span>
          </div>
        </Container>
      </section>

      {/* Formulário de captura */}
      <section id="formulario" className="bg-ink-950 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-xl">
            <div className="text-center">
              <p className="font-display text-4xl font-black text-copper-400 sm:text-5xl">
                R$ 255.000
              </p>
              <p className="mt-1 text-sm text-white/60">
                *Apartamentos a partir de R$ 255.000 — entrega prevista: 2028
              </p>
              <h2 className="font-display mt-8 text-3xl font-black text-white sm:text-4xl">
                Descubra o seu poder de compra
              </h2>
              <p className="mt-3 text-ink-300">
                Cadastro grátis — sem compromisso. As condições do Mega
                Feirão são por tempo limitado.
              </p>
            </div>
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
              <LeadForm
                empreendimento={`${dev.name} — Mega Feirão da Casa Própria`}
                origem="LP Mega Feirão"
                ctaLabel="Quero fazer a minha análise"
                extended
              />
            </div>
            <div className="mt-6 text-center">
              <Button
                href={getWhatsappUrl(
                  "Olá! Vi o Mega Feirão da Casa Própria do Terras Raras Vila Carrão e quero falar com um consultor."
                )}
                variant="ghost"
                size="lg"
              >
                Prefiro falar agora pelo WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
