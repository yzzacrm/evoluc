"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

type Take = {
  src: string;
  poster?: string;
  label: string;
  caption: string;
};

const takes: Take[] = [
  {
    src: "/videos/take-1.mp4",
    poster: "/videos/take-1-poster.jpg",
    label: "Take 1 — Cozinha planejada",
    caption: "Bem-vindo ao apartamento decorado Evoluc.",
  },
  {
    src: "/videos/take-2.mp4",
    poster: "/videos/take-2-poster.jpg",
    label: "Take 2 — Quarto e acabamentos",
    caption: "Cada detalhe pensado para o seu dia a dia.",
  },
  {
    src: "/videos/take-3.mp4",
    poster: "/videos/take-3-poster.jpg",
    label: "Take 3 — Área de lazer do condomínio",
    caption: "Seu novo endereço, do jeito que você imaginou.",
  },
];

const SEGMENT = 1 / takes.length;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [failed, setFailed] = useState<boolean[]>([false, false, false]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [introOpacity, setIntroOpacity] = useState(1);
  const [scrollCueOpacity, setScrollCueOpacity] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const idx = Math.min(
      takes.length - 1,
      Math.floor(progress / SEGMENT + 0.0001)
    );
    setActiveIndex((prev) => (prev !== idx ? idx : prev));
    setIntroOpacity(1 - clamp01(progress / 0.06));
    setScrollCueOpacity(1 - clamp01(progress / 0.04));

    const localProgress = clamp01((progress - idx * SEGMENT) / SEGMENT);

    const video = videoRefs.current[idx];
    const duration = video?.duration;
    if (video && duration && Number.isFinite(duration)) {
      const target = localProgress * duration;
      if (Math.abs(video.currentTime - target) > 0.03) {
        video.currentTime = target;
      }
    }
  });

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      // iOS Safari só decodifica/pinta frames de um <video> depois que ele
      // já tocou pelo menos uma vez — sem isso, currentTime "raspa" o vídeo
      // silenciosamente sem desenhar nada na tela. Como está mudo, o
      // navegador permite esse play() automático; pausamos em seguida para
      // manter o controle do scroll.
      const primeForIOS = () => {
        const playPromise = video.play();
        if (playPromise) {
          playPromise
            .then(() => video.pause())
            .catch(() => {
              /* autoplay bloqueado — o scrub ainda funciona nos demais navegadores */
            });
        }
      };

      const onError = () => {
        setFailed((prev) => {
          if (prev[i]) return prev;
          const next = [...prev];
          next[i] = true;
          return next;
        });
      };

      video.addEventListener("loadedmetadata", primeForIOS, { once: true });
      video.addEventListener("error", onError);
      cleanups.push(() => {
        video.removeEventListener("loadedmetadata", primeForIOS);
        video.removeEventListener("error", onError);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${100 + takes.length * 55}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink-950">
        {takes.map((take, i) => (
          <div
            key={take.src}
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{ opacity: activeIndex === i ? 1 : 0 }}
            aria-hidden={activeIndex !== i}
          >
            {!failed[i] ? (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className="h-full w-full object-cover"
                src={take.src}
                poster={take.poster}
                muted
                playsInline
                webkit-playsinline="true"
                preload="auto"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
                <div className="text-center px-6">
                  <p className="font-display text-sm uppercase tracking-[0.3em] text-copper-400">
                    {take.label}
                  </p>
                  <p className="mt-3 max-w-md text-ink-400 text-sm">
                    Vídeo do decorado será exibido aqui assim que os arquivos
                    forem enviados (public/videos/{take.src.split("/").pop()}
                    ).
                  </p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />
          </div>
        ))}

        {/* Intro overlay */}
        <div
          style={{
            opacity: introOpacity,
            pointerEvents: introOpacity > 0.05 ? "auto" : "none",
          }}
          className="absolute inset-0 flex items-center"
        >
          <Container>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-copper-400">
              {siteConfig.name}
            </p>
            <h1 className="font-display mt-4 max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              {siteConfig.slogan}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Aqui nascem lares abençoados e famílias felizes. Cada
              apartamento Evoluc é pensado para guardar as histórias da sua
              vida, com toda a estrutura de lazer e segurança que sua
              família merece.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/lancamentos" size="lg">
                Ver lançamentos
              </Button>
              <Button href="/simular-financiamento" variant="ghost" size="lg">
                Simular financiamento
              </Button>
            </div>
          </Container>
        </div>

        {/* Take caption + progress dots */}
        <div className="absolute inset-x-0 bottom-0 pb-10">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="font-display max-w-md text-xl font-semibold text-white sm:text-2xl">
                {takes[activeIndex].caption}
              </p>
              <div className="flex items-center gap-2">
                {takes.map((t, i) => (
                  <span
                    key={t.src}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-10 bg-copper-500"
                        : "w-5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>

        <div
          style={{ opacity: scrollCueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-24 hidden flex-col items-center text-white/70 sm:flex"
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
