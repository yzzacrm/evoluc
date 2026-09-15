"use client";

import { useSyncExternalStore } from "react";

const UNITS = [
  { key: "dias", label: "Dias" },
  { key: "horas", label: "Horas" },
  { key: "minutos", label: "Min" },
  { key: "segundos", label: "Seg" },
] as const;

function subscribeToClock(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

const NOT_MOUNTED = -1;

function useSecondsLeft(target: Date) {
  return useSyncExternalStore(
    subscribeToClock,
    () => Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000)),
    () => NOT_MOUNTED
  );
}

export default function Countdown({ target }: { target: Date }) {
  const secondsLeft = useSecondsLeft(target);

  if (secondsLeft === NOT_MOUNTED) {
    return <div className="h-14 w-56" aria-hidden />;
  }

  if (secondsLeft === 0) {
    return (
      <div className="rounded-xl bg-copper-600 px-4 py-3 shadow-lg">
        <p className="text-sm font-bold text-white">
          O Mega Feirão da Casa Própria começou!
        </p>
      </div>
    );
  }

  const timeLeft = {
    dias: Math.floor(secondsLeft / 86400),
    horas: Math.floor((secondsLeft / 3600) % 24),
    minutos: Math.floor((secondsLeft / 60) % 60),
    segundos: secondsLeft % 60,
  };

  return (
    <div className="inline-flex items-stretch divide-x divide-white/25 rounded-xl bg-copper-600 shadow-lg">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="flex w-14 flex-col items-center py-2.5">
          <span className="font-display text-xl font-black text-white tabular-nums">
            {String(timeLeft[key]).padStart(2, "0")}
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-wide text-white/80">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
