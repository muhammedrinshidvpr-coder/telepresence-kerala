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
    <section data-testid="story" aria-labelledby="story-h" className="bg-white py-14">
      <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2">
        <div>
          <h2 id="story-h" className="text-3xl font-bold">Before → with presence</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-navy/10">
            <table className="w-full min-w-[420px] text-sm" data-testid="contrast-table">
              <thead><tr className="bg-navy text-cream"><th className="text-left p-3">Before</th><th className="text-left p-3">With the robot</th></tr></thead>
              <tbody>
                {ROWS.map(([a, b]) => (
                  <tr key={a} className="odd:bg-cream even:bg-white border-t border-navy/10">
                    <td className="p-3 text-navy/70">{a}</td><td className="p-3 font-semibold">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">One family&apos;s evening</h3>
          <ol className="mt-3 space-y-2">
            {SCENES.map((s) => <li key={s} data-testid="story-scene" className="card-warm p-3 text-sm">{s}</li>)}
          </ol>
          <ul className="mt-4 flex flex-wrap gap-2">
            {LINES.map((l) => <li key={l} className="text-xs font-semibold bg-warm/25 border border-warm rounded-full px-3 py-1.5">{l}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
