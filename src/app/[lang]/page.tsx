import { notFound } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { CallToAction } from "@/components/cta";
import { Destinations } from "@/components/destinations";
import { Experiences } from "@/components/experiences";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Statement } from "@/components/statement";
import { Testimonials } from "@/components/testimonials";
import { ValueCarousel } from "@/components/value-carousel";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <SiteHeader dict={dict} lang={lang} />
      <main className="flex-1">
        <Hero dict={dict} />
        <Statement dict={dict} />
        <ValueCarousel dict={dict} />
        <Experiences dict={dict} />
        <Gallery dict={dict} />
        <Destinations dict={dict} />
        <Marquee dict={dict} />
        <Services dict={dict} />
        <HowItWorks dict={dict} />
        <Testimonials dict={dict} />
        <CallToAction dict={dict} />
      </main>
      <SiteFooter dict={dict} />
      <BottomNav dict={dict} />
    </>
  );
}
