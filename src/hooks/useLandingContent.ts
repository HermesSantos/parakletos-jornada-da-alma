import { useQuery } from "@tanstack/react-query";
import { getLandingContent } from "@/lib/api";
import { defaultLandingContent } from "@/lib/cms-defaults";
import type { LandingContent } from "@/lib/cms-types";

function mergeLandingContent(data: Partial<LandingContent>): LandingContent {
  return {
    hero: { ...defaultLandingContent.hero, ...data.hero },
    header: { ...defaultLandingContent.header, ...data.header },
    courses: {
      ...defaultLandingContent.courses,
      ...data.courses,
      courses: data.courses?.courses ?? defaultLandingContent.courses.courses,
    },
    method: {
      ...defaultLandingContent.method,
      ...data.method,
      pillars: data.method?.pillars ?? defaultLandingContent.method.pillars,
      processSteps: data.method?.processSteps ?? defaultLandingContent.method.processSteps,
    },
    journeys: {
      woman: { ...defaultLandingContent.journeys.woman, ...data.journeys?.woman, days: data.journeys?.woman?.days ?? defaultLandingContent.journeys.woman.days },
      man: { ...defaultLandingContent.journeys.man, ...data.journeys?.man, days: data.journeys?.man?.days ?? defaultLandingContent.journeys.man.days },
      couple: { ...defaultLandingContent.journeys.couple, ...data.journeys?.couple },
    },
    features: {
      ...defaultLandingContent.features,
      ...data.features,
      benefits: data.features?.benefits ?? defaultLandingContent.features.benefits,
    },
    social_proof: {
      ...defaultLandingContent.social_proof,
      ...data.social_proof,
      points: data.social_proof?.points ?? defaultLandingContent.social_proof.points,
      testimonials: data.social_proof?.testimonials ?? defaultLandingContent.social_proof.testimonials,
    },
    pricing: {
      ...defaultLandingContent.pricing,
      ...data.pricing,
      bankInfo: data.pricing?.bankInfo ?? defaultLandingContent.pricing.bankInfo,
      plans: data.pricing?.plans ?? defaultLandingContent.pricing.plans,
    },
    faq: {
      ...defaultLandingContent.faq,
      ...data.faq,
      faqs: data.faq?.faqs ?? defaultLandingContent.faq.faqs,
    },
    footer: { ...defaultLandingContent.footer, ...data.footer },
  };
}

export function useLandingContent() {
  return useQuery({
    queryKey: ["landing-content"],
    queryFn: getLandingContent,
    select: mergeLandingContent,
    staleTime: 60_000,
    retry: 1,
  });
}
