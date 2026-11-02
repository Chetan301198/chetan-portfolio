"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-accent"
      aria-live="polite"
    >
      {status === "copied"
        ? "Copied!"
        : status === "failed"
          ? "Copy failed"
          : "Copy email"}
    </button>
  );
}
