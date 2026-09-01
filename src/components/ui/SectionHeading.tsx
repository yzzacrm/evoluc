import clsx from "clsx";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <p
          className={clsx(
            "text-sm font-semibold uppercase tracking-[0.25em]",
            light ? "text-copper-400" : "text-copper-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-ink-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed",
            light ? "text-ink-300" : "text-ink-500"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
