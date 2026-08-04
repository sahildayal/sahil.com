import Link from "next/link";
import { Container } from "@/components/primitives";

/**
 * An empty screen is an invitation to act — so this offers the three places
 * worth going rather than apologising.
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <span className="eyebrow">Error 404</span>
      <h1 className="mt-4 font-display display-wide text-[clamp(2.25rem,8vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-tight">
        No page
        <br />
        at that address
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
        The link is wrong or the page has moved. These three are where most
        people are heading.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        <Link
          href="/"
          className="border-b border-clay pb-0.5 font-mono text-sm text-clay transition-colors hover:border-clay-hover hover:text-clay-hover"
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="border-b border-rule-strong pb-0.5 font-mono text-sm transition-colors hover:border-clay hover:text-clay"
        >
          Projects
        </Link>
        <Link
          href="/work"
          className="border-b border-rule-strong pb-0.5 font-mono text-sm transition-colors hover:border-clay hover:text-clay"
        >
          Work
        </Link>
      </div>
    </Container>
  );
}
