import { MetadataRoute } from "next";
import { getWorksList } from "@/libs/microcms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // SSG pages
  const works = (await getWorksList()).contents.map((works) => ({
    url: `https://rmurai.com/works/${works.id}`,
    lastModified: works.publishedAt,
  }));
  // Static pages
  const routs = ["", "/works"].map((route) => ({
    url: `https://rmurai.com${route}`,
    lastModified: new Date(),
  }));

  return [...routs, ...works];
}
