export type McmvFaixa = {
  id: 1 | 2 | 3 | 4;
  label: string;
  rendaMax: number;
  annualRate: number;
  subsidyMax: number;
};

// Faixas do Minha Casa, Minha Vida (referência 2026). Valores de teto de
// renda, juros e subsídio são estimativas com base nas regras públicas do
// programa e variam por região e análise de crédito — confirme sempre as
// condições vigentes com a Caixa ou instituição financeira.
export const mcmvFaixas: McmvFaixa[] = [
  { id: 1, label: "Faixa 1", rendaMax: 3200, annualRate: 4.5, subsidyMax: 55000 },
  { id: 2, label: "Faixa 2", rendaMax: 5000, annualRate: 5.5, subsidyMax: 32000 },
  { id: 3, label: "Faixa 3", rendaMax: 9600, annualRate: 7.9, subsidyMax: 0 },
  { id: 4, label: "Faixa 4 — Classe Média", rendaMax: 12000, annualRate: 10, subsidyMax: 0 },
];

export function getFaixa(rendaMensal: number): McmvFaixa {
  return (
    mcmvFaixas.find((f) => rendaMensal <= f.rendaMax) ??
    mcmvFaixas[mcmvFaixas.length - 1]
  );
}

// Subsídio decresce de forma proporcional dentro de cada faixa: quanto mais
// próximo do teto de renda da faixa, menor o subsídio estimado.
export function estimateSubsidy(rendaMensal: number, faixa: McmvFaixa): number {
  if (faixa.subsidyMax === 0) return 0;
  const faixaIndex = mcmvFaixas.findIndex((f) => f.id === faixa.id);
  const rendaMin = faixaIndex === 0 ? 0 : mcmvFaixas[faixaIndex - 1].rendaMax;
  const span = faixa.rendaMax - rendaMin;
  const position = Math.min(1, Math.max(0, (rendaMensal - rendaMin) / span));
  return Math.round(faixa.subsidyMax * (1 - position * 0.7));
}
