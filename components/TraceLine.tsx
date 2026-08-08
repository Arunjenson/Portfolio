"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUI } from "@/components/UIProvider";

const LENGTH = 2000;

export default function TraceLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const { reducedMotion } = useUI();

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    if (reducedMotion) {
      path.style.strokeDashoffset = "0";
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        end: "bottom 30%",
        scrub: 0.6,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg
      className="hidden md:block absolute left-1 top-[400px] w-6 h-[66%] overflow-visible pointer-events-none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d={`M12 0 L12 ${LENGTH}`}
        stroke="currentColor"
        className="text-emerald-500/35 dark:text-emerald-400/30"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray={LENGTH}
        strokeDashoffset={LENGTH}
      />
    </svg>
  );
}
