import Reveal from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import SectionHeading from "@/components/SectionHeading";
import { focusAreas } from "@/lib/content";

const STAGGER = ["md:mt-0", "md:mt-8", "md:mt-16"];

export default function FocusAreas() {
  return (
    <section className="mb-20 sm:mb-24">
      <SectionHeading num={focusAreas.num} title={focusAreas.title} />
      <div className="grid md:grid-cols-3 gap-x-5 gap-y-8">
        {focusAreas.items.map((item, i) => (
          <Reveal key={item.title} className={STAGGER[i]}>
            <Spotlight className="rounded-xl p-5 -m-1">
              <h3 className="font-display text-[17px] font-medium mb-2.5">
                {item.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-stone-600 dark:text-stone-400">
                {item.body}
              </p>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
