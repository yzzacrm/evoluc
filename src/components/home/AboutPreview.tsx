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
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-600">
              Quem somos
            </p>
            <h2 className="font-display mt-4 text-3xl leading-[1.1] text-ink-950 sm:text-[2.6rem]">
              Uma construtora que cresce pela forma como trabalha
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-500">
              Nascemos em {siteConfig.founded} com um compromisso simples:
              entregar o melhor a quem confia em nós. Crescemos pela
              competência e pela dedicação das nossas equipes, levando
              conforto, estética e segurança a cada bairro onde construímos.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Nossos processos são certificados pelo PBQP-H, e o
              relacionamento não termina na entrega das chaves: é para isso
              que existe a Área do Morador.
            </p>
            <Link
              href="/quem-somos"
              className="mt-8 inline-flex items-center gap-1 border-b border-ink-950/20 pb-1 text-sm font-medium text-ink-950 hover:border-ink-950"
            >
              Conhecer a nossa história
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
