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
            "text-[0.7rem] font-medium uppercase tracking-[0.3em]",
            light ? "text-copper-300" : "text-copper-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "font-display mt-4 text-3xl leading-[1.1] sm:text-[2.6rem]",
          light ? "text-white" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-5 text-base leading-relaxed",
            light ? "text-ink-300" : "text-ink-500"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
