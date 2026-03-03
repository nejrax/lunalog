"use client";

import { useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function answerFromLocalKnowledge(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("medical") || q.includes("diagnose") || q.includes("treatment")) {
    return "I can’t provide medical advice, diagnosis, or treatment. I can summarize what people report in anonymized community data and point you to common patterns to discuss with a clinician.";
  }

  if (q.includes("pco") || q.includes("pcos")) {
    return "In community logs, PCOS discussions often cluster around fatigue, acne, irregular cycles, cravings, and mood. Patterns can vary a lot person-to-person—your weekly tracking helps distinguish what correlates for you.";
  }

  if (q.includes("endometri") || q.includes("endo")) {
    return "Endometriosis conversations often center on pelvic pain, GI symptoms, fatigue, flare triggers, and sleep disruption. The dashboard is designed to show aggregated correlations—not causation.";
  }

  if (q.includes("remedy") || q.includes("natural") || q.includes("supplement")) {
    return "If you share what you tried and what changed, I can help phrase it as a trackable experiment (symptom score before/after, sleep, stress, diet) so the community data can surface better statistical signals.";
  }

  return "Ask me about a symptom pattern (e.g., pain vs sleep), a lifestyle factor (diet, training, stress), or how to log consistently. I’ll respond using aggregated, non-medical community analysis.";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m a simple chat assistant. I can’t give medical advice, but I can explain how the app’s community analysis works and what patterns people commonly report.",
    },
  ]);

  const title = useMemo(() => (open ? "Simple AI Chat" : "Chat"), [open]);

  function send() {
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [
      ...m,
      { role: "user", content: text },
      { role: "assistant", content: answerFromLocalKnowledge(text) },
    ]);
    setInput("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={"w-[320px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-950 " + (open ? "" : "hidden")}>
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-white/10">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Simple AI Chat
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Community analysis only
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5"
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        <div className="max-h-[280px] space-y-3 overflow-auto px-4 py-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={
                "rounded-xl px-3 py-2 text-sm leading-6 " +
                (m.role === "assistant"
                  ? "bg-zinc-50 text-zinc-900 dark:bg-white/5 dark:text-zinc-50"
                  : "bg-zinc-900 text-white dark:bg-white dark:text-black")
              }
            >
              {m.content}
            </div>
          ))}
        </div>

        <div className="flex gap-2 border-t border-zinc-200 p-3 dark:border-white/10">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder="Ask about patterns…"
            className="h-10 flex-1 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:focus:ring-white/10"
          />
          <button
            onClick={send}
            className="h-10 rounded-xl bg-zinc-900 px-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Send
          </button>
        </div>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        aria-label={title}
      >
        {title}
      </button>
    </div>
  );
}
