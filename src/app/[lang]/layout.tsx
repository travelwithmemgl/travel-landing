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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
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

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${notoKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
