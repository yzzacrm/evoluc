"use client";

import { FormEvent, useMemo, useState } from "react";
import { Lock, Loader2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getFaixa } from "@/lib/mcmv";
import { getWhatsappUrl } from "@/lib/site-config";
import { submitLead } from "@/lib/submit-lead";

const INCOME_COMMITMENT = 0.3; // regra do Banco Central/Caixa: até 30% da renda bruta
// Imóvel na planta: valor de venda fica abaixo da avaliação, por isso o
// banco financia até 90% (contra os 80% usuais de imóvel pronto).
const MAX_LOAN_TO_VALUE = 0.9;
const DOWN_PAYMENT_INSTALLMENTS = 27;

type Stage = "idle" | "form" | "unlocked";

function currency(n: number) {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export default function FinancingSimulator() {
  const [income, setIncome] = useState(4000);
  const [propertyValue, setPropertyValue] = useState(350000);
  const [useFgts, setUseFgts] = useState(false);
  const [fgtsAmount, setFgtsAmount] = useState(15000);
  const [years, setYears] = useState(30);

  const [stage, setStage] = useState<Stage>("idle");
  const [submitting, setSubmitting] = useState(false);

  const result = useMemo(() => {
    const faixa = getFaixa(income);
    const monthlyRate = Math.pow(1 + faixa.annualRate / 100, 1 / 12) - 1;
    const months = years * 12;

    // Capacidade máxima de pagamento: até 30% da renda familiar bruta.
    const maxInstallment = income * INCOME_COMMITMENT;

    // Valor financiável = valor presente (Tabela Price) da parcela máxima.
    const maxFinanceable =
      monthlyRate > 0
        ? (maxInstallment * (1 - Math.pow(1 + monthlyRate, -months))) /
          monthlyRate
        : maxInstallment * months;

    const fgts = useFgts ? Math.min(fgtsAmount, propertyValue) : 0;

    // O financiamento nunca passa: da capacidade de pagamento, do limite de
    // 90% do valor do imóvel (imóvel na planta) nem do que falta após o FGTS.
    const financing = Math.min(
      maxFinanceable,
      propertyValue * MAX_LOAN_TO_VALUE,
      Math.max(0, propertyValue - fgts)
    );

    // Entrada = valor do imóvel - financiamento - FGTS.
    const downPayment = Math.max(0, propertyValue - financing - fgts);
    const downPaymentInstallment =
      downPayment > 0 ? downPayment / DOWN_PAYMENT_INSTALLMENTS : 0;

    const installment =
      monthlyRate > 0
        ? (financing * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
        : financing / months;

    return {
      faixa,
      fgts,
      financing,
      downPayment,
      downPaymentInstallment,
      installment,
    };
  }, [income, propertyValue, useFgts, fgtsAmount, years]);

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    await submitLead({
      nome: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      telefone: String(data.get("phone") ?? ""),
      origem: "Simulador de financiamento",
      rendaMensal: currency(income),
      temFgts: useFgts ? "Sim" : "Não",
      saldoFgts: useFgts ? currency(fgtsAmount) : undefined,
      mensagem: `Simulou imóvel de ${currency(propertyValue)} em ${years} anos`,
    });
    // O resultado é liberado mesmo se o envio falhar, para não travar o usuário.
    setSubmitting(false);
    setStage("unlocked");
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-8">
        <SliderField
          label="Renda mensal familiar"
          value={income}
          onChange={setIncome}
          min={1200}
          max={12000}
          step={100}
          format={currency}
        />
        <SliderField
          label="Valor do imóvel"
          value={propertyValue}
          onChange={setPropertyValue}
          min={100000}
          max={500000}
          step={5000}
          format={currency}
        />

        <div className="rounded-xl border border-ink-100 p-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={useFgts}
              onChange={(e) => setUseFgts(e.target.checked)}
              className="h-4 w-4 accent-copper-600"
            />
            <span className="text-sm font-semibold text-ink-900">
              Usar saldo do FGTS como entrada
            </span>
          </label>
          {useFgts && (
            <div className="mt-4">
              <SliderField
                label="Saldo disponível do FGTS"
                value={fgtsAmount}
                onChange={setFgtsAmount}
                min={0}
                max={80000}
                step={1000}
                format={currency}
              />
            </div>
          )}
        </div>

        <SliderField
          label="Prazo do financiamento"
          value={years}
          onChange={setYears}
          min={5}
          max={35}
          step={1}
          format={(n) => `${n} anos`}
        />
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-28 overflow-hidden rounded-2xl bg-ink-950 text-white">
          {stage === "unlocked" ? (
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-copper-400">
                {result.faixa.label} do MCMV
              </p>
              <p className="mt-1 text-xs text-ink-400">
                Taxa de juros estimada: {result.faixa.annualRate.toFixed(2)}%
                a.a.
              </p>

              <p className="mt-5 text-sm text-ink-400">
                Você pode financiar até
              </p>
              <p className="font-display text-2xl font-bold">
                {currency(result.financing)}
              </p>

              <div className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm">
                {result.fgts > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-ink-400">FGTS usado na entrada</span>
                    <span className="font-semibold">
                      {currency(result.fgts)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-ink-400">Entrada</span>
                  <span className="font-semibold text-copper-400">
                    {currency(result.downPayment)}
                  </span>
                </div>
                {result.downPayment > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-ink-400">
                      Entrada em até {DOWN_PAYMENT_INSTALLMENTS}x de
                    </span>
                    <span className="font-semibold">
                      {currency(result.downPaymentInstallment)}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-xs text-ink-400">Parcela mensal do financiamento</p>
                <p className="font-display text-lg font-bold text-copper-400">
                  {currency(result.installment)}
                </p>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-ink-400">
                Financiamento calculado com base em até 30% da renda familiar
                bruta (regra do Banco Central/Caixa) pela Tabela Price.
                Entrada parcelada diretamente com a Evoluc, em até{" "}
                {DOWN_PAYMENT_INSTALLMENTS}x. Faixa e taxa de juros variam por
                região e análise de crédito — confirme as condições vigentes
                com a Caixa ou nosso time comercial. Não constitui aprovação
                de crédito.
              </p>

              <Button
                href={getWhatsappUrl(
                  `Olá! Simulei um financiamento na Evoluc (${result.faixa.label}, até ${currency(
                    result.financing
                  )} financiados) e quero falar com um consultor.`
                )}
                className="mt-6 w-full"
                size="lg"
              >
                Falar com um consultor
              </Button>
            </div>
          ) : stage === "idle" ? (
            <div className="p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-copper-400">
                <Calculator size={20} />
              </div>
              <h3 className="font-display mt-4 text-lg font-bold">
                Pronto para ver o resultado?
              </h3>
              <p className="mt-2 text-sm text-ink-300">
                Ajuste a renda e o valor do imóvel ao lado e clique abaixo
                para calcular seu financiamento.
              </p>
              <Button
                size="lg"
                className="mt-6 w-full"
                onClick={() => setStage("form")}
              >
                Simular meu financiamento
              </Button>
            </div>
          ) : (
            <div className="p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-copper-400">
                <Lock size={20} />
              </div>
              <h3 className="font-display mt-4 text-lg font-bold">
                Veja quanto você pode financiar
              </h3>
              <p className="mt-2 text-sm text-ink-300">
                Preencha seus dados para liberar o resultado da sua
                simulação.
              </p>

              <form onSubmit={handleRegister} className="mt-6 space-y-3">
                <input
                  required
                  name="name"
                  placeholder="Nome completo"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-400 focus:border-copper-500 focus:outline-none"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-400 focus:border-copper-500 focus:outline-none"
                />
                <input
                  required
                  name="phone"
                  placeholder="Telefone / WhatsApp"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-400 focus:border-copper-500 focus:outline-none"
                />
                <label className="flex items-start gap-2 text-xs text-ink-400">
                  <input required type="checkbox" className="mt-0.5" />
                  Li e concordo com a{" "}
                  <a
                    href="/politica-de-privacidade"
                    className="font-semibold text-copper-400"
                  >
                    Política de Privacidade
                  </a>
                  .
                </label>
                <Button
                  size="lg"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Calculando...
                    </>
                  ) : (
                    "Ver resultado da simulação"
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-ink-900">{label}</label>
        <span className="text-sm font-semibold text-copper-600">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-100 accent-copper-600"
      />
    </div>
  );
}
