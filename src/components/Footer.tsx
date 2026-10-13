import React from 'react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E5E5E7] bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#F2F2F7]">
          {/* Brand Manifesto */}
          <div className="md:col-span-1 space-y-3">
            <div className="text-base font-bold text-[#1D1D1F] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#1D1D1F] inline-block"></span>
              <span>PixelRooms</span>
            </div>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              Curating exceptional architectural residences with direct spatial sensory exploration.
            </p>
          </div>

          {/* Nav Column 1 */}
          <div className="space-y-2.5 text-xs">
            <div className="font-semibold text-[#1D1D1F] uppercase tracking-wider text-[11px]">
              Residences
            </div>
            <ul className="space-y-2 text-[#6E6E73]">
              <li><a href="#residences" onClick={() => sound.playClick()} className="hover:text-[#1D1D1F] transition-colors">Sky Penthouses</a></li>
              <li><a href="#residences" onClick={() => sound.playClick()} className="hover:text-[#1D1D1F] transition-colors">Coastal Sanctuaries</a></li>
              <li><a href="#residences" onClick={() => sound.playClick()} className="hover:text-[#1D1D1F] transition-colors">Historic Industrial Lofts</a></li>
              <li><a href="#residences" onClick={() => sound.playClick()} className="hover:text-[#1D1D1F] transition-colors">Alpine Forest Pavilions</a></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="space-y-2.5 text-xs">
            <div className="font-semibold text-[#1D1D1F] uppercase tracking-wider text-[11px]">
              Spatial Intelligence
            </div>
            <ul className="space-y-2 text-[#6E6E73]">
              <li><a href="#spatial-tour" onClick={() => sound.playClick()} className="hover:text-[#1D1D1F] transition-colors">Interactive Room Tour</a></li>
              <li><a href="#neighborhood-map" onClick={() => sound.playClick()} className="hover:text-[#1D1D1F] transition-colors">Acoustic & Solar Mapping</a></li>
              <li><a href="#mortgage-lab" onClick={() => sound.playClick()} className="hover:text-[#1D1D1F] transition-colors">Capital & Debt Simulation</a></li>
              <li><a href="#journal" onClick={() => sound.playClick()} className="hover:text-[#1D1D1F] transition-colors">Architectural Journal</a></li>
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div className="space-y-2.5 text-xs">
            <div className="font-semibold text-[#1D1D1F] uppercase tracking-wider text-[11px]">
              Private Office
            </div>
            <ul className="space-y-2 text-[#6E6E73]">
              <li><span className="text-[#1D1D1F]">SoHo Atelier</span> · New York, NY</li>
              <li><span className="text-[#1D1D1F]">Pacific Gallery</span> · Carmel, CA</li>
              <li className="pt-1 text-[#86868B]">concierge@pixelrooms.org</li>
              <li className="text-[#86868B]">+1 (800) 840-7790</li>
            </ul>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86868B]">
          <div>
            © {new Date().getFullYear()} PixelRooms Inc. All rights reserved. Equal Housing Opportunity.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Privacy Notice</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Terms of Representation</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Architectural Standards</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
