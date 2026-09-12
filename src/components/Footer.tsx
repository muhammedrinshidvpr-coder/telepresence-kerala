import { FOUNDER_INFO } from "@/lib/copy";

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-[#080e18] text-cream border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3 items-start">
        <div>
          <p className="font-extrabold text-xl tracking-tight">Be There Kerala</p>
          <p className="text-xs md:text-sm text-cream/80 mt-2.5 leading-relaxed">
            A dignified family telepresence companion designed for the Kerala diaspora across the GCC. Full peer-to-peer WebRTC privacy with zero intrusion.
          </p>
          <p className="text-xs text-warm/90 mt-3 font-semibold">
            Founded by <a href={FOUNDER_INFO.portfolio} target="_blank" rel="noopener noreferrer" className="underline hover:text-warm">{FOUNDER_INFO.name}</a>
          </p>
        </div>
        <nav aria-label="Footer" className="text-xs md:text-sm">
          <p className="font-bold text-cream mb-3 uppercase tracking-wider text-xs">Quick Links</p>
          <ul className="space-y-2 text-cream/80">
            <li><a href="#problem" className="hover:text-warm transition-colors">The Reality & Stats</a></li>
            <li><a href="#robot" className="hover:text-warm transition-colors">The Rover Hardware</a></li>
            <li><a href="#health" className="hover:text-warm transition-colors">Health & Safety Alerts</a></li>
            <li><a href="#founder" className="hover:text-warm transition-colors">Meet the Founder</a></li>
            <li>
              <a href="#cta" className="hover:text-warm transition-colors cursor-pointer text-coral font-semibold">
                Request a Free Family Demo →
              </a>
            </li>
          </ul>
        </nav>
        <div className="text-xs md:text-sm text-cream/80 space-y-2">
          <p className="font-bold text-cream mb-1 uppercase tracking-wider text-xs">Privacy & Standards</p>
          <p>Complete WebRTC peer-to-peer privacy, zero recording, zero cloud eavesdropping.</p>
          <p className="text-warm/90 font-medium">Malayalam-first • Elder-respectful • Safe for Kerala Homes</p>
          <p className="text-xs text-cream/80 pt-2">© {new Date().getFullYear()} Be There Kerala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
