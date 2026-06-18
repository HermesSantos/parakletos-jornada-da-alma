import type { AdminJourney } from "@/lib/api";
import type { CourseItem, CoursesContent } from "@/lib/cms-types";

const defaultHrefBySlug: Record<string, string> = {
  "missao-liberte": "#missao-liberte-se",
  "jornada-mulher": "#jornada-mulher",
  "jornada-homem": "#jornada-homem",
  "jornada-casal": "#jornada-casal",
};

export function mergeCoursesWithJourneys(
  cmsContent: CoursesContent,
  journeys: AdminJourney[],
): CourseItem[] {
  const byId = new Map(cmsContent.courses.map((course) => [course.id, course]));

  return [...journeys]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((journey) => {
      const existing = byId.get(journey.slug);

      if (existing) {
        return {
          ...existing,
          title: existing.title || journey.title,
          description: existing.description || journey.description || "",
        };
      }

      return {
        id: journey.slug,
        title: journey.title,
        subtitle: "",
        description: journey.description ?? "",
        href: defaultHrefBySlug[journey.slug] ?? `#${journey.slug}`,
        imageUrl: "",
        highlight: false,
        disabled: !journey.is_active,
      };
    });
}
