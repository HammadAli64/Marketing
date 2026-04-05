import Image from "next/image";
import type { CmsPillar } from "@/lib/cms";
import { PILLARS_SECTION_BG } from "@/lib/placeholders";

type Props = { pillars: CmsPillar[] };

export function GlassPillarsSection({ pillars }: Props) {
  if (pillars.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-20">
      <div className="absolute inset-0">
        <Image
          src={PILLARS_SECTION_BG}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
          priority={false}
        />
      </div>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-900/45 to-slate-950/75"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {pillars.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="rounded-2xl border border-white/25 bg-white/15 p-6 shadow-lg shadow-black/20 backdrop-blur-md"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                {item.title}
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-white sm:text-lg">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
