import type { MetadataRoute } from "next";
import { developments, deliveredExamples, blogPosts } from "@/lib/data";

const BASE_URL = "https://www.evolucengenharia.com.br";

const staticRoutes = [
  "",
  "/quem-somos",
  "/diferenciais",
  "/politica-de-qualidade",
  "/politica-de-privacidade",
  "/lancamentos",
  "/entregues",
  "/blog",
  "/seja-um-consultor-de-vendas",
  "/simular-financiamento",
  "/fale-conosco",
  "/area-do-morador",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const developmentEntries: MetadataRoute.Sitemap = [
    ...developments,
    ...deliveredExamples,
  ].map((dev) => ({
    url: `${BASE_URL}/empreendimentos/${dev.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...developmentEntries, ...blogEntries];
}
