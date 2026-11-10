import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-ink-950 pb-16 pt-36 sm:pt-40">
      <Container>
        <Reveal>
          {eyebrow && (
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-copper-300">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.1] text-white sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">{description}</p>
          )}
        </Reveal>
      </Container>
    </div>
  );
}
