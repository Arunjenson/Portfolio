import Link from "next/link";

export default function SectionHeading({
  num,
  title,
  tone = "emerald",
  href,
}: {
  num: string;
  title: string;
  tone?: "emerald" | "amber";
  href?: string;
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
        {href ? (
          <Link
            href={href}
            className="group inline-flex items-baseline gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {title}
            <span
              aria-hidden="true"
              className="font-mono text-[13px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            >
              →
            </span>
          </Link>
        ) : (
          title
        )}
      </h2>
      <span className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
    </div>
  );
}
