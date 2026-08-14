"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

/**
 * The address, plus a one-click copy.
 *
 * A bare mailto: is a dead end on a locked-down work laptop with no mail
 * client bound — the recruiter clicks, nothing happens, and they leave. The
 * link still works for everyone it works for; this just means it is never the
 * only way out.
 */
export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.assign(`mailto:${profile.email}`);
    }
  }

  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <a
        href={`mailto:${profile.email}`}
        className="border-b border-sea pb-0.5 font-mono text-sm text-sea transition-colors hover:border-sea-hover hover:text-sea-hover"
      >
        {profile.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="tabular text-[0.65rem] text-muted transition-colors hover:text-sea"
      >
        {copied ? "copied" : "copy"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </span>
  );
}
