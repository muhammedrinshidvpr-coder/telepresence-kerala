"use client";

import { motion } from "framer-motion";
import { PhoneMissed, Users, AlertCircle, ShieldAlert } from "lucide-react";
import { KERALA_STATS } from "@/lib/copy";

export default function ProblemStats() {
  return (
    <section
      id="problem"
      data-testid="problem-stats"
      aria-labelledby="problem-heading"
      className="bg-[#fcf8f0] py-16 md:py-24 border-b border-navy/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-coral-deep bg-coral/10 px-4 py-1.5 rounded-full mb-3">
            The Reality Back Home
          </span>
          <h2
            id="problem-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy text-balance"
          >
            Why a simple phone call is no longer enough
          </h2>
          <p className="mt-4 text-base md:text-lg text-navy/80 leading-relaxed text-balance">
            With thousands of kilometres between the Gulf and Kerala, missed phone calls turn routine evenings into hours of silent worry. Here is what millions of Malayali families face every day.
          </p>
        </div>

        {/* 4 Key Stat Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {KERALA_STATS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="card-warm card-warm-hover p-6 border border-navy/10 bg-white rounded-3xl flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-kerala bg-kerala-light px-2.5 py-0.5 rounded-full mb-3">
                  {item.highlight}
                </span>
                <p className="text-4xl lg:text-5xl font-black tracking-tight text-coral-deep">
                  {item.stat}
                </p>
                <h3 className="mt-2 text-base font-bold text-navy leading-snug">
                  {item.label}
                </h3>
              </div>
              <p className="mt-3 text-xs md:text-sm text-navy/75 leading-relaxed pt-3 border-t border-navy/5">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Simple 3-Part Everyday Problem Breakdown */}
        <div className="mt-12 p-6 md:p-8 bg-white rounded-3xl border border-navy/10 shadow-sm">
          <h3 className="text-lg md:text-xl font-bold text-navy mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-coral" />
            <span>The everyday challenges our parents face alone:</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-coral/10 text-coral-deep grid place-items-center shrink-0">
                <PhoneMissed size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">The Charging Phone Problem</h4>
                <p className="text-xs text-navy/75 mt-1 leading-relaxed">
                  Phones are often kept in the bedroom or on a charger. Parents in the kitchen or sit-out never hear them ring.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-warm/20 text-navy grid place-items-center shrink-0">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">Fixed Cameras Feel Invasive</h4>
                <p className="text-xs text-navy/75 mt-1 leading-relaxed">
                  CCTV cameras on the wall feel like surveillance. They stare at one empty corner and cannot move when you need to see.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-kerala-light text-kerala grid place-items-center shrink-0">
                <Users size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">The Gulf Worry Knot</h4>
                <p className="text-xs text-navy/75 mt-1 leading-relaxed">
                  Three unanswered calls after 8 PM leaves you restless in Dubai or Doha, wondering if they simply fell asleep or need help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
