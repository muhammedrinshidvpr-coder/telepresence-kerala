"use client";

import { motion } from "framer-motion";
import { Sunrise, PhoneMissed, House, Baby, History } from "lucide-react";

const CASES = [
  {
    id: "morning",
    icon: Sunrise,
    title: "“Good morning”",
    body: "Relative in the GCC opens the app before work, presses Good morning. Robot glides near the living area, a familiar Malayalam greeting plays, parent responds naturally.",
    msg: "Start the day with a familiar voice.",
  },
  {
    id: "missed",
    icon: PhoneMissed,
    title: "“When a call goes unanswered”",
    body: "Phone rings, nobody picks up. App shows No answer. Relative selects Check in, robot moves to the living room and they see their parent resting safely.",
    msg: "No answer does not always mean something is wrong. Check in without making them answer a phone.",
  },
  {
    id: "rooms",
    icon: House,
    title: "“See more than a fixed camera”",
    body: "Switch between Living room, Dining area, Bedroom entrance and Front door. The robot physically moves instead of showing one fixed angle.",
    msg: "Don’t just watch one room. Move through the home.",
  },
  {
    id: "grandchildren",
    icon: Baby,
    title: "“Grandchildren visit virtually”",
    body: "A child in the GCC speaks through the robot. It turns toward the parent at eye level — the child waves, the parent sees and hears them naturally.",
    msg: "Make family visits feel more natural.",
  },
  {
    id: "history",
    icon: History,
    title: "“Daily check-in history”",
    body: "A gentle connection timeline — 8:30 AM Morning check-in completed, 1:15 PM Family conversation, 7:00 PM Evening visit. Care history, not surveillance.",
    msg: "Reassurance you can look back on.",
  },
];

export default function UseCases() {
  return (
    <section id="stories" data-testid="usecases" aria-labelledby="usecases-h" className="bg-cream py-14">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-kerala">Everyday moments</p>
        <h2 id="usecases-h" className="mt-2 text-3xl md:text-4xl font-bold">Made for real family life</h2>
        <div className="mt-8 space-y-5">
          {CASES.map((c, i) => (
            <motion.article
              key={c.id}
              data-testid={`usecase-${c.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: Math.min(i * 0.05, 0.2) }}
              className="card-warm p-6 grid gap-3 md:grid-cols-[auto_1fr] md:items-center"
            >
              <span className="w-12 h-12 rounded-2xl bg-kerala-light text-kerala grid place-items-center" aria-hidden>
                <c.icon size={24} />
              </span>
              <div>
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="mt-1 text-navy/70">{c.body}</p>
                <p className="mt-2 font-semibold text-coral">{c.msg}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
