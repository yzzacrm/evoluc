import Container from "@/components/ui/Container";

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
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-copper-400">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-ink-300">{description}</p>
        )}
      </Container>
    </div>
  );
}
