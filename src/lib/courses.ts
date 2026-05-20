import fs from "fs";
import path from "path";
import matter from "gray-matter";

const COURSES_DIR = path.join(process.cwd(), "content/courses");

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  free: boolean;
  order: number;
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  cover: string;
  lessons: Lesson[];
}

export function getCourses(): Course[] {
  if (!fs.existsSync(COURSES_DIR)) return [];
  const dirs = fs.readdirSync(COURSES_DIR);

  return dirs
    .map((dir) => getCourse(dir))
    .filter(Boolean) as Course[];
}

export function getCourse(slug: string): Course | null {
  const indexPath = path.join(COURSES_DIR, slug, "index.md");
  if (!fs.existsSync(indexPath)) return null;

  const { data } = matter(fs.readFileSync(indexPath, "utf8"));
  const lessonsDir = path.join(COURSES_DIR, slug);
  const lessonFiles = fs
    .readdirSync(lessonsDir)
    .filter((f) => f !== "index.md" && f.endsWith(".md"))
    .sort();

  const lessons: Lesson[] = lessonFiles.map((file) => {
    const { data: ld } = matter(
      fs.readFileSync(path.join(lessonsDir, file), "utf8")
    );
    return {
      slug: file.replace(".md", ""),
      title: ld.title ?? file,
      description: ld.description ?? "",
      free: ld.free ?? false,
      order: ld.order ?? 0,
    };
  });

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    cover: data.cover ?? "",
    lessons: lessons.sort((a, b) => a.order - b.order),
  };
}

export function getLessonContent(courseSlug: string, lessonSlug: string) {
  const filePath = path.join(COURSES_DIR, courseSlug, `${lessonSlug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const file = matter(fs.readFileSync(filePath, "utf8"));
  return { data: file.data, content: file.content };
}
