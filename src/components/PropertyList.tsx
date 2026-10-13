import React, { useState } from 'react';
import { Search, SlidersHorizontal, Bookmark, Eye, Layers } from 'lucide-react';
import { Property } from '../types';
import { sound } from '../utils/audio';

interface PropertyListProps {
  properties: Property[];
  savedIds: string[];
  compareIds: string[];
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  savedIds,
  compareIds,
  onToggleSave,
  onToggleCompare,
  onSelectProperty
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [listingType, setListingType] = useState<'sale' | 'rent'>('sale');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'curated' | 'price-desc' | 'price-asc' | 'sqft-desc'>('curated');

  // Filter properties
  const filtered = properties
    .filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (listingType === 'rent' && !p.rentPrice) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesCity = p.city.toLowerCase().includes(query);
        const matchesNeighborhood = p.neighborhood.toLowerCase().includes(query);
        const matchesArchitect = p.architect.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCity && !matchesNeighborhood && !matchesArchitect) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const priceA = listingType === 'sale' ? a.price : a.rentPrice || 0;
      const priceB = listingType === 'sale' ? b.price : b.rentPrice || 0;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'sqft-desc') return b.sqft - a.sqft;
      return 0;
    });

  const handleCategoryChange = (cat: string) => {
    sound.playSnap();
    setSelectedCategory(cat);
  };

  const handleTypeChange = (type: 'sale' | 'rent') => {
    sound.playSnap();
    setListingType(type);
  };

  return (
    <section id="residences" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Title & Section Proposition */}
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-2">
          Curated Catalog
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
          Architectural Residences
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#6E6E73] max-w-xl">
          Each residence is selected for exemplary spatial proportions, refined materiality, and harmonious natural light.
        </p>
      </div>

      {/* Filter and Control Bar (Apple Segmented Style) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        {/* Left: Category Filters (Interactive Filter Controls) */}
        <div className="apple-glass p-1 rounded-2xl flex flex-wrap items-center gap-1">
          {[
            { id: 'all', label: 'All Residences' },
            { id: 'penthouse', label: 'Penthouses' },
            { id: 'villa', label: 'Coastal Villas' },
            { id: 'loft', label: 'Urban Lofts' },
            { id: 'pavilion', label: 'Alpine Pavilions' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`apple-press px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-white text-[#1D1D1F] shadow-sm'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right: Buy/Rent Switcher & Search Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sale vs Rent Toggle */}
          <div className="apple-glass p-1 rounded-2xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleTypeChange('sale')}
              className={`apple-press px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                listingType === 'sale'
                  ? 'bg-white text-[#1D1D1F] shadow-sm'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              For Sale
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('rent')}
              className={`apple-press px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                listingType === 'rent'
                  ? 'bg-white text-[#1D1D1F] shadow-sm'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              For Lease
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, architect..."
              className="pl-9 pr-4 py-1.5 text-xs rounded-2xl bg-white border border-[#E5E5E7] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 w-48 sm:w-56 transition-all text-[#1D1D1F]"
            />
          </div>

          {/* Sort Menu */}
          <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] pl-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => {
                sound.playClick();
                setSortBy(e.target.value as any);
              }}
              className="bg-transparent text-xs text-[#1D1D1F] font-medium focus:outline-none cursor-pointer"
            >
              <option value="curated">Curated Order</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="sqft-desc">Area: Largest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filtered.map((property) => {
          const isSaved = savedIds.includes(property.id);
          const isCompared = compareIds.includes(property.id);
          const displayPrice =
            listingType === 'sale'
              ? `$${property.price.toLocaleString()}`
              : `$${(property.rentPrice || 0).toLocaleString()} / mo`;

          return (
            <article
              key={property.id}
              className="group relative bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container with 4:3 Aspect Ratio */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 cursor-pointer" onClick={() => onSelectProperty(property)}>
                <img
                  src={property.mainImage}
                  alt={property.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Top Action Floating Buttons */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  {/* Compare Check Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playSnap();
                      onToggleCompare(property.id);
                    }}
                    title={isCompared ? "Remove from comparison" : "Add to side-by-side comparison"}
                    className={`apple-press px-2.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all flex items-center gap-1.5 ${
                      isCompared
                        ? 'bg-[#0071E3] text-white shadow-md'
                        : 'bg-white/80 hover:bg-white text-[#1D1D1F] border border-white/60'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                  </button>

                  {/* Bookmark Save Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playSnap();
                      onToggleSave(property.id);
                    }}
                    title={isSaved ? "Saved to collection" : "Save residence"}
                    className={`apple-press p-2 rounded-full backdrop-blur-md transition-all ${
                      isSaved
                        ? 'bg-[#0071E3] text-white shadow-md'
                        : 'bg-white/80 hover:bg-white text-[#1D1D1F] border border-white/60'
                    }`}
                    aria-label="Save residence"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Architect Signature Overlay */}
                <div className="absolute bottom-4 left-4 z-10 text-white pointer-events-none">
                  <div className="text-[11px] uppercase tracking-wider text-white/70">
                    Architect
                  </div>
                  <div className="text-sm font-medium text-white drop-shadow-sm">
                    {property.architect}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Clean unboxed metadata with bullet separators (anti-slop rule) */}
                  <div className="flex items-center gap-2 text-xs text-[#6E6E73] mb-1.5">
                    <span>{property.neighborhood}, {property.city}</span>
                    <span aria-hidden="true">·</span>
                    <span>Built {property.yearBuilt}</span>
                  </div>

                  {/* Residence Title */}
                  <h3
                    onClick={() => onSelectProperty(property)}
                    className="text-xl font-bold tracking-tight text-[#1D1D1F] hover:text-[#0071E3] transition-colors cursor-pointer"
                  >
                    {property.title}
                  </h3>

                  <p className="mt-1 text-xs text-[#86868B] line-clamp-2">
                    {property.tagline}
                  </p>

                  {/* Clean unboxed specifications */}
                  <div className="mt-4 pt-4 border-t border-[#F2F2F7] flex items-center gap-3 text-xs text-[#515154]">
                    <span>{property.beds} Beds</span>
                    <span aria-hidden="true">·</span>
                    <span>{property.baths} Baths</span>
                    <span aria-hidden="true">·</span>
                    <span>{property.sqft.toLocaleString()} sq ft</span>
                    <span aria-hidden="true">·</span>
                    <span>{property.ceilingHeight} Ceilings</span>
                  </div>
                </div>

                {/* Footer with Price and Inspect Button */}
                <div className="mt-5 pt-4 border-t border-[#F2F2F7] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#86868B] uppercase tracking-wider">
                      {listingType === 'sale' ? 'Purchase Valuation' : 'Monthly Lease'}
                    </div>
                    <div className="text-xl font-bold text-[#1D1D1F] tabular-nums mt-0.5">
                      {displayPrice}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSelectProperty(property);
                    }}
                    className="apple-press inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5E7] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#0071E3]" />
                    <span>Inspect Residence</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center bg-white rounded-3xl border border-black/5 mt-6">
          <p className="text-base text-[#1D1D1F] font-medium">No residences found matching your criteria</p>
          <p className="text-xs text-[#86868B] mt-1">Try resetting the category filter or searching for another city.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="apple-press mt-4 px-4 py-2 text-xs font-medium text-white bg-[#0071E3] rounded-full"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
