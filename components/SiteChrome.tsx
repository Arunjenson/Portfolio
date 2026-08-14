"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useUI } from "@/components/UIProvider";
import CommandPalette from "@/components/CommandPalette";
import { toasts } from "@/lib/content";

const KONAMI =
  "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";

export default function SiteChrome() {
  const {
    toast,
    toastMsg,
    degraded,
    degrade,
    turbo,
    toggleTurbo,
    paletteOpen,
    setPaletteOpen,
    reducedMotion,
  } = useUI();

  const barRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorOn, setCursorOn] = useState(false);
  const [fps, setFps] = useState<number | null>(null);
  const pathname = usePathname();

  /* scroll progress bar — scoped to [data-progress] when a page marks one
     (the case study marks its <article>, so the bar tracks reading, not page scroll) */
  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return;
      const scope = document.querySelector<HTMLElement>("[data-progress]");
      let pct: number;
      if (scope) {
        const top = scope.offsetTop;
        const h = scope.offsetHeight - window.innerHeight;
        pct = h > 0 ? ((window.scrollY - top) / h) * 100 : 0;
      } else {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      }
      barRef.current.style.transform = `scaleX(${Math.min(Math.max(pct, 0), 100) / 100})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  /* degraded easter egg: apply .degraded to <main> */
  useEffect(() => {
    document.querySelector("main")?.classList.toggle("degraded", degraded);
  }, [degraded]);

  /* custom cursor: dot + lagging ring, fine pointers only */
  useEffect(() => {
    const enabled =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !reducedMotion;
    setCursorOn(enabled);
    if (!enabled) return;

    let tx = -100, ty = -100, rx = -100, ry = -100;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
    };
    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: MouseEvent) => {
      const hot = (e.target as Element)?.closest?.("a, button, .magnet");
      if (ringRef.current) {
        ringRef.current.style.width = hot ? "46px" : "30px";
        ringRef.current.style.height = hot ? "46px" : "30px";
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  /* global keyboard: ⌘K, Esc, konami, "slow"/"fast" typing */
  useEffect(() => {
    let buf = "";
    let kbuf = "";
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
        return;
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
        return;
      }

      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      kbuf = (kbuf + e.key).slice(-KONAMI.length);
      if (kbuf === KONAMI) {
        toggleTurbo();
        kbuf = "";
        return;
      }

      if (/^[a-z]$/i.test(e.key)) {
        buf = (buf + e.key.toLowerCase()).slice(-12);
        if (buf.endsWith("slow")) {
          degrade();
          buf = "";
        } else if (buf.endsWith("fast")) {
          toast(toasts.fast);
          buf = "";
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, setPaletteOpen, degrade, toggleTurbo, toast]);

  /* fps counter while turbo */
  useEffect(() => {
    if (!turbo) {
      setFps(null);
      return;
    }
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      frames++;
      if (now - last >= 500) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [turbo]);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden="true"
        className="fixed top-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-emerald-600 dark:bg-emerald-400 z-[45]"
      />

      {cursorOn && (
        <>
          <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
          <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
        </>
      )}

      {turbo && (
        <div className="fixed bottom-4 right-4 z-[65] font-mono text-[11px] px-2.5 py-1 rounded-md bg-stone-900/90 dark:bg-stone-100/90 text-emerald-400 dark:text-emerald-700 border border-emerald-500/30">
          {fps === null ? "— fps" : `${fps} fps`}
        </div>
      )}

      <div
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] pointer-events-none transition-all duration-300 font-mono text-[12.5px] px-4 py-2.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 shadow-xl ${
          toastMsg ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        {toastMsg}
      </div>

      <CommandPalette />
    </>
  );
}
