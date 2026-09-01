import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a Evoluc coleta, usa e protege seus dados pessoais.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <PageHeader eyebrow="Privacidade" title="Política de Privacidade" />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-ink-600">
            <p>
              Esta página descreve, em linhas gerais, como a Evoluc
              Engenharia trata os dados pessoais coletados através deste
              site, incluindo formulários de contato, simulação de
              financiamento e acesso à Área do Morador.
            </p>

            <div>
              <h2 className="font-display text-lg font-bold text-ink-900">
                1. Dados coletados
              </h2>
              <p className="mt-2">
                Coletamos dados fornecidos voluntariamente em formulários
                (nome, e-mail, telefone e mensagem) e dados de navegação
                (estatísticas de acesso) para melhorar a experiência no
                site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold text-ink-900">
                2. Uso das informações
              </h2>
              <p className="mt-2">
                As informações são utilizadas para responder solicitações
                comerciais, dar andamento a simulações de financiamento e,
                no caso de clientes com unidade adquirida, viabilizar o
                acesso à Área do Morador.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold text-ink-900">
                3. Compartilhamento
              </h2>
              <p className="mt-2">
                Não vendemos dados pessoais a terceiros. Informações podem
                ser compartilhadas com instituições financeiras parceiras
                exclusivamente para fins de análise de crédito, mediante
                autorização do titular.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold text-ink-900">
                4. Seus direitos
              </h2>
              <p className="mt-2">
                Você pode solicitar a qualquer momento a atualização ou
                exclusão dos seus dados através do e-mail{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-copper-600"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>

            <p className="text-xs text-ink-400">
              Este texto é um modelo de estrutura e deve ser revisado por um
              profissional jurídico antes da publicação definitiva, para
              garantir conformidade plena com a LGPD (Lei 13.709/2018).
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
