"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { projects } from "@/content/projects";
import { profile, resumeUrl } from "@/content/profile";
import { ContactComposer } from "./ContactComposer";

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: "Actions" | "Go to" | "Case studies";
  run: () => void | Promise<void>;
};

/** Subsequence match, so "opm" finds "OpenMusic". Returns null for no match. */
function score(query: string, text: string): number | null {
  if (!query) return 0;
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  const direct = t.indexOf(q);
  if (direct !== -1) return direct === 0 ? 1000 : 500 - direct;

  let qi = 0;
  let points = 0;
  let lastHit = -1;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      points += lastHit === ti - 1 ? 6 : 2;
      lastHit = ti;
      qi++;
    }
  }
  return qi === q.length ? points : null;
}

export function CommandPalette() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"list" | "contact">("list");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    setMode("list");
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  const openExternal = useCallback(
    (href: string) => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [close],
  );

  const items = useMemo<Item[]>(() => {
    const base: Item[] = [
      {
        id: "contact",
        label: "Contact",
        hint: "send me a message",
        group: "Actions",
        run: () => {
          setMode("contact");
          setQuery("");
        },
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            window.location.assign(`mailto:${profile.email}`);
          }
        },
      },
      {
        id: "theme",
        label: "Toggle light / dark",
        group: "Actions",
        run: () => {
          const root = document.documentElement;
          const current =
            root.getAttribute("data-theme") ??
            (window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light");
          const next = current === "dark" ? "light" : "dark";
          root.setAttribute("data-theme", next);
          try {
            localStorage.setItem("theme", next);
          } catch {}
        },
      },
      { id: "home", label: "Home", group: "Go to", run: () => go("/") },
      { id: "work", label: "Work", group: "Go to", run: () => go("/work") },
      {
        id: "projects",
        label: "Projects",
        group: "Go to",
        run: () => go("/projects"),
      },
      {
        id: "world",
        label: "World",
        hint: "Oman, football, the kitchen",
        group: "Go to",
        run: () => go("/world"),
      },
      { id: "about", label: "About", group: "Go to", run: () => go("/about") },
      {
        id: "github",
        label: "GitHub",
        hint: "github.com/sahildayal",
        group: "Go to",
        run: () => openExternal(profile.github),
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        group: "Go to",
        run: () => openExternal(profile.linkedin),
      },
    ];

    // Captured so the closure keeps the narrowed non-null type.
    const resume = resumeUrl;
    if (resume) {
      base.splice(1, 0, {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        group: "Actions",
        run: () => openExternal(resume),
      });
    }

    for (const p of projects) {
      base.push({
        id: `p-${p.slug}`,
        label: p.title,
        hint: p.kicker,
        group: "Case studies",
        run: () => go(`/projects/${p.slug}`),
      });
    }

    return base;
  }, [go, openExternal]);

  const results = useMemo(() => {
    if (!query.trim()) return items;
    return items
      .map((item) => {
        const s = Math.max(
          score(query.trim(), item.label) ?? -1,
          (score(query.trim(), item.hint ?? "") ?? -1) - 200,
        );
        return { item, s };
      })
      .filter((r) => r.s >= 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.item);
  }, [items, query]);

  /* Highlight resets when the query changes. Done in the change handler
     rather than an effect — setState inside an effect body cascades renders. */
  const onQueryChange = (value: string) => {
    setQuery(value);
    setActive(0);
  };

  // ---- open / close shortcut, plus the nav button's custom event ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, []);

  // ---- while open: lock scroll, pause Lenis, manage focus ----
  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    document.body.dataset.scrollLocked = "true";
    window.__lenis?.stop();
    inputRef.current?.focus();

    return () => {
      delete document.body.dataset.scrollLocked;
      window.__lenis?.start();
      restoreFocusTo.current?.focus?.();
    };
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (mode === "contact") setMode("list");
      else close();
      return;
    }

    // Simple focus trap.
    if (e.key === "Tab") {
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return;
    }

    if (mode !== "list") return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) =>
        results.length ? (i - 1 + results.length) % results.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
    }
  };

  // keep the highlighted row in view
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, results.length]);

  if (!mounted || !open) return null;

  let lastGroup = "";

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]"
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        aria-label="Close command palette"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-flap/45 backdrop-blur-[2px]"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl overflow-hidden rounded-[8px] bg-paper shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-sea/25"
      >
        {mode === "list" ? (
          <>
            <div className="flex items-center gap-2 px-4 py-3">
              <span
                className="tabular select-none text-sm text-sea"
                aria-hidden="true"
              >
                &gt;
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Jump to a page, or type contact"
                aria-label="Search commands"
                aria-controls="palette-results"
                autoComplete="off"
                spellCheck={false}
                className="tabular w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              />
              <kbd className="tabular hidden shrink-0 rounded bg-paper-raised px-1.5 py-0.5 text-[0.65rem] text-muted sm:block">
                esc
              </kbd>
            </div>

            <div className="h-px w-full bg-sea/15" />

            <ul
              id="palette-results"
              ref={listRef}
              role="listbox"
              aria-label="Commands"
              className="max-h-[46vh] overflow-y-auto py-2"
            >
              {results.length === 0 ? (
                <li className="px-4 py-6 text-sm text-muted">
                  Nothing matches that. Try <em>work</em>, <em>oman</em>, or{" "}
                  <em>contact</em>.
                </li>
              ) : (
                results.map((item, i) => {
                  const header = item.group !== lastGroup ? item.group : null;
                  lastGroup = item.group;
                  return (
                    <li key={item.id}>
                      {header ? (
                        <p className="eyebrow px-4 pb-1 pt-3 text-xs">
                          {header}
                        </p>
                      ) : null}
                      <button
                        type="button"
                        role="option"
                        aria-selected={i === active}
                        data-active={i === active}
                        onMouseMove={() => setActive(i)}
                        onClick={() => item.run()}
                        className={`flex w-full items-baseline gap-3 px-4 py-2 text-left transition-colors ${
                          i === active ? "bg-sea-wash" : ""
                        }`}
                      >
                        <span className="text-sm text-ink">{item.label}</span>
                        {item.hint ? (
                          <span className="truncate text-xs text-muted">
                            {item.hint}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>

            <div className="flex items-center justify-between gap-3 bg-paper-raised px-4 py-2">
              <span className="tabular text-[0.65rem] text-muted">
                ↑↓ move · ⏎ select · esc close
              </span>
              <span className="tabular text-[0.65rem] text-sea" aria-live="polite">
                {copied ? "Email copied" : `${results.length} results`}
              </span>
            </div>
          </>
        ) : (
          <ContactComposer onBack={() => setMode("list")} onDone={close} />
        )}
      </div>
    </div>,
    document.body,
  );
}
