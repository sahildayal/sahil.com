import { profile } from "@/content/profile";
import { TideLine } from "./TideLine";
import { CopyEmail } from "./CopyEmail";

export function Footer() {
  return (
    <footer className="relative z-10 mt-24">
      <TideLine seed={2} />
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display display-wide text-2xl font-bold leading-none tracking-tight">
              Let&apos;s talk
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {profile.availability}. Based in {profile.location}, open to
              relocation.
            </p>
            <CopyEmail className="mt-4" />
          </div>

          <ul className="flex gap-6">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="eyebrow transition-colors hover:text-sea"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="eyebrow transition-colors hover:text-sea"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <p className="eyebrow mt-12 pt-6">
          Built by hand · Next.js · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
