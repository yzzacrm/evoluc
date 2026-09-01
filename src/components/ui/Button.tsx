import { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const variants: Record<string, string> = {
  primary:
    "bg-copper-600 text-white hover:bg-copper-700 shadow-sm shadow-copper-900/10",
  secondary:
    "bg-ink-900 text-white hover:bg-ink-800",
  ghost:
    "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur",
};

const sizes: Record<string, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-3",
  lg: "text-base px-7 py-4",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2";

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
