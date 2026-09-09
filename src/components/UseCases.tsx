"use client";

import { motion } from "framer-motion";
import { PhoneMissed, House, Baby } from "lucide-react";

const THREE_KEY_FEATURES = [
  {
    id: "missed",
    icon: PhoneMissed,
    title: "When a phone goes unanswered",
    body: "No answer doesn’t mean something is wrong. Connect softly through the rover, glide into the room, and see your parents resting peacefully without demanding they answer a ringing device.",
    tag: "Immediate Peace of Mind",
  },
  {
    id: "rooms",
    icon: House,
    title: "Mobile presence instead of a fixed camera",
    body: "Navigate between the living room, dining area, sit-out, and kitchen entrance. The rover physically moves so you share the actual living space rather than staring at one static CCTV wall angle.",
    tag: "True Physical Telepresence",
  },
  {
    id: "grandchildren",
    icon: Baby,
    title: "Grandchildren visit at natural eye level",
    body: "Children in the Gulf speak naturally through the companion display. The rover turns toward grandparents at comfortable seated eye level, making weekend family visits warm, playful, and genuine.",
    tag: "Generations Connected",
  },
];

export default function UseCases() {
  return (
    <section id="stories" data-testid="usecases" aria-labelledby="usecases-h" className="bg-gradient-to-b from-cream to-[#f7f0e4] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-kerala bg-kerala-light inline-block px-3.5 py-1.5 rounded-full">
            Everyday Moments
          </p>
          <h2 id="usecases-h" className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-navy">
            Designed for real Kerala family life
          </h2>
          <p className="mt-3 text-base md:text-lg text-navy/80 text-balance">
            Three core capabilities engineered to turn ocean-wide distance into daily closeness.
          </p>
        </div>

        {/* 3 Key Features Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {THREE_KEY_FEATURES.map((c, i) => (
            <motion.article
              key={c.id}
              data-testid={`usecase-${c.id}`}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="card-warm card-warm-hover p-7 border border-navy/10 shadow-lg bg-white rounded-3xl flex flex-col justify-between"
            >
              <div>
                <span className="w-14 h-14 rounded-2xl bg-kerala-light text-kerala grid place-items-center mb-5 shadow-inner" aria-hidden>
                  <c.icon size={26} />
                </span>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-coral-deep bg-coral/10 px-3 py-1 rounded-full mb-3">
                  {c.tag}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-navy leading-snug">{c.title}</h3>
                <p className="mt-3 text-sm md:text-base text-navy/75 leading-relaxed">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
