"use client";

import Image from "next/image";
import { FOUNDER_INFO } from "@/lib/copy";
import { ExternalLink, Mail, Sparkles } from "lucide-react";

function LinkedInIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Founder() {
  return (
    <section
      id="founder"
      data-testid="founder-section"
      aria-labelledby="founder-heading"
      className="bg-[#fcf8f0] py-16 md:py-24 border-t border-navy/10 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-coral-deep bg-coral/10 px-4 py-1.5 rounded-full mb-3">
            <Sparkles size={14} /> Built from Kerala, for Our Families
          </span>
          <h2
            id="founder-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy text-balance"
          >
            Meet the Founder
          </h2>
          <p className="mt-3 text-base md:text-lg text-navy/80 leading-relaxed text-balance">
            Crafted with deep empathy for the Kerala diaspora and a commitment to eldercare safety.
          </p>
        </div>

        <div className="card-warm bg-white p-8 md:p-12 border border-navy/10 rounded-3xl shadow-xl grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-center">
          {/* Founder Photo */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-navy/10">
              <Image
                src={FOUNDER_INFO.image}
                alt={FOUNDER_INFO.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 208px, 240px"
                priority
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-extrabold text-navy">
                {FOUNDER_INFO.name}
              </h3>
              <p className="text-xs font-bold text-coral-deep uppercase tracking-wider mt-0.5">
                {FOUNDER_INFO.role}
              </p>
              <p className="text-xs text-navy/70 mt-1">
                {FOUNDER_INFO.tagline}
              </p>
            </div>
          </div>

          {/* Founder Bio & Story */}
          <div className="flex flex-col justify-between">
            <div className="relative">
              <span className="text-5xl text-warm leading-none select-none font-serif opacity-80 block mb-2">
                “
              </span>
              <blockquote className="text-base md:text-lg text-navy/90 leading-relaxed font-medium italic">
                {FOUNDER_INFO.quote}
              </blockquote>
            </div>

            <div className="mt-8 pt-6 border-t border-navy/10 flex flex-wrap items-center justify-between gap-4">
              {/* Portfolio Link Button */}
              <a
                href={FOUNDER_INFO.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="founder-portfolio-link"
                className="btn-coral py-2.5! px-5! text-xs font-bold shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>View My Portfolio</span>
                <ExternalLink size={14} />
              </a>

              {/* Social Links */}
              <div className="flex items-center gap-3 text-navy/70">
                <a
                  href={FOUNDER_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Muhammed Rinshid LinkedIn"
                  className="w-9 h-9 rounded-full bg-cream hover:bg-warm/30 hover:text-navy grid place-items-center transition-colors border border-navy/10 text-navy"
                >
                  <LinkedInIcon size={16} />
                </a>
                <a
                  href={FOUNDER_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Muhammed Rinshid GitHub"
                  className="w-9 h-9 rounded-full bg-cream hover:bg-warm/30 hover:text-navy grid place-items-center transition-colors border border-navy/10 text-navy"
                >
                  <GitHubIcon size={16} />
                </a>
                <a
                  href={`mailto:${FOUNDER_INFO.email}`}
                  aria-label="Email Muhammed Rinshid"
                  className="w-9 h-9 rounded-full bg-cream hover:bg-warm/30 hover:text-navy grid place-items-center transition-colors border border-navy/10 text-navy"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
