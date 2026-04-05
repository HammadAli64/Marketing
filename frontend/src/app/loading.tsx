export default function Loading() {
  return (
    <div className="flex min-h-[min(60vh,calc(100dvh-5rem))] flex-col items-center justify-center gap-4 px-4">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-brand border-t-transparent"
        aria-hidden
      />
      <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
    </div>
  );
}
