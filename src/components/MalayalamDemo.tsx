"use client";

import { useCallback, useState } from "react";
import { Volume2 } from "lucide-react";
import { MALAYALAM_PHRASES } from "@/lib/copy";
import { useCity } from "./CityContext";

const LANGS = [
  { id: "മലയാളം", ready: true },
  { id: "English", ready: true },
  { id: "Tamil", ready: false },
  { id: "Hindi", ready: false },
] as const;

type LangId = (typeof LANGS)[number]["id"];

export default function MalayalamDemo() {
  const { city } = useCity();
  const [lang, setLang] = useState<LangId>("മലയാളം");
  const [said, setSaid] = useState<string | null>(null);

  const greetingMl = `അമ്മേ, ${city.ml} നിന്ന് മകൻ വിളിക്കുന്നു.`;
  const greetingEn = `Amma, your son is calling from ${city.label}.`;

  const speak = useCallback((ml: string, en: string) => {
    const text = lang === "English" ? en : ml;
    setSaid(text);
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
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
          <div className="mt-4 card-warm bg-white/10! shadow-none! border border-white/15 p-5">
            <p className="text-2xl font-bold" data-testid="malayalam-greeting">“{greetingMl}”</p>
            <p className="mt-1 text-cream/75">“{greetingEn}” — announced gently on arrival, never silently.</p>
            <button
              data-testid="btn-play-greeting"
              onClick={() => speak(greetingMl, greetingEn)}
              className="btn-coral mt-4 text-sm"
            >
              <Volume2 size={16} aria-hidden className="mr-2" /> Play greeting
            </button>
            {said && <p className="mt-2 text-xs text-cream/75" data-testid="spoken-label" aria-live="polite">Played: {said}</p>}
          </div>
        </div>
        <div>
          <div className="flex gap-2 flex-wrap" role="group" aria-label="Language selector">
            {LANGS.map((l) => (
              <button
                key={l.id}
                data-testid={`lang-${l.id}`}
                aria-pressed={lang === l.id}
                disabled={!l.ready}
                title={l.ready ? l.id : `${l.id} — coming after pilot`}
                onClick={() => l.ready && setLang(l.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold border min-h-11 ${
                  lang === l.id
                    ? "bg-warm text-navy border-warm"
                    : l.ready
                      ? "border-white/25"
                      : "border-white/15 text-cream/40 cursor-not-allowed"
                }`}
              >
                {l.id}{!l.ready && <span className="ml-1.5 text-[10px] uppercase tracking-wide">soon</span>}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-cream/75">Malayalam is the primary local experience. Other languages follow after the pilot — we don&apos;t over-promise.</p>
          <ul className="mt-4 space-y-2">
            {MALAYALAM_PHRASES.map((p, i) => (
              <li key={p.ml}>
                <button data-testid={`phrase-${i}`} onClick={() => speak(p.ml, p.en)}
                  className="w-full text-left card-warm bg-white! text-navy p-3.5 hover:ring-2 hover:ring-warm">
                  <span className="font-bold">{p.ml}</span>
                  <span className="block text-sm text-navy/70">{p.en}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
