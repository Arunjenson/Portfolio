"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUI } from "@/components/UIProvider";
import { commands, site } from "@/lib/content";

/* subsequence fuzzy match: "vsw" matches "View selected work" */
function fuzzy(query: string, target: string) {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  let i = 0;
  for (const ch of q) {
    i = t.indexOf(ch, i);
    if (i < 0) return false;
    i++;
  }
  return true;
}

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen, toggleTheme, degrade, toggleTurbo } =
    useUI();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const cmds = useMemo(
    () => [
      { label: commands.work, run: () => router.push("/work") },
      {
        label: commands.caseStudy,
        run: () => router.push("/work/core-web-vitals"),
      },
      { label: commands.contact, run: () => router.push("/#contact") },
      {
        label: commands.linkedin,
        run: () => window.open(site.linkedin, "_blank", "noopener"),
      },
      { label: commands.theme, run: toggleTheme },
      { label: commands.slow, run: degrade },
      { label: commands.turbo, run: toggleTurbo },
    ],
    [router, toggleTheme, degrade, toggleTurbo]
  );

  const filtered = cmds.filter((c) => fuzzy(query, c.label));

  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setActive(0);
      inputRef.current?.focus();
    }
  }, [paletteOpen]);

  if (!paletteOpen) return null;

  const run = (i: number) => {
    setPaletteOpen(false);
    filtered[i]?.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(active);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] bg-stone-950/50 backdrop-blur-sm flex items-start justify-center pt-[18vh] px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setPaletteOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-[460px] rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 overflow-hidden shadow-2xl"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Type a command…"
          autoComplete="off"
          className="w-full px-4 py-3.5 bg-transparent outline-none text-[14.5px] border-b border-stone-200 dark:border-stone-800 placeholder:text-stone-400"
        />
        <div className="max-h-[280px] overflow-y-auto py-1.5">
          {filtered.length ? (
            filtered.map((c, i) => (
              <button
                key={c.label}
                onClick={() => run(i)}
                onMouseEnter={() => setActive(i)}
                className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors ${
                  i === active ? "bg-stone-100 dark:bg-stone-800" : ""
                }`}
              >
                {c.label}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-[13px] text-stone-400">
              no match. try &quot;work&quot; or &quot;theme&quot;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
