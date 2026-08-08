export default function SectionHeading({
  num,
  title,
  tone = "emerald",
}: {
  num: string;
  title: string;
  tone?: "emerald" | "amber";
}) {
  return (
    <div className="flex items-baseline gap-4 mb-9">
      <span
        className={`font-mono text-[12px] ${
          tone === "amber"
            ? "text-amber-600 dark:text-amber-400"
            : "text-emerald-600 dark:text-emerald-400"
        }`}
      >
        {num}
      </span>
      <h2 className="font-display text-[22px] font-medium tracking-tight">
        {title}
      </h2>
      <span className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
    </div>
  );
}
