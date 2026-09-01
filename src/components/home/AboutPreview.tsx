import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export default function AboutPreview() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink-900">
            <Image
              src="/videos/obras/oberon-obra-poster.jpg"
              alt="Vista aérea do Oberon Itaquera, empreendimento entregue pela Evoluc"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-copper-600">
              Quem somos
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              Desde {siteConfig.founded} construindo mais do que imóveis
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-500">
              A Evoluc nasceu com o propósito de entregar sempre o
              melhor aos seus clientes, crescendo pela competência e
              dedicação de seus colaboradores. Nosso objetivo é levar à
              sociedade ao nosso entorno experiências de conforto, estética e
              segurança em cada empreendimento.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Trabalhamos com processos certificados pelo PBQP-H e um modelo
              de relacionamento que não termina na entrega das chaves — é
              nisso que nasce a Área do Morador, nossa plataforma de
              acompanhamento contínuo.
            </p>
            <Link
              href="/quem-somos"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink-900 hover:text-copper-600"
            >
              Conheça nossa história completa
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
