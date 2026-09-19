// Armazenamento de leads em Redis (Upstash) via API REST — sem dependências.
// Aceita as variáveis criadas pelo Vercel Marketplace (KV_REST_API_*) ou
// pelo Upstash direto (UPSTASH_REDIS_REST_*).

export type Lead = {
  id: string;
  createdAt: string;
  nome: string;
  email: string;
  telefone: string;
  origem: string;
  empreendimento?: string;
  primeiroImovel?: string;
  rendaMensal?: number;
  temFgts?: string;
  mensagem?: string;
};

const KEY = "evoluc:leads";

function config() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

export function isStoreConfigured() {
  return config() !== null;
}

async function redis(command: unknown[]) {
  const cfg = config();
  if (!cfg) throw new Error("Banco de leads não configurado");
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis respondeu ${res.status}`);
  const json = (await res.json()) as { result: unknown; error?: string };
  if (json.error) throw new Error(json.error);
  return json.result;
}

export async function saveLead(lead: Omit<Lead, "id" | "createdAt">) {
  const full: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await redis(["LPUSH", KEY, JSON.stringify(full)]);
  return full;
}

export async function listLeads(limit = 2000): Promise<Lead[]> {
  const raw = (await redis(["LRANGE", KEY, 0, limit - 1])) as string[];
  return raw
    .map((item) => {
      try {
        return JSON.parse(item) as Lead;
      } catch {
        return null;
      }
    })
    .filter((l): l is Lead => l !== null);
}
