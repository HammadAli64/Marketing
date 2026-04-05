import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-helix-heading dark:text-white">
        Page not found
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        That URL doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover"
      >
        Back to home
      </Link>
    </div>
  );
}
