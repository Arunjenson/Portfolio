"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useUI } from "@/components/UIProvider";
import { navLinks, site, toasts } from "@/lib/content";

export default function Nav() {
  const { theme, toggleTheme, toast, setPaletteOpen, reducedMotion } = useUI();
  const clicks = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const burst = () => {
    if (reducedMotion) {
      toast(toasts.burst);
      return;
    }
    const r = logoRef.current?.getBoundingClientRect();
    const x = (r?.left ?? 20) + 15;
    const y = (r?.top ?? 20) + 15;
    for (let i = 0; i < 34; i++) {
      const d = document.createElement("div");
      d.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:9px;height:9px;z-index:70;pointer-events:none;border-radius:2px;background:${
        i % 7 === 0 ? "#f59e0b" : "#10b981"
      }`;
      document.body.appendChild(d);
      gsap.to(d, {
        x: (Math.random() - 0.5) * 420,
        y: Math.random() * 320 + 60,
        rotation: Math.random() * 540,
        opacity: 0,
        duration: 1.1 + Math.random() * 0.6,
        ease: "power2.out",
        onComplete: () => d.remove(),
      });
    }
    toast(toasts.burst, 2200);
  };

  const onLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    clicks.current++;
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clicks.current = 0;
    }, 600);
    if (clicks.current >= 3) {
      clicks.current = 0;
      burst();
    }
  };

  return (
    <nav className="flex items-center justify-between py-7 relative z-10">
      <a
        ref={logoRef}
        href="#"
        onClick={onLogoClick}
        className="logo-mark flex items-center gap-3"
      >
        {/* same mark as app/icon.svg */}
        <svg width="30" height="30" viewBox="0 0 32 32" className="shrink-0" aria-hidden="true">
          <defs>
            <linearGradient id="logoTile" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1c1917" />
              <stop offset="1" stopColor="#0c0a09" />
            </linearGradient>
            <linearGradient id="logoInk" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6ee7b7" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="7.5" fill="url(#logoTile)" />
          <rect x=".5" y=".5" width="31" height="31" rx="7" fill="none" stroke="#10b981" className="logo-ring" />
          <g fill="none" stroke="url(#logoInk)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5.8 23 10.8 9 15.8 23M7.6 18.4H14" />
            <path d="M24.6 9v9.4a3.6 3.6 0 0 1-3.6 3.6" />
          </g>
        </svg>
        <span className="font-display font-medium text-[17px] tracking-tight">
          {site.name}
        </span>
      </a>

      <div className="hidden md:flex items-center gap-6 text-[13.5px] absolute left-1/2 -translate-x-1/2">
        {navLinks.map((l) =>
          l.soon ? (
            <span
              key={l.label}
              title="Coming soon"
              className="flex items-center gap-1.5 text-stone-400 dark:text-stone-600 cursor-default"
            >
              {l.label}
              <span className="font-mono text-[9px] uppercase tracking-wider text-amber-600 dark:text-amber-500 border border-amber-500/40 rounded-full px-1.5 py-px leading-[1.5]">
                soon
              </span>
            </span>
          ) : (
            <a
              key={l.label}
              href={l.href}
              className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {l.label}
            </a>
          )
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setPaletteOpen(true)}
          aria-label="Open command palette"
          className="hidden sm:flex items-center gap-2 font-mono text-[11.5px] text-stone-400 dark:text-stone-500 border border-stone-200 dark:border-stone-800 rounded-md px-2.5 py-1.5 hover:border-emerald-500/50 transition-colors"
        >
          ⌘K
        </button>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="magnet flex items-center gap-2 text-[13px] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-200 dark:border-stone-800 rounded-full px-3.5 py-1.5 transition-colors"
        >
          {theme === "dark" ? (
            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4" />
            </svg>
          ) : (
            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
            </svg>
          )}
          <span className="hidden sm:inline">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>
      </div>
    </nav>
  );
}
