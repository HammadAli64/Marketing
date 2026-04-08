import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsImage } from "@/components/CmsImage";
import { Reveal } from "@/components/Reveal";
import { COMPANY } from "@/lib/constants";
import { fetchServiceDetail, fetchServiceSlugs } from "@/lib/cms";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await fetchServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await fetchServiceDetail(slug);
  if (!s) return { title: "Service" };
  return {
    title: s.title,
    description: s.summary,
    openGraph: {
      title: `${s.title} | ${COMPANY}`,
      description: s.summary,
      images: s.cover_image ? [s.cover_image] : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = await fetchServiceDetail(slug);
  if (!s) notFound();

  const headerSrc = s.hero_image || s.cover_image;
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
            className="absolute inset-0 min-h-[min(48vh,420px)] bg-gradient-to-br from-brand/25 via-slate-100 to-cyan-800/15 dark:via-helix-elevated"
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
              href="/services"
              className={`text-sm font-medium ${
                heroPhoto
                  ? "text-cyan-200 hover:text-white"
                  : "text-brand hover:text-brand-hover dark:hover:text-brand"
              }`}
            >
              ← Services
            </Link>
            <h1
              className={`mt-5 font-display text-4xl font-bold sm:text-5xl ${
                heroPhoto ? "text-white" : "text-helix-heading dark:text-white"
              }`}
            >
              {s.title}
            </h1>
            <p
              className={`mt-4 max-w-2xl text-lg leading-relaxed ${
                heroPhoto ? "text-slate-100" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {s.summary}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="space-y-6">
          {s.body_paragraphs.map((para, i) => (
            <Reveal key={i} delay={0.04 * i}>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">{para}</p>
            </Reveal>
          ))}
        </div>

        {s.bullets.length > 0 ? (
          <Reveal className="mt-12" delay={0.06}>
            <h2 className="font-display text-lg font-semibold text-helix-heading dark:text-white">
              What you get
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              {s.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-brand">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <Reveal className="mt-14" delay={0.08}>
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-gradient-to-r from-brand to-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
          >
            Discuss this service
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
