"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";

const ChatWidget = dynamic(
  () => import("@/components/ChatWidget").then((m) => ({ default: m.ChatWidget })),
  { ssr: false }
);

/**
 * Single client boundary for shell UI — avoids dev-time clientReferenceManifest
 * issues seen when many separate client roots are mounted from the root layout.
 */
export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      <ChatWidget />
    </>
  );
}
