import Link from "next/link";
import { CmsImage } from "@/components/CmsImage";
import { Reveal } from "@/components/Reveal";
import type { CmsBlogPostCard } from "@/lib/cms";

type Props = {
  posts: CmsBlogPostCard[];
};

export function BlogPreviewSection({ posts }: Props) {
  const slice = posts.slice(0, 3);
  if (slice.length === 0) return null;

  return (
    <section
      id="blog"
      className="border-t border-slate-200 py-20 dark:border-helix-border sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Insights
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Growth Weapons for Ambitious Founders
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Actionable tactics, no-fluff strategies, and battle-tested insights to help you
            outpace your competition.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {slice.map((post, i) => (
            <Reveal key={post.slug} delay={0.06 * i}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand/40 dark:border-helix-border dark:bg-helix-elevated dark:hover:border-brand/45">
                <Link href={`/blogs/${post.slug}`} className="group flex h-full flex-col">
                  <div className="relative aspect-[16/10] bg-slate-100 dark:bg-helix-surface">
                    {post.cover_image ? (
                      <CmsImage
                        src={post.cover_image}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand/20 via-slate-100 to-helix-gold/15 text-2xl font-bold text-brand dark:via-helix-elevated">
                        {post.title.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="font-display text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand dark:text-white dark:group-hover:text-brand">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      {post.description}
                    </p>
                    {post.bullets.length > 0 ? (
                      <ul className="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                        {post.bullets.slice(0, 3).map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <span className="mt-6 inline-flex text-sm font-semibold text-brand group-hover:text-brand-hover">
                      Read article →
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-flex text-sm font-semibold uppercase tracking-wider text-brand hover:text-brand-hover"
          >
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
