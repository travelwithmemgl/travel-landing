import { notFound } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { CallToAction } from "@/components/cta";
import { Destinations } from "@/components/destinations";
import { Experiences } from "@/components/experiences";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Marquee } from "@/components/marquee";
import { ScrollReveal } from "@/components/reveal";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Statement } from "@/components/statement";
import { TripSearchProvider } from "@/components/trip-search";
import { ValueCarousel } from "@/components/value-carousel";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    // The hero search bar and the tour grid share one set of filters.
    <TripSearchProvider>
      <ScrollReveal />
      <SiteHeader dict={dict} lang={lang} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero dict={dict} />
        <Statement dict={dict} />
        <ValueCarousel dict={dict} />
        <Experiences dict={dict} />
        <Gallery dict={dict} />
        <Destinations dict={dict} />
        <Marquee dict={dict} />
        <Services dict={dict} />
        <HowItWorks dict={dict} />
        <CallToAction dict={dict} />
      </main>
      <SiteFooter dict={dict} />
      <BottomNav dict={dict} />
    </TripSearchProvider>
  );
}
