"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

// Entrada progressiva ao rolar a tela — mesmo efeito do pacote "Spa Relax"
// (fade + leve deslocamento, acionado uma vez ao entrar na viewport),
// portado para o framer-motion que o site já usa.

type RevealVariant = "up" | "left" | "scale";

const EASE = [0.22, 1, 0.36, 1] as const;

function variants(variant: RevealVariant): Variants {
  switch (variant) {
    case "left":
      return {
        hidden: { opacity: 0, x: -28 },
        shown: { opacity: 1, x: 0 },
      };
    case "scale":
      return {
        hidden: { opacity: 0, y: 18, scale: 0.97 },
        shown: { opacity: 1, y: 0, scale: 1 },
      };
    case "up":
    default:
      return {
        hidden: { opacity: 0, y: 28 },
        shown: { opacity: 1, y: 0 },
      };
  }
}

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration,
  className,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  /** Atraso em segundos — use para escalonar itens de uma grade. */
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px", amount: "some" }}
      variants={variants(variant)}
      transition={{
        duration: duration ?? (variant === "scale" ? 0.75 : 0.7),
        ease: EASE,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Escalona filhos diretos (cards de uma grade) sem precisar de N <Reveal>. */
export function RevealGroup({
  children,
  variant = "scale",
  stagger = 0.09,
  className,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  stagger?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px", amount: "some" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={variants(variant)}
              transition={{
                duration: variant === "scale" ? 0.75 : 0.7,
                ease: EASE,
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
