import type { Metadata } from "next";
import { Archivo, Newsreader, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/content/profile";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://sahildayal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.intro,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
  },
  robots: { index: true, follow: true },
};

/**
 * Applies the stored theme before first paint so the page never flashes the
 * wrong ground. Kept tiny and inline on purpose.
 */
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${newsreader.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-clay focus:text-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
