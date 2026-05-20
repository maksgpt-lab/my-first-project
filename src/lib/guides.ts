import fs from "fs";
import path from "path";
import matter from "gray-matter";

const GUIDES_DIR = path.join(process.cwd(), "content/guides");

export interface Guide {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
}

export function getGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(GUIDES_DIR, file), "utf8"));
      return {
        slug: file.replace(".md", ""),
        title: data.title ?? file,
        description: data.description ?? "",
        publishedAt: String(data.publishedAt ?? ""),
      };
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getGuideContent(slug: string) {
  const filePath = path.join(GUIDES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const file = matter(fs.readFileSync(filePath, "utf8"));
  return { data: file.data, content: file.content };
}
