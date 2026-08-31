import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";
import "../globals.css";

// Cyrillic ships alongside Latin so Mongolian renders in Inter too.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

// No `subsets` + `preload: false` keeps the Hangul unicode-ranges in the CSS;
// the browser only downloads the chunks a page actually uses.
const notoKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  preload: false,
});

// viewport-fit=cover lets the layout paint under the notch/home indicator, which
// is what makes the safe-area insets in globals.css do anything.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // The page is light in every scheme, so the browser chrome has to match.
  colorScheme: "light",
  themeColor: "#ffffff",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};

  const dict = await getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    appleWebApp: { capable: true, title: "Travel With Me", statusBarStyle: "black-translucent" },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])),
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${notoKR.variable} h-full antialiased`}
      // The reveal script below adds a class here before React hydrates, which
      // would otherwise be reported as a server/client mismatch.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        {/*
          Arms the scroll-reveal styles before first paint. Without JavaScript
          the class is never set and every section renders as normal.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(window.IntersectionObserver&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reveal-ready')}catch(e){}",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-[13px] focus:font-medium focus:text-white"
        >
          {dict.header.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
