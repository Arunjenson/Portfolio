"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useUI } from "@/components/UIProvider";

export default function SplitText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reducedMotion } = useUI();

  useLayoutEffect(() => {
    if (reducedMotion || !ref.current) return;
    const chars = ref.current.querySelectorAll(".char");
    const tween = gsap.fromTo(
      chars,
      { opacity: 0, y: 26, rotateX: -45 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.012,
        delay,
        ease: "power3.out",
      }
    );
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // words are atomic inline-blocks so lines never break mid-word
  return (
    <span ref={ref} aria-label={text} className={className}>
      {text.split(" ").map((word, w, words) => (
        <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
          {[...word].map((ch, i) => (
            <span key={i} className="char">
              {ch}
            </span>
          ))}
          {w < words.length - 1 && <span className="char">{" "}</span>}
        </span>
      ))}
    </span>
  );
}
