"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUI } from "@/components/UIProvider";

export default function Reveal({
  children,
  className = "",
  immediate = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useUI();

  useLayoutEffect(() => {
    if (reducedMotion || !ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay,
        ease: "power3.out",
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: ref.current,
                start: "top 88%",
                once: true,
              },
            }),
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
