import type { Product } from "@/lib/contentful";

export type CoverEnter = "deal" | "swing" | "rise";

export type CoverLayer = {
  src: string;
  x: number;
  y: number;
  w: number;
  rot: number;
  depth: number;
  enter: CoverEnter;
  order: number;
  fd: number;
  fdl: number;
  fa?: number;
  still?: boolean;
  screen?: { clip: string; box: [number, number, number, number] };
};

export type CoverChip = { label: string; x: number; y: number; dx: number; dy: number };

type CaseDesign = {
  slug: string;
  accent: string;
  eyebrow: string;
  rigid?: boolean;
  layers: CoverLayer[];
  chip?: CoverChip;
};

// Visual direction for each chapter. Copy comes from Contentful; only motion,
// color and cover composition live here.
export const CASE_DESIGN: CaseDesign[] = [
  {
    slug: "bua-na-cainte",
    accent: "#34BCF6",
    eyebrow: "Design leadership & front-end",
    rigid: true,
    layers: [
      { src: "/images/story/bua-board.webp", x: 0.287, y: 0.121, w: 0.713, rot: 0, depth: 12, enter: "swing", order: 3, fd: 7.4, fdl: -2, fa: 8, still: true },
      {
        src: "/images/story/bua-crt.webp", x: 0, y: 0.459, w: 0.4, rot: 0, depth: 28, enter: "rise", order: 0, fd: 6.1, fdl: -4.5, fa: 9, still: true,
        screen: {
          clip: "polygon(29.49% 9.76%,57.25% 11.03%,90.94% 16.26%,94.70% 48.78%,93.54% 78.92%,57.25% 80.82%,28.63% 79.55%,28.63% 44.02%)",
          box: [28.63, 9.76, 66.07, 71.06],
        },
      },
    ],
  },
  {
    slug: "tomei",
    accent: "#2DAC78",
    eyebrow: "Product design & development",
    layers: [
      { src: "/images/story/tomei-phone-1.webp", x: 0, y: 0, w: 0.388, rot: -4, depth: 10, enter: "deal", order: 0, fd: 6.2, fdl: -1 },
      { src: "/images/story/tomei-phone-2.webp", x: 0.2, y: 0.08, w: 0.388, rot: -1.5, depth: 18, enter: "deal", order: 1, fd: 7.1, fdl: -3 },
      { src: "/images/story/tomei-phone-3.webp", x: 0.4, y: 0.16, w: 0.388, rot: 1.5, depth: 26, enter: "deal", order: 2, fd: 5.6, fdl: -2 },
      { src: "/images/story/tomei-phone-4.webp", x: 0.6, y: 0.24, w: 0.388, rot: 4, depth: 36, enter: "deal", order: 3, fd: 6.8, fdl: -4 },
    ],
  },
  {
    slug: "karakue",
    accent: "#E63A73",
    eyebrow: "Product design & development",
    layers: [
      { src: "/images/story/karakue-tv.webp", x: 0.08, y: 0.04, w: 0.92, rot: 0, depth: 12, enter: "swing", order: 0, fd: 9, fdl: -2, fa: 5 },
      { src: "/images/story/karakue-phone.webp", x: 0, y: 0.36, w: 0.36, rot: -3, depth: 32, enter: "rise", order: 3, fd: 6.4, fdl: -1 },
    ],
    chip: { label: "+ QUEUE · A Whole New World", x: 0.26, y: 0.65, dx: 0.61, dy: -0.15 },
  },
  {
    slug: "pdf-buddy-and-sortandgo",
    accent: "#F09637",
    eyebrow: "Workflow automation",
    rigid: true,
    layers: [
      { src: "/images/story/pdf-buddy.webp", x: 0, y: 0, w: 0.62, rot: 0, depth: 14, enter: "swing", order: 0, fd: 7.2, fdl: -1, fa: 9, still: true },
      { src: "/images/story/sortandgo.webp", x: 0.38, y: 0.47, w: 0.62, rot: 0, depth: 24, enter: "swing", order: 3, fd: 6.3, fdl: -3.5, fa: 9, still: true },
    ],
  },
];

export const INTRO_ACCENT = "#D9824F";

export const EXTRA_LINKS: Record<string, { label: string; url: string }[]> = {
  "pdf-buddy-and-sortandgo": [
    { label: "PDF Buddy", url: "https://pdfbuddy.brunix.studio" },
    { label: "SortAndGo", url: "https://sortandgo.brunix.studio" },
  ],
};

export type Chapter = {
  slug: string;
  name: string;
  accent: string;
  eyebrow: string;
  headline: string;
  description: string;
  category?: string;
  role?: string;
  status?: string;
  before?: string;
  after?: string;
  evidence?: string;
  imageAlt: string;
  heroImage?: { url: string; alt?: string; width?: number; height?: number };
  links: { label: string; url: string }[];
  rigid: boolean;
  layers: CoverLayer[];
  chip?: CoverChip;
};

export function buildChapters(products: Product[]): Chapter[] {
  return CASE_DESIGN.flatMap((design) => {
    const p = products.find((x) => x.slug === design.slug);
    if (!p) return [];
    const name = p.home.projectName || p.title.split(" - ")[0];
    const links = EXTRA_LINKS[design.slug] ?? (p.productUrl ? [{ label: name, url: p.productUrl }] : []);
    return [{
      slug: design.slug,
      name,
      accent: design.accent,
      eyebrow: design.eyebrow,
      headline: p.home.headline || "",
      description: p.frontPageText,
      category: p.home.category,
      role: p.home.role,
      status: p.home.status,
      before: p.home.before,
      after: p.home.after,
      evidence: p.home.evidence,
      imageAlt: p.home.image?.alt || p.coverImage?.alt || name,
      heroImage: p.home.image || p.coverImage,
      links,
      rigid: Boolean(design.rigid),
      layers: design.layers,
      chip: design.chip,
    }];
  });
}

export function accentFor(slug: string): string {
  return CASE_DESIGN.find((d) => d.slug === slug)?.accent ?? INTRO_ACCENT;
}

export type Facet = { key: string; ring: "a" | "b"; label: string; title: string; body: string; seen: string[] };

export const FACETS: Facet[] = [
  { key: "product", ring: "a", label: "Product Design", title: "Product design", body: "I connect business goals, user needs, and hands-on development to build useful products, from educational platforms to tools people use every day.", seen: ["bua-na-cainte", "tomei", "karakue", "pdf-buddy-and-sortandgo"] },
  { key: "builder", ring: "a", label: "Product Builder", title: "Product builder", body: "I don’t stop at the mockup: I design, build and deploy the product myself, taking it through user tests, live pilots and launch prep.", seen: ["tomei", "karakue", "pdf-buddy-and-sortandgo"] },
  { key: "systems", ring: "a", label: "Design Systems", title: "Design systems", body: "Built and scaled a unified design system adopted across 3,500+ products, enabling faster handoffs and consistent user experience.", seen: ["bua-na-cainte"] },
  { key: "leadership", ring: "a", label: "Leadership", title: "Design leadership", body: "Led the Flash-to-HTML5 modernization of Bua na Cainte, moved the team from Dropbox/FTP to Git and Jira, and acted as the bridge between stakeholders and the technical team.", seen: ["bua-na-cainte"] },
  { key: "prototyping", ring: "b", label: "AI Prototyping", title: "AI-assisted prototyping", body: "AI-assisted development lets me prototype, test, and iterate faster. Tomei’s MVP took 8 hours, with the first user test after ~20 hours of work.", seen: ["tomei", "karakue", "pdf-buddy-and-sortandgo"] },
  { key: "testing", ring: "b", label: "User Testing", title: "Testing with real people", body: "Decisions get validated in real use: teacher-testers in classrooms, Android testers using Tomei daily, and live karaoke nights in pubs and bars.", seen: ["bua-na-cainte", "tomei", "karakue"] },
  { key: "automation", ring: "b", label: "Automation", title: "Workflow automation", body: "I turn repetitive work into tools, cutting resource-production tasks by 10x+ and turning PDF, thumbnail, title, and SVG workflows from hours into seconds.", seen: ["pdf-buddy-and-sortandgo", "bua-na-cainte"] },
  { key: "mba", ring: "b", label: "MBA", title: "MBA in Entrepreneurial Management and Innovation", body: "I previously founded and ran a VR company. That experience and my MBA in Entrepreneurial Management and Innovation help me balance user needs with business viability, set priorities, and decide what to build.", seen: [] },
  { key: "origins", ring: "b", label: "Origins", title: "Where it started", body: "My interest in building started with taking motors out of toy cars to make small fans and boats. That curiosity led me to design and development with Unity, Unreal, and HTML/CSS.", seen: [] },
  { key: "offhours", ring: "b", label: "Off hours", title: "Off the clock", body: "Outside of work, I enjoy running, photography, cooking, and playing guitar.", seen: [] },
];

export const CONTACT = {
  email: "hello@brunopinheiro.eu",
  linkedin: "https://linkedin.com/in/brunopinheiroeu",
  github: "https://github.com/brunopinheiroeu",
  cv: "/cv/Bruno_Pinheiro_CV_EN.pdf",
};
