"use client";

import { useState } from "react";
import { submitContact } from "@/lib/api";
import { SERVICES } from "@/lib/constants";

type ServiceOption = { title: string; slug?: string };

const initial = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  message: "",
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/25 dark:border-helix-border dark:bg-helix-bg dark:text-white dark:placeholder:text-slate-600 dark:focus:border-brand/50 dark:focus:ring-brand/30";

type ContactFormProps = {
  serviceOptions?: ServiceOption[];
};

export function ContactForm({ serviceOptions }: ContactFormProps) {
  const options: ServiceOption[] =
    serviceOptions && serviceOptions.length > 0
      ? serviceOptions
      : SERVICES.map((s) => ({ title: s.title, slug: s.slug }));
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    const r = await submitContact({
      name: form.name,
      email: form.email,
      company: form.company,
      phone: form.phone,
      service: form.service,
      message: form.message,
    });
    if (r.ok) {
      setStatus("ok");
      setForm(initial);
    } else {
      setStatus("err");
      setErrMsg(r.error || "Please try again.");
    }
  }

  const labelMuted = "text-slate-600 dark:text-slate-400";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-base">
          <span className={labelMuted}>Full name *</span>
          <input
            required
            name="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={fieldClass}
            placeholder="Jane Cooper"
            autoComplete="name"
          />
        </label>
        <label className="block text-base">
          <span className={labelMuted}>Work email *</span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={fieldClass}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-base">
          <span className={labelMuted}>Company</span>
          <input
            name="company"
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            className={fieldClass}
            placeholder="Acme Inc."
            autoComplete="organization"
          />
        </label>
        <label className="block text-base">
          <span className={labelMuted}>Phone</span>
          <input
            name="phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={fieldClass}
            placeholder="+1 …"
            autoComplete="tel"
          />
        </label>
      </div>
      <label className="block text-base">
        <span className={labelMuted}>Service interest</span>
        <select
          name="service"
          value={form.service}
          onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
          className={fieldClass}
        >
          <option value="">Select…</option>
          {options.map((s) => (
            <option key={s.slug || s.title} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-base">
        <span className={labelMuted}>Project details *</span>
        <textarea
          required
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={`${fieldClass} resize-y`}
          placeholder="Goals, timeline, budget range, links—anything that helps us respond with clarity."
        />
      </label>

      {status === "ok" && (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-base text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
          Thank you—your inquiry was received. We will follow up shortly.
        </p>
      )}
      {status === "err" && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-base text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
          {errMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-gradient-to-r from-brand to-cyan-600 py-4 text-base font-semibold text-helix-bg shadow-lg shadow-brand/25 transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
