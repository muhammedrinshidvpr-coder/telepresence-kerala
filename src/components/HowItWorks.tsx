import { HousePlus, AppWindow, HeartHandshake } from "lucide-react";
import { COPY } from "@/lib/copy";

const STEPS = [
  { icon: HousePlus, t: "Step 1: Place it at home", d: "The robot stays in the elder’s home and connects to the internet." },
  { icon: AppWindow, t: "Step 2: Open the app", d: "The family member opens the app from the GCC and selects the home." },
  { icon: HeartHandshake, t: "Step 3: Be present", d: "They drive, see, listen, and talk through the robot. The elder does not need to answer a phone or operate a complicated device." },
];

export default function HowItWorks() {
  return (
    <section id="how" data-testid="how" aria-labelledby="how-h" className="bg-white py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="how-h" className="text-3xl md:text-4xl font-bold text-center">How it works — three simple steps</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <article key={s.t} data-testid={`how-step-${i}`} className="card-warm p-6 text-center">
              <span className="w-12 h-12 mx-auto rounded-2xl bg-navy text-cream grid place-items-center" aria-hidden><s.icon size={24} /></span>
              <h3 className="mt-3 font-bold text-lg">{s.t}</h3>
              <p className="mt-1 text-sm text-navy/70">{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section id="cta" data-testid="cta" aria-labelledby="cta-h" className="bg-navy text-cream py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 id="cta-h" className="text-4xl md:text-5xl font-bold">{COPY.finalH}</h2>
        <p className="mt-3 text-lg text-cream/75">{COPY.finalSub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#demo" data-testid="cta-demo" className="btn-coral">Book a family demo</a>
          <a href="#demo" data-testid="cta-pilot" className="btn-outline !border-cream !text-cream">Join the Kerala pilot</a>
          <a href="#top" data-testid="cta-notify" className="btn-outline !border-cream !text-cream">Get notified when available</a>
        </div>
        <p className="mt-6 text-sm text-cream/60">Three things to remember: parent may be hard to reach • you can enter virtually • simple, respectful, private.</p>
      </div>
    </section>
  );
}
