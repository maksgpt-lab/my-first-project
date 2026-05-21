"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "agent_uses";
const FREE_LIMIT = 5;

function getUsesCount(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;
    const { count, date } = JSON.parse(stored);
    const today = new Date().toDateString();
    if (date !== today) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}

function incrementUses() {
  try {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(STORAGE_KEY);
    const prev = stored ? JSON.parse(stored) : null;
    const count = prev?.date === today ? (prev.count ?? 0) + 1 : 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, date: today }));
  } catch {
    // ignore
  }
}

export default function AgentWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usesCount, setUsesCount] = useState(0);
  const [isClubMember, setIsClubMember] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setUsesCount(getUsesCount());
    fetch("/api/auth/check")
      .then((r) => r.json())
      .then((d) => setIsClubMember(d.isClubMember ?? false))
      .catch(() => setIsClubMember(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const limitReached = !isClubMember && usesCount >= FREE_LIMIT;

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading || limitReached) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Что-то пошло не так. Попробуй ещё раз.");
        return;
      }

      setMessages([...newMessages, { role: "assistant", content: data.result }]);

      if (!isClubMember) {
        incrementUses();
        setUsesCount((c) => c + 1);
      }
    } catch {
      setError("Ошибка соединения. Проверь интернет и попробуй снова.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    setMessages([]);
    setError("");
    textareaRef.current?.focus();
  }

  const isEmpty = messages.length === 0;
  const remaining = Math.max(0, FREE_LIMIT - usesCount);

  return (
    <div className="flex flex-col h-full min-h-[600px]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
              <span className="text-indigo-400 text-xl">✦</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Расскажи что хочешь автоматизировать в своём бизнесе — разберём вместе.
            </p>
            {!isClubMember && isClubMember !== null && (
              <p className="mt-2 text-white/25 text-xs">{remaining} из {FREE_LIMIT} бесплатных вопросов</p>
            )}
            <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
              {[
                "С чего начать внедрение AI в бизнесе?",
                "Как автоматизировать работу с клиентами?",
                "Помоги составить промпт для моей задачи",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => { setInput(suggestion); textareaRef.current?.focus(); }}
                  className="text-left text-xs text-white/30 hover:text-white/60 border border-white/[0.07] hover:border-white/20 rounded-xl px-4 py-2.5 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
              msg.role === "user"
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                : "bg-white/[0.06] text-white/40 border border-white/[0.1]"
            }`}>
              {msg.role === "user" ? "Я" : "✦"}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-indigo-500/15 text-white/80 border border-indigo-500/20"
                : "bg-white/[0.04] text-white/70 border border-white/[0.07]"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="shrink-0 w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white/40 text-xs mt-0.5">
              ✦
            </div>
            <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl px-4 py-3">
              <span className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-sm p-3 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <p className="text-red-400 text-xs text-center">{error}</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Paywall */}
      {limitReached && (
        <div className="mx-4 mb-4 p-6 bg-indigo-500/5 border border-indigo-500/30 rounded-2xl text-center">
          <p className="text-white/70 font-semibold mb-1">Бесплатные вопросы закончились</p>
          <p className="text-white/35 text-sm mb-4 leading-relaxed">
            Вступи в клуб — и задавай сколько угодно вопросов без ограничений.
          </p>
          <Link
            href="/unlock"
            className="inline-block btn-glow text-white text-sm font-semibold px-6 py-2.5 rounded-xl"
          >
            Вступить в клуб →
          </Link>
        </div>
      )}

      {/* Input area */}
      {!limitReached && (
        <div className="border-t border-white/[0.06] px-3 sm:px-4 py-3 sm:py-4">
          {!isClubMember && isClubMember !== null && !isEmpty && (
            <p className="text-xs text-white/20 mb-2 text-right">
              {remaining} из {FREE_LIMIT} бесплатных вопросов
            </p>
          )}
          <div className="flex gap-2 sm:gap-3 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Напиши вопрос..."
              rows={2}
              className="flex-1 bg-[#080810] border border-white/[0.08] rounded-2xl px-3 sm:px-4 py-3 text-white/70 placeholder-white/20 text-sm leading-relaxed resize-none focus:outline-none focus:border-indigo-500/40 transition-colors"
            />
            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="btn-glow text-white text-sm font-semibold px-4 sm:px-5 py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
                ) : "→"}
              </button>
              {!isEmpty && (
                <button
                  onClick={clearChat}
                  className="text-xs text-white/20 hover:text-white/50 transition-colors px-4 sm:px-5 py-2 rounded-xl border border-white/[0.07] hover:border-white/20"
                >
                  Сбросить
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
