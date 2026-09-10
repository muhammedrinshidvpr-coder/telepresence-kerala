"use client";

import { useEffect, useRef, useState } from "react";
import { HousePlus, AppWindow, HeartHandshake, CheckCircle2, Sparkles, CreditCard, Lock } from "lucide-react";
import { COPY, GCC_CITIES, KERALA_DISTRICTS, PILOT_CONFIG, TALLY_CONFIG } from "@/lib/copy";

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

/**
 * Dedicated dynamic loader for Razorpay Payment Button
 * Button ID: pl_TZkJ6MXbfyHppT
 */
function RazorpayPaymentButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const form = document.createElement("form");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", "pl_TZkJ6MXbfyHppT");
    script.async = true;
    script.onload = () => setLoaded(true);

    form.appendChild(script);
    container.appendChild(form);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-3">
      <div ref={containerRef} className="min-h-[48px] flex items-center justify-center" />
      {!loaded && (
        <div className="flex items-center gap-2 text-xs text-navy/70 mt-1">
          <span className="w-2 h-2 rounded-full bg-coral animate-ping" />
          <span>Loading secure Razorpay checkout…</span>
        </div>
      )}
    </div>
  );
}

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
  const [step, setStep] = useState<"form" | "token_payment" | "confirmed">("form");

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("token_payment");
  };

  return (
    <section id="cta" data-testid="cta" aria-labelledby="cta-h" className="relative bg-gradient-to-b from-navy-deep via-navy to-[#0a1220] text-cream py-16 md:py-24 overflow-hidden">
      {/* Glow accents */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-warm/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-coral/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-warm/20 text-warm border border-warm/30 rounded-full px-4 py-1.5 shadow-sm mb-4">
            <Sparkles size={14} /> Priority Boarding Early Access
          </div>
          <h2 id="cta-h" className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance">
            {COPY.finalH}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-cream/90 max-w-2xl mx-auto leading-relaxed text-balance">
            {COPY.finalSub}
          </p>
        </div>

        {/* Consolidated Unified Pre-Order Form Card */}
        <div className="mt-10 card-warm bg-white/95! text-navy p-6 md:p-10 shadow-2xl border border-white/20 rounded-3xl">
          {step === "form" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-navy/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-coral-deep">Kerala Pilot Batch #1</span>
                  <h3 className="text-2xl font-extrabold text-navy">Reserve Your Priority Pre-Order Token</h3>
                  <p className="text-xs md:text-sm text-navy/80 mt-0.5">
                    Batch 1: Strictly limited to {PILOT_CONFIG.totalUnits} homes ({PILOT_CONFIG.reservedUnits} already reserved).
                  </p>
                </div>
                <div className="bg-coral/10 text-coral-deep font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-coral/20">
                  <span className="w-2 h-2 rounded-full bg-coral animate-pulse" /> ₹199/- Pre-Order Token
                </div>
              </div>

              <form onSubmit={handleSubmitDetails} className="mt-6 grid gap-5 sm:grid-cols-2">
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
                    WhatsApp Number (for delivery updates)
                  </label>
                  <input
                    id="reserve-phone"
                    aria-label="WhatsApp Number (for delivery updates)"
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-navy/20 bg-cream/40 text-sm text-navy focus:ring-2 focus:ring-warm outline-none"
                  />
                </div>

                {/* User requirement: "instead of 'What would you love to do most with the robot?' make it 'Your expectations of the rover'" */}
                <div className="sm:col-span-2">
                  <label htmlFor="reserve-expectations" className="block text-xs font-bold uppercase tracking-wider text-navy/85 mb-1.5">
                    Your expectations of the rover
                  </label>
                  <textarea
                    id="reserve-expectations"
                    aria-label="Your expectations of the rover"
                    required
                    rows={3}
                    placeholder="Share how you hope to use the rover with your parents (e.g. morning tea check-in, moving into the veranda, seeing Amma when she can't reach the phone...)"
                    value={expectations}
                    onChange={(e) => setExpectations(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-navy/20 bg-cream/40 text-sm text-navy focus:ring-2 focus:ring-warm outline-none"
                  />
                </div>

                <div className="sm:col-span-2 mt-2">
                  <button type="submit" className="btn-gold w-full text-base font-extrabold shadow-lg cursor-pointer">
                    Proceed to Pre-Order Token Payment (₹199/-) →
                  </button>
                  <p className="text-[11px] text-center text-navy/85 mt-2 flex items-center justify-center gap-1.5">
                    <Lock size={12} className="text-kerala" />
                    <span>Your nominal ₹199 token locks priority boarding and is 100% refundable upon request.</span>
                  </p>
                </div>

                <div className="sm:col-span-2 text-center pt-3 border-t border-navy/10">
                  <span className="text-xs text-navy/70">Not ready to reserve yet? </span>
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
                    Book a free family consultation / demo →
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === "token_payment" && (
            <div className="text-center py-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-warm/20 text-warm-deep grid place-items-center mx-auto mb-3">
                <CreditCard size={32} className="text-navy" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-coral-deep bg-coral/10 px-3.5 py-1 rounded-full">
                Step 2: Pre-Order Token Payment
              </span>
              <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-navy">
                Complete Your ₹199/- Token for {name}
              </h3>
              <p className="mt-2 text-sm text-navy/85 max-w-md mx-auto">
                Connecting <strong className="text-navy">{gccCity}</strong> with family home in <strong className="text-navy">{district}</strong>.
              </p>

              {/* Expectations summary badge */}
              <div className="mt-4 p-3 bg-cream/60 rounded-xl border border-navy/10 text-xs text-left max-w-lg mx-auto text-navy/85">
                <p className="font-bold text-navy mb-1">Your Expectations:</p>
                <p className="italic">“{expectations}”</p>
              </div>

              {/* User Razorpay Button Embedded */}
              <div className="mt-6 p-6 bg-gradient-to-br from-cream/40 to-white rounded-2xl border-2 border-warm/80 max-w-md mx-auto shadow-inner">
                <p className="text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  Official Razorpay Pre-Order Token
                </p>
                <RazorpayPaymentButton />
                <p className="text-[11px] text-navy/80 mt-2">
                  Secure 256-bit encrypted transaction via Razorpay. Supports UPI, Cards, NetBanking.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setStep("confirmed")}
                  className="btn-coral text-xs py-2! px-4! shadow-md cursor-pointer"
                >
                  I have completed the payment →
                </button>
                <button
                  onClick={() => setStep("form")}
                  className="btn-outline text-xs py-2! px-4! cursor-pointer"
                >
                  ← Edit details
                </button>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  data-testid="payment-tally-inquire"
                  data-tally-open={TALLY_CONFIG.formId}
                  data-tally-layout="modal"
                  data-tally-width={TALLY_CONFIG.modalWidth}
                  data-tally-emoji-text={TALLY_CONFIG.emoji}
                  data-tally-hidden={`city=${encodeURIComponent(gccCity)},district=${encodeURIComponent(district)},name=${encodeURIComponent(name)},phone=${encodeURIComponent(phone)}`}
                  className="text-xs text-navy/70 hover:text-navy underline cursor-pointer"
                >
                  Have questions before paying? Ask our Kerala team via inquiry form →
                </button>
              </div>
            </div>
          )}

          {step === "confirmed" && (
            <div className="text-center py-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-kerala-light text-kerala grid place-items-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-kerala bg-kerala-light px-3 py-1 rounded-full">
                Priority Boarding Token Confirmed
              </span>
              <h3 className="mt-3 text-3xl font-extrabold text-navy">You&apos;re on Priority Boarding, {name}!</h3>
              <p className="mt-2 text-sm text-navy/85 max-w-md mx-auto">
                Unit reserved for your Kerala family in <strong className="text-navy">{district}</strong> from <strong className="text-navy">{gccCity}</strong>.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-cream border border-navy/10 text-xs text-navy/85 max-w-md mx-auto text-left">
                <p className="flex items-center gap-2">
                  <span className="text-kerala font-bold">✓</span> We will send priority updates and setup scheduling to {phone}.
                </p>
              </div>
            </div>
          )}

          {/* Guarantees Strip */}
          <div className="mt-8 pt-6 border-t border-navy/10 flex items-center justify-center text-center text-xs text-navy/85">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 size={16} className="text-kerala shrink-0" />
              <span>100% refundable token</span>
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
