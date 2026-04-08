import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsImage } from "@/components/CmsImage";
import { Reveal } from "@/components/Reveal";
import { COMPANY } from "@/lib/constants";
import { fetchBlogDetail, fetchBlogSlugs } from "@/lib/cms";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await fetchBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogDetail(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | ${COMPANY}`,
      description: post.description,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

function formatDate(iso: string | null) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return null;
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchBlogDetail(slug);
  if (!post) notFound();

  const dateLabel = formatDate(post.published_at);

  return (
    <article>
      <section
        className={`relative border-b border-slate-200 dark:border-helix-border ${
          post.cover_image ? "min-h-[min(52vh,420px)]" : "min-h-[min(32vh,260px)]"
        }`}
      >
        {post.cover_image ? (
          <>
            <div className="absolute inset-0">
              <CmsImage
                src={post.cover_image}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/65 to-black/40"
              aria-hidden
            />
          </>
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-brand/25 via-slate-100 to-cyan-700/10 dark:via-helix-elevated"
            aria-hidden
          />
        )}
        <div className="relative mx-auto max-w-screen-2xl px-4 py-14 sm:px-6 sm:py-20">
          <Link
            href="/blogs"
            className={`text-sm font-medium hover:underline ${
              post.cover_image
                ? "text-brand"
                : "text-brand hover:text-brand-hover"
            }`}
          >
            ← Blog
          </Link>
          {dateLabel ? (
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand">
              {dateLabel}
            </p>
          ) : (
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand">
              Article
            </p>
          )}
          <h1
            className={`mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl ${
              post.cover_image ? "text-white drop-shadow-sm" : "text-helix-heading dark:text-white"
            }`}
          >
            {post.title}
          </h1>
          <p
            className={`mt-5 max-w-2xl text-lg leading-relaxed ${
              post.cover_image
                ? "text-white/95"
                : "text-slate-700 dark:text-slate-300"
            }`}
          >
            {post.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl px-4 py-14 sm:px-6 sm:py-20">
        {post.bullets.length > 0 ? (
          <Reveal>
            <h2 className="font-display text-xl font-semibold text-helix-heading dark:text-white">
              Key takeaways
            </h2>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
              {post.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <div className={post.bullets.length > 0 ? "mt-12 space-y-6" : "space-y-6"}>
          {post.body_paragraphs.map((para, i) => (
            <Reveal key={i} delay={0.03 * i}>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08} className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-helix-border dark:bg-helix-elevated">
          <p className="font-display text-lg font-semibold text-helix-heading dark:text-white">
            Want this executed for your business?
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Book a free strategy session—we&apos;ll map priorities and next steps.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-hover"
          >
            Book a Strategy Session
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
