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
    return <div className="h-[68px]" aria-hidden />;
  }

  if (secondsLeft === 0) {
    return (
      <p className="text-lg font-bold text-copper-400">
        O Mega Feirão da Casa Própria começou!
      </p>
    );
  }

  const timeLeft = {
    dias: Math.floor(secondsLeft / 86400),
    horas: Math.floor((secondsLeft / 3600) % 24),
    minutos: Math.floor((secondsLeft / 60) % 60),
    segundos: secondsLeft % 60,
  };

  return (
    <div className="flex gap-3">
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="flex w-16 flex-col items-center rounded-xl bg-white/10 py-3 backdrop-blur"
        >
          <span className="font-display text-2xl font-black text-white tabular-nums">
            {String(timeLeft[key]).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-white/60">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
