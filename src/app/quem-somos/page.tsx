import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PortalTeaser from "@/components/home/PortalTeaser";
import { siteConfig } from "@/lib/site-config";
import {
  ShieldCheck,
  Award,
  Zap,
  HeartHandshake,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a história da Evoluc, construtora e incorporadora em São Paulo desde 2012, fundada por Léo e Lucas.",
};

const founderStories = [
  {
    tag: "A origem",
    title: "O pedreiro e o terreno que ninguém queria",
    text: [
      "A Evoluc não começou em uma prancheta. Começou no canteiro de obras. Lucas, nosso fundador, foi pedreiro antes de ser empresário, e traz da prática o conhecimento que muitos só conhecem no papel.",
      "O ponto de partida foi um terreno abandonado, com um problema grave de documentação. Nenhuma empresa queria assumir o risco. Lucas procurou o dono e fez uma proposta: \"Eu construo dois sobrados no seu terreno. Um deles, o seu, continua com o problema que o senhor já conhece. O outro, que fica para mim, eu regularizo e deixo 100% certo.\"",
      "O dono aceitou. Desse acordo veio o que ainda orienta a Evoluc: enxergar valor onde outros veem impedimento, e resolver o problema em vez de contorná-lo.",
    ],
  },
  {
    tag: "O nome Oberon",
    title: "Residencial Oberon: um nome dado como palavra",
    text: [
      "A negociação pelo terreno do Residencial Oberon foi longa. Para firmar a confiança com o proprietário, um homem de muita história, Lucas assumiu um compromisso que ia além do negócio: o empreendimento levaria o sobrenome da família dele, Oberon.",
      "O Sr. Oberon faleceu meses antes da conclusão da obra. Algum tempo depois, a filha dele visitou o local, parou diante da fachada e, ao ler \"Residencial Oberon\" gravado na estrutura, se emocionou.",
      "Naquele dia ficou claro para nós que o trabalho não termina no concreto. Um edifício também guarda nomes, compromissos e memórias.",
    ],
  },
  {
    tag: "Qualidade",
    title: "Uma qualidade que não entra na conta da economia",
    text: [
      "A qualidade se decide nos detalhes. Em uma reunião de planejamento, a pauta era reduzir custos: materiais mais simples, uma pia de inox aqui, um pouco menos de azulejo ali.",
      "Léo interrompeu a conversa com calma: \"Não. Essa economia não está no rumo da Evoluc. O cliente que nos escolhe espera o melhor, e é o melhor que vamos entregar.\"",
      "A frase virou critério. Para nós, qualidade não é argumento de venda. É um princípio que vale em cada decisão, inclusive nas que ninguém vê.",
    ],
  },
  {
    tag: "Resiliência",
    title: "O projeto que seguiu",
    text: [
      "No início do empreendimento Futuri, um grande sócio e amigo estava conosco. A quatro meses do início da obra, ele faleceu. Seria mais simples interromper o projeto.",
      "Depois do luto, decidimos: \"o projeto segue\". Procuramos os filhos dele, que reconheceram em nós a mesma palavra que o pai mantinha. Eles confiaram, e juntos levamos o projeto adiante até a entrega da obra.",
      "É essa a estrutura que mais nos sustenta: cumprir o que foi combinado, mesmo nos momentos mais difíceis.",
    ],
  },
];

const values = [
  {
    icon: Award,
    title: "Qualidade inegociável",
    text: "Do projeto ao acabamento, não abrimos mão do padrão que definimos. Quem compra um imóvel toma uma das decisões mais importantes da vida.",
  },
  {
    icon: Zap,
    title: "Coragem para realizar",
    text: "Encaramos situações que outros evitam e buscamos solução onde parecia não haver caminho.",
  },
  {
    icon: HeartHandshake,
    title: "Parceria de confiança",
    text: "Relações claras com clientes, colaboradores e investidores, do início ao fim de cada projeto.",
  },
  {
    icon: Users,
    title: "Legado humano",
    text: "Cada obra carrega histórias. Respeitamos o nosso passado e as pessoas que fazem parte dele.",
  },
];

export default function QuemSomosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quem somos"
        title={`Construindo em São Paulo desde ${siteConfig.founded}`}
        description="A Evoluc é uma construtora e incorporadora paulistana fundada por Léo e Lucas. Engenharia rigorosa, conduzida por pessoas."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base leading-relaxed text-ink-600">
                Desde 2012, a Evoluc cresce pela competência e pela dedicação
                das suas equipes, com um compromisso que não mudou: entregar
                o melhor a quem confia em nós.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-600">
                Cada empreendimento leva conforto, estética e segurança ao
                bairro onde está. Esse cuidado começa no primeiro contato e
                continua muito depois da entrega das chaves.
              </p>
              <p className="mt-6 font-display text-xl italic text-ink-950">
                &ldquo;Evoluc. A engenharia que constrói seu futuro.&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-3 rounded-xl border border-ink-100 p-4">
                <ShieldCheck className="shrink-0 text-ink-500" size={22} />
                <p className="text-sm text-ink-600">
                  Processos construtivos avaliados dentro do{" "}
                  <strong className="font-medium text-ink-950">PBQP-H</strong>,
                  o Programa Brasileiro de Qualidade e Produtividade do Habitat.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-ink-100 to-ink-200">
              <div className="absolute inset-0 flex items-center justify-center text-ink-400">
                <span className="text-sm">Foto da equipe / obra Evoluc</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ink-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Nossa história"
            title="Quatro momentos que definiram a Evoluc"
            description="Histórias reais por trás das decisões que tomamos e das obras que entregamos."
          />
          <div className="mt-14 space-y-14">
            {founderStories.map((story) => (
              <div
                key={story.title}
                className="rounded-2xl border border-ink-100 bg-white p-8 sm:p-10"
              >
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-600">
                  {story.tag}
                </p>
                <h3 className="font-display mt-3 text-2xl leading-[1.15] text-ink-950 sm:text-[1.75rem]">
                  {story.title}
                </h3>
                <div className="mt-5 space-y-4">
                  {story.text.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-ink-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 p-8">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-600">
                Propósito
              </p>
              <h3 className="font-display mt-4 text-2xl leading-[1.15] text-ink-950">
                Missão
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Entregar empreendimentos com engenharia rigorosa e qualidade
                inegociável, superando as expectativas dos clientes e
                valorizando a equipe e os parceiros em cada etapa.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-100 p-8">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-600">
                Direção
              </p>
              <h3 className="font-display mt-4 text-2xl leading-[1.15] text-ink-950">
                Visão
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Ser referência em qualidade e confiança na nossa região, com
                projetos que melhoram a vida das pessoas e o entorno onde
                estão.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ink-950 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Nossos valores"
            title="O que orienta cada decisão"
            description="Quatro princípios que valem para todos na Evoluc, em qualquer obra."
            light
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-white/70">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-display text-xl leading-[1.2] text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <PortalTeaser />
    </>
  );
}
