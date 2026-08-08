import { ticker } from "@/lib/content";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="flex gap-8" aria-hidden={hidden || undefined}>
      {ticker.map((item) => (
        <span key={item} className="flex gap-8">
          <span>{item}</span>
          <span>·</span>
        </span>
      ))}
    </span>
  );
}

export default function Ticker() {
  return (
    <div className="relative overflow-hidden py-5 mb-20 sm:mb-24 border-y border-stone-200 dark:border-stone-800">
      <div className="animate-ticker flex gap-8 w-max font-mono text-[13px] text-stone-400 dark:text-stone-500 whitespace-nowrap">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
