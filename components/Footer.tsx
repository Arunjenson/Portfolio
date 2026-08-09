import { footer } from "@/lib/content";

export default function Footer() {
  const [hintPre, hintWord, hintPost] = footer.hint;

  return (
    <footer
      id="contact"
      className="border-t border-stone-200 dark:border-stone-800 py-10 flex flex-col sm:flex-row gap-6 sm:items-end justify-between scroll-mt-8"
    >
      <div>
        <p className="font-display text-[20px] font-medium tracking-tight mb-2">
          {footer.heading}
        </p>
        <p className="text-[14px] text-stone-500 dark:text-stone-400 max-w-sm">
          {footer.body}
        </p>
        <p className="font-mono text-[11px] text-stone-400 dark:text-stone-600 mt-4">
          {hintPre}
          <span className="text-emerald-600 dark:text-emerald-400">{hintWord}</span>
          {hintPost}
        </p>
      </div>
      <div className="flex gap-6 text-[14px]">
        {footer.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
            className="magnet text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
