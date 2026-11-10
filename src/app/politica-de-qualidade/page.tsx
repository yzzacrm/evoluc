import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Qualidade",
  description:
    "Conheça os compromissos de qualidade construtiva da Evoluc, certificada pelo PBQP-H.",
};

const commitments = [
  "Cumprir requisitos legais, normativos e contratuais aplicáveis a cada empreendimento.",
  "Manter processos construtivos padronizados e auditados dentro do PBQP-H.",
  "Buscar melhoria contínua em projeto, execução de obra e atendimento ao cliente.",
  "Garantir rastreabilidade de materiais e fornecedores em todas as etapas da construção.",
  "Oferecer canal de comunicação direto durante a obra e no período de garantia pós-entrega.",
  "Capacitar continuamente equipes próprias e parceiras sobre segurança e qualidade.",
];

export default function PoliticaDeQualidadePage() {
  return (
    <>
      <PageHeader
        eyebrow="Compromisso"
        title="Política de Qualidade"
        description="Nosso padrão de qualidade construtiva segue as diretrizes do PBQP-H e vale para todas as fases de cada empreendimento, do projeto à entrega."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-base leading-relaxed text-ink-600">
              A Evoluc tem como compromisso entregar empreendimentos
              seguros, duráveis e alinhados às expectativas de qualidade dos
              seus clientes. Para isso, mantemos processos construtivos
              avaliados dentro do Programa Brasileiro de Qualidade e
              Produtividade do Habitat (PBQP-H), referência nacional em
              padronização da construção civil.
            </p>

            <ul className="mt-10 space-y-4">
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-ink-400"
                    size={20}
                  />
                  <span className="text-sm leading-relaxed text-ink-600">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-2xl border border-ink-100 p-6 text-sm text-ink-500">
              Documentos e certificados completos podem ser solicitados pela
              página{" "}
              <a href="/fale-conosco" className="border-b border-ink-950/20 pb-0.5 font-medium text-ink-950 hover:border-ink-950">
                Fale com a Evoluc
              </a>
              .
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
