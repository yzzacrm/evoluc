export type LeadSubmission = {
  nome: string;
  email: string;
  telefone: string;
  origem: string;
  empreendimento?: string;
  primeiroImovel?: string;
  cpf?: string;
  rendaMensal?: string;
  temFgts?: string;
  saldoFgts?: string;
  mensagem?: string;
};

export async function submitLead(
  data: LeadSubmission
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return { success: false };
  }
}
