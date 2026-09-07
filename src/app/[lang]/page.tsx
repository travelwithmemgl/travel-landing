import { notFound } from "next/navigation";
import { CompanyStats } from "@/components/company-stats";
import { CallToAction } from "@/components/cta";
import { Destinations } from "@/components/destinations";
import { Experiences } from "@/components/experiences";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { Statement } from "@/components/statement";
import { TripSearchProvider } from "@/components/trip-search";
import { ValueCarousel } from "@/components/value-carousel";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

/**
 * The whole site is this one page. Contact is the only thing the header links
 * to, and it opens a dialog rather than leading anywhere else.
 */
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    // The hero search bar and the tour grid share one set of filters.
    <TripSearchProvider>
      <Hero dict={dict} />
      <Statement dict={dict} />
      <ValueCarousel dict={dict} />
      <Experiences dict={dict} />
      <Gallery dict={dict} />
      <Destinations dict={dict} />
      <Marquee dict={dict} />
      <Services dict={dict} />
      <HowItWorks dict={dict} />
      <CompanyStats dict={dict} />
      <CallToAction dict={dict} />
    </TripSearchProvider>
  );
}
