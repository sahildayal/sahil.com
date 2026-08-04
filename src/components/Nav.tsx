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

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8"
      >
        <Link
          href="/"
          className="font-display display-narrow text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:text-clay"
        >
          Sahil Dayal
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <ul className="flex items-center gap-4 sm:gap-6">
            {links.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`eyebrow transition-colors hover:text-clay ${
                      active ? "text-clay" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="h-3 w-px bg-rule-strong" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
