const ROWS = [
  ["Phone ringing unanswered", "Relative can initiate a check-in"],
  ["Fixed CCTV wall angle", "Mobile rover presence through the home"],
  ["Occasional scheduled calls", "Spontaneous everyday connection"],
  ["Elder must rush to find phone", "Zero effort required from parent"],
  ["Anxiety when calls go missed", "Immediate visual peace of mind"],
];

const THREE_SCENES = [
  {
    step: "01",
    title: "The Unanswered Call",
    desc: "A son in Dubai calls his mother's phone in Thrissur at 8:30 PM. The phone is in the bedroom charging. He tries again — no answer, and familiar anxiety sets in.",
  },
  {
    step: "02",
    title: "Gentle Malayalam Arrival",
    desc: "Instead of worry, he opens the app. The rover rolls smoothly into the living room, softly announcing in Malayalam: 'അമ്മേ, ദുബായിൽ നിന്ന് മകൻ വിളിക്കുന്നു.'",
  },
  {
    step: "03",
    title: "Instant Peace of Mind",
    desc: "Amma looks up from the newspaper and smiles. They chat about her evening tea and dinner. No phone to hold, no apps to touch — just family, together.",
  },
];

const LINES = [
  "Not just a call. A visit.",
  "From “Did you answer?” to “I’m here.”",
  "See their day. Share your day.",
  "Distance should not decide family presence.",
];

export default function StoryContrast() {
  return (
    <section data-testid="story" aria-labelledby="story-h" className="bg-white py-16 md:py-24 border-y border-navy/5">
      <div className="max-w-6xl mx-auto px-4 grid gap-12 lg:grid-cols-2 items-start">
        {/* Left: Traditional Calling vs Rover Comparison Table */}
        <div>
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-coral-deep bg-coral/10 px-3 py-1 rounded-full mb-2">
            The Difference
          </div>
          <h2 id="story-h" className="text-3xl md:text-4xl font-bold tracking-tight text-navy text-balance">
            Before → with family presence
          </h2>
          <p className="mt-2 text-navy/85 text-sm md:text-base">
            How physical presence replaces distance anxiety with everyday peace of mind.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-navy/15 shadow-md">
            <table className="w-full text-xs md:text-sm" data-testid="contrast-table">
              <thead>
                <tr className="bg-navy text-cream">
                  <th className="text-left p-3.5 font-bold">Traditional Phone Calling</th>
                  <th className="text-left p-3.5 font-bold text-warm">With Telepresence Rover</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10">
                {ROWS.map(([a, b]) => (
                  <tr key={a} className="odd:bg-cream/40 even:bg-white hover:bg-cream/70 transition-colors">
                    <td className="p-3.5 text-navy/85">
                      <span className="inline-block text-red-500 font-bold mr-1.5">✕</span> {a}
                    </td>
                    <td className="p-3.5 font-semibold text-navy">
                      <span className="inline-block text-kerala font-bold mr-1.5">✓</span> {b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Real Story reduced to max 3 scenes */}
        <div>
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-kerala bg-kerala-light px-3 py-1 rounded-full mb-2">
            Real Story
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">One family&apos;s evening</h3>
          <p className="mt-2 text-navy/85 text-sm md:text-base">A routine evening turned into a comforting reunion.</p>

          <ol className="mt-6 space-y-4">
            {THREE_SCENES.map((s) => (
              <li
                key={s.step}
                data-testid="story-scene"
                className="card-warm p-5 text-xs md:text-sm border border-navy/10 shadow-sm rounded-2xl flex items-start gap-4 bg-[#fdfcf9]"
              >
                <span className="w-9 h-9 rounded-xl bg-navy text-warm text-xs font-extrabold grid place-items-center shrink-0">
                  {s.step}
                </span>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-navy">{s.title}</h4>
                  <p className="text-navy/80 leading-relaxed mt-1">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap gap-2">
            {LINES.map((l) => (
              <span key={l} className="text-xs font-bold bg-[#fdf8ee] text-navy/80 border border-warm/60 rounded-full px-3.5 py-1.5 shadow-2xs">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
