"use client";

import { useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, ShieldCheck, Video, Radio } from "lucide-react";
import { useCity } from "./CityContext";

export default function TakeControl() {
  const { city } = useCity();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeStage, setActiveStage] = useState<"connecting" | "driving" | "greeting" | "docking">("driving");

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  return (
    <section id="control" data-testid="control" aria-labelledby="control-h" className="bg-gradient-to-b from-[#0c1729] via-navy to-[#0a1220] text-cream py-16 md:py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-warm bg-warm/15 inline-block px-3.5 py-1.5 rounded-full">
            Combined Video Showcase
          </p>
          <h2 id="control-h" className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            See the App in Hand & the Rover in Motion
          </h2>
          <p className="mt-3 text-base md:text-lg text-cream/80 text-balance">
            Watch how family members abroad navigate Kerala living rooms with effortless touch controls while parents rest undisturbed.
          </p>
        </div>

        {/* Main Combined Video Container */}
        <div className="mt-10 card-warm bg-navy-deep text-cream shadow-2xl border border-white/15 overflow-hidden rounded-3xl" data-testid="combined-video-player">
          {/* Top Video Header Strip */}
          <div className="px-5 py-3.5 bg-black/40 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-bold tracking-wide">Live Demo Stream • Direct WebRTC P2P</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-cream/90">
              <span className="bg-white/10 px-2.5 py-1 rounded-full">{city.label} ⇄ Kerala Home</span>
              <span className="bg-kerala/20 text-green-300 px-2.5 py-1 rounded-full font-semibold">Latency: ~42ms</span>
            </div>
          </div>

          {/* Video Player Display */}
          <div className="relative aspect-video w-full bg-gradient-to-br from-[#060b14] to-[#121c2e] overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              playsInline
              loop
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1280' height='720' viewBox='0 0 1280 720'%3E%3Crect width='1280' height='720' fill='%230a1322'/%3E%3Ctext x='640' y='360' font-family='sans-serif' font-size='24' fill='%2360a5fa' font-weight='700' text-anchor='middle'%3ECombined Video: App Control %26 Rover Movement%3C/text%3E%3C/svg%3E"
            >
              <source src="/videos/rover-demo.mp4" type="video/mp4" />
              <source src="/videos/rover-demo.webm" type="video/webm" />
            </video>

            {/* In-Video Simulated Split Demonstration Overlay (if local video is not yet placed) */}
            <div className="absolute inset-0 pointer-events-none p-4 md:p-8 flex flex-col justify-between bg-gradient-to-t from-black/80 via-transparent to-black/30">
              {/* Dual-View Labels */}
              <div className="flex justify-between items-start gap-4">
                <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
                  <Radio size={14} className="text-coral animate-pulse" />
                  <span><strong>Left:</strong> App View ({city.label})</span>
                </div>
                <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
                  <Video size={14} className="text-green-400 animate-pulse" />
                  <span><strong>Right:</strong> Physical Rover (Kerala)</span>
                </div>
              </div>

              {/* Big Play Button Overlay when paused */}
              {!isPlaying && (
                <div className="pointer-events-auto self-center">
                  <button
                    onClick={togglePlay}
                    aria-label="Play demo video"
                    className="w-20 h-20 rounded-full bg-coral hover:bg-coral-deep text-white grid place-items-center shadow-2xl transition-all active:scale-95 cursor-pointer"
                  >
                    <Play size={36} className="ml-1.5" />
                  </button>
                </div>
              )}

              {/* Bottom Real-time Telemetry Bar */}
              <div className="bg-black/70 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-warm">Stage:</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded-md capitalize font-semibold">
                    {activeStage === "connecting" ? "1. Connecting to Home" : activeStage === "driving" ? "2. Navigating Living Room" : activeStage === "greeting" ? "3. Malayalam Family Greeting" : "4. Auto Docking"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-cream/80">
                  <ShieldCheck size={14} className="text-green-400" />
                  <span>Direct Encrypted WebRTC Stream</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video Control Bar */}
          <div className="px-5 py-4 bg-navy/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="btn-coral py-2! px-4! text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                <span>{isPlaying ? "Pause Video" : "Play Combined Demo"}</span>
              </button>
              <button
                onClick={restartVideo}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-cream transition-colors cursor-pointer"
                title="Restart Video"
                aria-label="Restart video"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={toggleMute}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-cream transition-colors cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {/* Quick Demo Stages */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-cream/70 mr-1 hidden sm:inline">Jump to:</span>
              {(["connecting", "driving", "greeting", "docking"] as const).map((stage) => (
                <button
                  key={stage}
                  onClick={() => setActiveStage(stage)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeStage === stage ? "bg-warm text-navy font-bold" : "bg-white/10 text-cream/80 hover:bg-white/20"
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
