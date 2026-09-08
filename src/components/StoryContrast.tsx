const ROWS = [
  ["Phone ringing unanswered", "Relative can initiate a check-in"],
  ["Fixed CCTV view", "Mobile view through the home"],
  ["Occasional scheduled calls", "Spontaneous family presence"],
  ["Elder must operate a phone", "Relative controls the experience"],
  ["Family feels helpless", "Family feels connected"],
  ["Children only hear updates", "Children can see and talk naturally"],
];

const SCENES = [
  "Scene 1 — The unanswered call: son in Dubai calls his mother in Kerala. The phone is in another room.",
  "Scene 2 — The worry: he looks at the time and tries again. Screen shows No answer.",
  "Scene 3 — A different kind of call: he opens the robot app and selects Check in.",
  "Scene 4 — Presence arrives: robot turns on, moves into the room, announces the caller.",
  "Scene 5 — The conversation: his mother smiles and speaks naturally. He asks if she had breakfast.",
  "Scene 6 — The emotional result: son returns to work reassured. Mother feels remembered.",
];

const LINES = [
  "Not just a call. A visit.",
  "From “Did you answer?” to “I’m here.”",
  "See their day. Share your day.",
  "Distance should not decide when families connect.",
  "A familiar face can enter the room.",
  "For the moments that cannot wait for a scheduled call.",
  "Your family, present in the home.",
];

export default function StoryContrast() {
  return (
    <section data-testid="story" aria-labelledby="story-h" className="bg-white py-16 md:py-20 border-y border-navy/5">
      <div className="max-w-6xl mx-auto px-4 grid gap-12 lg:grid-cols-2 items-start">
        <div>
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-coral-deep bg-coral/10 px-3 py-1 rounded-full mb-2">
            The Difference
          </div>
          <h2 id="story-h" className="text-3xl md:text-4xl font-bold tracking-tight text-navy text-balance">
            Before → with family presence
          </h2>
          <p className="mt-2 text-navy/85 text-sm md:text-base">
            How physical presence changes the anxiety of distance into everyday peace of mind.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-navy/15 shadow-md">
            <table className="w-full text-xs md:text-sm" data-testid="contrast-table">
              <thead>
                <tr className="bg-navy text-cream">
                  <th className="text-left p-3.5 font-bold">Traditional Calling</th>
                  <th className="text-left p-3.5 font-bold text-warm">With the robot</th>
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

        <div>
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-kerala bg-kerala-light px-3 py-1 rounded-full mb-2">
            Real Story
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">One family&apos;s evening</h3>
          <p className="mt-2 text-navy/85 text-sm md:text-base">A routine day turned into a comforting reunion.</p>

          <ol className="mt-6 space-y-2.5">
            {SCENES.map((s, i) => (
              <li key={s} data-testid="story-scene" className="card-warm p-4 text-xs md:text-sm border border-navy/10 shadow-sm flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-navy text-cream text-xs font-bold grid place-items-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-navy/85 leading-relaxed">{s}</span>
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
