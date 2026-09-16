import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, LandPlot, Car, Home, BadgeCheck, Sparkles } from "lucide-react";
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
          ? "border-copper-300 ring-1 ring-copper-200"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />
        {dev.promoBadge && (
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-copper-600 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-lg rotate-3">
            <Sparkles size={12} />
            {dev.promoBadge}
          </span>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {featured && (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-copper-700">
              Destaque
            </span>
          )}
          <span className="rounded-full bg-copper-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {statusLabel[dev.status]}
          </span>
          {dev.soldOut && (
            <span className="flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
              <BadgeCheck size={12} />
              100% vendido
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-copper-600">
          {dev.neighborhood} — {dev.city}
        </p>
        <h3 className="font-display mt-2 text-xl font-bold text-ink-900">
          {dev.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          {dev.tagline}
        </p>

        {(dev.landArea !== "—" || dev.typologies !== "—" || dev.parkingSpots > 0) && (
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-ink-100 pt-5 text-xs text-ink-500">
            {dev.landArea !== "—" && (
              <div className="flex flex-col items-start gap-1">
                <LandPlot size={16} className="text-copper-600" />
                {dev.landArea}
              </div>
            )}
            {dev.typologies !== "—" && (
              <div className="flex flex-col items-start gap-1">
                <Home size={16} className="text-copper-600" />
                {dev.typologies}
              </div>
            )}
            {dev.parkingSpots > 0 && (
              <div className="flex flex-col items-start gap-1">
                <Car size={16} className="text-copper-600" />
                {dev.parkingSpots} vagas
              </div>
            )}
          </div>
        )}

        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink-900 transition-colors group-hover:text-copper-600">
          Confira todos os detalhes
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
