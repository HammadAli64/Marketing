import { CmsImage } from "@/components/CmsImage";
import { Reveal } from "@/components/Reveal";
import type { CmsShowcase } from "@/lib/cms";

type Props = { showcases: CmsShowcase[] };

export function HomeShowcasesSection({ showcases }: Props) {
  if (showcases.length === 0) return null;

  return (
    <section className="border-t border-slate-200 bg-white py-16 dark:border-helix-border dark:bg-helix-bg sm:py-24">
      <div className="mx-auto max-w-screen-2xl space-y-20 px-4 sm:px-6 sm:space-y-28">
        {showcases.map((block, i) => {
          const imgRight = block.image_on_right;
          const imageOrder = imgRight
            ? "order-2 lg:order-2"
            : "order-1 lg:order-1";
          const copyOrder = imgRight
            ? "order-1 lg:order-1"
            : "order-2 lg:order-2";

          return (
            <div
              key={`${block.title}-${i}`}
              className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14"
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-helix-border dark:bg-helix-elevated lg:aspect-auto lg:min-h-[280px] ${imageOrder}`}
              >
                {block.image ? (
                  <CmsImage
                    src={block.image}
                    alt={block.image_alt || block.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full min-h-[200px] items-center justify-center bg-gradient-to-br from-brand/15 via-slate-100 to-helix-gold/10 px-4 text-center text-sm text-slate-500 dark:from-brand/10 dark:via-helix-elevated dark:to-helix-gold/10 dark:text-slate-400">
                    Set <code className="text-xs">image</code> on this block in{" "}
                    <code className="text-xs">siteContent.ts</code>
                  </div>
                )}
              </div>
              <div className={`flex flex-col justify-center ${copyOrder}`}>
                <Reveal delay={0.04 * i}>
                  <h2 className="font-display text-2xl font-bold text-helix-heading dark:text-white sm:text-3xl md:text-4xl">
                    {block.title}
                  </h2>
                  {block.body?.trim() ? (
                    <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                      {block.body.split(/\n\n+/).map((para, j) => (
                        <p key={j}>{para.trim()}</p>
                      ))}
                    </div>
                  ) : null}
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
