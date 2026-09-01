import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PortalTeaser from "@/components/home/PortalTeaser";
import { siteConfig } from "@/lib/site-config";
import {
  ShieldCheck,
  Target,
  Eye,
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
    title: "A história do pedreiro e do terreno impossível",
    text: [
      "A Evoluc não nasceu em uma prancheta de arquitetura, mas no chão da obra, onde a poeira e o trabalho duro se encontram. Nosso fundador, o Lucas, não começou como executivo, mas como pedreiro. Ele carrega nas mãos o conhecimento que muitos só possuem no papel.",
      "O início de tudo foi um terreno abandonado, com um grave problema de documentação — um risco que nenhuma empresa queria assumir. Onde todos viam um obstáculo, o Lucas viu uma oportunidade. Com uma coragem que beirava a ousadia, ele procurou o dono e fez uma proposta que mudaria seu destino: \"Eu construo dois sobrados no seu terreno. Um deles, o seu, continua com o problema que o senhor já conhece. O outro, que fica para mim, eu regularizo e deixo 100% certo.\"",
      "O dono aceitou. E nesse aperto de mão nasceu o DNA da Evoluc: a capacidade de enxergar valor no improvável e a coragem de transformar problemas em alicerces.",
    ],
  },
  {
    tag: "O nome Oberon",
    title: "A história do Residencial Oberon e a homenagem",
    text: [
      "O Residencial Oberon é um monumento à palavra dada. A negociação pelo seu terreno foi longa e árdua. Para selar a confiança com o proprietário, um homem de muita história, o Lucas fez mais do que uma promessa de negócio — fez um pacto de honra: o empreendimento levaria o sobrenome de sua família, Oberon.",
      "A vida, em sua sabedoria implacável, não permitiu que o Sr. Oberon visse a obra magnífica ser concluída — ele partiu meses antes. Mas seu legado não. Tempo depois, sua filha visitou o local, parou em frente à fachada imponente e, ao ler o nome \"Residencial Oberon\" gravado na estrutura, seus olhos se encheram de lágrimas.",
      "Ali, ela não viu um prédio. Viu a eternidade do nome de seu pai. Nesse dia, tivemos a certeza de que nosso trabalho não é sobre concreto — nós materializamos o respeito e construímos legados que o tempo não pode apagar.",
    ],
  },
  {
    tag: "Qualidade",
    title: "A história da qualidade inegociável",
    text: [
      "Nossa busca pela excelência é uma batalha diária, travada nas pequenas decisões. Em uma reunião de planejamento, a pauta era a otimização de custos: usar materiais mais simples, uma pia de inox aqui, um pouco menos de azulejo ali.",
      "Fez-se um silêncio. E foi o Léo que, com a calma e a firmeza de quem guarda os portões do reino, interrompeu a conversa: \"Não. Essa economia não está no rumo da Evoluc. O cliente que nos escolhe espera o melhor, e é o melhor que vamos entregar.\"",
      "Essa frase não foi um comando, foi um decreto — a prova de que nossa qualidade não é um argumento de marketing, mas um princípio moral, defendido todos os dias, mesmo quando ninguém está olhando.",
    ],
  },
  {
    tag: "Resiliência",
    title: "A história da superação e resiliência",
    text: [
      "No início do empreendimento Futuri, um grande sócio e amigo estava conosco. A quatro meses do início da obra, uma tragédia o levou. O choque foi profundo, a dor imensa, o futuro incerto. Seria mais fácil abandonar o projeto — mas a Evoluc não foi forjada no caminho mais fácil.",
      "Após o luto, uma decisão foi tomada: \"o projeto segue\". Procuramos os filhos dele e, mesmo abalados, eles viram em nós a solidez da palavra de seu pai. Confiaram. E juntos, levamos o sonho adiante e entregamos a obra.",
      "Esta história é a prova de que nossa estrutura mais forte não é de concreto armado. É a resiliência — a certeza de que, não importa a tempestade, honramos nossos compromissos e sempre entregamos o que prometemos.",
    ],
  },
];

const values = [
  {
    icon: Award,
    title: "Qualidade Inegociável",
    text: "Não abrimos mão da excelência. Do projeto ao acabamento, buscamos o melhor, pois estamos construindo o maior sonho dos nossos clientes.",
  },
  {
    icon: Zap,
    title: "Coragem para Realizar",
    text: "Enfrentamos o improvável. Onde outros veem problemas, nós vemos oportunidades para inovar e superar desafios.",
  },
  {
    icon: HeartHandshake,
    title: "Parceria de Confiança",
    text: "Construímos relações sólidas e transparentes com clientes, colaboradores e investidores. Jogamos juntos, do início ao fim.",
  },
  {
    icon: Users,
    title: "Legado Humano",
    text: "Não erguemos apenas paredes, construímos histórias. Honramos nosso passado e as pessoas que fazem parte da nossa jornada.",
  },
];

export default function QuemSomosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quem somos"
        title={`Desde ${siteConfig.founded} construindo mais do que imóveis`}
        description="A Evoluc é uma construtora e incorporadora paulistana fundada por Léo e Lucas — engenharia de alta performance com propósito humano."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base leading-relaxed text-ink-600">
                Desde 2012 a Evoluc vem construindo uma história de
                sucesso, com foco em entregar sempre o melhor aos seus
                clientes e crescendo pela competência e dedicação de seus
                colaboradores.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-600">
                Nosso objetivo é levar à sociedade ao nosso entorno
                experiências de conforto, estética e segurança com nossos
                empreendimentos — do primeiro contato comercial até muito
                depois da entrega das chaves.
              </p>
              <p className="mt-4 font-display text-lg font-semibold italic text-ink-900">
                &ldquo;Evoluc. A engenharia que constrói seu futuro.&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-ink-100 bg-ink-50 p-4">
                <ShieldCheck className="shrink-0 text-copper-600" size={24} />
                <p className="text-sm text-ink-600">
                  Processos construtivos avaliados dentro do{" "}
                  <strong>PBQP-H</strong> — Programa Brasileiro de Qualidade e
                  Produtividade do Habitat.
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
            eyebrow="As histórias fundadoras"
            title="Um relatório não. Um espelho."
            description="O que você vai ler não são estudos de caso — são as histórias reais por trás de cada decisão que tomamos e cada obra que erguemos."
          />
          <div className="mt-14 space-y-14">
            {founderStories.map((story) => (
              <div
                key={story.title}
                className="rounded-2xl border border-ink-100 bg-white p-8 sm:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-copper-600">
                  {story.tag}
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold text-ink-900">
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
              <Target className="text-copper-600" size={28} />
              <h3 className="font-display mt-4 text-xl font-bold text-ink-900">
                Nossa Missão
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Entregar empreendimentos com engenharia de alta performance e
                qualidade inegociável, superando as expectativas dos clientes
                e valorizando nosso time e parceiros em cada etapa do
                processo.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-100 p-8">
              <Eye className="text-copper-600" size={28} />
              <h3 className="font-display mt-4 text-xl font-bold text-ink-900">
                Nossa Visão
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Ser a construtora referência em qualidade e confiança em
                nossa região, reconhecida por criar projetos que evoluem a
                vida das pessoas e o ambiente ao nosso redor.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ink-950 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Nossos valores"
            title="As leis que regem nosso comportamento"
            description="São inegociáveis."
            light
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-copper-600/20 text-copper-400">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-300">
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
