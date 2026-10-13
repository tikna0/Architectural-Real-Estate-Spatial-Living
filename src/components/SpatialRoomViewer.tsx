import React, { useState, useRef, useEffect } from 'react';
import { Compass, Maximize2, X, Sun, Sunset, Moon, Info, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Property, RoomView, RoomHotspot, LightingMood } from '../types';
import { sound } from '../utils/audio';

interface SpatialRoomViewerProps {
  property: Property;
  onScheduleShowing: () => void;
}

export const SpatialRoomViewer: React.FC<SpatialRoomViewerProps> = ({
  property,
  onScheduleShowing
}) => {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [lightingMood, setLightingMood] = useState<LightingMood>('sunset');
  const [activeHotspot, setActiveHotspot] = useState<RoomHotspot | null>(null);
  const [panOffset, setPanOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMuted, setIsMuted] = useState(!sound.isAmbientPlaying);
  const [showSpecs, setShowSpecs] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<number>(0);
  const initialPanRef = useRef<number>(0);

  const currentRoom: RoomView = property.rooms[selectedRoomIndex] || property.rooms[0];

  // Lighting filters
  const getLightingFilter = (m: LightingMood) => {
    switch (m) {
      case 'daylight':
        return 'brightness(1.04) contrast(1.02) saturate(1.02)';
      case 'sunset':
        return 'brightness(0.97) contrast(1.08) saturate(1.18) sepia(0.08)';
      case 'night':
        return 'brightness(0.84) contrast(1.22) saturate(0.92) hue-rotate(-8deg)';
    }
  };

  // Direct manipulation pointer handlers for fluid pan
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag on primary pointer and when not clicking a hotspot button
    if ((e.target as HTMLElement).closest('.hotspot-trigger')) return;
    setIsDragging(true);
    dragStartRef.current = e.clientX;
    initialPanRef.current = panOffset;
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartRef.current;
    // Rubber-band resistance at edges (-120px to +120px)
    const maxBound = 140;
    let nextPan = initialPanRef.current + delta;
    if (Math.abs(nextPan) > maxBound) {
      const overshoot = Math.abs(nextPan) - maxBound;
      const damped = (overshoot * 0.4) / (1 + overshoot * 0.005);
      nextPan = nextPan > 0 ? maxBound + damped : -maxBound - damped;
    }
    setPanOffset(nextPan);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
    // Apple critically-damped spring back towards center or mild settle
    setPanOffset((prev) => prev * 0.4);
    setTimeout(() => {
      setPanOffset(0);
    }, 180);
  };

  const handleRoomSelect = (idx: number) => {
    sound.playSnap();
    setSelectedRoomIndex(idx);
    setActiveHotspot(null);
    setPanOffset(0);
  };

  const handleMoodSelect = (mood: LightingMood) => {
    sound.playSnap();
    setLightingMood(mood);
  };

  const toggleSound = () => {
    sound.playClick();
    const playing = sound.toggleAmbient();
    setIsMuted(!playing);
  };

  return (
    <section id="spatial-tour" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Spatial Walkthrough</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
            PixelRooms Interactive Tour
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6E6E73] max-w-xl">
            Explore {property.title}. Drag horizontally to inspect the room, toggle lighting cycles, and inspect tactile material hotspots.
          </p>
        </div>

        {/* Room Switcher Tabs */}
        <div className="apple-glass p-1.5 rounded-2xl flex flex-wrap items-center gap-1 self-start md:self-auto">
          {property.rooms.map((room, idx) => (
            <button
              key={room.id}
              type="button"
              onClick={() => handleRoomSelect(idx)}
              className={`apple-press px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                selectedRoomIndex === idx
                  ? 'bg-white text-[#1D1D1F] shadow-sm'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full aspect-[16/9] max-h-[680px] rounded-3xl overflow-hidden bg-black select-none border border-black/10 shadow-2xl cursor-grab ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
      >
        {/* Dynamic Image Canvas with pan offset and lighting */}
        <div
          className="w-[110%] h-full -ml-[5%] transition-transform ease-out"
          style={{
            transform: `translateX(${panOffset}px) scale(1.02)`,
            transitionDuration: isDragging ? '0ms' : '360ms'
          }}
        >
          <img
            src={currentRoom.image}
            alt={currentRoom.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-700 ease-in-out pointer-events-none"
            style={{ filter: getLightingFilter(lightingMood) }}
          />
        </div>

        {/* Measured Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30 pointer-events-none" />

        {/* Top Control Bar (Apple Floating Glass) */}
        <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between gap-4 pointer-events-none">
          {/* Room Name Badge */}
          <div className="apple-glass-dark px-4 py-2 rounded-full text-white text-xs font-medium pointer-events-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold">{currentRoom.name}</span>
            <span className="text-white/60">· {currentRoom.dimensions}</span>
          </div>

          {/* Right Tools: Lighting presets + Audio + Specs */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Lighting Modes */}
            <div className="apple-glass-dark p-1 rounded-full flex items-center gap-1 shadow-md">
              <button
                type="button"
                onClick={() => handleMoodSelect('daylight')}
                title="Simulate daylight"
                className={`apple-press p-2 rounded-full transition-all ${
                  lightingMood === 'daylight' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleMoodSelect('sunset')}
                title="Simulate golden sunset"
                className={`apple-press p-2 rounded-full transition-all ${
                  lightingMood === 'sunset' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                <Sunset className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleMoodSelect('night')}
                title="Simulate ambient night"
                className={`apple-press p-2 rounded-full transition-all ${
                  lightingMood === 'night' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              title={isMuted ? "Unmute room ambience" : "Mute room ambience"}
              className="apple-press apple-glass-dark p-2.5 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-[#0071E3]" /> : <VolumeX className="w-3.5 h-3.5 text-white/70" />}
            </button>

            {/* Specs Toggle */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setShowSpecs(!showSpecs);
              }}
              title="Room architectural specifications"
              className={`apple-press apple-glass-dark p-2.5 rounded-full transition-colors ${
                showSpecs ? 'bg-white text-black' : 'text-white hover:bg-white/20'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive Spatial Hotspots */}
        {currentRoom.hotspots.map((hs) => (
          <div
            key={hs.id}
            className="absolute z-20 hotspot-trigger -translate-x-1/2 -translate-y-1/2 transition-transform"
            style={{
              left: `${hs.x}%`,
              top: `${hs.y}%`
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.playSnap();
                setActiveHotspot(activeHotspot?.id === hs.id ? null : hs);
              }}
              className="apple-press group relative flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-md shadow-lg border border-white/60 transition-transform hover:scale-110 active:scale-95"
              aria-label={`Inspect ${hs.title}`}
            >
              {/* Outer pulsing ring */}
              <span className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3] group-hover:scale-125 transition-transform"></span>
            </button>
          </div>
        ))}

        {/* Hotspot Floating Detail Card (Apple Spring Popover) */}
        {activeHotspot && (
          <div
            className="absolute z-30 max-w-xs p-4 rounded-2xl apple-glass shadow-2xl border border-white/80 -translate-x-1/2 transition-all animate-in fade-in zoom-in-95 duration-200"
            style={{
              left: `${Math.min(Math.max(activeHotspot.x, 22), 78)}%`,
              top: `${Math.min(Math.max(activeHotspot.y + 7, 20), 75)}%`
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3]">
                {activeHotspot.material}
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveHotspot(null);
                }}
                className="apple-press p-1 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-sm font-bold text-[#1D1D1F] leading-snug">
              {activeHotspot.title}
            </h4>
            <p className="mt-1.5 text-xs text-[#515154] leading-relaxed">
              {activeHotspot.detail}
            </p>
          </div>
        )}

        {/* Bottom Bar: Direct Navigation & Prompt */}
        <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white pointer-events-none">
          <div className="text-xs text-white/80 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Drag horizontally to rotate camera · Click circles to inspect craft</span>
          </div>

          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                sound.playSnap();
                onScheduleShowing();
              }}
              className="apple-press px-4 py-2 rounded-full text-xs font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] shadow-lg transition-all"
            >
              Book In-Person Showing
            </button>
          </div>
        </div>

        {/* Expandable Architectural Specs Drawer */}
        {showSpecs && (
          <div className="absolute top-16 right-5 z-30 w-72 p-4 rounded-2xl apple-glass shadow-2xl border border-white/80 animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-black/5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]">
                Architectural Specs
              </h4>
              <button
                type="button"
                onClick={() => setShowSpecs(false)}
                className="apple-press p-1 rounded-full text-[#86868B] hover:text-[#1D1D1F]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#86868B]">Room Dimensions</span>
                <span className="font-semibold text-[#1D1D1F]">{currentRoom.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86868B]">Solar Exposure</span>
                <span className="font-semibold text-[#1D1D1F]">{currentRoom.exposure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86868B]">Acoustic Rating</span>
                <span className="font-semibold text-[#1D1D1F]">STC 58 (Triple Pane)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86868B]">Air Filtration</span>
                <span className="font-semibold text-[#1D1D1F]">MERV-16 Dual ERV</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86868B]">Circadian System</span>
                <span className="font-semibold text-[#1D1D1F]">Ketra DMX Controlled</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
