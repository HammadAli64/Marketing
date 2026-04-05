"use client";

import { useEffect, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";

function TawkScript() {
  const pid = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
  const wid = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

  useEffect(() => {
    if (!pid || !wid || typeof window === "undefined") return;

    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = `https://embed.tawk.to/${pid}/${wid}`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.body.appendChild(s1);
    return () => {
      s1.remove();
    };
  }, [pid, wid]);

  return null;
}

export function ChatWidget() {
  const [panel, setPanel] = useState(false);
  const hasTawk =
    !!process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID &&
    !!process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

  if (hasTawk) {
    return <TawkScript />;
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {panel ? (
          <div className="w-[min(100vw-2rem,320px)] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-helix-border dark:bg-helix-elevated dark:shadow-black/40">
              <p className="text-sm font-semibold text-helix-heading dark:text-white">
                Start a conversation
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Tell us about your project—we reply within one business day.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Project%20inquiry`}
                  className="rounded-xl bg-brand px-4 py-3 text-center text-sm font-semibold text-white hover:bg-brand-hover"
                >
                  Email us
                </a>
                <a
                  href="/contact"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-800 hover:bg-slate-50 dark:border-helix-border dark:text-slate-200 dark:hover:bg-white/5"
                >
                  Contact form
                </a>
              </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setPanel((p) => !p)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan-600 text-helix-bg shadow-lg shadow-brand/35 ring-4 ring-white transition hover:scale-105 hover:shadow-brand/45 dark:ring-helix-bg"
          aria-label="Chat now"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.132a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
