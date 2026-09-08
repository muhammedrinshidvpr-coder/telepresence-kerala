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
    <section id="stories" data-testid="usecases" aria-labelledby="usecases-h" className="bg-gradient-to-b from-cream to-[#f7f0e4] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-kerala bg-kerala-light inline-block px-3.5 py-1.5 rounded-full">
            Everyday Moments
          </p>
          <h2 id="usecases-h" className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Designed for real Kerala family life
          </h2>
          <p className="mt-3 text-base md:text-lg text-navy/85 text-balance">
            From early morning chai to spontaneous evening check-ins across oceans.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {CASES.map((c, i) => (
            <motion.article
              key={c.id}
              data-testid={`usecase-${c.id}`}
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: Math.min(i * 0.05, 0.2) }}
              className="card-warm card-warm-hover p-6 md:p-7 border border-navy/10 shadow-md grid gap-5 md:grid-cols-[auto_1fr] md:items-center"
            >
              <span className="w-14 h-14 rounded-2xl bg-kerala-light text-kerala grid place-items-center shrink-0 shadow-inner" aria-hidden>
                <c.icon size={26} />
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-navy">{c.title}</h3>
                <p className="mt-1.5 text-sm md:text-base text-navy/85 leading-relaxed">{c.body}</p>
                <div className="mt-3 inline-block bg-coral/10 text-coral-deep font-semibold text-xs md:text-sm px-3.5 py-1 rounded-full border border-coral/20">
                  {c.msg}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
