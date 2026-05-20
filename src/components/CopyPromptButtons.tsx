"use client";
import { useEffect } from "react";

export default function CopyPromptButtons() {
  useEffect(() => {
    const article = document.querySelector(".lesson-article");
    if (!article) return;

    article.querySelectorAll("blockquote").forEach((bq) => {
      if (bq.querySelector(".prompt-copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "prompt-copy-btn";
      btn.textContent = "Скопировать";
      btn.addEventListener("click", () => {
        const text = bq.innerText.trim();
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = "Скопировано ✓";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = "Скопировать";
            btn.classList.remove("copied");
          }, 2000);
        });
      });
      bq.appendChild(btn);
    });
  }, []);

  return null;
}
