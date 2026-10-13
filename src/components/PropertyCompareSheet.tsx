import React from 'react';
import { X, Trash2, Calendar, Layers } from 'lucide-react';
import { Property } from '../types';
import { sound } from '../utils/audio';

interface PropertyCompareSheetProps {
  properties: Property[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onScheduleShowing: (property: Property) => void;
}

export const PropertyCompareSheet: React.FC<PropertyCompareSheetProps> = ({
  properties,
  isOpen,
  onClose,
  onRemove,
  onScheduleShowing
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Translucent Dimmer Scrim */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Floating Apple Bottom Sheet */}
      <div className="relative w-full max-w-6xl mx-auto apple-glass rounded-t-3xl shadow-2xl border-t border-white/60 z-10 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-8 duration-300">
        {/* Top Grab Handle & Header */}
        <div className="px-6 pt-3 pb-3 border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Grab pill */}
            <div className="w-10 h-1.5 rounded-full bg-black/20" />
            <h3 className="text-base font-semibold text-[#1D1D1F] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0071E3]" />
              <span>Side-by-Side Architectural Comparison</span>
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="apple-press p-2 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comparison Content */}
        <div className="p-6 overflow-x-auto overflow-y-auto">
          {properties.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-[#86868B]">No residences selected for comparison.</p>
              <p className="text-xs text-[#86868B] mt-1">Click the "Compare" button on any residence card to contrast architectural attributes.</p>
            </div>
          ) : (
            <div className="min-w-[700px]">
              {/* Header Columns */}
              <div className="grid grid-cols-4 gap-4 pb-6 border-b border-[#E5E5E7]">
                <div className="text-xs font-semibold text-[#86868B] uppercase tracking-wider pt-4">
                  Attributes
                </div>
                {properties.map((p) => (
                  <div key={p.id} className="relative space-y-2">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900 border border-black/5">
                      <img src={p.mainImage} alt={p.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-[#1D1D1F] leading-tight">{p.title}</h4>
                        <p className="text-xs text-[#6E6E73]">{p.neighborhood}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          onRemove(p.id);
                        }}
                        className="apple-press p-1.5 text-[#86868B] hover:text-rose-600 rounded-full hover:bg-black/5"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#F2F2F7] text-xs">
                {/* Price */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-medium text-[#86868B]">Acquisition Price</span>
                  {properties.map((p) => (
                    <span key={p.id} className="font-bold text-sm text-[#1D1D1F] tabular-nums">
                      ${p.price.toLocaleString()}
                    </span>
                  ))}
                </div>

                {/* Price / sqft */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-medium text-[#86868B]">Valuation / Sq Ft</span>
                  {properties.map((p) => (
                    <span key={p.id} className="text-[#1D1D1F] tabular-nums">
                      ${Math.round(p.price / p.sqft).toLocaleString()} / sq ft
                    </span>
                  ))}
                </div>

                {/* Spatial Area */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-medium text-[#86868B]">Living Area</span>
                  {properties.map((p) => (
                    <span key={p.id} className="text-[#1D1D1F] tabular-nums font-semibold">
                      {p.sqft.toLocaleString()} sq ft
                    </span>
                  ))}
                </div>

                {/* Layout */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-medium text-[#86868B]">Beds & Baths</span>
                  {properties.map((p) => (
                    <span key={p.id} className="text-[#1D1D1F]">
                      {p.beds} Beds · {p.baths} Baths
                    </span>
                  ))}
                </div>

                {/* Ceiling Height */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-medium text-[#86868B]">Ceiling Clearance</span>
                  {properties.map((p) => (
                    <span key={p.id} className="text-[#1D1D1F]">
                      {p.ceilingHeight}
                    </span>
                  ))}
                </div>

                {/* Year Built */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-medium text-[#86868B]">Year Completed</span>
                  {properties.map((p) => (
                    <span key={p.id} className="text-[#1D1D1F]">
                      {p.yearBuilt}
                    </span>
                  ))}
                </div>

                {/* Architect */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-medium text-[#86868B]">Architectural Firm</span>
                  {properties.map((p) => (
                    <span key={p.id} className="text-[#1D1D1F] font-medium">
                      {p.architect}
                    </span>
                  ))}
                </div>

                {/* Monthly HOA */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-medium text-[#86868B]">Monthly HOA</span>
                  {properties.map((p) => (
                    <span key={p.id} className="text-[#1D1D1F] tabular-nums">
                      ${p.hoa.toLocaleString()} / mo
                    </span>
                  ))}
                </div>

                {/* Quietude Score */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-medium text-[#86868B]">Acoustic Quietude</span>
                  {properties.map((p) => (
                    <span key={p.id} className="text-[#1D1D1F] tabular-nums font-medium">
                      {p.neighborhoodScore.quietude} / 100
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-4 gap-4 pt-4 items-center">
                  <span className="font-medium text-[#86868B]">Private Showing</span>
                  {properties.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onScheduleShowing(p)}
                      className="apple-press inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Tour</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
