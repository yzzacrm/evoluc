"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

const desktopTakes: Take[] = [
  {
    src: "/videos/take-1.mp4",
    poster: "/videos/take-1-poster.jpg",
    label: "Apartamento decorado Evoluc",
    caption: "Bem-vindo ao apartamento decorado Evoluc.",
  },
];

const mobileTakes: Take[] = [
  {
    src: "/videos/mobile/take-1.mp4",
    poster: "/videos/mobile/take-1-poster.jpg",
    label: "Apartamento decorado Evoluc",
    caption: "Bem-vindo ao apartamento decorado Evoluc.",
  },
];

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

const MOBILE_QUERY = "(max-width: 639px)";

function subscribeToMobileQuery(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribeToMobileQuery,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  );
}

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isMobile = useIsMobile();
  const takes = isMobile ? mobileTakes : desktopTakes;
  const SEGMENT = 1 / takes.length;
  const [failed, setFailed] = useState<boolean[]>(() =>
    takes.map(() => false)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [introOpacity, setIntroOpacity] = useState(1);
  const [scrollCueOpacity, setScrollCueOpacity] = useState(1);

  const [syncedTakes, setSyncedTakes] = useState(takes);
  if (syncedTakes !== takes) {
    setSyncedTakes(takes);
    setFailed(takes.map(() => false));
    setActiveIndex(0);
  }

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
  }, [takes]);

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
          className="absolute inset-0 flex items-end pb-20 sm:items-center sm:pb-0"
        >
          <Container>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper-400 sm:text-sm">
              {siteConfig.name}
            </p>
            <h1 className="font-display mt-3 max-w-2xl text-[1.75rem] font-extrabold leading-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
              {siteConfig.slogan}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/80 sm:mt-6 sm:text-lg">
              Aqui nascem lares abençoados e famílias felizes. Cada
              apartamento Evoluc é pensado para guardar as histórias da sua
              vida, com toda a estrutura de lazer e segurança que sua
              família merece.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
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
        <div
          style={{ opacity: 1 - introOpacity }}
          className="absolute inset-x-0 bottom-0 pb-6 sm:pb-10"
        >
          <Container>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <p className="font-display max-w-md text-base font-semibold text-white sm:text-2xl">
                {takes[activeIndex].caption}
              </p>
              {takes.length > 1 && (
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
              )}
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
