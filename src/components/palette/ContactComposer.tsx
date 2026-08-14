"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";

type State =
  | { kind: "editing" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

/**
 * The `contact` action's composer. A real form in a terminal costume — the
 * inputs are ordinary labelled fields so screen readers, autofill and mobile
 * keyboards all behave, and the styling does the rest.
 */
export function ContactComposer({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [state, setState] = useState<State>({ kind: "editing" });
  const firstField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    firstField.current?.focus();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === "sending") return;
    setState({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (res.ok && data.ok) {
        setState({ kind: "sent" });
        setTimeout(onDone, 2200);
      } else {
        setState({
          kind: "error",
          message: data.error ?? "That didn't send. Try again in a moment.",
        });
      }
    } catch {
      setState({
        kind: "error",
        message: `Network error. Email me directly at ${profile.email}.`,
      });
    }
  }

  const field =
    "w-full rounded-[4px] bg-paper-raised px-3 py-2 text-sm text-ink outline-none ring-1 ring-transparent transition focus:ring-sea/50 placeholder:text-muted";

  if (state.kind === "sent") {
    return (
      <div className="px-5 py-8" aria-live="polite">
        <p className="tabular text-sm text-sea">Message sent</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Thanks — it landed in my inbox and I&apos;ll reply to {email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <p className="tabular text-sm text-sea">
          &gt; contact <span className="text-muted">— say hello</span>
        </p>
        <button
          type="button"
          onClick={onBack}
          className="tabular text-[0.65rem] text-muted transition-colors hover:text-sea"
        >
          ← back
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="c-name" className="eyebrow">
            Your name
          </label>
          <input
            id="c-name"
            ref={firstField}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className={`mt-1 ${field}`}
          />
        </div>

        <div>
          <label htmlFor="c-email" className="eyebrow">
            Your email
          </label>
          <input
            id="c-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className={`mt-1 ${field}`}
          />
        </div>

        <div>
          <label htmlFor="c-message" className="eyebrow">
            Message
          </label>
          <textarea
            id="c-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className={`mt-1 resize-none ${field}`}
          />
        </div>

        {/* Honeypot — hidden from people, catnip for bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label htmlFor="c-company">Company</label>
          <input
            id="c-company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>

      {state.kind === "error" ? (
        <p
          className="mt-3 rounded-[4px] bg-rock-wash px-3 py-2 text-xs leading-relaxed text-ink-soft"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div className="mt-4 flex items-center justify-between gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="tabular text-[0.65rem] text-muted transition-colors hover:text-sea"
        >
          or just email me
        </a>
        <button
          type="submit"
          disabled={state.kind === "sending"}
          className="rounded-[4px] bg-sea px-4 py-2 font-mono text-xs text-paper transition-colors hover:bg-sea-hover disabled:opacity-60"
        >
          {state.kind === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
