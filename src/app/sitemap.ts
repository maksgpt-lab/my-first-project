import type { MetadataRoute } from "next";
import { getCourses } from "@/lib/courses";
import { getGuides } from "@/lib/guides";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-first-project-five-beta.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const courses = getCourses();
  const guides = getGuides();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/courses`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/guides`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/prompts`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.5 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses.flatMap((course) => [
    {
      url: `${BASE_URL}/courses/${course.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...course.lessons
      .filter((l) => l.free)
      .map((lesson) => ({
        url: `${BASE_URL}/courses/${course.slug}/${lesson.slug}`,
        lastModified: new Date(),
        priority: 0.7,
      })),
  ]);

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes, ...guideRoutes];
}
