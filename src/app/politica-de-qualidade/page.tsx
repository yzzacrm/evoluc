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
        description="Nosso padrão de qualidade construtiva segue diretrizes do PBQP-H e é aplicado em todas as fases dos nossos empreendimentos — do projeto à entrega."
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
                    className="mt-0.5 shrink-0 text-copper-600"
                    size={20}
                  />
                  <span className="text-sm leading-relaxed text-ink-600">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-2xl border border-ink-100 bg-ink-50 p-6 text-sm text-ink-500">
              Documentos e certificados completos podem ser solicitados pelo
              nosso canal de{" "}
              <a href="/fale-conosco" className="font-semibold text-copper-600">
                Fale Conosco
              </a>
              .
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
