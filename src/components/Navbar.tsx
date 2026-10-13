import React from 'react';
import { Bookmark, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  savedCount: number;
  compareCount: number;
  isAmbientPlaying: boolean;
  onOpenSaved: () => void;
  onOpenCompare: () => void;
  onOpenSchedule: () => void;
  onToggleAmbient: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  compareCount,
  isAmbientPlaying,
  onOpenSaved,
  onOpenCompare,
  onOpenSchedule,
  onToggleAmbient
}) => {
  return (
    <header className="sticky top-0 z-40 w-full apple-glass transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (Single text element, no pills, no subtitles) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            sound.playClick();
          }}
          className="text-lg font-semibold tracking-tight text-[#1D1D1F] hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-[#1D1D1F] inline-block"></span>
          <span>PixelRooms</span>
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6E6E73]">
          <a
            href="#residences"
            onClick={() => sound.playClick()}
            className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0"
          >
            Residences
          </a>
          <a
            href="#spatial-tour"
            onClick={() => sound.playClick()}
            className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0"
          >
            Spatial Tour
          </a>
          <a
            href="#neighborhood-map"
            onClick={() => sound.playClick()}
            className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0"
          >
            Map Explorer
          </a>
          <a
            href="#mortgage-lab"
            onClick={() => sound.playClick()}
            className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0"
          >
            Mortgage Lab
          </a>
          <a
            href="#journal"
            onClick={() => sound.playClick()}
            className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0"
          >
            Journal
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + tactile tool buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Ambient Room Soundscape button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onToggleAmbient();
            }}
            title={isAmbientPlaying ? "Mute room tone" : "Play subtle architectural room tone"}
            className="apple-press p-2 rounded-full text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5 transition-colors"
            aria-label="Toggle ambient room acoustics"
          >
            {isAmbientPlaying ? (
              <Volume2 className="w-4 h-4 text-[#0071E3]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Saved wishlist trigger */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenSaved();
            }}
            className="apple-press relative p-2 rounded-full text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5 transition-colors"
            aria-label="View saved residences"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0071E3] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {savedCount}
              </span>
            )}
          </button>

          {/* Compare Drawer button if items selected */}
          {compareCount > 0 && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenCompare();
              }}
              className="apple-press text-xs font-medium text-[#1D1D1F] bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              Compare ({compareCount})
            </button>
          )}

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => {
              sound.playSnap();
              onOpenSchedule();
            }}
            className="apple-press px-4 py-2 text-xs font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0062C4] rounded-full shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            Schedule Showing
          </button>
        </div>
      </div>
    </header>
  );
};
