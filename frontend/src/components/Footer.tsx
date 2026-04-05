import Link from "next/link";
import { COMPANY, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";

function SocialIcon({ id }: { id: (typeof SOCIAL_LINKS)[number]["id"] }) {
  const className = "h-5 w-5";
  switch (id) {
    case "linkedin":
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "x":
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "github":
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-helix-border dark:bg-helix-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            {COMPANY}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Conversion-obsessed websites, SEO dominance, apps, automation, and elite remote
            talent—built to grow ambitious US businesses.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>
              <Link href="/about" className="hover:text-brand">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-brand">
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-brand">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-brand">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Contact
          </p>
          <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Response within one business day for qualified inquiries.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Social
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-brand/50 hover:text-brand dark:border-white/10 dark:bg-helix-elevated dark:text-slate-300 dark:hover:border-brand/50 dark:hover:text-brand"
                  aria-label={s.label}
                >
                  <SocialIcon id={s.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-helix-border">
        © {new Date().getFullYear()} {COMPANY}. All rights reserved.
      </div>
    </footer>
  );
}
