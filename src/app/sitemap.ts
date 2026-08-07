import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/content/services";
import { PROJECTS } from "@/lib/content/projects";
import { POSTS } from "@/lib/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${SITE.url}${path}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/process", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
  ].map((route) => ({
    url: url(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [
    ...staticRoutes,
    ...SERVICES.map((service) => ({
      url: url(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...PROJECTS.map((project) => ({
      url: url(`/projects/${project.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...POSTS.map((post) => ({
      url: url(`/insights/${post.slug}`),
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
