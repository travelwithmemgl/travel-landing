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

export const navKeys = [
  { key: "about", href: "#about" },
  { key: "experiences", href: "#experiences" },
  { key: "trips", href: "#trips" },
  { key: "services", href: "#services" },
  { key: "how", href: "#how" },
  { key: "contact", href: "#contact" },
] as const;

/** Mobile tab bar: a short subset of nav, with the section each tab watches. */
export const tabKeys = [
  { key: "home", href: "#top", section: "top" },
  { key: "experiences", href: "#experiences", section: "experiences" },
  { key: "trips", href: "#trips", section: "trips" },
  { key: "services", href: "#services", section: "services" },
  { key: "contact", href: "#contact", section: "contact" },
] as const;
export type TabKey = (typeof tabKeys)[number]["key"];

export const heroImage = "/photos/hero.jpg";

export const proofAvatars = [
  "/photos/avatar-1.jpg",
  "/photos/avatar-2.jpg",
  "/photos/avatar-3.jpg",
];

export const proofExtra = "+5";

export const slideKeys = ["altai", "khangai", "khuvsgul", "gobi", "steppe"] as const;
export type SlideKey = (typeof slideKeys)[number];

export const slideImages: Record<SlideKey, string> = {
  altai: "/photos/slide-altai.jpg",
  khangai: "/photos/slide-khangai.jpg",
  khuvsgul: "/photos/slide-khuvsgul.jpg",
  gobi: "/photos/slide-gobi.jpg",
  steppe: "/photos/slide-steppe.jpg",
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
    image: "/photos/trip-naadam.jpg",
  },
  {
    id: "snow-leopard",
    region: "khovd",
    type: "adventure",
    slots: 4,
    image: "/photos/trip-leopard.jpg",
  },
  {
    id: "enduro",
    region: "tuv",
    type: "adventure",
    slots: 6,
    image: "/photos/trip-enduro.jpg",
  },
  {
    id: "fishing",
    region: "khentii",
    type: "private",
    slots: 5,
    image: "/photos/trip-fishing.jpg",
  },
  {
    id: "gobi",
    region: "umnugovi",
    type: "open",
    slots: 6,
    image: "/photos/trip-gobi.jpg",
  },
  {
    id: "khuvsgul",
    region: "khuvsgul",
    type: "open",
    slots: 10,
    image: "/photos/trip-khuvsgul.jpg",
  },
];

/** Photo set shown in each tour's dialog; alt text lives in `trips.items[id].gallery`. */
export const tripGalleries: Record<string, string[]> = {
  "naadam": ["/photos/trip-naadam.jpg", "/photos/exp-naadam.jpg", "/photos/exp-naadam-inset.jpg", "/photos/gal-2.jpg", "/photos/slide-khangai.jpg"],
  "snow-leopard": ["/photos/trip-leopard.jpg", "/photos/exp-leopard.jpg", "/photos/exp-leopard-inset.jpg", "/photos/slide-altai.jpg", "/photos/gal-3.jpg"],
  "enduro": ["/photos/trip-enduro.jpg", "/photos/exp-enduro.jpg", "/photos/exp-enduro-inset.jpg", "/photos/slide-steppe.jpg"],
  "fishing": ["/photos/trip-fishing.jpg", "/photos/exp-fishing.jpg", "/photos/exp-fishing-inset.jpg", "/photos/exp-mongolia-inset.jpg"],
  "gobi": ["/photos/trip-gobi.jpg", "/photos/slide-gobi.jpg", "/photos/gal-5.jpg", "/photos/exp-mongolia-inset.jpg"],
  "khuvsgul": ["/photos/trip-khuvsgul.jpg", "/photos/slide-khuvsgul.jpg", "/photos/cta.jpg", "/photos/gal-6.jpg"],
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

/** Section anchor for each footer link, in the same order as the dictionary lists. */
export const footerColumnHrefs: Record<FooterColumnKey, string[]> = {
  explore: ["#trips", "#trips", "#trips", "#trips"],
  company: ["#about", "#about", "#services", "#contact"],
  support: ["#services", "#trips", "#services", "#contact"],
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
    file: "Ger Camp - Dornogovi Province - Mongolia (6246458387).jpg",
    author: "David Berkowitz from New York, NY, USA",
    license: "CC BY 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Ger_Camp_-_Dornogovi_Province_-_Mongolia_(6246458387).jpg",
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
];
