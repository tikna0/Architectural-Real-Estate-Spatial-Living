import React, { useState } from 'react';
import { Sun, Sunset, Moon, Compass, ArrowRight } from 'lucide-react';
import { LightingMood } from '../types';
import { sound } from '../utils/audio';

interface HeroProps {
  onExploreTour: () => void;
  onBrowseListings: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreTour, onBrowseListings }) => {
  const [mood, setMood] = useState<LightingMood>('sunset');

  // Realistic lighting simulation filters
  const getLightingFilter = (m: LightingMood) => {
    switch (m) {
      case 'daylight':
        return 'brightness(1.05) contrast(1.02) saturate(1.0)';
      case 'sunset':
        return 'brightness(0.98) contrast(1.06) saturate(1.15) sepia(0.08)';
      case 'night':
        return 'brightness(0.85) contrast(1.18) saturate(0.9) hue-rotate(-8deg)';
    }
  };

  const handleMoodChange = (newMood: LightingMood) => {
    sound.playSnap();
    setMood(newMood);
  };

  return (
    <section className="relative pt-6 pb-16 px-6 max-w-7xl mx-auto">
      {/* Top Headline Block */}
      <div className="max-w-3xl mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-3">
          Spatial Real Estate & Architectural Living
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D1D1F] leading-[1.08] text-balance">
          Residences defined by light, volume, and calm.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#6E6E73] leading-relaxed max-w-2xl">
          PixelRooms pairs museum-grade architectural residences with fluid, physical room exploration. Experience natural sunlight transitions, material specs, and acoustic insulation before you step through the door.
        </p>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onExploreTour();
            }}
            className="apple-press inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] shadow-sm transition-all"
          >
            <span>Launch Spatial Tour</span>
            <Compass className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onBrowseListings();
            }}
            className="apple-press inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[#1D1D1F] bg-white border border-[#E5E5E7] hover:bg-[#F5F5F7] shadow-sm transition-all"
          >
            <span>Browse Residences</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dominant Hero Carrier: Interactive Architectural Showcase */}
      <div className="relative rounded-3xl overflow-hidden border border-black/10 shadow-2xl bg-neutral-900 aspect-[16/9] max-h-[640px] group">
        <img
          src="/src/assets/images/hero_luxury_penthouse_1791899032224.jpg"
          alt="The Lumina Sky Penthouse Great Room at dusk"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-700 ease-out"
          style={{ filter: getLightingFilter(mood) }}
        />

        {/* Measured scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

        {/* Floating Apple-style Lighting Atmosphere Controller */}
        <div className="absolute top-5 right-5 z-20">
          <div className="apple-glass-dark p-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <button
              type="button"
              onClick={() => handleMoodChange('daylight')}
              className={`apple-press flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                mood === 'daylight'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Daylight</span>
            </button>

            <button
              type="button"
              onClick={() => handleMoodChange('sunset')}
              className={`apple-press flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                mood === 'sunset'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Sunset className="w-3.5 h-3.5" />
              <span>Golden Sunset</span>
            </button>

            <button
              type="button"
              onClick={() => handleMoodChange('night')}
              className={`apple-press flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                mood === 'night'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Nocturne</span>
            </button>
          </div>
        </div>

        {/* Lower Marquee Info Card */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/70 mb-1">
              Featured Residence · Manhattan Sky Sanctuary
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              The Lumina Sky Penthouse
            </h2>
            <div className="text-sm text-white/80 mt-1 flex flex-wrap items-center gap-2">
              <span>SoHo / Tribeca, New York</span>
              <span aria-hidden="true">·</span>
              <span>Kengo Kuma & Associates</span>
              <span aria-hidden="true">·</span>
              <span>Completed 2024</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onExploreTour();
              }}
              className="apple-press px-4 py-2 rounded-full text-xs font-medium text-black bg-white hover:bg-neutral-100 shadow-md transition-all whitespace-nowrap"
            >
              Enter Room Walkthrough
            </button>
          </div>
        </div>
      </div>

      {/* Tabular Architectural Specs Strip */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-black/5 shadow-sm">
        <div>
          <div className="text-xs text-[#86868B] uppercase tracking-wide">Acquisition Price</div>
          <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tabular-nums mt-0.5">
            $14,850,000
          </div>
          <div className="text-xs text-[#86868B] mt-1">$3,080 / sq ft · Private Elevator</div>
        </div>

        <div>
          <div className="text-xs text-[#86868B] uppercase tracking-wide">Spatial Area</div>
          <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tabular-nums mt-0.5">
            4,820 sq ft
          </div>
          <div className="text-xs text-[#86868B] mt-1">Plus 840 sq ft Sky Loggia</div>
        </div>

        <div>
          <div className="text-xs text-[#86868B] uppercase tracking-wide">Layout & Baths</div>
          <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tabular-nums mt-0.5">
            4 Beds · 4.5 Baths
          </div>
          <div className="text-xs text-[#86868B] mt-1">Dual Primary Suites</div>
        </div>

        <div>
          <div className="text-xs text-[#86868B] uppercase tracking-wide">Ceiling & Volume</div>
          <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tabular-nums mt-0.5">
            11.8 ft Ceilings
          </div>
          <div className="text-xs text-[#86868B] mt-1">Triple-Glazed Acoustic Glass</div>
        </div>
      </div>
    </section>
  );
};
