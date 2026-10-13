/**
 * PixelRooms — Apple-Inspired Fluid Real Estate Platform
 */

import React, { useState, useEffect } from 'react';
import { PROPERTIES } from './data/properties';
import { Property } from './types';
import { sound } from './utils/audio';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpatialRoomViewer } from './components/SpatialRoomViewer';
import { PropertyList } from './components/PropertyList';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { PropertyCompareSheet } from './components/PropertyCompareSheet';
import { NeighborhoodMap } from './components/NeighborhoodMap';
import { MortgageCalculator } from './components/MortgageCalculator';
import { ScheduleShowingModal } from './components/ScheduleShowingModal';
import { SavedDrawer } from './components/SavedDrawer';
import { ArchitectureJournal } from './components/ArchitectureJournal';
import { Footer } from './components/Footer';

export default function App() {
  const [properties] = useState<Property[]>(PROPERTIES);
  const [savedIds, setSavedIds] = useState<string[]>(['lumina-sky-penthouse']);
  const [compareIds, setCompareIds] = useState<string[]>([
    'lumina-sky-penthouse',
    'pacific-horizon-sanctuary'
  ]);
  const [inspectedProperty, setInspectedProperty] = useState<Property | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleTarget, setScheduleTarget] = useState<Property | null>(null);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  // Load favorites from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pixelrooms_saved');
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch {
      // Local storage unavailable
    }
  }, []);

  const handleToggleSave = (id: string) => {
    sound.playSnap();
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('pixelrooms_saved', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleToggleCompare = (id: string) => {
    sound.playSnap();
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        // Keep max 3 for side-by-side comparison
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const handleOpenSchedule = (property?: Property) => {
    sound.playSnap();
    setScheduleTarget(property || inspectedProperty || properties[0]);
    setIsScheduleOpen(true);
  };

  const handleToggleAmbient = () => {
    const nextState = sound.toggleAmbient();
    setIsAmbientPlaying(nextState);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const comparedProperties = properties.filter((p) => compareIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1D1D1F]">
      {/* 3-Zone Apple Navigation */}
      <Navbar
        savedCount={savedIds.length}
        compareCount={compareIds.length}
        isAmbientPlaying={isAmbientPlaying}
        onOpenSaved={() => setIsSavedOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenSchedule={() => handleOpenSchedule()}
        onToggleAmbient={handleToggleAmbient}
      />

      <main className="flex-1">
        {/* Architectural Hero Showcase */}
        <Hero
          onExploreTour={() => scrollToSection('spatial-tour')}
          onBrowseListings={() => scrollToSection('residences')}
        />

        {/* Core PixelRooms Interactive Spatial Room Experience */}
        <SpatialRoomViewer
          property={properties[0]}
          onScheduleShowing={() => handleOpenSchedule(properties[0])}
        />

        {/* Curated Catalog with Segmented Filters & Unboxed Specs */}
        <PropertyList
          properties={properties}
          savedIds={savedIds}
          compareIds={compareIds}
          onToggleSave={handleToggleSave}
          onToggleCompare={handleToggleCompare}
          onSelectProperty={(prop) => setInspectedProperty(prop)}
        />

        {/* Neighborhood Intelligence Map */}
        <NeighborhoodMap
          properties={properties}
          onSelectProperty={(prop) => setInspectedProperty(prop)}
        />

        {/* Real-time Mortgage & Capital Simulator */}
        <MortgageCalculator />

        {/* Architectural Thought & Journal */}
        <ArchitectureJournal />
      </main>

      {/* Quiet Footer */}
      <Footer />

      {/* Property Inspection Detail Modal */}
      {inspectedProperty && (
        <PropertyDetailModal
          property={inspectedProperty}
          isSaved={savedIds.includes(inspectedProperty.id)}
          isCompared={compareIds.includes(inspectedProperty.id)}
          onClose={() => setInspectedProperty(null)}
          onToggleSave={() => handleToggleSave(inspectedProperty.id)}
          onToggleCompare={() => handleToggleCompare(inspectedProperty.id)}
          onScheduleShowing={() => handleOpenSchedule(inspectedProperty)}
          onOpenTour={() => {
            scrollToSection('spatial-tour');
          }}
        />
      )}

      {/* Pull-up Side-by-Side Comparison Sheet */}
      <PropertyCompareSheet
        properties={comparedProperties}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemove={(id) => handleToggleCompare(id)}
        onScheduleShowing={(prop) => handleOpenSchedule(prop)}
      />

      {/* Saved Favorites Slide-over Drawer */}
      <SavedDrawer
        properties={properties}
        savedIds={savedIds}
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        onRemove={handleToggleSave}
        onSelectProperty={(prop) => setInspectedProperty(prop)}
        onScheduleShowing={(prop) => handleOpenSchedule(prop)}
      />

      {/* Private Tour Concierge Booking Modal */}
      <ScheduleShowingModal
        properties={properties}
        selectedProperty={scheduleTarget}
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
    </div>
  );
}
