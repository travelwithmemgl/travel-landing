/**
 * Language-independent content for the landing page.
 *
 * Every photograph is a real image of Mongolia sourced from Wikimedia Commons
 * and vendored into public/photos — Commons rate-limits hotlinking, so the files
 * are served from our own origin and next/image resizes them. Attribution for
 * every file lives in `photoCredits` and is rendered in the footer.
 *
 * All display text lives in src/dictionaries.
 */

/**
 * The sections the header and the mobile tab bar navigate between. Contact is
 * not here — it opens a dialog rather than leading anywhere.
 *
 * `section` is the id the tab bar watches to work out which tab is current.
 */
export const navKeys = [
  { key: "home", href: "#top", section: "top" },
  { key: "about", href: "#about", section: "about" },
  { key: "trips", href: "#trips", section: "trips" },
] as const;
export type NavKey = (typeof navKeys)[number]["key"];

/** Builds an in-site path from a locale and a page slug; "" is the home page. */
export function pagePath(lang: string, slug: string) {
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

export const heroImage = "/photos/hero.jpg";

export const proofAvatars = [
  "/photos/avatar-1.jpg",
  "/photos/avatar-2.jpg",
  "/photos/avatar-3.jpg",
];

export const proofExtra = "+5";

export const slideKeys = ["altai", "khangai", "khuvsgul", "gobi"] as const;
export type SlideKey = (typeof slideKeys)[number];

export const slideImages: Record<SlideKey, string> = {
  altai: "/photos/slide-altai.jpg",
  khangai: "/photos/slide-khangai.jpg",
  khuvsgul: "/photos/slide-khuvsgul.jpg",
  gobi: "/photos/slide-gobi.jpg",
};

export const experienceKeys = [
  "mongolia",
  "naadam",
  "enduro",
  "snowLeopard",
  "fishing",
] as const;
export type ExperienceKey = (typeof experienceKeys)[number];

export const experienceImages: Record<ExperienceKey, { main: string; inset: string }> = {
  mongolia: {
    main: "/photos/exp-mongolia.jpg",
    inset: "/photos/exp-mongolia-inset.jpg",
  },
  naadam: {
    main: "/photos/exp-naadam.jpg",
    inset: "/photos/exp-naadam-inset.jpg",
  },
  enduro: {
    main: "/photos/exp-enduro.jpg",
    inset: "/photos/exp-enduro-inset.jpg",
  },
  snowLeopard: {
    main: "/photos/exp-leopard.jpg",
    inset: "/photos/exp-leopard-inset.jpg",
  },
  fishing: {
    main: "/photos/exp-fishing.jpg",
    inset: "/photos/exp-fishing-inset.jpg",
  },
};

export const serviceKeys = ["outbound", "domestic", "custom", "advice"] as const;

/** Mosaic tiles; `wide` cells span two columns. */
export const galleryImages = [
  { src: "/photos/gal-1.jpg", wide: true },
  { src: "/photos/gal-2.jpg", wide: false },
  { src: "/photos/gal-3.jpg", wide: false },
  { src: "/photos/gal-4.jpg", wide: false },
  { src: "/photos/gal-5.jpg", wide: false },
  { src: "/photos/gal-6.jpg", wide: false },
  { src: "/photos/gal-7.jpg", wide: false },
  { src: "/photos/gal-9.jpg", wide: false },
  { src: "/photos/gal-10.jpg", wide: false },
  { src: "/photos/gal-8.jpg", wide: true },
];

export type RegionKey = "tuv" | "umnugovi" | "khuvsgul" | "khovd" | "khentii";
export type TripTypeKey = "open" | "private" | "adventure";

export type Trip = {
  id: string;
  region: RegionKey;
  type: TripTypeKey;
  slots: number;
  image: string;
};

export const trips: Trip[] = [
  {
    id: "naadam",
    region: "tuv",
    type: "open",
    slots: 8,
    image: "/photos/trip-naadam-1.jpg",
  },
  {
    id: "snow-leopard",
    region: "khovd",
    type: "adventure",
    slots: 4,
    image: "/photos/trip-leopard-1.jpg",
  },
  {
    id: "enduro",
    region: "tuv",
    type: "adventure",
    slots: 6,
    image: "/photos/trip-enduro-5.jpg",
  },
  {
    id: "fishing",
    region: "khentii",
    type: "private",
    slots: 5,
    image: "/photos/trip-fishing-1.jpg",
  },
  {
    id: "gobi",
    region: "umnugovi",
    type: "open",
    slots: 6,
    image: "/photos/trip-gobi-1.jpg",
  },
  {
    id: "khuvsgul",
    region: "khuvsgul",
    type: "open",
    slots: 10,
    image: "/photos/trip-khuvsgul-1.jpg",
  },
];

/** The photographs shown in each tour's dialog; alt text lives in `trips.items[id].gallery`. */
export const tripGalleries: Record<string, string[]> = {
  "naadam": [
    "/photos/trip-naadam-1.jpg",
    "/photos/trip-naadam-2.jpg",
    "/photos/trip-naadam-3.jpg",
    "/photos/trip-naadam-4.jpg",
  ],
  "snow-leopard": [
    "/photos/trip-leopard-1.jpg",
    "/photos/trip-leopard-2.jpg",
    "/photos/trip-leopard-3.jpg",
    "/photos/trip-leopard-4.jpg",
  ],
  "enduro": [
    "/photos/trip-enduro-5.jpg",
    "/photos/trip-enduro-2.jpg",
    "/photos/trip-enduro-3.jpg",
    "/photos/trip-enduro-4.jpg",
    "/photos/trip-enduro-6.jpg",
  ],
  "fishing": [
    "/photos/trip-fishing-1.jpg",
    "/photos/trip-fishing-2.jpg",
    "/photos/trip-fishing-3.jpg",
    "/photos/trip-fishing-4.jpg",
  ],
  "gobi": [
    "/photos/trip-gobi-1.jpg",
    "/photos/trip-gobi-2.jpg",
    "/photos/trip-gobi-3.jpg",
    "/photos/trip-gobi-4.jpg",
  ],
  "khuvsgul": [
    "/photos/trip-khuvsgul-1.jpg",
    "/photos/trip-khuvsgul-2.jpg",
    "/photos/trip-khuvsgul-3.jpg",
    "/photos/trip-khuvsgul-4.jpg",
  ],
};

export const regionKeys: RegionKey[] = ["tuv", "umnugovi", "khuvsgul", "khovd", "khentii"];
export const tripTypeKeys: TripTypeKey[] = ["open", "private", "adventure"];

export const stepKeys = ["brief", "shape", "go"] as const;
export const statKeys = ["aimags", "programs", "guides", "languages"] as const;
export const statValues: Record<(typeof statKeys)[number], string> = {
  aimags: "21",
  programs: "30+",
  guides: "18",
  languages: "3",
};

export const ctaImage = "/photos/cta.jpg";

/** Real contact details for the agency, rendered in the footer. */
export const contact = {
  phone: "+976 9177 2040",
  phoneHref: "tel:+97691772040",
  email: "twithmellc@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61572250031542",
} as const;

export const footerColumnKeys = ["explore", "company", "support"] as const;
export type FooterColumnKey = (typeof footerColumnKeys)[number];

/** Page slug for each footer link, in the same order as the dictionary lists. */
/**
 * Every section lives on the one page, so these links lead back to it; `null`
 * opens the contact dialog instead of going anywhere.
 */
export const footerColumnSlugs: Record<FooterColumnKey, (string | null)[]> = {
  explore: ["", "", "", ""],
  company: ["", "", "", null],
  support: ["", "", "", null],
};

export type PhotoCredit = { file: string; author: string; license: string; page: string };

/** Attribution for every Commons photograph used on the page. */
export const photoCredits: PhotoCredit[] = [
  {
    file: "Krajobraz w Parku Narodowym Gorchi-Tereldż 17.JPG",
    author: "Marcin Konsek",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Krajobraz_w_Parku_Narodowym_Gorchi-Tereld%C5%BC_17.JPG",
  },
  {
    file: "Altai Tavan Bogd - Potanin glacier - panoramio.jpg",
    author: "Mongolia Expeditions…",
    license: "CC BY 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Altai_Tavan_Bogd_-_Potanin_glacier_-_panoramio.jpg",
  },
  {
    file: "Gorkhi-Terelj National Park.jpg",
    author: "Chongkian",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Gorkhi-Terelj_National_Park.jpg",
  },
  {
    file: "Lake Khövsgöl, Mongolia.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Lake_Kh%C3%B6vsg%C3%B6l%2C_Mongolia.jpg",
  },
  {
    file: "Khongoryn Els 14.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Khongoryn_Els_14.jpg",
  },
  {
    file: "Naadam 2023 - Horse racing 08.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Naadam_2023_-_Horse_racing_08.jpg",
  },
  {
    file: "Naadam 2023, Ulan Bator 08.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Naadam_2023%2C_Ulan_Bator_08.jpg",
  },
  {
    file: "Road in Mongolia aimak Bayan Ulgiy 02.jpg",
    author: "Alexandr frolov",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Road_in_Mongolia_aimak_Bayan_Ulgiy_02.jpg",
  },
  {
    file: "Vieh und motorisierter Hirte in der Mongolei.jpg",
    author: "GerritR",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Vieh_und_motorisierter_Hirte_in_der_Mongolei.jpg",
  },
  {
    file: "The Snow Leopard of Tost Mountain.png",
    author: "Snow Leopard Trust",
    license: "CC BY 3.0",
    page: "https://commons.wikimedia.org/wiki/File:The_Snow_Leopard_of_Tost_Mountain.png",
  },
  {
    file: "Kazakh Eagle Hunters.JPG",
    author: "Altaihunters",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Kazakh_Eagle_Hunters.JPG",
  },
  {
    file: "OnonRiver.jpg",
    author: "Chinneeb",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:OnonRiver.jpg",
  },
  {
    file: "Hucho taimen June 2007 Uur River.jpg",
    author: "Ojensen at English Wikipedia",
    license: "CC BY 2.5",
    page: "https://commons.wikimedia.org/wiki/File:Hucho_taimen_June_2007_Uur_River.jpg",
  },
  {
    file: "Naadam 2023, Ulan Bator 05.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Naadam_2023%2C_Ulan_Bator_05.jpg",
  },
  {
    file: "Kazakh Eagle Hunter with Golden Eagle in Bayan Olgii region, Mongolia.jpg",
    author: "Ceyhun Kavakci",
    license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Kazakh_Eagle_Hunter_with_Golden_Eagle_in_Bayan_Olgii_region%2C_Mongolia.jpg",
  },
  {
    file: "Rock Art around Khoit Tsenkher Cave in Mankhan Khovd 6.jpg",
    author: "BatboldDorjgurkhem",
    license: "CC BY 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Rock_Art_around_Khoit_Tsenkher_Cave_in_Mankhan_Khovd_6.jpg",
  },
  {
    file: "Khongoryn Els 02.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Khongoryn_Els_02.jpg",
  },
  {
    file: "Reindeer of Mongolia 02.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Reindeer_of_Mongolia_02.jpg",
  },
  {
    file: "Eagle hunter with his Golden Eagle in remote Western Mongolia, 2022-1.jpg",
    author: "Bfreeproductions",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Eagle_hunter_with_his_Golden_Eagle_in_remote_Western_Mongolia%2C_2022-1.jpg",
  },
  {
    file: "Naadam 2023 - Horse racing 02.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Naadam_2023_-_Horse_racing_02.jpg",
  },
  {
    file: "Altai Tavan Bogd - panoramio.jpg",
    author: "Mongolia Expeditions…",
    license: "CC BY 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Altai_Tavan_Bogd_-_panoramio.jpg",
  },
  {
    file: "Khongoryn Els 05.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Khongoryn_Els_05.jpg",
  },
  {
    file: "Nadaam Racers.jpg",
    author: "Mark Fischer",
    license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Nadaam_Racers.jpg",
  },
  {
    file: "Nadaam Opening Ceremony (19797326864).jpg",
    author: "Rob Oo from NL",
    license: "CC BY 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Nadaam_Opening_Ceremony_%2819797326864%29.jpg",
  },
  {
    file: "Naadam 2023, Ulan Bator 07.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Naadam_2023%2C_Ulan_Bator_07.jpg",
  },
  {
    file: "Mongolian Archery Competition.jpg",
    author: "Bfreeproductions",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Mongolian_Archery_Competition.jpg",
  },
  {
    file: "Найрамдал.jpg",
    author: "Avustfel",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:%D0%9D%D0%B0%D0%B9%D1%80%D0%B0%D0%BC%D0%B4%D0%B0%D0%BB.jpg",
  },
  {
    file: "Snow Leopard on Snowy Rocks (23966719139).jpg",
    author: "Eric Kilby from Somerville, MA, USA",
    license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Snow_Leopard_on_Snowy_Rocks_%2823966719139%29.jpg",
  },
  {
    file: "Pontuninii Glacier.JPG",
    author: "Altaihunters",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Pontuninii_Glacier.JPG",
  },
  {
    file: "Shaazgai Lake Шаазгай Нуур 04.jpg",
    author: "Alexandr frolov",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Shaazgai_Lake_%D0%A8%D0%B0%D0%B0%D0%B7%D0%B3%D0%B0%D0%B9_%D0%9D%D1%83%D1%83%D1%80_04.jpg",
  },
  {
    file: "202408 Around the tourist camp \"Xөсөг Tур\" 26.jpg",
    author: "Jonashtand",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:202408_Around_the_tourist_camp_%22X%D3%A9%D1%81%D3%A9%D0%B3_T%D1%83%D1%80%22_26.jpg",
  },
  {
    file: "DirtRoadMongolia (1).jpg",
    author: "CeeGee",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:DirtRoadMongolia_%281%29.jpg",
  },
  {
    file: "Mongolian highway (47537776342).jpg",
    author: "Rob Oo from NL",
    license: "CC BY 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Mongolian_highway_%2847537776342%29.jpg",
  },
  {
    file: "Ongii Monastery 21.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Ongii_Monastery_21.jpg",
  },
  {
    file: "Эг.JPG",
    author: "Sergelentuguldur",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:%D0%AD%D0%B3.JPG",
  },
  {
    file: "Hucho taimen.jpg",
    author: "タウナギ",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Hucho_taimen.jpg",
  },
  {
    file: "Slow flow (47648897441).jpg",
    author: "Rob Oo from NL",
    license: "CC BY 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Slow_flow_%2847648897441%29.jpg",
  },
  {
    file: "Steppe Eco Camp.jpg",
    author: "GerritR",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Steppe_Eco_Camp.jpg",
  },
  {
    file: "Camel at Khongoryn Els 01.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Camel_at_Khongoryn_Els_01.jpg",
  },
  {
    file: "Bayanzag (Flaming Cliffs).jpg",
    author: "Richard Mortel",
    license: "CC BY 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Bayanzag_%28Flaming_Cliffs%29.jpg",
  },
  {
    file: "Yolyn Am 02.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Yolyn_Am_02.jpg",
  },
  {
    file: "Horses in Khövsgöl 01.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Horses_in_Kh%C3%B6vsg%C3%B6l_01.jpg",
  },
  {
    file: "Lake Khuvsgul.jpg",
    author: "Lyallla",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Lake_Khuvsgul.jpg",
  },
  {
    file: "Alag Tsar Tourist Camp 01.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Alag_Tsar_Tourist_Camp_01.jpg",
  },
  {
    file: "Reindeers of Mongolia.jpg",
    author: "Bernard Gagnon",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Reindeers_of_Mongolia.jpg",
  },
];
