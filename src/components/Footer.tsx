export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-navy text-cream mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <p className="font-bold text-lg">Be There, From Anywhere</p>
          <p className="text-sm text-cream/70 mt-2">
            A warm family connection product with robotics inside it. Simulated demo — no real
            recording by default.
          </p>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <ul className="space-y-2">
            <li><a href="#robot" className="hover:underline">Product</a></li>
            <li><a href="#privacy" className="hover:underline">Privacy and trust</a></li>
            <li><a href="#demo" className="hover:underline">Try a 60-second visit</a></li>
            <li><a href="#cta" className="hover:underline">Pilot programme</a></li>
          </ul>
        </nav>
        <div className="text-sm text-cream/70">
          <p>Designed with privacy-first access controls and secure communication.</p>
          <p className="mt-2">Malayalam-first • Elder-respectful • Consent-led</p>
        </div>
      </div>
    </footer>
  );
}
