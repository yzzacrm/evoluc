import type { Metadata } from "next";
import Image from "next/image";
import {
  Clock,
  Home as HomeIcon,
  DollarSign,
  Waves,
  MapPin,
  ShieldCheck,
  Train,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/landing/LeadForm";
import { developments } from "@/lib/data";
import { getWhatsappUrl } from "@/lib/site-config";

const dev = developments.find((d) => d.slug === "terras-raras-vila-carrao")!;

export const metadata: Metadata = {
  title: "Terras Raras Vila Carrão | Lançamento Evoluc",
  description:
    "Apartamentos de 1, 2 e 3 quartos na Vila Carrão, dentro do Minha Casa, Minha Vida. Mais de 600m² de lazer. Cadastre-se e simule seu financiamento.",
  alternates: { canonical: "/lp/terras-raras-vila-carrao" },
  robots: { index: false, follow: true },
};

const trustBadges = [
  {
    icon: Clock,
    text: "Lançamento com condições especiais por tempo limitado",
  },
  {
    icon: HomeIcon,
    text: "Dentro do programa Minha Casa, Minha Vida",
  },
  {
    icon: DollarSign,
    text: "Financie até 90% + use o FGTS como entrada",
  },
];

const benefits = [
  {
    icon: Waves,
    title: "Seu resort particular",
    description:
      "Mais de 600 m² de lazer com piscina adulto e infantil, academia, salão de festas, playground e espaço pet — tudo a um elevador de distância.",
  },
  {
    icon: MapPin,
    title: "Localização estratégica",
    description:
      "No centro da Vila Carrão, bairro consolidado da Zona Leste, perto de comércio, escolas e vias de acesso — sem abrir mão da vida na cidade.",
  },
  {
    icon: ShieldCheck,
    title: "As melhores plantas da região",
    description:
      "176 unidades de 1, 2 e 3 quartos, incluindo opções garden, pensadas para diferentes perfis e momentos de vida da sua família.",
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
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          src={dev.constructionVideo?.src}
          poster={dev.constructionVideo?.poster}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
        <Container className="relative py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-copper-400">
                Vila Carrão — Zona Leste
              </p>
              <h1 className="font-display mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Terras Raras
                <br />
                Vila Carrão
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                {dev.tagline} Mais de 600 m² de lazer e as melhores plantas
                da região, dentro do Minha Casa, Minha Vida.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {dev.highlights.slice(0, 3).map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-6 shadow-xl shadow-black/20 sm:p-8">
                <h2 className="font-display text-lg font-bold text-ink-900">
                  Quero saber mais
                </h2>
                <p className="mt-1 text-sm text-ink-500">
                  Cadastre-se e receba a tabela de preços e condições.
                </p>
                <div className="mt-5">
                  <LeadForm
                    empreendimento={dev.name}
                    origem="LP Terras Raras — Hero"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust bar */}
      <section className="border-b border-ink-100 bg-white py-8">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {trustBadges.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-xl border border-ink-100 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-copper-50 text-copper-600">
                  <Icon size={20} />
                </div>
                <p className="text-sm font-semibold text-ink-900">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefícios */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              Chega de esperar pelo fim de semana
            </h2>
            <p className="mt-4 text-ink-500">
              Aqui, o lazer que você só tinha no clube vira parte da sua
              rotina.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-copper-50 text-copper-600">
                  <Icon size={26} />
                </div>
                <h3 className="font-display mt-5 text-lg font-bold text-ink-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Vídeo da obra */}
      {dev.constructionVideo && (
        <section className="bg-ink-50 py-16">
          <Container>
            <h2 className="font-display text-center text-3xl font-bold text-ink-900">
              Acompanhe a evolução da obra
            </h2>
            <div className="mx-auto mt-8 aspect-video max-w-4xl overflow-hidden rounded-2xl shadow-lg">
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
        <section className="py-16 lg:py-24">
          <Container>
            <h2 className="font-display text-center text-3xl font-bold text-ink-900">
              Conheça a área de lazer
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dev.gallery.map((src) => (
                <div
                  key={src}
                  className="relative aspect-video overflow-hidden rounded-xl"
                >
                  <Image
                    src={src}
                    alt={dev.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Plantas */}
      {dev.plans && dev.plans.length > 0 && (
        <section className="bg-ink-50 py-16 lg:py-24">
          <Container>
            <h2 className="font-display text-center text-3xl font-bold text-ink-900">
              Plantas disponíveis
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-ink-500">
              {dev.typologies} — escolha a que combina com o seu momento de
              vida.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dev.plans.map((plan) => (
                <div
                  key={plan.label}
                  className="overflow-hidden rounded-xl bg-white shadow-sm"
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
                  <p className="border-t border-ink-100 p-4 text-center text-sm font-semibold text-ink-900">
                    {plan.label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Localização */}
      <section className="py-16 lg:py-24">
        <Container>
          <h2 className="font-display text-center text-3xl font-bold text-ink-900">
            Localização privilegiada
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-500">
            {dev.address}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="overflow-hidden rounded-2xl lg:col-span-3">
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
                  className="rounded-xl border border-ink-100 p-4"
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

      {/* Credibilidade */}
      <section className="bg-ink-950 py-16 text-white">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-bold">
            A garantia de uma decisão segura
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-300">
            A Evoluc constrói na Zona Leste de São Paulo desde 2012, com
            processos avaliados dentro do PBQP-H — Programa Brasileiro de
            Qualidade e Produtividade do Habitat. O Terras Raras Vila Carrão
            está dentro das regras do Minha Casa, Minha Vida, com
            financiamento pela Caixa Econômica Federal.
          </p>
          <div className="mx-auto mt-8 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-400">
            <span>12+ anos de mercado</span>
            <span>•</span>
            <span>Certificação PBQP-H</span>
            <span>•</span>
            <span>Financiamento Caixa</span>
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="bg-copper-600 py-16 lg:py-24">
        <Container>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Não deixe seu sonho virar o sonho de outra pessoa
              </h2>
              <p className="mt-4 text-white/90">
                As condições de lançamento são por tempo limitado. Cadastre-se
                agora e fale com nosso time comercial.
              </p>
              <Button
                href={getWhatsappUrl(
                  `Olá! Tenho interesse no Terras Raras Vila Carrão e quero falar com um consultor.`
                )}
                variant="secondary"
                size="lg"
                className="mt-6"
              >
                Falar agora pelo WhatsApp
              </Button>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
              <LeadForm
                empreendimento={dev.name}
                origem="LP Terras Raras — CTA final"
                ctaLabel="Quero me cadastrar"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
