"use client";

import { useCallback, useState } from "react";
import { Volume2 } from "lucide-react";
import { MALAYALAM_PHRASES } from "@/lib/copy";

const LANGS = ["മലയാളം", "English", "Tamil", "Hindi"] as const;

export default function MalayalamDemo() {
  const [lang, setLang] = useState<(typeof LANGS)[number]>("മലയാളം");
  const [said, setSaid] = useState<string | null>(null);

  const speak = useCallback((ml: string, en: string) => {
    setSaid(ml);
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(lang === "English" ? en : ml);
      u.lang = lang === "English" ? "en-IN" : "ml-IN";
      synth.speak(u);
    } catch { /* noop */ }
  }, [lang]);

  return (
    <section data-testid="malayalam" aria-labelledby="malayalam-h" className="bg-navy text-cream py-14">
      <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-2 items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-warm">Malayalam-first</p>
          <h2 id="malayalam-h" className="mt-2 text-3xl md:text-4xl font-bold">It speaks her language first</h2>
          <div className="mt-4 card-warm !bg-white/10 !shadow-none border border-white/15 p-5">
            <p className="text-2xl font-bold" data-testid="malayalam-greeting">“അമ്മേ, ദുബായിൽ നിന്ന് മകൻ വിളിക്കുന്നു.”</p>
            <p className="mt-1 text-cream/70">“Amma, your son is calling from Dubai.” — announced gently on arrival, never silently.</p>
            <button
              data-testid="btn-play-greeting"
              onClick={() => speak("അമ്മേ, ദുബായിൽ നിന്ന് മകൻ വിളിക്കുന്നു.", "Amma, your son is calling from Dubai.")}
              className="btn-coral mt-4 text-sm"
            >
              <Volume2 size={16} aria-hidden className="mr-2" /> Play greeting
            </button>
            {said && <p className="mt-2 text-xs text-cream/60" data-testid="spoken-label" aria-live="polite">Played: {said}</p>}
          </div>
        </div>
        <div>
          <div className="flex gap-2 flex-wrap" role="group" aria-label="Language selector">
            {LANGS.map((l) => (
              <button key={l} data-testid={`lang-${l}`} aria-pressed={lang === l} onClick={() => setLang(l)}
                className={`px-4 py-2 rounded-full text-sm font-bold border min-h-11 ${lang === l ? "bg-warm text-navy border-warm" : "border-white/25"}`}>
                {l}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-cream/60">Malayalam is the primary local experience. Other languages follow — we don&apos;t over-promise.</p>
          <ul className="mt-4 space-y-2">
            {MALAYALAM_PHRASES.map((p, i) => (
              <li key={p.ml}>
                <button data-testid={`phrase-${i}`} onClick={() => speak(p.ml, p.en)}
                  className="w-full text-left card-warm !bg-white text-navy p-3.5 hover:ring-2 hover:ring-warm">
                  <span className="font-bold">{p.ml}</span>
                  <span className="block text-sm text-navy/60">{p.en}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
