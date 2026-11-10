"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

// Hero com sequência de imagens (90 quadros extraídos do vídeo do decorado)
// desenhada num <canvas> e "esfregada" pelo scroll — técnica do pacote
// "Scroll Imobiliario". Diferente do <video>, não depende do navegador
// decodificar vídeo durante o scroll, então não há risco de tela
// preta/azulada no primeiro scroll no mobile.

const FRAME_COUNT = 90;
const CAPTION = "Bem-vindo ao apartamento decorado Evoluc.";

type Source = {
  base: string;
  poster: string;
};

const desktopSource: Source = {
  base: "/images/hero-sequence/desktop",
  poster: "/videos/take-1-poster.jpg",
};

const mobileSource: Source = {
  base: "/images/hero-sequence/mobile",
  poster: "/videos/mobile/take-1-poster.jpg",
};

function frameSrc(base: string, index: number) {
  return `${base}/img${String(index + 1).padStart(2, "0")}.webp`;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

const MOBILE_QUERY = "(max-width: 639px)";

function subscribeToMobileQuery(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

type Viewport = "unknown" | "mobile" | "desktop";

function useViewport(): Viewport {
  return useSyncExternalStore(
    subscribeToMobileQuery,
    () => (window.matchMedia(MOBILE_QUERY).matches ? "mobile" : "desktop"),
    () => "unknown"
  );
}

export default function ScrollFrameHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null)
  );
  const desiredIndexRef = useRef(0);
  const renderedIndexRef = useRef(-1);

  const viewport = useViewport();
  const source =
    viewport === "unknown" ? null : viewport === "mobile" ? mobileSource : desktopSource;

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [introOpacity, setIntroOpacity] = useState(1);
  const [scrollCueOpacity, setScrollCueOpacity] = useState(1);

  // Se o viewport mudar depois de montado (ex.: redimensionar a janela
  // cruzando o breakpoint), reinicia o estado de "pronto" para a nova
  // sequência de quadros — mesmo padrão usado no hero em vídeo anterior.
  const [activeBase, setActiveBase] = useState(source?.base);
  if (source?.base !== activeBase) {
    setActiveBase(source?.base);
    setReady(false);
    setFailed(false);
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[index];
    if (!canvas || !image?.complete || !image.naturalWidth || !image.naturalHeight) {
      return false;
    }
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return false;

    const scale = Math.max(
      canvas.width / image.naturalWidth,
      canvas.height / image.naturalHeight
    );
    const w = image.naturalWidth * scale;
    const h = image.naturalHeight * scale;
    ctx.drawImage(image, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    renderedIndexRef.current = index;
    setReady(true);
    return true;
  }, []);

  const loadFrame = useCallback(
    (base: string, index: number) => {
      if (index < 0 || index >= FRAME_COUNT) return;
      if (imagesRef.current[index]) return;

      const img = new window.Image();
      img.decoding = "async";
      imagesRef.current[index] = img;
      img.onload = () => {
        if (desiredIndexRef.current === index || renderedIndexRef.current < 0) {
          drawFrame(index);
        }
      };
      img.onerror = () => {
        imagesRef.current[index] = null;
        if (index === 0) setFailed(true);
      };
      img.src = frameSrc(base, index);
    },
    [drawFrame]
  );

  const requestFrame = useCallback(
    (base: string, index: number) => {
      desiredIndexRef.current = index;
      if (drawFrame(index)) return;
      loadFrame(base, index);
      loadFrame(base, index + 1);
      loadFrame(base, index - 1);
    },
    [drawFrame, loadFrame]
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!source) return;
    const index = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))
    );
    requestFrame(source.base, index);
    setIntroOpacity(1 - clamp01(progress / 0.06));
    setScrollCueOpacity(1 - clamp01(progress / 0.04));
  });

  // Carrega o restante dos quadros em segundo plano (janela ociosa) e
  // redesenha o canvas quando a janela é redimensionada.
  useEffect(() => {
    if (!source) return;
    const base = source.base;

    imagesRef.current = Array(FRAME_COUNT).fill(null);
    renderedIndexRef.current = -1;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      if (renderedIndexRef.current >= 0) drawFrame(renderedIndexRef.current);
    };

    resizeCanvas();
    requestFrame(base, 0);

    let nextIndex = 6;
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    const loadBatch = () => {
      const end = Math.min(FRAME_COUNT, nextIndex + 8);
      while (nextIndex < end) {
        loadFrame(base, nextIndex);
        nextIndex += 1;
      }
      if (nextIndex < FRAME_COUNT) {
        if ("requestIdleCallback" in window) {
          idleHandle = window.requestIdleCallback(loadBatch, { timeout: 500 });
        } else {
          timeoutHandle = setTimeout(loadBatch, 80);
        }
      }
    };
    loadBatch();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (idleHandle !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) clearTimeout(timeoutHandle);
    };
  }, [source, drawFrame, loadFrame, requestFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "240dvh" }}
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-ink-950">
        {/* Poster estático renderizado já no HTML: a hero aparece na hora,
            antes do JavaScript e dos quadros carregarem. */}
        <Image
          src={desktopSource.poster}
          alt=""
          fill
          priority
          quality={70}
          sizes="100vw"
          className="hidden object-cover sm:block"
          style={{ opacity: ready && viewport === "desktop" ? 0 : 1 }}
        />
        <Image
          src={mobileSource.poster}
          alt=""
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover sm:hidden"
          style={{ opacity: ready && viewport === "mobile" ? 0 : 1 }}
        />

        {!failed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full transition-opacity duration-300 ease-out"
            style={{ opacity: ready ? 1 : 0 }}
            aria-hidden="true"
          />
        )}

        {failed && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
            <div className="text-center px-6">
              <p className="font-display text-sm uppercase tracking-[0.3em] text-copper-400">
                Apartamento decorado Evoluc
              </p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 sm:bg-gradient-to-r sm:from-black/55 sm:via-black/25 sm:to-transparent" />

        {/* Intro overlay */}
        <div
          style={{
            opacity: introOpacity,
            pointerEvents: introOpacity > 0.05 ? "auto" : "none",
          }}
          className="absolute inset-0 flex items-end pb-20 sm:items-center sm:pb-0"
        >
          <Container>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-copper-400 [text-shadow:0_2px_8px_rgba(0,0,0,0.7)] sm:text-sm">
              {siteConfig.name}
            </p>
            <h1 className="font-display mt-3 max-w-2xl text-[1.75rem] font-extrabold leading-tight text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.6),0_4px_24px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-5xl lg:text-6xl">
              {siteConfig.slogan}
            </h1>
            <p className="mt-3 max-w-xl text-sm font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.8),0_2px_14px_rgba(0,0,0,0.6)] sm:mt-6 sm:text-lg">
              Aqui nascem lares abençoados e famílias felizes. Cada
              apartamento Evoluc é pensado para guardar as histórias da sua
              vida, com toda a estrutura de lazer e segurança que sua
              família merece.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
              <Button href="/lancamentos" size="lg">
                Ver lançamentos
              </Button>
              <Button href="/simular-financiamento" variant="secondary" size="lg">
                Simular financiamento
              </Button>
            </div>
          </Container>
        </div>

        {/* Legenda do quadro */}
        <div
          style={{ opacity: 1 - introOpacity }}
          className="absolute inset-x-0 bottom-0 pb-6 sm:pb-10"
        >
          <Container>
            <p className="font-display max-w-md text-base font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.7)] sm:text-2xl">
              {CAPTION}
            </p>
          </Container>
        </div>

        <div
          style={{ opacity: scrollCueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-24 hidden flex-col items-center text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.8)] sm:flex"
        >
          <span className="text-xs font-medium uppercase tracking-[0.3em]">
            Role para ver o decorado
          </span>
          <ChevronDown className="mt-2" size={20} />
        </div>
      </div>
    </section>
  );
}
