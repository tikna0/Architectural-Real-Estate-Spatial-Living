export interface RoomHotspot {
  id: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  title: string;
  detail: string;
  material: string;
}

export interface RoomView {
  id: string;
  name: string;
  image: string;
  description: string;
  dimensions: string;
  exposure: string;
  hotspots: RoomHotspot[];
}

export interface Property {
  id: string;
  title: string;
  tagline: string;
  price: number;
  rentPrice?: number;
  type: 'sale' | 'rent';
  category: 'penthouse' | 'villa' | 'loft' | 'pavilion';
  neighborhood: string;
  city: string;
  state: string;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  ceilingHeight: string;
  hoa: number;
  propertyTaxRate: number; // percentage e.g. 1.2
  architect: string;
  mainImage: string;
  secondaryImages: string[];
  description: string;
  rooms: RoomView[];
  amenities: string[];
  neighborhoodScore: {
    walk: number;
    transit: number;
    quietude: number;
    sunlightHours: number;
  };
  mapCoords: {
    x: number; // percentage in mock map canvas
    y: number;
  };
}

export type LightingMood = 'daylight' | 'sunset' | 'night';

export interface BookingDetails {
  propertyId: string;
  propertyTitle: string;
  date: string;
  timeSlot: string;
  type: 'in-person' | 'spatial-virtual' | 'architectural-briefing';
  name: string;
  email: string;
  phone: string;
  notes?: string;
}
