"use client";

import { useEffect, useState } from "react";
import { useProgress } from "./LessonProgress";

export default function CourseProgress({
  courseSlug,
  lessons,
}: {
  courseSlug: string;
  lessons: { slug: string; free: boolean }[];
}) {
  const { isDone } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const freeLessons = lessons.filter((l) => l.free);
  const doneCount = freeLessons.filter((l) =>
    isDone(`${courseSlug}/${l.slug}`)
  ).length;

  if (doneCount === 0) return null;

  const percent = Math.round((doneCount / freeLessons.length) * 100);

  return (
    <div className="mb-8 p-5 bg-green-50 rounded-xl">
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-green-700 font-medium">Твой прогресс</span>
        <span className="text-green-600">
          {doneCount} из {freeLessons.length} уроков
        </span>
      </div>
      <div className="h-2 bg-green-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
