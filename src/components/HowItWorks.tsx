"use client";

import { useState } from "react";
import { HousePlus, AppWindow, HeartHandshake, CheckCircle2, Sparkles, MessageCircle } from "lucide-react";
import { COPY, GCC_CITIES, KERALA_DISTRICTS, TALLY_CONFIG, FOUNDER_INFO } from "@/lib/copy";

const STEPS = [
  {
    icon: HousePlus,
    step: "01",
    t: "Place it at home",
    d: "Delivered white-glove to your parents' home in Kerala. Connects to home Wi-Fi and sits gently on its magnetic dock.",
  },
  {
    icon: AppWindow,
    step: "02",
    t: "Open the phone app",
    d: "Open the companion app on your phone from Dubai, Doha, Riyadh, Kuwait, or anywhere across the globe.",
  },
  {
    icon: HeartHandshake,
    step: "03",
    t: "Be there in the room",
    d: "Glide softly, see naturally, talk, and listen. Your parents never have to locate or answer a ringing phone.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" data-testid="how" aria-labelledby="how-h" className="bg-white py-16 md:py-24 border-t border-navy/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-kerala bg-kerala-light px-3.5 py-1 rounded-full mb-3">
            Effortless For Elders
          </span>
          <h2 id="how-h" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy text-balance">
            How it works — three simple steps
          </h2>
          <p className="mt-3 text-base md:text-lg text-navy/85 text-balance">
            No buttons for parents to fumble with. Zero technical learning curve for elders.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <article
              key={s.t}
              data-testid={`how-step-${i}`}
              className="card-warm card-warm-hover p-7 text-center border border-navy/10 shadow-md relative overflow-hidden rounded-3xl"
            >
              <div className="absolute top-4 right-4">
                <span className="text-xs font-black tracking-wider text-navy/85 bg-cream-dark/80 px-2.5 py-1 rounded-full border border-navy/10">
                  Step {s.step}
                </span>
              </div>
              <span className="w-14 h-14 mx-auto rounded-2xl bg-navy text-cream grid place-items-center shadow-md mb-4" aria-hidden>
                <s.icon size={26} />
              </span>
              <h3 className="text-xl font-bold text-navy">{s.t}</h3>
              <p className="mt-2 text-sm text-navy/85 leading-relaxed">{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const [gccCity, setGccCity] = useState<string>(GCC_CITIES[0].label);
  const [district, setDistrict] = useState<string>(KERALA_DISTRICTS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [expectations, setExpectations] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="cta" data-testid="cta" aria-labelledby="cta-h" className="relative bg-gradient-to-b from-navy-deep via-navy to-[#0a1220] text-cream py-16 md:py-24 overflow-hidden">
      {/* Glow accents */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-warm/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-coral/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-warm/20 text-warm border border-warm/30 rounded-full px-4 py-1.5 shadow-sm mb-4">
            <Sparkles size={14} /> Free In-Home Pilot & Family Demo
          </div>
          <h2 id="cta-h" className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance">
            {COPY.finalH}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-cream/90 max-w-2xl mx-auto leading-relaxed text-balance">
            {COPY.finalSub}
          </p>
        </div>

        {/* Demo Request Card */}
        <div className="mt-10 card-warm bg-white/95! text-navy p-6 md:p-10 shadow-2xl border border-white/20 rounded-3xl">
          {!submitted ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-navy/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-coral-deep">Kerala Family Experience</span>
                  <h3 className="text-2xl font-extrabold text-navy">Request a Free Live Demo</h3>
                  <p className="text-xs md:text-sm text-navy/80 mt-0.5">
                    See the rover in action and explore how it fits your parents&apos; home.
                  </p>
                </div>
                <div className="bg-kerala-light text-kerala font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-kerala/20">
                  <CheckCircle2 size={14} /> 100% Free Consultation
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="gcc-city-select" className="block text-xs font-bold uppercase tracking-wider text-navy/85 mb-1.5">
                    Your Location in the GCC
                  </label>
                  <select
                    id="gcc-city-select"
                    aria-label="Your Location in the GCC"
                    value={gccCity}
                    onChange={(e) => setGccCity(e.target.value)}
                    className="w-full p-3 rounded-xl border border-navy/20 bg-cream/40 text-sm font-semibold text-navy focus:ring-2 focus:ring-warm outline-none"
                  >
                    {GCC_CITIES.map((c) => (
                      <option key={c.id} value={c.label}>
                        {c.label} ({c.ml})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="kerala-district-select" className="block text-xs font-bold uppercase tracking-wider text-navy/85 mb-1.5">
                    Parent&apos;s District in Kerala
                  </label>
                  <select
                    id="kerala-district-select"
                    aria-label="Parent's District in Kerala"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-3 rounded-xl border border-navy/20 bg-cream/40 text-sm font-semibold text-navy focus:ring-2 focus:ring-warm outline-none"
                  >
                    {KERALA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="reserve-name" className="block text-xs font-bold uppercase tracking-wider text-navy/85 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    id="reserve-name"
                    aria-label="Your Full Name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Nair"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-navy/20 bg-cream/40 text-sm text-navy focus:ring-2 focus:ring-warm outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="reserve-phone" className="block text-xs font-bold uppercase tracking-wider text-navy/85 mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    id="reserve-phone"
                    aria-label="WhatsApp Number"
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-navy/20 bg-cream/40 text-sm text-navy focus:ring-2 focus:ring-warm outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="reserve-expectations" className="block text-xs font-bold uppercase tracking-wider text-navy/85 mb-1.5">
                    Tell us about your parents&apos; routine or concerns (Optional)
                  </label>
                  <textarea
                    id="reserve-expectations"
                    aria-label="Tell us about your parents routine or concerns"
                    rows={3}
                    placeholder="e.g. Amma lives alone in Thrissur, evening calls are often missed when she is in the sit-out, medicine reminders needed..."
                    value={expectations}
                    onChange={(e) => setExpectations(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-navy/20 bg-cream/40 text-sm text-navy focus:ring-2 focus:ring-warm outline-none"
                  />
                </div>

                <div className="sm:col-span-2 mt-2">
                  <button type="submit" className="btn-gold w-full text-base font-extrabold shadow-lg cursor-pointer">
                    Request a Free Private Demo →
                  </button>
                  <p className="text-[11px] text-center text-navy/85 mt-2">
                    No credit card or payment required. We will coordinate a friendly video demonstration.
                  </p>
                </div>

                <div className="sm:col-span-2 text-center pt-3 border-t border-navy/10 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    data-testid="form-tally-consult"
                    data-tally-open={TALLY_CONFIG.formId}
                    data-tally-layout="modal"
                    data-tally-width={TALLY_CONFIG.modalWidth}
                    data-tally-emoji-text={TALLY_CONFIG.emoji}
                    data-tally-hidden={`city=${encodeURIComponent(gccCity)},district=${encodeURIComponent(district)},name=${encodeURIComponent(name)},phone=${encodeURIComponent(phone)}`}
                    className="text-xs font-bold text-coral-deep hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    Or fill our extended consultation questionnaire →
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-kerala-light text-kerala grid place-items-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-kerala bg-kerala-light px-3 py-1 rounded-full">
                Demo Request Confirmed
              </span>
              <h3 className="mt-3 text-3xl font-extrabold text-navy">Thank You, {name}!</h3>
              <p className="mt-2 text-sm text-navy/85 max-w-md mx-auto">
                We received your request to connect <strong className="text-navy">{gccCity}</strong> with your family home in <strong className="text-navy">{district}</strong>.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-cream border border-navy/10 text-xs text-navy/85 max-w-md mx-auto text-left space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-kerala font-bold">✓</span> Our team and Muhammed will message you on WhatsApp ({phone}).
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-kerala font-bold">✓</span> We will show you the rover live and answer all questions for your parents.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hi Muhammed, I just requested a demo of Be There Kerala for my parents in ${district} from ${gccCity}. My name is ${name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-coral text-xs py-2.5! px-5! shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span>Chat directly with Founder on WhatsApp</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline text-xs py-2.5! px-4! cursor-pointer"
                >
                  Edit details
                </button>
              </div>
            </div>
          )}

          {/* Guarantees Strip */}
          <div className="mt-8 pt-6 border-t border-navy/10 flex items-center justify-center text-center text-xs text-navy/85 gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-kerala shrink-0" />
              <span>Zero-pressure friendly walkthrough</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-kerala shrink-0" />
              <span>Tailored for Kerala house layouts</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs md:text-sm text-cream/90 text-balance">
          Three things to remember: parent may be hard to reach • you can enter virtually • simple, respectful, private.
        </p>
      </div>
    </section>
  );
}
