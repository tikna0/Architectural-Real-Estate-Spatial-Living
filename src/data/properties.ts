import { Property } from '../types';

export const PROPERTIES: Property[] = [
  {
    id: 'lumina-sky-penthouse',
    title: 'The Lumina Sky Penthouse',
    tagline: 'Suspended in light above Manhattan with triple-aspect glass curtain walls',
    price: 14850000,
    rentPrice: 42000,
    type: 'sale',
    category: 'penthouse',
    neighborhood: 'SoHo / Tribeca',
    city: 'New York',
    state: 'NY',
    beds: 4,
    baths: 4.5,
    sqft: 4820,
    yearBuilt: 2024,
    ceilingHeight: '11.8 ft',
    hoa: 3840,
    propertyTaxRate: 1.15,
    architect: 'Kengo Kuma & Associates',
    mainImage: '/src/assets/images/hero_luxury_penthouse_1791899032224.jpg',
    secondaryImages: [
      '/src/assets/images/loft_tribeca_minimalist_1791899033547.jpg',
      '/src/assets/images/residence_alpine_retreat_1791899032940.jpg'
    ],
    description:
      'Occupying the entire top two floors, The Lumina combines expansive 360-degree skyline vistas with warm tactile materiality. Fluted travertine fireplaces, wide-plank French white oak flooring, and custom acoustic triple-pane glazing ensure an absolute sanctuary high above the vibrant streets below.',
    amenities: [
      'Private Keyed Elevator',
      'Panoramic 360° River & Skyline Views',
      'Circadian Lighting Automation',
      'Temperature-Controlled Wine Cellar',
      'Wraparound Sunset Terrace',
      '24/7 White-Glove Doorman & Concierge',
      'Subterranean Automated Parking'
    ],
    neighborhoodScore: {
      walk: 99,
      transit: 100,
      quietude: 88,
      sunlightHours: 9.4
    },
    mapCoords: { x: 74, y: 38 },
    rooms: [
      {
        id: 'great-room',
        name: 'The Great Room',
        image: '/src/assets/images/hero_luxury_penthouse_1791899032224.jpg',
        description: 'Commanding double-height entertaining space framed by floor-to-ceiling glass and fluted marble fireplace.',
        dimensions: '38 ft × 24 ft',
        exposure: 'South & West (Sunset)',
        hotspots: [
          {
            id: 'hs-1',
            x: 28,
            y: 44,
            title: 'Low-Iron Acoustic Glass',
            detail: 'Custom Schuco triple-laminated glass attenuates street sound down to 28dB.',
            material: 'Structural Glass & Blackened Steel'
          },
          {
            id: 'hs-2',
            x: 72,
            y: 52,
            title: 'Honed Calacatta Fireplace',
            detail: 'Sculpted from a single monolithic slab of Italian Calacatta Borghini marble with concealed linear hearth.',
            material: 'Italian Marble'
          },
          {
            id: 'hs-3',
            x: 52,
            y: 68,
            title: 'Organic Bouclé Seating',
            detail: 'Custom curving serpentine sofa designed exclusively to mirror the river horizon line.',
            material: 'Belgian Linen & Cashmere'
          },
          {
            id: 'hs-4',
            x: 48,
            y: 88,
            title: 'Wide-Plank White Oak',
            detail: '300mm wide engineered European white oak treated with organic matte mineral oil.',
            material: 'Quarter-Sawn Oak'
          }
        ]
      },
      {
        id: 'loft-atelier',
        name: 'The Creative Gallery',
        image: '/src/assets/images/loft_tribeca_minimalist_1791899033547.jpg',
        description: 'Sun-drenched studio and salon room with authentic industrial timber ceiling beams and oversized factory windows.',
        dimensions: '28 ft × 20 ft',
        exposure: 'East & North (Soft Morning Light)',
        hotspots: [
          {
            id: 'hs-5',
            x: 62,
            y: 45,
            title: 'Restored Steel Casements',
            detail: 'Architecturally restored multi-pane divided-light industrial windows with thermal break.',
            material: 'Architectural Steel'
          },
          {
            id: 'hs-6',
            x: 48,
            y: 72,
            title: 'Linen Lounge Pavilion',
            detail: 'Deep modular daybed upholstered in undyed Belgian heavyweight linen.',
            material: 'Belgian Linen'
          },
          {
            id: 'hs-7',
            x: 12,
            y: 65,
            title: 'Minimalist Prep Island',
            detail: 'Matte black architectural cabinetry concealing integrated Gaggenau 400 series refrigeration.',
            material: 'Fenix NTM & Quartz'
          }
        ]
      },
      {
        id: 'sky-suite',
        name: 'Private Suite & Hearth',
        image: '/src/assets/images/residence_alpine_retreat_1791899032940.jpg',
        description: 'Intimate cantilevered lounge with stone hearth, reading nook, and direct access to the private loggia.',
        dimensions: '22 ft × 18 ft',
        exposure: 'West & South',
        hotspots: [
          {
            id: 'hs-8',
            x: 42,
            y: 56,
            title: 'Stacked Riverstone Chimney',
            detail: 'Locally quarried granite riverstone laid in dry-stack horizontal courses.',
            material: 'Granite Stone'
          },
          {
            id: 'hs-9',
            x: 78,
            y: 62,
            title: 'Cantilevered Cedar Deck',
            detail: 'Western red cedar deck floating effortlessly out over the precipice.',
            material: 'Western Red Cedar'
          }
        ]
      }
    ]
  },
  {
    id: 'pacific-horizon-sanctuary',
    title: 'Pacific Horizon Sanctuary',
    tagline: 'Board-formed concrete and cedar estate perched dramatically over ocean breakers',
    price: 18400000,
    rentPrice: 55000,
    type: 'sale',
    category: 'villa',
    neighborhood: 'Carmel Highlands',
    city: 'Carmel-by-the-Sea',
    state: 'CA',
    beds: 5,
    baths: 6.0,
    sqft: 6250,
    yearBuilt: 2023,
    ceilingHeight: '12.4 ft',
    hoa: 650,
    propertyTaxRate: 1.05,
    architect: 'Olson Kundig Architects',
    mainImage: '/src/assets/images/villa_coastal_sanctuary_1791899033050.jpg',
    secondaryImages: [
      '/src/assets/images/hero_luxury_penthouse_1791899032224.jpg',
      '/src/assets/images/residence_alpine_retreat_1791899032940.jpg'
    ],
    description:
      'A tour-de-force of contemporary coastal architecture. Nestled directly on the granite bluff, this home features massive pivoting glass walls that dematerialize the boundary between indoors and the crashing Pacific surf. Complete with a 60-foot heated cantilevered lap pool and native succulent terraces.',
    amenities: [
      'Cantilevered Oceanfront Infinity Pool',
      'Pivoting 14-Foot Fleetwood Glass Walls',
      'Private Coastal Bluff Footpath',
      'Geothermal Radiant Heating & Cooling',
      'Outdoor Kitchen & Fire Pit Lounge',
      'Wine Vault & Tasting Salon',
      'Solar Microgrid with Tesla Powerwalls'
    ],
    neighborhoodScore: {
      walk: 65,
      transit: 40,
      quietude: 99,
      sunlightHours: 8.8
    },
    mapCoords: { x: 22, y: 64 },
    rooms: [
      {
        id: 'pool-terrace',
        name: 'The Oceanfront Terrace',
        image: '/src/assets/images/villa_coastal_sanctuary_1791899033050.jpg',
        description: 'Black pebble-sheen infinity edge reflecting the Pacific sky at golden hour.',
        dimensions: '45 ft × 30 ft',
        exposure: 'West (Ocean Sunset)',
        hotspots: [
          {
            id: 'hs-10',
            x: 52,
            y: 72,
            title: 'Saltwater Horizon Pool',
            detail: 'Seamless infinity spillway dropping into the granite cliffside below.',
            material: 'Basaltina Stone & Gunite'
          },
          {
            id: 'hs-11',
            x: 22,
            y: 35,
            title: 'Board-Formed Concrete Walls',
            detail: 'Cast with rough-sawn Douglas fir boards, creating tactile wood grain reliefs in stone.',
            material: 'Architectural Concrete'
          },
          {
            id: 'hs-12',
            x: 54,
            y: 32,
            title: 'Sheltered Sunset Loggia',
            detail: 'Recessed open-air living room with flush gas hearth and infrared ceiling warmers.',
            material: 'Red Cedar & Steel'
          }
        ]
      }
    ]
  },
  {
    id: 'the-foundry-atelier-loft',
    title: 'The Foundry Atelier Loft',
    tagline: 'Expansive historic Tribeca loft with timber post-and-beam construction',
    price: 7250000,
    rentPrice: 22500,
    type: 'sale',
    category: 'loft',
    neighborhood: 'Tribeca North',
    city: 'New York',
    state: 'NY',
    beds: 3,
    baths: 3.0,
    sqft: 3600,
    yearBuilt: 1910,
    ceilingHeight: '13.2 ft',
    hoa: 2450,
    propertyTaxRate: 1.18,
    architect: 'Studio DB Architecture',
    mainImage: '/src/assets/images/loft_tribeca_minimalist_1791899033547.jpg',
    secondaryImages: [
      '/src/assets/images/hero_luxury_penthouse_1791899032224.jpg'
    ],
    description:
      'A transcendent Tribeca residence combining original century-old heart-pine timber beams with surgical contemporary restraint. Flooded with natural light through 14 continuous industrial steel windows, the space includes a custom Boffi stainless steel chef kitchen and sound-isolated audio studio.',
    amenities: [
      'Direct Key-in-Elevator Access',
      'Original Heart Pine Heavy Timber Beams',
      'Custom Boffi Stainless Steel Kitchen',
      'Art Wall Gallery Lighting System',
      'Private Climate-Controlled Storage',
      'Primary Suite Spa with Wet Room'
    ],
    neighborhoodScore: {
      walk: 98,
      transit: 99,
      quietude: 91,
      sunlightHours: 7.9
    },
    mapCoords: { x: 72, y: 46 },
    rooms: [
      {
        id: 'atelier-salon',
        name: 'The Main Atelier',
        image: '/src/assets/images/loft_tribeca_minimalist_1791899033547.jpg',
        description: 'Dramatic living gallery illuminated by continuous casement windows.',
        dimensions: '42 ft × 26 ft',
        exposure: 'North & East',
        hotspots: [
          {
            id: 'hs-13',
            x: 64,
            y: 42,
            title: 'Original Industrial Casements',
            detail: 'Restored museum-grade steel casements overlooking historic cobblestone streets.',
            material: 'Divided Steel'
          },
          {
            id: 'hs-14',
            x: 32,
            y: 18,
            title: 'Exposed Heart Pine Trusses',
            detail: 'Structural 1910 heavy timber salvaged and hand-oiled to preserve golden patina.',
            material: 'Historic Heart Pine'
          }
        ]
      }
    ]
  },
  {
    id: 'komorebi-alpine-pavilion',
    title: 'Komorebi Alpine Pavilion',
    tagline: 'Cantilevered glass and charred Shou Sugi Ban cedar in the Colorado pines',
    price: 11900000,
    rentPrice: 38000,
    type: 'sale',
    category: 'pavilion',
    neighborhood: 'Red Mountain',
    city: 'Aspen',
    state: 'CO',
    beds: 4,
    baths: 4.5,
    sqft: 5100,
    yearBuilt: 2024,
    ceilingHeight: '12.0 ft',
    hoa: 820,
    propertyTaxRate: 0.65,
    architect: 'Bohlin Cywinski Jackson',
    mainImage: '/src/assets/images/residence_alpine_retreat_1791899032940.jpg',
    secondaryImages: [
      '/src/assets/images/villa_coastal_sanctuary_1791899033050.jpg'
    ],
    description:
      'Hovering weightlessly above the natural forest slope, Komorebi ("sunlight filtering through trees") translates Japanese craft into high alpine living. Features dark charred cedar, exposed structural steel trusses, radiant warmed thermal stone floors, and panoramic views of Ajax Mountain.',
    amenities: [
      'Heated Driveway & Auto Court',
      'Ski-In / Ski-Out Forest Access',
      'Charred Shou Sugi Ban Facade',
      'Custom Outdoor Cedar Soaking Tub',
      'Circadian Sky-Light System',
      'Wine & Spirits Cellar',
      'Triple-Zone Oxygen Enrichment in Master'
    ],
    neighborhoodScore: {
      walk: 48,
      transit: 62,
      quietude: 100,
      sunlightHours: 9.1
    },
    mapCoords: { x: 44, y: 52 },
    rooms: [
      {
        id: 'forest-pavilion',
        name: 'The Pine Pavilion',
        image: '/src/assets/images/residence_alpine_retreat_1791899032940.jpg',
        description: 'Glass-walled living room floating among mature lodgepole pine trees.',
        dimensions: '34 ft × 22 ft',
        exposure: 'South-West (Mountain View)',
        hotspots: [
          {
            id: 'hs-15',
            x: 48,
            y: 50,
            title: 'Suspended Structural Steel',
            detail: 'Cantilever engineered to support 15-ton snow loads with zero ground footings on the slope.',
            material: 'Matte Black Steel'
          },
          {
            id: 'hs-16',
            x: 38,
            y: 58,
            title: 'Granite Rumford Fireplace',
            detail: 'Tall shallow Rumford masonry fireplace designed for optimal radiant heat transfer.',
            material: 'Colorado Fieldstone'
          }
        ]
      }
    ]
  }
];

export const EDITORIAL_ARTICLES = [
  {
    id: '1',
    title: 'The Poetics of Daylight: How Orientation Shapes Modern Living',
    category: 'Spatial Design',
    readTime: '5 min read',
    date: 'October 2026',
    excerpt:
      'Why true luxury is measured not in square footage, but in the quality and transition of natural illumination across the daily cycle.'
  },
  {
    id: '2',
    title: 'Acoustic Solitude: Engineering 28dB Sanctuaries in Urban Centers',
    category: 'Architecture',
    readTime: '7 min read',
    date: 'September 2026',
    excerpt:
      'The multi-layered glazing and decoupled floor slabs that allow complete acoustic silence amid the density of lower Manhattan.'
  },
  {
    id: '3',
    title: 'Material Honesty: The Revival of Board-Formed Concrete and Shou Sugi Ban',
    category: 'Materials',
    readTime: '6 min read',
    date: 'August 2026',
    excerpt:
      'Exploring the tactile depth of surfaces that celebrate the natural grain of timber and weathering of mountain stone.'
  }
];
