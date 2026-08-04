"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/world", label: "World" },
  { href: "/about", label: "About" },
];

/**
 * Everything here is sized down at the 375px end (iPhone SE) — the full
 * wordmark plus five labels at the desktop size overflowed the bar. The brand
 * shortens to initials, tracking and gaps tighten, and the row is allowed to
 * wrap so it can never spill off-screen.
 */
const itemClass =
  "font-mono text-[0.625rem] uppercase leading-none tracking-[0.08em] text-muted transition-colors hover:text-clay sm:text-[0.6875rem] sm:tracking-[0.14em]";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3.5 sm:gap-x-4 sm:px-8"
      >
        <Link
          href="/"
          className="font-display display-narrow shrink-0 text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:text-clay"
        >
          <span className="sm:hidden">SD</span>
          <span className="hidden sm:inline">Sahil Dayal</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <ul className="flex items-center gap-3 sm:gap-6">
            {links.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`${itemClass} ${active ? "text-clay" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span
            className="hidden h-3 w-px bg-rule-strong sm:block"
            aria-hidden="true"
          />
          <ThemeToggle className={itemClass} />
        </div>
      </nav>
    </header>
  );
}
