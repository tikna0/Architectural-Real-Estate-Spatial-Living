import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Sun, Shield, Layers, Eye } from 'lucide-react';
import { Property } from '../types';
import { sound } from '../utils/audio';

interface NeighborhoodMapProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

type MapLayer = 'residences' | 'walk' | 'sunlight' | 'quietude';

export const NeighborhoodMap: React.FC<NeighborhoodMapProps> = ({
  properties,
  onSelectProperty
}) => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('residences');
  const [activePin, setActivePin] = useState<Property | null>(properties[0] || null);

  const handleLayerChange = (layer: MapLayer) => {
    sound.playSnap();
    setActiveLayer(layer);
  };

  return (
    <section id="neighborhood-map" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Title & Section Proposition */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Spatial Intelligence & Geography</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
            Neighborhood Map Explorer
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6E6E73] max-w-xl">
            Explore geographical distribution, daylight orientation, and environmental acoustic metrics across our residential portfolio.
          </p>
        </div>

        {/* Map Layer Switcher (Apple Segmented Style) */}
        <div className="apple-glass p-1 rounded-2xl flex flex-wrap items-center gap-1 self-start md:self-auto">
          <button
            type="button"
            onClick={() => handleLayerChange('residences')}
            className={`apple-press px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeLayer === 'residences' ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Residences</span>
          </button>
          <button
            type="button"
            onClick={() => handleLayerChange('walk')}
            className={`apple-press px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeLayer === 'walk' ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>WalkScore</span>
          </button>
          <button
            type="button"
            onClick={() => handleLayerChange('sunlight')}
            className={`apple-press px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeLayer === 'sunlight' ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Solar Hours</span>
          </button>
          <button
            type="button"
            onClick={() => handleLayerChange('quietude')}
            className={`apple-press px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeLayer === 'quietude' ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Acoustics</span>
          </button>
        </div>
      </div>

      {/* Interactive Map Surface */}
      <div className="relative w-full aspect-[21/9] min-h-[460px] rounded-3xl overflow-hidden border border-black/10 shadow-lg bg-[#EFEFEF] select-none">
        {/* Minimalist Apple Maps Vector Background SVG */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
            </pattern>
            {/* Soft River / Coast gradient */}
            <linearGradient id="water-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFEAF2" />
              <stop offset="100%" stopColor="#C9DCEB" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="#F4F4F6" />
          <rect width="100%" height="100%" fill="url(#map-grid)" />

          {/* Minimalist Topographic Contour Lines */}
          <path
            d="M -50 180 Q 200 120 400 240 T 800 160 T 1200 320 T 1600 180"
            fill="none"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth="32"
          />
          <path
            d="M -50 260 Q 240 280 480 180 T 920 300 T 1300 210 T 1700 280"
            fill="none"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth="48"
          />

          {/* Coastal Water Bay shape */}
          <path
            d="M 0 0 L 280 0 C 260 160 180 240 140 380 C 110 480 80 560 0 600 Z"
            fill="url(#water-grad)"
            opacity="0.85"
          />

          {/* Clean Avenue Arterials */}
          <line x1="140" y1="380" x2="1600" y2="380" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
          <line x1="680" y1="0" x2="680" y2="700" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
          <line x1="780" y1="0" x2="980" y2="700" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <line x1="300" y1="120" x2="1400" y2="220" stroke="#FFFFFF" strokeWidth="4" />
        </svg>

        {/* Proximity Radius Ring for Active Pin */}
        {activePin && (
          <div
            className="absolute rounded-full border border-[#0071E3]/25 bg-[#0071E3]/5 pointer-events-none transition-all duration-500 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${activePin.mapCoords.x}%`,
              top: `${activePin.mapCoords.y}%`,
              width: '180px',
              height: '180px'
            }}
          />
        )}

        {/* Property Map Pins */}
        {properties.map((p) => {
          const isActive = activePin?.id === p.id;
          let badgeText = `$${(p.price / 1000000).toFixed(1)}M`;
          if (activeLayer === 'walk') badgeText = `Walk ${p.neighborhoodScore.walk}`;
          if (activeLayer === 'sunlight') badgeText = `${p.neighborhoodScore.sunlightHours}h Sun`;
          if (activeLayer === 'quietude') badgeText = `Quiet ${p.neighborhoodScore.quietude}`;

          return (
            <div
              key={p.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform cursor-pointer"
              style={{
                left: `${p.mapCoords.x}%`,
                top: `${p.mapCoords.y}%`
              }}
              onClick={() => {
                sound.playSnap();
                setActivePin(p);
              }}
            >
              <div
                className={`apple-press flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md shadow-md border transition-all ${
                  isActive
                    ? 'bg-[#0071E3] text-white border-[#0071E3] scale-110 shadow-xl'
                    : 'bg-white/90 text-[#1D1D1F] border-white/80 hover:bg-white hover:scale-105'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-[#0071E3]'}`} />
                <span className="text-xs font-semibold tabular-nums whitespace-nowrap">{badgeText}</span>
              </div>
            </div>
          );
        })}

        {/* Floating Active Residence Card on Map */}
        {activePin && (
          <div className="absolute bottom-6 left-6 z-30 max-w-sm w-full p-4 rounded-2xl apple-glass shadow-2xl border border-white/90 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex gap-3.5">
              <div className="w-24 h-20 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-black/5">
                <img
                  src={activePin.mainImage}
                  alt={activePin.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-[#0071E3] font-semibold">
                  {activePin.neighborhood}, {activePin.city}
                </div>
                <h4 className="text-sm font-bold text-[#1D1D1F] truncate mt-0.5">
                  {activePin.title}
                </h4>
                <div className="text-xs font-bold text-[#1D1D1F] tabular-nums mt-1">
                  ${activePin.price.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#6E6E73] mt-0.5">
                  {activePin.beds} Beds · {activePin.sqft.toLocaleString()} sq ft
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-3 pt-3 border-t border-black/5 flex items-center justify-between text-[11px] text-[#515154]">
              <span>WalkScore: <strong className="text-[#1D1D1F]">{activePin.neighborhoodScore.walk}</strong></span>
              <span>Sunlight: <strong className="text-[#1D1D1F]">{activePin.neighborhoodScore.sunlightHours}h</strong></span>
              <span>Quietude: <strong className="text-[#1D1D1F]">{activePin.neighborhoodScore.quietude}</strong></span>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onSelectProperty(activePin);
              }}
              className="apple-press mt-3 w-full py-2 rounded-xl text-xs font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Full Residence</span>
            </button>
          </div>
        )}

        {/* Map Legend Overlay */}
        <div className="absolute top-5 right-5 z-20 apple-glass-dark px-3 py-2 rounded-xl text-[11px] text-white/80 flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
            Active Collection
          </span>
          <span className="text-white/40">·</span>
          <span>Click pin to inspect</span>
        </div>
      </div>
    </section>
  );
};
