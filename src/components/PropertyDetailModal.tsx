import React, { useState } from 'react';
import { X, Bookmark, Layers, Calendar, Check, Compass, Shield } from 'lucide-react';
import { Property } from '../types';
import { sound } from '../utils/audio';

interface PropertyDetailModalProps {
  property: Property;
  isSaved: boolean;
  isCompared: boolean;
  onClose: () => void;
  onToggleSave: () => void;
  onToggleCompare: () => void;
  onScheduleShowing: () => void;
  onOpenTour: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isSaved,
  isCompared,
  onClose,
  onToggleSave,
  onToggleCompare,
  onScheduleShowing,
  onOpenTour
}) => {
  const [activeImage, setActiveImage] = useState(property.mainImage);
  const allImages = [property.mainImage, ...property.secondaryImages];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Apple Translucent Scrim Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 z-10 my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Top Floating Close & Action Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 apple-glass border-b border-black/5">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#0071E3]">
              {property.category}
            </span>
            <span className="text-xs text-[#86868B]">·</span>
            <span className="text-xs text-[#86868B]">{property.neighborhood}, {property.city}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playSnap();
                onToggleCompare();
              }}
              className={`apple-press px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                isCompared ? 'bg-[#0071E3] text-white' : 'bg-black/5 hover:bg-black/10 text-[#1D1D1F]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isCompared ? 'Comparing' : 'Compare'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playSnap();
                onToggleSave();
              }}
              className={`apple-press p-2 rounded-full transition-all ${
                isSaved ? 'bg-[#0071E3] text-white' : 'bg-black/5 hover:bg-black/10 text-[#1D1D1F]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="apple-press p-2 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Hero Gallery */}
          <div className="space-y-3">
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-black/5">
              <img
                src={activeImage}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            {/* Thumbnail switcher if multiple images */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setActiveImage(img);
                    }}
                    className={`apple-press relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-[#0071E3] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Valuation Block */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#F2F2F7]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                {property.title}
              </h2>
              <p className="mt-1 text-sm text-[#6E6E73]">
                {property.tagline}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#515154]">
                <span>Architect: {property.architect}</span>
                <span aria-hidden="true">·</span>
                <span>Year Built: {property.yearBuilt}</span>
                <span aria-hidden="true">·</span>
                <span>Ceilings: {property.ceilingHeight}</span>
              </div>
            </div>

            <div className="shrink-0 text-left md:text-right">
              <div className="text-xs text-[#86868B] uppercase tracking-wider">Purchase Price</div>
              <div className="text-3xl font-bold text-[#1D1D1F] tabular-nums mt-0.5">
                ${property.price.toLocaleString()}
              </div>
              <div className="text-xs text-[#86868B] mt-1">
                ${Math.round(property.price / property.sqft).toLocaleString()} / sq ft · HOA ${property.hoa.toLocaleString()}/mo
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F8F9FA] border border-black/5 text-center">
            <div>
              <div className="text-xs text-[#86868B]">Bedrooms</div>
              <div className="text-lg font-bold text-[#1D1D1F] mt-0.5">{property.beds} Suites</div>
            </div>
            <div>
              <div className="text-xs text-[#86868B]">Bathrooms</div>
              <div className="text-lg font-bold text-[#1D1D1F] mt-0.5">{property.baths} Baths</div>
            </div>
            <div>
              <div className="text-xs text-[#86868B]">Spatial Footprint</div>
              <div className="text-lg font-bold text-[#1D1D1F] mt-0.5 tabular-nums">{property.sqft.toLocaleString()} sq ft</div>
            </div>
            <div>
              <div className="text-xs text-[#86868B]">Sunlight Rating</div>
              <div className="text-lg font-bold text-[#1D1D1F] mt-0.5">{property.neighborhoodScore.sunlightHours} hrs / day</div>
            </div>
          </div>

          {/* Architectural Narrative */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1D1D1F] mb-2">
              Architectural Statement
            </h3>
            <p className="text-sm text-[#515154] leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities & Craft Features */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1D1D1F] mb-3">
              Craft & Bespoke Appointments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-[#515154] p-2.5 rounded-xl bg-[#F8F9FA]">
                  <Check className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhood Intelligence */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1D1D1F] mb-3">
              Location & Spatial Metrics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] text-center">
                <div className="text-xs text-[#86868B]">WalkScore</div>
                <div className="text-xl font-bold text-[#1D1D1F] mt-1 tabular-nums">{property.neighborhoodScore.walk}/100</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] text-center">
                <div className="text-xs text-[#86868B]">Transit Accessibility</div>
                <div className="text-xl font-bold text-[#1D1D1F] mt-1 tabular-nums">{property.neighborhoodScore.transit}/100</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] text-center">
                <div className="text-xs text-[#86868B]">Acoustic Quietude</div>
                <div className="text-xl font-bold text-[#1D1D1F] mt-1 tabular-nums">{property.neighborhoodScore.quietude}/100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="sticky bottom-0 z-20 px-6 py-4 apple-glass border-t border-black/5 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenTour();
            }}
            className="apple-press inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium text-[#1D1D1F] bg-white border border-[#E5E5E7] hover:bg-[#F5F5F7] transition-all"
          >
            <Compass className="w-4 h-4 text-[#0071E3]" />
            <span>Launch Spatial Tour</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onScheduleShowing();
            }}
            className="apple-press inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Private Showing</span>
          </button>
        </div>
      </div>
    </div>
  );
};
