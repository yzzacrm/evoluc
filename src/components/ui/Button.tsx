import { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type BaseProps = {
  children: ReactNode;
  // primary: azul da marca, cheio (fundo claro)
  // secondary: contorno fino azul (fundo claro)
  // light: branco cheio (fundo escuro ou foto)
  // ghost: contorno fino branco (fundo escuro ou foto)
  variant?: "primary" | "secondary" | "light" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const variants: Record<string, string> = {
  primary: "bg-ink-950 text-white hover:bg-ink-800",
  secondary:
    "border border-ink-950/25 text-ink-950 hover:border-ink-950 hover:bg-ink-950/[0.03]",
  light: "bg-white text-ink-950 hover:bg-sand-100",
  ghost:
    "border border-white/60 bg-black/15 text-white backdrop-blur-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.6)] hover:border-white hover:bg-black/25",
};

const sizes: Record<string, string> = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-sm px-8 py-4",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-400 focus-visible:ring-offset-2";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...rest
}: BaseProps & { href?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = clsx(base, variants[variant], sizes[size], className);
  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={cls}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
