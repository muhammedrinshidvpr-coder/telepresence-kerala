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
    <section data-testid="malayalam" aria-labelledby="malayalam-h" className="bg-gradient-to-b from-[#111f38] via-navy to-navy-deep text-cream py-16 md:py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 grid gap-10 lg:grid-cols-2 items-start">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-warm bg-warm/15 px-3.5 py-1 rounded-full mb-3">
            Malayalam-First Design
          </span>
          <h2 id="malayalam-h" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            It speaks her language first
          </h2>
          <p className="mt-3 text-base text-cream/80 text-balance">
            No silent intrusions. When you connect, the robot announces your arrival gently in warm Malayalam, just like a family member walking into the room.
          </p>

          <div className="mt-6 card-warm bg-white/10! backdrop-blur-md shadow-2xl border border-white/20 p-6 md:p-8 rounded-2xl">
            <p className="text-2xl md:text-3xl font-extrabold text-warm tracking-wide leading-snug" data-testid="malayalam-greeting">
              “{greetingMl}”
            </p>
            <p className="mt-2 text-sm text-cream/80 font-medium">
              “{greetingEn}” — announced softly upon arrival, never silent.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                data-testid="btn-play-greeting"
                onClick={() => speak(greetingMl, greetingEn)}
                className="btn-coral text-sm font-bold shadow-md cursor-pointer"
              >
                <Volume2 size={18} aria-hidden className="mr-2" /> Play greeting audio
              </button>

              {/* Animated audio waveform */}
              <div className="flex items-center gap-1 h-6 px-3 bg-white/10 rounded-full">
                {[4, 12, 18, 8, 16, 22, 10, 14, 6].map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1 bg-warm rounded-full transition-all duration-300"
                    style={{
                      height: said ? `${Math.max(4, h)}px` : "4px",
                      opacity: said ? 1 : 0.4,
                    }}
                  />
                ))}
              </div>
            </div>

            {said && (
              <p className="mt-3 text-xs text-warm/90 font-medium animate-fadeIn" data-testid="spoken-label" aria-live="polite">
                ✓ Audio announcement: {said}
              </p>
            )}
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
                className={`px-4 py-2.5 rounded-full text-xs md:text-sm font-bold border min-h-[44px] transition-all cursor-pointer active:scale-95 shadow-sm ${
                  lang === l.id
                    ? "bg-warm text-navy border-warm shadow-md ring-2 ring-warm/30 font-extrabold"
                    : l.ready
                      ? "border-white/30 text-cream bg-white/5 hover:bg-white/15"
                      : "border-white/15 text-cream/40 cursor-not-allowed bg-transparent"
                }`}
              >
                {l.id}{!l.ready && <span className="ml-1.5 text-[10px] uppercase tracking-wide bg-white/10 px-1.5 py-0.5 rounded">soon</span>}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-cream/90">
            Malayalam is our focus for the Kerala pilot. English is fully supported. Other regional languages will follow after pilot validation.
          </p>

          <ul className="mt-5 space-y-2.5">
            {MALAYALAM_PHRASES.map((p, i) => (
              <li key={p.ml}>
                <button
                  data-testid={`phrase-${i}`}
                  onClick={() => speak(p.ml, p.en)}
                  className="w-full text-left card-warm bg-white! text-navy p-4 hover:ring-2 hover:ring-warm transition-all cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-navy">{p.ml}</span>
                    <Volume2 size={16} className="text-coral-deep opacity-60" aria-hidden />
                  </div>
                  <span className="block text-xs md:text-sm text-navy/85 mt-1">{p.en}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
