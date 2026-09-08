import { TALLY_CONFIG } from "@/lib/copy";

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-[#080e18] text-cream border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3 items-start">
        <div>
          <p className="font-extrabold text-xl tracking-tight">Be There, From Anywhere</p>
          <p className="text-xs md:text-sm text-cream/90 mt-2.5 leading-relaxed">
            A dignified family telepresence companion designed for the Gulf diaspora and their parents in Kerala. Simulated interactive demo — no hidden telemetry.
          </p>
          <p className="text-xs text-warm/90 mt-3 font-semibold">
            Kerala Pilot Batch 1: Limited to 50 families.
          </p>
        </div>
        <nav aria-label="Footer" className="text-xs md:text-sm">
          <p className="font-bold text-cream mb-3 uppercase tracking-wider text-xs">Quick Links</p>
          <ul className="space-y-2 text-cream/90">
            <li><a href="#robot" className="hover:text-warm transition-colors">Hardware & 3D Model</a></li>
            <li><a href="#control" className="hover:text-warm transition-colors">Virtual Home Check-in</a></li>
            <li><a href="#privacy" className="hover:text-warm transition-colors">Privacy and trust architecture</a></li>
            <li><a href="#demo" className="hover:text-warm transition-colors">60-second virtual visit</a></li>
            <li>
              <a
                href="#cta"
                data-tally-open={TALLY_CONFIG.formId}
                data-tally-layout="modal"
                data-tally-width={TALLY_CONFIG.modalWidth}
                data-tally-emoji-text={TALLY_CONFIG.emoji}
                className="hover:text-warm transition-colors cursor-pointer"
              >
                Pre-order pilot batch
              </a>
            </li>
          </ul>
        </nav>
        <div className="text-xs md:text-sm text-cream/90 space-y-2">
          <p className="font-bold text-cream mb-1 uppercase tracking-wider text-xs">Privacy & Standards</p>
          <p>Designed with privacy-first access controls and secure communication.</p>
          <p className="text-warm/90 font-medium">Malayalam-first • Elder-respectful • Consent-led</p>
          <p className="text-xs text-cream/80 pt-2">© {new Date().getFullYear()} Be There Kerala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
