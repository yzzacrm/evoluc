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

// Hero com sequência de imagens (120 quadros extraídos do vídeo do Terras
// Raras: a obra, o prédio subindo e o casal na varanda) desenhada num
// <canvas> e "esfregada" pelo scroll — técnica do pacote "Scroll
// Imobiliario". Diferente do <video>, não depende do navegador decodificar
// vídeo durante o scroll, então não há risco de tela preta/azulada no
// primeiro scroll no mobile.

const FRAME_COUNT = 120;

// Uma legenda por trecho do vídeo; `ate` é a fração do scroll em que o
// trecho termina (obra até 38%, prédio subindo até 72%, depois a varanda).
const CAPTIONS = [
  { ate: 0.38, texto: "Tudo começa no canteiro, com gente que constrói de verdade." },
  { ate: 0.72, texto: "Andar por andar, até a entrega das chaves." },
  { ate: 1.01, texto: "E termina na varanda de quem chegou em casa." },
];

type Source = {
  base: string;
  poster: string;
};

const desktopSource: Source = {
  base: "/images/hero-sequence-obra/desktop",
  poster: "/images/hero-sequence-obra/poster-desktop.jpg",
};

const mobileSource: Source = {
  base: "/images/hero-sequence-obra/mobile",
  poster: "/images/hero-sequence-obra/poster-mobile.jpg",
};

function frameSrc(base: string, index: number) {
  return `${base}/img${String(index + 1).padStart(3, "0")}.webp`;
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
  const [captionIndex, setCaptionIndex] = useState(0);

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
    setCaptionIndex(Math.max(0, CAPTIONS.findIndex((c) => progress < c.ate)));
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
      style={{ height: "320dvh" }}
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
                Construtora Evoluc
              </p>
            </div>
          </div>
        )}

        {/* Intro overlay */}
        <div
          style={{
            opacity: introOpacity,
            pointerEvents: introOpacity > 0.05 ? "auto" : "none",
          }}
          className="absolute inset-0 flex items-end justify-center pb-24 text-center sm:items-center sm:pb-0"
        >
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.75)] sm:text-xs">
                {siteConfig.name} · Desde {siteConfig.founded}
              </p>
              <h1 className="font-serif-display mx-auto mt-5 max-w-2xl text-[2.3rem] font-normal leading-[1.04] tracking-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_4px_16px_rgba(0,0,0,0.75),0_12px_40px_rgba(0,0,0,0.5)] sm:mt-7 sm:text-6xl lg:text-7xl">
                Onde a sua história ganha endereço.
              </h1>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.75)] sm:mt-7 sm:text-base">
                Projetamos e construímos apartamentos em São Paulo com o
                cuidado de quem pensa em gerações.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
                <Button href="/lancamentos" variant="light" size="lg">
                  Conhecer os empreendimentos
                </Button>
                <Button href="/simular-financiamento" variant="ghost" size="lg">
                  Simular financiamento
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* Legenda do quadro */}
        <div
          style={{ opacity: 1 - introOpacity }}
          className="absolute inset-x-0 bottom-0 pb-24 text-center sm:pb-10"
        >
          <Container>
            {/* As três legendas ocupam o mesmo lugar: só a do trecho atual
                aparece, as outras somem por completo. */}
            <div className="relative mx-auto grid max-w-lg">
              {CAPTIONS.map((c, i) => (
                <p
                  key={c.texto}
                  aria-hidden={i !== captionIndex}
                  className="font-serif-display col-start-1 row-start-1 text-base font-medium text-white transition-opacity duration-500 ease-out [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_4px_16px_rgba(0,0,0,0.7)] sm:text-2xl"
                  style={{ opacity: i === captionIndex ? 1 : 0 }}
                >
                  {c.texto}
                </p>
              ))}
            </div>
          </Container>
        </div>

        <div
          style={{ opacity: scrollCueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-24 hidden flex-col items-center text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.7)] sm:flex"
        >
          <span className="text-xs font-medium uppercase tracking-[0.3em]">
            Role para ver a obra
          </span>
          <ChevronDown className="mt-2" size={20} />
        </div>
      </div>
    </section>
  );
}
