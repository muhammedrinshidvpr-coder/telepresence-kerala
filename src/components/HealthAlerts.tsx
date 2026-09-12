"use client";

import { motion } from "framer-motion";
import { Sunrise, AlertTriangle, Pill, BellRing, ShieldCheck, Heart } from "lucide-react";
import { HEALTH_ALERTS } from "@/lib/copy";

const ICON_MAP = {
  Sunrise: Sunrise,
  AlertTriangle: AlertTriangle,
  Pill: Pill,
  BellRing: BellRing,
};

export default function HealthAlerts() {
  return (
    <section
      id="health"
      data-testid="health-alerts"
      aria-labelledby="health-heading"
      className="bg-white py-16 md:py-24 border-y border-navy/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-kerala bg-kerala-light px-4 py-1.5 rounded-full mb-3">
            <Heart size={14} /> Basic Health & Safety
          </span>
          <h2
            id="health-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy text-balance"
          >
            Gentle health alerts that give you peace of mind
          </h2>
          <p className="mt-4 text-base md:text-lg text-navy/80 leading-relaxed text-balance">
            Not a sterile hospital gadget, but a respectful home companion that watches out for everyday safety without invading your parents’ dignity.
          </p>
        </div>

        {/* 4 Health Alerts Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {HEALTH_ALERTS.map((alert, index) => {
            const IconComponent = ICON_MAP[alert.icon as keyof typeof ICON_MAP] || BellRing;
            return (
              <motion.div
                key={alert.id}
                data-testid={`health-card-${alert.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="card-warm card-warm-hover p-6 md:p-7 border border-navy/10 bg-[#fdfcf9] rounded-3xl flex gap-5 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-navy text-warm grid place-items-center shrink-0 shadow-sm">
                  <IconComponent size={26} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg md:text-xl font-bold text-navy">
                      {alert.title}
                    </h3>
                  </div>
                  <span className="inline-block text-xs font-semibold text-kerala bg-kerala-light px-2.5 py-0.5 rounded-full mb-2.5">
                    {alert.malayalam}
                  </span>
                  <p className="text-sm text-navy/80 leading-relaxed">
                    {alert.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reassuring Dignity Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-cream/70 border border-navy/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-kerala text-cream grid place-items-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-navy">
                Respectful, Private, and Non-Intrusive
              </p>
              <p className="text-xs text-navy/75 mt-0.5">
                No 24/7 recording or cloud streaming. Direct peer-to-peer connection that only lights up when active.
              </p>
            </div>
          </div>
          <a
            href="#cta"
            className="text-xs font-bold text-coral-deep hover:text-coral transition-colors inline-flex items-center gap-1"
          >
            See how it works in your home →
          </a>
        </div>
      </div>
    </section>
  );
}
