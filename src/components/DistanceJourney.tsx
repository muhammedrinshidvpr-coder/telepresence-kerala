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
    <section id="distance" data-testid="distance" aria-labelledby="distance-h" className="bg-cream py-14">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-kerala">The distance between you</p>
        <h2 id="distance-h" className="mt-2 text-3xl md:text-4xl font-bold">
          Thousands of kilometres, one familiar presence
        </h2>
        <p className="mt-2 text-lg text-navy/70">{COPY.distanceLine}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="card-warm p-5">
            <p className="font-semibold flex items-center gap-2" id="city-group-label">
              <MapPin size={18} aria-hidden /> Choose your location
            </p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-labelledby="city-group-label">
              {GCC_CITIES.map((c) => (
                <button
                  key={c.id}
                  data-testid={`city-${c.id}`}
                  onClick={() => setCityId(c.id)}
                  aria-pressed={activeId === c.id}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border min-h-11 ${
                    activeId === c.id ? "bg-navy text-cream border-navy" : "border-navy/20 hover:border-navy"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-navy/70" data-testid="route-label">
              Visual route: {city.label} → Kerala home • ~{city.km.toLocaleString()} km
            </p>

            <label htmlFor="distance-slider" className="mt-6 block font-semibold">
              Drag the distance — feel the connection weaken
            </label>
            <input
              id="distance-slider"
              data-testid="distance-slider"
              type="range"
              min={0}
              max={100}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full mt-3 accent-[#c93f20]"
              aria-valuetext={`${weakness}% distant`}
            />
            <ul className="mt-4 text-sm text-navy/70 space-y-1">
              <li>• Missed calls across time zones</li>
              <li>• Busy work schedules, parents staying alone</li>
              <li>• Worry when there is no response</li>
            </ul>
            <a href="#control" data-testid="btn-be-there" className="btn-coral mt-6 w-full">
              <BellRing size={18} aria-hidden className="mr-2" /> Be there now
            </a>
          </div>

          <div className="card-warm p-5 overflow-hidden" aria-live="polite">
            <svg viewBox="0 0 520 220" className="w-full h-auto" role="img" aria-label={`Route from ${city.label} to Kerala home`}>
              <line x1="40" y1="110" x2="480" y2="110" stroke="#14243e" strokeOpacity="0.15" strokeWidth="3" strokeDasharray="8 8" />
              <circle cx="60" cy="110" r="22" fill="#14243e" />
              <text x="60" y="115" textAnchor="middle" fill="#faf4e8" fontSize="12" fontWeight="700">GCC</text>
              <text x="60" y="150" textAnchor="middle" fontSize="12" fill="#14243e">{city.label}</text>
              <g style={{ opacity }}>
                <path d="M250 60 C 300 40, 340 60, 360 100 C 375 130, 350 160, 320 155 C 290 150, 295 110, 250 60 Z" fill="#1b7a4d" opacity="0.9" />
                <rect x="330" y="120" width="70" height="44" rx="8" fill="#ffc75f" />
                <rect x="342" y="132" width="18" height="18" rx="3" fill="#14243e" opacity="0.8" />
              </g>
              <text x="365" y="185" textAnchor="middle" fontSize="12" fill="#14243e">Kerala home</text>
              <g data-testid="connection-line">
                <line x1="82" y1="110" x2="330" y2="130" stroke="#c93f20" strokeWidth={4} strokeOpacity={0.25 + opacity * 0.75} />
              </g>
            </svg>
            <p className="text-sm text-navy/70" data-testid="connection-strength">
              Connection strength: {100 - weakness}% {weakness > 66 ? "— direct contact feels weak, robot can be present instead." : weakness > 33 ? "— calls get harder, presence helps." : "— still close."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
