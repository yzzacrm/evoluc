"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import clsx from "clsx";
import Container from "@/components/ui/Container";
import { mainNav, utilityNav, siteConfig } from "@/lib/site-config";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome || open;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-white/95 backdrop-blur shadow-sm border-b border-ink-100"
          : "bg-gradient-to-b from-black/50 to-transparent"
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/brand/logo.webp"
              alt="Evoluc Construtora"
              width={271}
              height={72}
              priority
              className={clsx(
                "h-9 w-auto transition-[filter] duration-300",
                !solid && "brightness-0 invert"
              )}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm font-medium transition-colors",
                  solid
                    ? "text-ink-700 hover:text-copper-600"
                    : "text-white/90 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:+55${siteConfig.phone.replace(/\D/g, "")}`}
              className={clsx(
                "flex items-center gap-2 text-sm font-semibold",
                solid ? "text-ink-700" : "text-white"
              )}
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className={clsx(
              "lg:hidden inline-flex items-center justify-center rounded-full p-2",
              solid ? "text-ink-900" : "text-white"
            )}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white border-t border-ink-100 shadow-lg"
          >
            <Container className="py-6 flex flex-col gap-1">
              {[...mainNav, ...utilityNav].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-50"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:+55${siteConfig.phone.replace(/\D/g, "")}`}
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-3 text-base font-semibold text-ink-800"
              >
                <Phone size={18} />
                {siteConfig.phone}
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
