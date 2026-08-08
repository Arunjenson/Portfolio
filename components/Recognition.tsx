"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { recognition } from "@/lib/content";

function AwardImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="aspect-[16/10] bg-stone-100 dark:bg-stone-900 relative">
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 text-stone-400 dark:text-stone-600">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="font-mono text-[11px]">{src}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function Recognition() {
  return (
    <section className="mb-20 sm:mb-24">
      <SectionHeading num={recognition.num} title={recognition.title} tone="amber" />
      <div className="grid md:grid-cols-2 gap-5">
        {recognition.items.map((item) => (
          <Reveal key={item.title}>
            <article className="sweep rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
              <AwardImage src={item.image} alt={`${item.title} award`} />
              <div className="p-6 relative z-10">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-display text-[17px] font-medium">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[11.5px] text-stone-400 dark:text-stone-500 shrink-0">
                    {item.date}
                  </span>
                </div>
                <p className="text-[14px] leading-relaxed text-stone-600 dark:text-stone-400">
                  {item.body}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
