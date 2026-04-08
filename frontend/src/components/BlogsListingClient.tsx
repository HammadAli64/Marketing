"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CmsImage } from "@/components/CmsImage";
import type { CmsBlogPostCard } from "@/lib/cms";

type Props = {
  posts: CmsBlogPostCard[];
};

export function BlogsListingClient({ posts }: Props) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return posts;
    return posts.filter((p) => p.title.toLowerCase().includes(t));
  }, [posts, q]);

  return (
    <>
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <label htmlFor="blog-search" className="sr-only">
          Search articles by title
        </label>
        <input
          id="blog-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title…"
          autoComplete="off"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-brand/0 transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-helix-border dark:bg-helix-elevated dark:text-white dark:placeholder:text-slate-500"
        />
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          {filtered.length} article{filtered.length === 1 ? "" : "s"}
          {q.trim() ? ` matching “${q.trim()}”` : ""}
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-screen-2xl px-4 sm:px-6">
        {filtered.length === 0 ? (
          <p className="text-center text-lg text-slate-600 dark:text-slate-400">
            {posts.length === 0
              ? "No articles published yet. Check back soon."
              : "No articles match that title. Try another search."}
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand/40 dark:border-helix-border dark:bg-helix-elevated dark:hover:border-brand/45"
                >
                  <div className="relative aspect-[16/10] bg-slate-100 dark:bg-helix-surface">
                    {post.cover_image ? (
                      <CmsImage
                        src={post.cover_image}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:1024px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand/20 via-slate-100 to-helix-gold/15 text-3xl font-bold text-brand dark:via-helix-elevated">
                        {post.title.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-lg font-semibold leading-snug text-helix-heading group-hover:text-brand dark:text-white dark:group-hover:text-brand">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {post.description}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-brand">Read more →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
