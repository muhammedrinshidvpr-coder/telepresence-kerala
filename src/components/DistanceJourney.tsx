"use client";

import { useState } from "react";
import { MapPin, BellRing } from "lucide-react";
import { COPY, GCC_CITIES } from "@/lib/copy";
import { useCity } from "./CityContext";

export default function DistanceJourney() {
  const { city, setCityId } = useCity();
  const [distance, setDistance] = useState(60);
  const activeId = city.id;
  const weakness = Math.round(distance); // 0..100
  const opacity = (100 - weakness) / 100;

  return (
    <section id="distance" data-testid="distance" aria-labelledby="distance-h" className="bg-gradient-to-b from-[#faf4e8] to-[#f4ebdc] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-kerala bg-kerala-light inline-block px-3.5 py-1.5 rounded-full">
            Bridging the Miles
          </p>
          <h2 id="distance-h" className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Thousands of kilometres, one familiar presence
          </h2>
          <p className="mt-3 text-base md:text-lg text-navy/75 text-balance">{COPY.distanceLine}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.25fr] items-start">
          <div className="card-warm p-6 shadow-md border border-navy/10">
            <p className="font-bold text-base flex items-center gap-2 text-navy" id="city-group-label">
              <MapPin size={18} className="text-coral" aria-hidden /> Select your location in the GCC
            </p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-labelledby="city-group-label">
              {GCC_CITIES.map((c) => (
                <button
                  key={c.id}
                  data-testid={`city-${c.id}`}
                  onClick={() => setCityId(c.id)}
                  aria-pressed={activeId === c.id}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold border min-h-[44px] transition-all duration-200 cursor-pointer active:scale-95 ${
                    activeId === c.id
                      ? "bg-navy text-cream border-navy shadow-md ring-2 ring-navy/20"
                      : "border-navy/20 bg-white text-navy hover:bg-cream/60"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-cream-dark/50 border border-navy/5 text-xs text-navy/85 space-y-1">
              <p className="font-semibold text-navy" data-testid="route-label">
                Visual route: {city.label} → Kerala home • ~{city.km.toLocaleString()} km
              </p>
              <p className="text-navy/85">Average telepresence latency: ~45ms • Gulf to Kerala direct stream</p>
            </div>

            <label htmlFor="distance-slider" className="mt-6 block font-bold text-sm text-navy">
              Simulate distance — feel traditional phone calls weaken
            </label>
            <input
              id="distance-slider"
              data-testid="distance-slider"
              type="range"
              min={0}
              max={100}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full mt-3 h-2.5 bg-cream-dark rounded-lg appearance-none cursor-pointer accent-coral"
              aria-valuetext={`${weakness}% distant`}
            />

            <ul className="mt-4 text-xs md:text-sm text-navy/85 space-y-1.5">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coral" /> Missed phone calls across time zones
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coral" /> Demanding work schedules while parents stay alone
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coral" /> Constant anxiety when calls go unanswered
              </li>
            </ul>

            <a href="#control" data-testid="btn-be-there" className="btn-coral mt-6 w-full shadow-md">
              <BellRing size={18} aria-hidden className="mr-2" /> Be there now
            </a>
          </div>

          {/* Interactive Trajectory Map */}
          <div className="card-warm p-6 overflow-hidden shadow-lg border border-navy/10 bg-gradient-to-br from-white to-[#fbf8f2]" aria-live="polite">
            <div className="flex items-center justify-between text-xs font-semibold text-navy/85 mb-2">
              <span>Arabian Sea Telepresence Route</span>
              <span className="text-kerala font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-kerala animate-pulse" /> Live connection
              </span>
            </div>

            <svg viewBox="0 0 520 230" className="w-full h-auto rounded-xl bg-gradient-to-b from-[#edf4fa] to-[#e4eef6] p-2" role="img" aria-label={`Route from ${city.label} to Kerala home`}>
              {/* Water background lines */}
              <path d="M0 160 Q 130 150 260 160 T 520 160" fill="none" stroke="#bdd6ea" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M0 190 Q 130 180 260 190 T 520 190" fill="none" stroke="#bdd6ea" strokeWidth="1" strokeDasharray="4 4" />

              {/* Dotted straight reference line */}
              <line x1="70" y1="100" x2="440" y2="120" stroke="#14243e" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 6" />

              {/* Curved Trajectory Arc across Arabian Sea */}
              <g data-testid="connection-line">
                <path
                  d="M 70 100 Q 255 40 440 120"
                  fill="none"
                  stroke="#c93f20"
                  strokeWidth="3.5"
                  strokeOpacity={0.25 + opacity * 0.75}
                  strokeDasharray="8 4"
                  className="animate-pulse"
                />
              </g>

              {/* GCC Origin Pin */}
              <circle cx="70" cy="100" r="24" fill="#14243e" />
              <circle cx="70" cy="100" r="18" fill="#1b2e4b" />
              <text x="70" y="105" textAnchor="middle" fill="#faf4e8" fontSize="11" fontWeight="700">GCC</text>
              <text x="70" y="145" textAnchor="middle" fontSize="13" fontWeight="700" fill="#14243e">{city.label}</text>
              <text x="70" y="160" textAnchor="middle" fontSize="10" fill="#14243e" opacity="0.7">UAE / Gulf</text>

              {/* Kerala Destination */}
              <g style={{ opacity }}>
                {/* Traditional Kerala home silhouette / lush green region */}
                <path d="M 390 70 C 430 50, 480 70, 480 120 C 480 160, 440 170, 410 165 C 390 160, 380 120, 390 70 Z" fill="#1b7a4d" opacity="0.25" />
                <rect x="410" y="100" width="60" height="40" rx="8" fill="#1b7a4d" />
                <path d="M 405 100 L 440 75 L 475 100 Z" fill="#c93f20" />
                {/* Small robot beacon */}
                <circle cx="440" cy="115" r="7" fill="#ffc75f" />
                <circle cx="440" cy="115" r="12" fill="none" stroke="#ffc75f" strokeWidth="2" opacity="0.8" className="animate-ping" />
              </g>
              <text x="440" y="165" textAnchor="middle" fontSize="13" fontWeight="700" fill="#14243e">Kerala Home</text>
              <text x="440" y="180" textAnchor="middle" fontSize="10" fill="#1b7a4d" fontWeight="600">Amma & Achan</text>
            </svg>

            <div className="mt-4 p-3 rounded-xl bg-cream border border-navy/10 text-xs md:text-sm font-medium text-navy/80" data-testid="connection-strength">
              Connection strength: <strong className="text-navy">{100 - weakness}%</strong> {weakness > 66 ? "— direct contact feels weak, robot can be present instead." : weakness > 33 ? "— calls get harder, presence helps." : "— still close."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
