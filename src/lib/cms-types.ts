export type HeadlineLine = {
  text: string;
  highlight?: string;
};

export type CtaItem = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "link";
};

export type HeroContent = {
  eyebrow: string;
  headline: HeadlineLine[];
  subtext: string;
  bullets: string;
  ctas: CtaItem[];
  backgroundImageUrl: string;
};

export type NavItem = {
  label: string;
  href: string;
  type?: "route" | "anchor";
};

export type HeaderContent = {
  brand: string;
  nav: NavItem[];
  studentAreaLabel: string;
  ctaLabel: string;
  ctaHref: string;
};

export type CourseItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  imageUrl: string;
  highlight: boolean;
  disabled: boolean;
};

export type CoursesContent = {
  title: string;
  titleHighlight: string;
  subtitle: string;
  courses: CourseItem[];
};

export type PillarItem = {
  numeral: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
};

export type MethodContent = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  processLabel: string;
  processSteps: string[];
  callout: string;
  pillarsLabel: string;
  footerText: string;
  imageUrl: string;
  pillars: PillarItem[];
};

export type JourneyDay = {
  day: string;
  title: string;
  subtitle: string;
  emoji: string;
};

export type JourneyContent = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  days: JourneyDay[];
};

export type CoupleJourneyContent = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  tagline: string;
  description: string;
  pillars: string[];
  comingSoonTitle: string;
  comingSoonDescription: string;
  ctaLabel: string;
  imageUrl: string;
  comingSoon: boolean;
};

export type JourneysContent = {
  woman: JourneyContent;
  man: JourneyContent;
  couple: CoupleJourneyContent;
};

export type MissaoLiberteContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  batchLabel: string;
  batchDate: string;
  benefits: string[];
  ctaLabel: string;
  ctaHref: string;
  price: string;
  priceCents: number;
  imageUrl: string;
};

export type FeaturesContent = {
  title: string;
  titleHighlight: string;
  subtitle: string;
  eyebrow: string;
  moduleTitle: string;
  moduleTitleHighlight: string;
  description: string;
  benefits: string[];
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
};

export type ProofPoint = {
  icon: string;
  title: string;
  description: string;
};

export type Testimonial = {
  imageUrl: string;
  alt: string;
};

export type SocialProofContent = {
  title: string;
  titleHighlight: string;
  subtitle: string;
  points: ProofPoint[];
  testimonials: Testimonial[];
};

export type BankInfoItem = {
  label: string;
  value: string;
};

export type PricingPlan = {
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string | null;
  features: string[];
  cta: string;
  highlight: boolean;
  bonus: string | null;
  qrCodeUrl: string;
};

export type PricingContent = {
  title: string;
  titleHighlight: string;
  subtitle: string;
  footerNote: string;
  bankInfo: BankInfoItem[];
  plans: PricingPlan[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  title: string;
  titleHighlight: string;
  subtitle: string;
  faqs: FaqItem[];
};

export type FooterContent = {
  address: string;
  hoursTitle: string;
  hours: string[];
  subscribersTitle: string;
  studentAreaLabel: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  brand: string;
  copyright: string;
};

export type LandingContent = {
  hero: HeroContent;
  missao_liberte: MissaoLiberteContent;
  header: HeaderContent;
  courses: CoursesContent;
  method: MethodContent;
  journeys: JourneysContent;
  features: FeaturesContent;
  social_proof: SocialProofContent;
  pricing: PricingContent;
  faq: FaqContent;
  footer: FooterContent;
};

export type ThemeVariables = Record<string, string>;

export type ThemeSettings = {
  light: ThemeVariables;
  dark: ThemeVariables;
};

export type SectionKey = keyof LandingContent;
