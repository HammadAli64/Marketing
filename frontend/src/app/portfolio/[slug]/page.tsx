import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsImage } from "@/components/CmsImage";
import { Reveal } from "@/components/Reveal";
import { COMPANY } from "@/lib/constants";
import { fetchProjectDetail, fetchProjectSlugs } from "@/lib/cms";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await fetchProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await fetchProjectDetail(slug);
  if (!p) return { title: "Project" };
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: {
      title: `${p.title} | ${COMPANY}`,
      description: p.excerpt,
      images: p.cover_image ? [p.cover_image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const p = await fetchProjectDetail(slug);
  if (!p) notFound();

  const headerSrc = p.hero_image || p.cover_image;

  const heroPhoto = Boolean(headerSrc);

  return (
    <article>
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-helix-border">
        {headerSrc ? (
          <>
            <div className="absolute inset-0">
              <CmsImage
                src={headerSrc}
                alt=""
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
                quality={92}
              />
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 dark:from-helix-bg/88 dark:via-helix-bg/45 dark:to-helix-bg/15"
              aria-hidden
            />
          </>
        ) : (
          <div
            className="absolute inset-0 min-h-[min(48vh,420px)] bg-gradient-to-br from-brand/20 via-slate-100 to-cyan-700/10 dark:via-helix-elevated"
            aria-hidden
          />
        )}
        <div
          className={`relative z-10 mx-auto flex min-h-[min(58vh,560px)] max-w-screen-2xl flex-col px-4 sm:px-6 ${
            headerSrc
              ? "justify-end pb-14 pt-24 sm:pb-20 sm:pt-28"
              : "justify-center pb-16 pt-16 sm:pb-20 sm:pt-20"
          }`}
        >
          <div className="max-w-3xl">
            <Link
              href="/portfolio"
              className={`text-sm font-medium ${
                heroPhoto
                  ? "text-cyan-200 hover:text-white"
                  : "text-brand hover:text-brand-hover dark:hover:text-brand"
              }`}
            >
              ← Portfolio
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand">
              {p.category}
            </p>
            <h1
              className={`mt-3 font-display text-4xl font-bold sm:text-5xl ${
                heroPhoto ? "text-white" : "text-helix-heading dark:text-white"
              }`}
            >
              {p.title}
            </h1>
            <p
              className={`mt-4 max-w-2xl text-lg ${
                heroPhoto ? "text-slate-100" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {p.excerpt}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="space-y-6">
          {p.body_paragraphs.map((para, i) => (
            <Reveal key={i} delay={0.04 * i}>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">{para}</p>
            </Reveal>
          ))}
        </div>

        {p.gallery.length > 0 ? (
          <Reveal className="mt-14" delay={0.08}>
            <h2 className="font-display text-xl font-semibold text-helix-heading dark:text-white">
              Gallery
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {p.gallery.map((g, i) => (
                <figure
                  key={i}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-helix-border dark:bg-helix-elevated"
                >
                  <div className="relative aspect-[4/3] w-full">
                    {g.image ? (
                      <CmsImage
                        src={g.image}
                        alt={g.caption || p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width:640px) 100vw, 50vw"
                      />
                    ) : null}
                  </div>
                  {g.caption ? (
                    <figcaption className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                      {g.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </Reveal>
        ) : null}

        <Reveal className="mt-14" delay={0.06}>
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-gradient-to-r from-brand to-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
          >
            Discuss a similar build
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
