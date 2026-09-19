"use client";

import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Download,
  LogOut,
  MessageCircle,
  Search,
  Users,
  CalendarDays,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { Lead } from "@/lib/leads-store";

const POLL_MS = 10_000;
const DAY_MS = 86_400_000;

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "unconfigured" }
  | { status: "ready"; leads: Lead[]; updatedAt: Date };

function currency(n: number) {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

function formatPhone(digits: string) {
  const d = digits.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return digits;
}

function timeAgo(iso: string, now: number) {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "agora";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} h`;
  const d = Math.floor(h / 24);
  return `há ${d} ${d === 1 ? "dia" : "dias"}`;
}

const INCOME_BUCKETS = [
  { label: "Até R$ 3 mil", max: 3000 },
  { label: "R$ 3–5 mil", max: 5000 },
  { label: "R$ 5–8 mil", max: 8000 },
  { label: "R$ 8–12 mil", max: 12000 },
  { label: "Acima de R$ 12 mil", max: Infinity },
];

function countBy<T>(items: T[], key: (item: T) => string) {
  const map = new Map<string, number>();
  for (const item of items) {
    const k = key(item);
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-ink-100 bg-white p-5 shadow-sm ${className}`}
    >
      <h2 className="text-sm font-semibold text-ink-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Empty() {
  return <p className="py-6 text-center text-sm text-ink-400">Sem dados ainda</p>;
}

function HBars({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <Empty />;
  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.label}>
          <div className="flex justify-between text-xs">
            <span className="truncate pr-2 text-ink-600">{d.label}</span>
            <span className="font-semibold text-ink-900">
              {d.value}{" "}
              <span className="font-normal text-ink-400">
                ({Math.round((d.value / total) * 100)}%)
              </span>
            </span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full bg-copper-600 transition-all duration-500"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

const DONUT_COLORS = ["#f37021", "#1d3a56", "#c9d3dd"];

function Donut({ data }: { data: { label: string; value: number }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <Empty />;
  const r = 40;
  const c = 2 * Math.PI * r;
  const offsets = data.map((_, i) =>
    data.slice(0, i).reduce((sum, d) => sum + (d.value / total) * c, 0)
  );
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#eef1f4" strokeWidth="16" />
        {data.map((d, i) => {
          const len = (d.value / total) * c;
          return (
            <circle
              key={d.label}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
              strokeWidth="16"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offsets[i]}
            />
          );
        })}
      </svg>
      <ul className="space-y-2 text-xs">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }}
            />
            <span className="text-ink-600">{d.label}</span>
            <span className="font-semibold text-ink-900">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DailyBars({ leads, now }: { leads: Lead[]; now: number }) {
  const days = useMemo(() => {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const list = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(start.getTime() - (13 - i) * DAY_MS);
      return { date: d, value: 0 };
    });
    for (const l of leads) {
      const t = new Date(l.createdAt).getTime();
      const idx = 13 - Math.floor((start.getTime() + DAY_MS - 1 - t) / DAY_MS);
      if (idx >= 0 && idx < 14) list[idx].value++;
    }
    return list;
  }, [leads, now]);
  const max = Math.max(1, ...days.map((d) => d.value));
  return (
    <div>
      <div className="flex h-40 items-end gap-1.5">
        {days.map((d) => (
          <div
            key={d.date.toISOString()}
            className="group relative flex h-full flex-1 flex-col justify-end"
          >
            <span className="mb-1 text-center text-[10px] font-semibold text-ink-600">
              {d.value > 0 ? d.value : ""}
            </span>
            <div
              className="w-full rounded-t bg-copper-600 transition-all duration-500"
              style={{ height: `${Math.max(2, (d.value / max) * 100)}%`, opacity: d.value ? 1 : 0.2 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5">
        {days.map((d) => (
          <span key={d.date.toISOString()} className="flex-1 text-center text-[9px] text-ink-400">
            {d.date.getDate()}/{d.date.getMonth() + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

function toCsv(leads: Lead[]) {
  const header = [
    "Data",
    "Nome",
    "E-mail",
    "Telefone",
    "Origem",
    "Empreendimento",
    "Primeiro imóvel",
    "Renda",
    "FGTS",
    "Mensagem",
  ];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    [
      new Date(l.createdAt).toLocaleString("pt-BR"),
      l.nome,
      l.email,
      l.telefone,
      l.origem,
      l.empreendimento,
      l.primeiroImovel,
      l.rendaMensal,
      l.temFgts,
      l.mensagem,
    ]
      .map(esc)
      .join(";")
  );
  return "﻿" + [header.map(esc).join(";"), ...rows].join("\n");
}

export default function LeadsDashboard() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [now, setNow] = useState(() => Date.now());
  const [query, setQuery] = useState("");
  const seen = useRef<Set<string>>(new Set());
  const [fresh, setFresh] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (res.status === 401) {
        window.location.reload();
        return;
      }
      const json = await res.json();
      if (!json.ok) {
        setState((s) => (s.status === "ready" ? s : { status: "error" }));
        return;
      }
      if (!json.configured) {
        setState({ status: "unconfigured" });
        return;
      }
      const leads = json.leads as Lead[];
      setNow(Date.now());
      setState({ status: "ready", leads, updatedAt: new Date() });
      if (seen.current.size > 0) {
        const added = leads.filter((l) => !seen.current.has(l.id)).map((l) => l.id);
        if (added.length) {
          setFresh((f) => new Set([...f, ...added]));
          setTimeout(
            () =>
              setFresh((f) => {
                const next = new Set(f);
                added.forEach((id) => next.delete(id));
                return next;
              }),
            15_000
          );
        }
      }
      seen.current = new Set(leads.map((l) => l.id));
    } catch {
      setState((s) => (s.status === "ready" ? s : { status: "error" }));
    }
  }, []);

  useEffect(() => {
    const first = setTimeout(load, 0);
    const id = setInterval(load, POLL_MS);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [load]);

  const leads = useMemo(
    () => (state.status === "ready" ? state.leads : []),
    [state]
  );

  const stats = useMemo(() => {
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const today = leads.filter(
      (l) => new Date(l.createdAt).getTime() >= startOfToday.getTime()
    ).length;
    const week = leads.filter(
      (l) => new Date(l.createdAt).getTime() >= now - 7 * DAY_MS
    ).length;
    const incomes = leads
      .map((l) => l.rendaMensal)
      .filter((v): v is number => typeof v === "number" && v > 0);
    const avgIncome = incomes.length
      ? incomes.reduce((s, v) => s + v, 0) / incomes.length
      : 0;
    const fgtsInfo = leads.filter((l) => l.temFgts);
    const fgtsPct = fgtsInfo.length
      ? Math.round(
          (fgtsInfo.filter((l) => l.temFgts === "Sim").length / fgtsInfo.length) * 100
        )
      : 0;

    const origem = countBy(leads, (l) => l.origem || "Site");
    const emp = countBy(
      leads.filter((l) => l.empreendimento),
      (l) => l.empreendimento!.replace(/ — Mega Feirão da Casa Própria$/, "")
    );
    const primeiro = countBy(leads, (l) => l.primeiroImovel || "Não informado");
    const fgts = countBy(leads, (l) => l.temFgts || "Não informado");
    const renda = INCOME_BUCKETS.map((b, i) => {
      const min = i === 0 ? 0 : INCOME_BUCKETS[i - 1].max;
      return {
        label: b.label,
        value: incomes.filter((v) => v > min && v <= b.max).length,
      };
    });
    return { today, week, avgIncome, fgtsPct, origem, emp, primeiro, fgts, renda, incomeCount: incomes.length };
  }, [leads, now]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.nome, l.email, l.telefone, l.origem, l.empreendimento]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [leads, query]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  function downloadCsv() {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-evoluc-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-ink-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/brand/logo.webp"
              alt="Evoluc"
              width={271}
              height={72}
              className="h-8 w-auto"
            />
            <span className="hidden text-sm font-semibold text-ink-900 sm:inline">
              Central de Leads
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-500">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="hidden sm:inline">Ao vivo</span>
              {state.status === "ready" && (
                <span className="hidden md:inline">
                  · atualizado {state.updatedAt.toLocaleTimeString("pt-BR")}
                </span>
              )}
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-1 rounded-full border border-ink-200 px-3 py-1.5 font-semibold text-ink-700 hover:bg-ink-50"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {state.status === "loading" && (
          <p className="py-20 text-center text-sm text-ink-500">Carregando leads...</p>
        )}
        {state.status === "error" && (
          <p className="py-20 text-center text-sm text-red-600">
            Não foi possível carregar os leads. Tentando novamente...
          </p>
        )}
        {state.status === "unconfigured" && (
          <div className="mx-auto max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
            <h2 className="font-display text-base font-bold">
              Banco de leads ainda não conectado
            </h2>
            <p className="mt-2">
              Para guardar e exibir os leads aqui, conecte um banco Redis (Upstash)
              ao projeto no Vercel: <strong>Storage → Create Database → Upstash
              Redis</strong>. As variáveis são criadas automaticamente; depois é só
              fazer um novo deploy. Enquanto isso, os leads continuam indo para o
              CV CRM normalmente.
            </p>
          </div>
        )}

        {state.status === "ready" && (
          <>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { icon: Users, label: "Total de leads", value: leads.length },
                { icon: CalendarDays, label: "Hoje", value: stats.today },
                { icon: TrendingUp, label: "Últimos 7 dias", value: stats.week },
                {
                  icon: Wallet,
                  label: "Renda média informada",
                  value: stats.avgIncome ? currency(stats.avgIncome) : "—",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-ink-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-copper-50 text-copper-600">
                    <Icon size={18} />
                  </div>
                  <p className="font-display mt-3 text-2xl font-black text-ink-900">
                    {value}
                  </p>
                  <p className="text-xs text-ink-500">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <Card title="Leads por dia (últimos 14 dias)" className="lg:col-span-2">
                <DailyBars leads={leads} now={now} />
              </Card>
              <Card title="Primeiro imóvel?">
                <Donut data={stats.primeiro} />
              </Card>
              <Card title="De onde vêm os leads">
                <HBars data={stats.origem} />
              </Card>
              <Card title={`Faixa de renda (${stats.incomeCount} informaram)`}>
                <HBars data={stats.renda} />
              </Card>
              <Card
                title={`Possui FGTS${stats.fgtsPct ? ` — ${stats.fgtsPct}% sim` : ""}`}
              >
                <Donut data={stats.fgts} />
              </Card>
              <Card title="Interesse por empreendimento" className="lg:col-span-3">
                <HBars data={stats.emp} />
              </Card>
            </div>

            <section className="mt-4 rounded-2xl border border-ink-100 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 p-4">
                <h2 className="text-sm font-semibold text-ink-900">
                  Todos os leads ({filtered.length})
                </h2>
                <div className="flex items-center gap-2">
                  <label className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
                    />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Buscar nome, e-mail, telefone..."
                      className="w-56 rounded-full border border-ink-200 py-1.5 pl-8 pr-3 text-xs focus:border-copper-500 focus:outline-none sm:w-72"
                    />
                  </label>
                  <button
                    onClick={downloadCsv}
                    className="flex items-center gap-1 rounded-full bg-ink-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-800"
                  >
                    <Download size={13} /> CSV
                  </button>
                </div>
              </div>

              {filtered.length === 0 ? (
                <p className="p-10 text-center text-sm text-ink-400">
                  {leads.length === 0
                    ? "Nenhum lead recebido ainda. Assim que alguém se cadastrar, aparece aqui."
                    : "Nenhum lead encontrado para essa busca."}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-xs">
                    <thead className="bg-ink-50 text-ink-500">
                      <tr>
                        {["Quando", "Nome", "Contato", "Origem", "Perfil"].map((h) => (
                          <th key={h} className="px-4 py-2.5 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-100">
                      {filtered.slice(0, 300).map((l) => (
                        <tr
                          key={l.id}
                          className={
                            fresh.has(l.id)
                              ? "bg-emerald-50 transition-colors"
                              : "hover:bg-ink-50/60"
                          }
                        >
                          <td className="whitespace-nowrap px-4 py-3 text-ink-500">
                            <span className="block font-semibold text-ink-800">
                              {timeAgo(l.createdAt, now)}
                            </span>
                            {new Date(l.createdAt).toLocaleString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="px-4 py-3 font-semibold text-ink-900">
                            {l.nome}
                            {fresh.has(l.id) && (
                              <span className="ml-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                NOVO
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-ink-600">
                            <span className="block">{l.email}</span>
                            <a
                              href={`https://wa.me/55${l.telefone.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:underline"
                            >
                              <MessageCircle size={12} />
                              {formatPhone(l.telefone)}
                            </a>
                          </td>
                          <td className="px-4 py-3 text-ink-600">
                            <span className="block font-semibold text-ink-800">{l.origem}</span>
                            {l.empreendimento?.replace(/ — Mega Feirão da Casa Própria$/, "")}
                          </td>
                          <td className="px-4 py-3 text-ink-600">
                            {l.rendaMensal ? <span className="block">Renda {currency(l.rendaMensal)}</span> : null}
                            {l.temFgts ? <span className="block">FGTS: {l.temFgts}</span> : null}
                            {l.primeiroImovel ? <span className="block">1º imóvel: {l.primeiroImovel}</span> : null}
                            {l.mensagem ? (
                              <span className="block max-w-xs truncate text-ink-400" title={l.mensagem}>
                                “{l.mensagem}”
                              </span>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
      <footer
        className="mt-10 flex flex-col items-center gap-3 px-4 py-8"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #1f5a3a 0%, #0c2c1d 55%, #04140d 100%)",
        }}
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">
          Desenvolvido por
        </span>
        <Image
          src="/images/brand/dom-logo.webp"
          alt="DOM Partner Growth"
          width={1000}
          height={404}
          className="h-auto w-24"
        />
      </footer>
    </div>
  );
}
