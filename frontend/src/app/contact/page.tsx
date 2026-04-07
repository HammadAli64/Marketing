import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { COMPANY, publicContactEmails } from "@/lib/constants";
import { fetchServicesList } from "@/lib/cms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${COMPANY}—book a call, request a quote, or send a project inquiry.`,
};

export default async function ContactPage() {
  const services = await fetchServicesList();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Contact
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold text-helix-heading dark:text-white sm:text-5xl md:text-6xl">
              Let&apos;s plan your next release
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-600 dark:text-slate-400 sm:text-2xl">
              Use the form for structured inquiries, or email us directly. For live chat,
              use the floating button (configure Tawk.to in env for full widget support).
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-helix-border dark:bg-helix-surface/70">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email
              </p>
              <ul className="mt-3 space-y-2">
                {publicContactEmails().map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="block break-all text-lg font-medium text-brand hover:text-brand-hover dark:hover:text-brand"
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-helix-border dark:bg-helix-surface/70">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                What to include
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2 text-base text-slate-600 dark:text-slate-400 sm:text-lg">
                <li>Company context and primary goal</li>
                <li>Ideal timeline and budget range</li>
                <li>Links or references that clarify the vision</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-helix-border dark:bg-helix-elevated sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-helix-heading dark:text-white sm:text-3xl">
              Inquiry form
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400 sm:text-lg">
              Submissions are stored securely and emailed to your team when SMTP is
              configured.
            </p>
            <div className="mt-8">
              <ContactForm serviceOptions={services} />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
