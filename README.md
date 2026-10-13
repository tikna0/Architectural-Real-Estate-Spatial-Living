# PixelRooms — Architectural Real Estate & Spatial Living

An Apple-inspired real estate platform for architectural residences. Instead of flat photo galleries, you explore rooms through an interactive spatial viewer with draggable panning, lighting moods, and material hotspots, then compare homes, check the neighborhood, and simulate the mortgage, all in one fluid single-page app.

> Listings, prices, and architect names in this repo are **sample data** for demonstration.

## Features

- **Spatial room tours:** drag to pan with rubber-band edge resistance, switch rooms, and flip between *daylight*, *sunset*, and *night* lighting. Hotspots reveal materials and details (e.g. honed Calacatta fireplace, board-formed concrete walls).
- **Curated catalog:** four architectural residences (penthouse, villa, loft, pavilion) with filters by category, a Buy/Rent switch, search by city or architect, and sorting by price or size.
- **Property detail modal:** full specs, amenities, architect, ceiling height, HOA, and neighborhood scores.
- **Side-by-side compare:** pull-up sheet that compares up to 3 homes.
- **Saved favorites:** slide-over drawer, persisted in `localStorage`.
- **Neighborhood intelligence map:** switch between Residences, WalkScore, Sunlight, and Quietude layers.
- **Mortgage & capital simulator:** home price, down payment, 15/30-year term, interest rate, HOA, plus estimated property tax and insurance. Investor mode adds rental income and cash-on-cash return.
- **Showing scheduler:** book a private in-person tour, a virtual spatial tour, or an architect Q&A.
- **Architecture journal:** editorial articles on daylight, acoustics, and materials.
- **Sound design:** click/snap sounds and an ambient room tone generated with the Web Audio API, with no audio files needed.

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 |
| Animation | Motion |
| Icons | lucide-react |
| Font | Plus Jakarta Sans |

## Getting Started

**Prerequisite:** Node.js

```bash
git clone https://github.com/tikna0/Architectural-Real-Estate-Spatial-Living.git
cd Architectural-Real-Estate-Spatial-Living
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type-check with `tsc --noEmit` |

> The project was scaffolded in Google AI Studio, so `.env.example` lists a `GEMINI_API_KEY`. The current code doesn't call Gemini, so the key is optional.

## Project Structure

```
src/
├── App.tsx                  # App state and layout
├── types.ts                 # Property, RoomView, hotspot, booking types
├── data/properties.ts       # Sample listings, rooms, hotspots, journal articles
├── utils/audio.ts           # Web Audio sound controller
├── assets/images/           # Property photography
└── components/
    ├── Navbar.tsx
    ├── Hero.tsx
    ├── SpatialRoomViewer.tsx
    ├── PropertyList.tsx
    ├── PropertyDetailModal.tsx
    ├── PropertyCompareSheet.tsx
    ├── NeighborhoodMap.tsx
    ├── MortgageCalculator.tsx
    ├── ScheduleShowingModal.tsx
    ├── SavedDrawer.tsx
    ├── ArchitectureJournal.tsx
    └── Footer.tsx
```

## Roadmap Ideas

- Real 360° panoramas instead of single images per room
- Live map with real geodata
- Backend for listings and booking requests
