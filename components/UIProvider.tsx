"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { toasts } from "@/lib/content";

type UIContext = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  toast: (msg: string, ms?: number) => void;
  toastMsg: string | null;
  degraded: boolean;
  degrade: () => void;
  turbo: boolean;
  toggleTurbo: () => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  reducedMotion: boolean;
};

const Ctx = createContext<UIContext | null>(null);

export function useUI() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}

export default function UIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [degraded, setDegraded] = useState(false);
  const [turbo, setTurbo] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("theme", next);
      } catch {}
      return next;
    });
  }, []);

  const toast = useCallback((msg: string, ms = 2600) => {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), ms);
  }, []);

  const degrade = useCallback(() => {
    if (reducedMotion) {
      toast(toasts.degradedReduced);
      return;
    }
    setDegraded(true);
    toast(toasts.degrading, 2400);
    setTimeout(() => {
      setDegraded(false);
      toast(toasts.degraded, 3400);
    }, 2400);
  }, [reducedMotion, toast]);

  const toggleTurbo = useCallback(() => {
    setTurbo((t) => {
      const next = !t;
      gsap.globalTimeline.timeScale(next ? 2.2 : 1);
      toast(next ? toasts.turboOn : toasts.turboOff, 3000);
      return next;
    });
  }, [toast]);

  return (
    <Ctx.Provider
      value={{
        theme,
        toggleTheme,
        toast,
        toastMsg,
        degraded,
        degrade,
        turbo,
        toggleTurbo,
        paletteOpen,
        setPaletteOpen,
        reducedMotion,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
