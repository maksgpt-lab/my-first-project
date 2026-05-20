"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "completed_lessons";

function getCompleted(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(getCompleted());
  }, []);

  const markDone = (id: string) => {
    const next = [...new Set([...getCompleted(), id])];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setCompleted(next);
  };

  const isDone = (id: string) => completed.includes(id);

  return { isDone, markDone };
}

export default function LessonProgressButton({
  lessonId,
}: {
  lessonId: string;
}) {
  const { isDone, markDone } = useProgress();
  const done = isDone(lessonId);

  return (
    <button
      onClick={() => markDone(lessonId)}
      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
        done
          ? "bg-green-50 text-green-600 cursor-default"
          : "bg-gray-900 text-white hover:bg-gray-700"
      }`}
      disabled={done}
    >
      {done ? (
        <>
          <span>✓</span> Урок пройден
        </>
      ) : (
        "Отметить как пройденный"
      )}
    </button>
  );
}
