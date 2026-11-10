import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, LandPlot, Car, Home, BadgeCheck } from "lucide-react";
import { Development } from "@/lib/data";

const statusLabel: Record<Development["status"], string> = {
  lancamento: "Lançamento",
  "em-obras": "Em obras",
  entregue: "Entregue",
};

export default function DevelopmentCard({
  dev,
  featured = false,
}: {
  dev: Development;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/empreendimentos/${dev.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
        featured
          ? "border-ink-200"
          : "border-ink-100"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-ink-900 ${
          featured ? "h-64" : "h-56"
        }`}
      >
        {dev.heroImage && (
          <Image
            src={dev.heroImage}
            alt={dev.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        )}
        {dev.promoBadge && (
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-950 backdrop-blur">
            {dev.promoBadge}
          </span>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {featured && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-950 backdrop-blur">
              Destaque
            </span>
          )}
          <span className="rounded-full bg-ink-950/60 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white backdrop-blur">
            {statusLabel[dev.status]}
          </span>
          {dev.soldOut && (
            <span className="flex items-center gap-1 rounded-full bg-ink-950/60 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white backdrop-blur">
              <BadgeCheck size={12} />
              100% vendido
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-600">
          {dev.neighborhood} · {dev.city}
        </p>
        <h3 className="font-serif-display mt-3 text-2xl leading-[1.1] text-ink-950">
          {dev.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          {dev.tagline}
        </p>

        {(dev.landArea !== "—" || dev.typologies !== "—" || dev.parkingSpots > 0) && (
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-ink-100 pt-5 text-xs text-ink-500">
            {dev.landArea !== "—" && (
              <div className="flex flex-col items-start gap-1">
                <LandPlot size={16} className="text-ink-400" />
                {dev.landArea}
              </div>
            )}
            {dev.typologies !== "—" && (
              <div className="flex flex-col items-start gap-1">
                <Home size={16} className="text-ink-400" />
                {dev.typologies}
              </div>
            )}
            {dev.parkingSpots > 0 && (
              <div className="flex flex-col items-start gap-1">
                <Car size={16} className="text-ink-400" />
                {dev.parkingSpots} vagas
              </div>
            )}
          </div>
        )}

        <span className="mt-6 inline-flex items-center gap-1 self-start border-b border-ink-950/20 pb-1 text-sm font-medium text-ink-950 transition-colors group-hover:border-ink-950">
          Ver o empreendimento
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
