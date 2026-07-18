import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Info,
  Database,
  Cpu,
  Orbit,
  X,
  AlertCircle,
  Eye,
  Activity,
  Layers
} from 'lucide-react';
import { PRESETS_CELESTIAL_DATA } from './data/celestialData';
import { CelestialObject, COSMIC_SCALES } from './types';
import CosmicCanvas from './components/CosmicCanvas';
import { formatKm } from './utils/distance';

export function getCelestialImageUrl(category: string, name?: string): string {
  const normalizedCat = category.toLowerCase();
  
  if (normalizedCat.includes('dust')) {
    return 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('meteor')) {
    return 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('comet')) {
    return 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('asteroid')) {
    return 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('moon')) {
    return 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('dwarf planet')) {
    return 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('terrestrial planet')) {
    return 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('gas giant')) {
    return 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('rogue planet')) {
    return 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('brown dwarf')) {
    return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('main-sequence star') || normalizedCat.includes('yellow dwarf') || normalizedCat.includes('red dwarf')) {
    return 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('giant') && normalizedCat.includes('star')) {
    return 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('remnant') || normalizedCat.includes('white dwarf')) {
    return 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('neutron') || normalizedCat.includes('pulsar')) {
    return 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('black hole')) {
    return 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('star system')) {
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('cluster')) {
    return 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('nebula')) {
    return 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('galaxy')) {
    return 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('quasar')) {
    return 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('void')) {
    return 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80';
  }
  if (normalizedCat.includes('universe')) {
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80';
  }
  
  return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80';
}

export function getRealisticImageUrl(name: string, category: string): string {
  const normName = name.toLowerCase();
  
  if (normName.includes('mercury')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg';
  }
  if (normName.includes('venus')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg';
  }
  if (normName.includes('earth')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/c/cb/The_Blue_Marble_%28remastered_image%29.jpg';
  }
  if (normName.includes('moon') || normName.includes('luna')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg';
  }
  if (normName.includes('mars')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg';
  }
  if (normName.includes('jupiter')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg';
  }
  if (normName.includes('saturn')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg';
  }
  if (normName.includes('uranus')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg';
  }
  if (normName.includes('neptune')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_2019_color_processed.jpg';
  }
  if (normName.includes('pluto')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_Light_and_Dark.jpg';
  }
  if (normName.includes('sun') || normName.includes('sol')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg';
  }
  if (normName.includes('europa')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/5/54/Europa-moon.jpg';
  }
  if (normName.includes('titan')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Titan_in_true_color_cropped.jpg';
  }
  if (normName.includes('ganymede')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Ganymede_g1_true.jpg';
  }
  if (normName.includes('enceladus')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/d/de/Enceladus_PIA17202_color.jpg';
  }
  if (normName.includes('io')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Io_highest_resolution_true_color.jpg';
  }
  if (normName.includes('triton')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/0/06/Triton_moon_mosaic_Voyager_2_large.jpg';
  }
  if (normName.includes('ceres')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/7/76/Ceres_-_RC3_-_Desert_Dust_color_%28cropped%29.jpg';
  }
  if (normName.includes('eris')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Eris_and_dysnomia_artistic_impression_2.jpg';
  }
  if (normName.includes('halley')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Halley%27s_Comet_1986.jpg';
  }
  if (normName.includes('andromeda')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/c/c2/M31_09-01-2011_%28cropped%29.jpg';
  }
  if (normName.includes('orion nebula')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg';
  }
  if (normName.includes('pleiades')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/4/4e/M45_map.jpg';
  }
  if (normName.includes('crab pulsar') || normName.includes('crab nebula')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/0/00/Crab_Nebula.jpg';
  }
  if (normName.includes('betelgeuse')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/5/57/Artist%27s_impression_of_Betelgeuse.jpg';
  }
  if (normName.includes('sirius')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Sirius_A_and_B_Hubble_photo.jpg';
  }
  
  return getCelestialImageUrl(category, name);
}

const MULTIVERSE_OBJECTS: CelestialObject[] = [
  {
    id: 'multiverse-bubble-1',
    name: 'Universe-839 (Quantum Timeline)',
    category: 'Parallel Universes',
    distanceLy: 1e15,
    distanceString: '1.0 × 10¹⁵ LY (Beyond Horizon)',
    description: 'An adjacent bubble universe in the multiverse structure. In this universe, the electromagnetic force is 2% stronger, causing chemical bonds to behave differently and stars to burn with an ethereal bright violet hue. Time flows along 5-dimensional branches.',
    specs: {
      mass: '~1.5 × 10⁵³ kg',
      radius: '98 Billion LY',
      temperature: '2.7 K (CMB)',
      age: '14.2 Billion Years'
    },
    advancedSpecs: {
      classification: 'Type-II Chaotic Inflationary Bubble',
      surfaceGravity: 'N/A (Spatially flat)',
      escapeVelocity: 'N/A',
      luminosity: 'Ethereal violet emission spectra',
      composition: 'Super-dense matter, Dark energy variants, Quintessence',
      discoveryYear: 'Hypothetical (Visualized via extra-dimensional projection)'
    },
    trivia: [
      'This universe split from ours during the cosmic inflationary phase 13.8 billion years ago.',
      'Because of stronger chemical bonds, carbon-based molecules are incredibly rigid, making materials naturally stronger than diamond.',
      'The cosmic background radiation is highly modulated, suggesting possible quantum communication from advanced extra-dimensional civilizations.'
    ],
    visuals: {
      baseColor: '#a855f7',
      secondaryColor: '#ec4899',
      visualShape: 'ringed-sphere'
    },
    scaleZone: 6
  },
  {
    id: 'multiverse-bubble-2',
    name: 'Aethelgard (Alternate Physics Universe)',
    category: 'Parallel Universes',
    distanceLy: 4.5e15,
    distanceString: '4.5 × 10¹⁵ LY (Quantum Foam)',
    description: 'A pocket universe characterized by high gravitational constants and modified thermodynamics. Stars are tightly packed in colossal hyperspace spirals, and light travels at twice its speed in our universe. Living systems here utilize liquid helium-3 super-currents.',
    specs: {
      mass: '~2.8 × 10⁵³ kg',
      radius: '112 Billion LY',
      temperature: '1.8 K',
      age: '11.5 Billion Years'
    },
    advancedSpecs: {
      classification: 'Pocket Universe / Brane-World Concept',
      surfaceGravity: 'N/A',
      escapeVelocity: 'N/A',
      luminosity: 'Ultra-luminous starburst systems',
      composition: 'Super-heavy baryons, Strange matter, Tachyon fields',
      discoveryYear: 'Hypothetical'
    },
    trivia: [
      'Due to twice the speed of light, causality has a much wider horizon, allowing massive galactic superstructures to form rapidly.',
      'It resides on a parallel 3-brane floating in a 5-dimensional bulk space.',
      'Liquid helium-3 super-currents allow macroscopic quantum coherence, letting lifeforms exist in states of natural superposition.'
    ],
    visuals: {
      baseColor: '#06b6d4',
      secondaryColor: '#10b981',
      visualShape: 'sphere'
    },
    scaleZone: 6
  },
  {
    id: 'multiverse-bubble-3',
    name: 'Antimatter Prime',
    category: 'Parallel Universes',
    distanceLy: 1.2e16,
    distanceString: '1.2 × 10¹⁶ LY',
    description: 'A parallel timeline where the baryogenesis phase favored antimatter over regular matter. Virtually identical in layout to our observable universe, but consisting entirely of anti-atoms (positrons, antiprotons, and antineutrons). Any contact with our universe would trigger instant, total annihilation.',
    specs: {
      mass: '1.4 × 10⁵³ kg (Antimatter)',
      radius: '93 Billion LY',
      temperature: '2.725 K',
      age: '13.8 Billion Years'
    },
    advancedSpecs: {
      classification: 'CP-Inverted Mirror Universe',
      surfaceGravity: 'N/A',
      escapeVelocity: 'N/A',
      luminosity: 'Normal light (photons are their own antiparticles)',
      composition: 'Anti-Hydrogen, Anti-Helium, Anti-Carbon, Dark Matter',
      discoveryYear: 'Calculated via quantum reflection symmetry'
    },
    trivia: [
      'Stars and galaxies here shine with identical light because photons are their own antiparticles, making them indistinguishable from ours from a distance.',
      'If regular matter from our universe crossed the dimensional threshold, it would cause a pure energy blast with 100% mass-to-energy conversion efficiency.',
      'Scientists theorize that the boundary between our universe and Antimatter Prime is guarded by a high-energy quantum vacuum domain wall.'
    ],
    visuals: {
      baseColor: '#ef4444',
      secondaryColor: '#f97316',
      visualShape: 'pulsar'
    },
    scaleZone: 6
  },
  {
    id: 'multiverse-bubble-4',
    name: 'The Obsidian Void Dimension',
    category: 'Dimensional Rifts',
    distanceLy: 8.9e16,
    distanceString: '8.9 × 10¹⁶ LY',
    description: 'An ancient, dying parallel dimension where star formation ceased trillions of years ago. It consists entirely of supermassive black holes, frozen iron stars, and cold cosmic dust drifting in absolute absolute-zero temperatures. It represents the ultimate heat-death state of cosmic evolution.',
    specs: {
      mass: '~9.0 × 10⁵⁴ kg',
      radius: '450 Billion LY',
      temperature: '0.001 K',
      age: '98 Trillion Years'
    },
    advancedSpecs: {
      classification: 'Post-Decay Degenerate Dimension',
      surfaceGravity: 'N/A',
      escapeVelocity: 'N/A',
      luminosity: 'Hawking radiation emission only',
      composition: 'Iron-56 stellar husks, Black hole event horizons, Cold leptons',
      discoveryYear: 'Inferred via gravity wave leakage'
    },
    trivia: [
      'All protons have decayed in this universe, leaving only electrons, positrons, and black holes.',
      'Its cosmic horizon is so dark that not a single photon of visible light has been generated in a billion years.',
      'Slight gravitational leakage from this universe acts as "dark matter" in neighboring younger timelines.'
    ],
    visuals: {
      baseColor: '#1e293b',
      secondaryColor: '#0f172a',
      visualShape: 'black-hole'
    },
    scaleZone: 6
  }
];

export default function App() {
  // Application State
  const [objects] = useState<CelestialObject[]>(() => [...PRESETS_CELESTIAL_DATA, ...MULTIVERSE_OBJECTS]);
  const [selectedId, setSelectedId] = useState<string | null>(PRESETS_CELESTIAL_DATA[0]?.id || null); // default selected first item
  const [activeScaleZone, setActiveScaleZone] = useState<number | null>(null); // null means "All Scales"
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Simulation Visual Layer Toggles
  const [showDarkMatter, setShowDarkMatter] = useState(true);
  const [showDarkEnergy, setShowDarkEnergy] = useState(true);
  const [showCMB, setShowCMB] = useState(true);
  
  // Loading & Error States
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter suggestions from the pre-calibrated database
  const suggestions = searchQuery.trim()
    ? objects.filter(
        (obj) =>
          obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          obj.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  const scrollToSidebar = () => {
    setTimeout(() => {
      const element = document.getElementById('detail-sidebar');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Explicitly scroll main container for absolute reliability on mobile/smartphone devices
        const container = document.getElementById('app-main-layout');
        if (container) {
          const topPos = element.offsetTop;
          container.scrollTo({ top: topPos, behavior: 'smooth' });
        }
      }
    }, 100);
  };

  const handleSelectSuggestion = (obj: CelestialObject) => {
    setSelectedId(obj.id);
    setActiveScaleZone(null); // Clear filter to ensure matched node is visible
    setSearchQuery('');
    setIsDropdownOpen(false);
    scrollToSidebar();
  };

  // Currently selected object profile helper
  const selectedObject = objects.find((obj) => obj.id === selectedId) || null;

  // Handles celestial search operations
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    // Local Database Fuzzy Match
    const match = objects.find(
      (obj) =>
        obj.name.toLowerCase().includes(query) ||
        obj.category.toLowerCase().includes(query)
    );

    if (match) {
      setSelectedId(match.id);
      setActiveScaleZone(null); // Clear filter to ensure the matched node is visible
      setSearchQuery('');
      scrollToSidebar();
    } else {
      setErrorMsg(`No celestial object matching "${searchQuery}" was found in our pre-calibrated database.`);
    }
  };

  const handleSelectPreset = (id: string) => {
    setSelectedId(id);
    scrollToSidebar();
  };

  return (
    <div className="h-full w-full cosmic-radial-bg text-slate-100 flex flex-col font-sans relative overflow-hidden" id="app-root-container">
      {/* Background Star Field Overlay */}
      <div className="star-field-overlay" />

      {/* 1. Header Navigation Bar */}
      <header className="frosted-glass-header px-3 py-1.5 md:px-6 md:py-3 flex flex-row justify-between items-center gap-2 z-20" id="app-header">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-tr from-sky-400 via-indigo-500 to-rose-400 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 animate-pulse" id="header-logo">
            <Orbit className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xs xs:text-sm md:text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 truncate" id="header-title">
              APLUT UNIVERSE<span className="hidden sm:inline"> SIMULATOR</span>
            </h1>
            <p className="hidden xs:block text-[8px] md:text-[10px] font-mono text-slate-400 tracking-wider">LOGARITHMIC SCALE EXPLORER</p>
          </div>
        </div>

        {/* Search Engine & Form */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-[180px] xs:max-w-[240px] sm:max-w-xs md:max-w-md flex gap-1.5 animate-fade-in" id="search-form">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => {
                // Delay slightly to allow onMouseDown on suggestion item to register
                setTimeout(() => {
                  setIsDropdownOpen(false);
                }, 150);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsDropdownOpen(false);
                }
              }}
              className="w-full bg-white/5 border border-white/10 focus:border-white/20 focus:ring-1 focus:ring-indigo-500/30 text-slate-100 placeholder-slate-400 text-[11px] md:text-xs rounded-lg md:rounded-xl pl-8 md:pl-10 pr-3 py-1.5 md:py-2 outline-none transition-all"
              id="input-cosmic-search"
              autoComplete="off"
            />
            <Search className="absolute left-2.5 top-2 md:left-3.5 md:top-2.5 w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400" />

            {/* Suggestions Dropdown */}
            {isDropdownOpen && suggestions.length > 0 && (
              <div 
                className="absolute left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-30 shadow-2xl max-h-60 overflow-y-auto"
                id="search-suggestions-dropdown"
              >
                <div className="p-2 border-b border-white/5 bg-white/[0.02]">
                  <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 px-2">
                    <Database className="w-3 h-3 text-sky-400" />
                    Catalog Match Suggestions
                  </span>
                </div>
                <div className="py-1">
                  {suggestions.map((obj) => (
                    <button
                      key={obj.id}
                      type="button"
                      onMouseDown={() => handleSelectSuggestion(obj)}
                      className="w-full text-left px-4 py-2 hover:bg-white/10 transition-all flex justify-between items-center text-xs group cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-100 group-hover:text-white transition-colors">
                          {obj.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {obj.category}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-indigo-300">
                        {obj.distanceLy === 0 ? 'Earth Orbit' : `${obj.distanceLy.toLocaleString()} LY`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={!searchQuery.trim()}
            className="hidden sm:flex bg-indigo-600/65 hover:bg-indigo-500/80 border border-indigo-400/20 disabled:bg-white/5 disabled:text-slate-500 disabled:border-transparent text-white text-xs px-4 rounded-xl font-medium tracking-wide transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/10 cursor-pointer disabled:cursor-not-allowed shrink-0"
            id="btn-search-trigger"
          >
            Search
          </button>
        </form>
      </header>

      {/* 2. Main Space Layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative z-10" id="app-main-layout">
        {/* Central Exploration Stage */}
        <div className="w-full lg:flex-1 h-[480px] xs:h-[520px] sm:h-[600px] lg:h-full flex flex-col relative bg-transparent shrink-0" id="center-stage-container">
          {/* Scale Magnitude Filter tabs */}
          <div className="bg-white/[0.01] backdrop-blur-md border-b border-white/5 px-3 py-1.5 flex flex-nowrap overflow-x-auto gap-1 items-center shrink-0 scrollbar-none" id="scale-magnitude-tabs">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mr-1.5 shrink-0">Filters:</span>
            <button
              onClick={() => setActiveScaleZone(null)}
              className={`text-[10px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                activeScaleZone === null
                  ? 'bg-white/15 text-white border-white/30 font-medium shadow-sm'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-slate-100 hover:bg-white/5'
              }`}
              id="tab-filter-all"
            >
              All Scales
            </button>
            {COSMIC_SCALES.map((scale) => (
              <button
                key={scale.id}
                onClick={() => setActiveScaleZone(scale.id)}
                className={`text-[10px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                  activeScaleZone === scale.id
                    ? 'bg-indigo-500/25 text-sky-300 border-indigo-400/40 font-medium shadow-sm shadow-indigo-500/10'
                    : 'bg-transparent text-slate-400 border-transparent hover:text-slate-100 hover:bg-white/5'
                }`}
                id={`tab-filter-${scale.id}`}
              >
                {scale.name}
              </button>
            ))}
          </div>

          {/* Active Scale Description Banner */}
          {activeScaleZone && (
            <div className="bg-indigo-500/10 border-b border-indigo-500/20 px-4 py-1.5 flex items-center justify-between shrink-0" id="active-scale-info-banner">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                <p className="text-[10px] text-slate-300 truncate max-w-[240px] xs:max-w-none">
                  <span className="font-semibold text-indigo-300 font-mono">
                    {COSMIC_SCALES[activeScaleZone - 1].range}
                  </span>
                  {' — '}
                  {COSMIC_SCALES[activeScaleZone - 1].description}
                </p>
              </div>
              <button
                onClick={() => setActiveScaleZone(null)}
                className="text-[9px] text-indigo-400 hover:text-indigo-300 font-mono underline uppercase cursor-pointer"
                id="btn-clear-scale"
              >
                Show All
              </button>
            </div>
          )}

          {/* 3D Simulation Canvas Container */}
          <div className="flex-1 min-h-[220px] md:min-h-[350px] relative" id="canvas-wrapper">
            <CosmicCanvas
              objects={objects}
              selectedId={selectedId}
              onSelectObject={(obj) => {
                setSelectedId(obj.id);
                scrollToSidebar();
              }}
              activeScaleZone={activeScaleZone}
              showDarkMatter={showDarkMatter}
              showDarkEnergy={showDarkEnergy}
              showCMB={showCMB}
            />

            {/* Selected Object Target HUD for mobile & desktop overview */}
            {selectedObject && (
              <div 
                className="flex absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 bg-slate-950/90 border border-indigo-500/30 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl shadow-indigo-500/20 sm:max-w-sm flex-col gap-2.5 animate-fade-in z-20 pointer-events-auto"
                id="selected-target-hud"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded">
                      Focused Target
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                      {selectedObject.name}
                    </h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setSelectedId(null);
                      document.getElementById('app-main-layout')?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                    title="Deselect Target"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/5 pt-2">
                  <span className="text-slate-400">Distance from Earth:</span>
                  <span className="text-sky-300 font-semibold">{formatKm(selectedObject.distanceLy)}</span>
                </div>
              </div>
            )}

            {/* Error notifications bubble */}
            {errorMsg && (
              <div className="absolute top-4 right-4 bg-rose-950/80 border border-rose-800/30 p-4 rounded-xl shadow-2xl max-w-sm flex gap-3 animate-fade-in z-20" id="error-bubble">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-rose-200">Catalog Search Information</h4>
                  <p className="text-[11px] text-rose-300 mt-1 leading-relaxed">{errorMsg}</p>
                  <button
                    onClick={() => setErrorMsg(null)}
                    className="text-[10px] text-rose-400 hover:text-rose-300 mt-2 font-mono underline cursor-pointer"
                    id="btn-close-error"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick preset navigator tray (Bottom shelf) */}
          <div className="hidden md:flex border-t border-white/5 bg-white/[0.01] backdrop-blur-md p-4 flex-col gap-2 w-full overflow-hidden shrink-0" id="bottom-presets-shelf">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                <Database className="w-3.5 h-3.5 text-slate-400" />
                Cosmological Specimens ({objects.length})
              </div>
              <span className="text-[9px] text-slate-500 font-mono">Click any category preset to calibrate telemetry</span>
            </div>

            {/* Grid of presets */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent select-none w-full" id="presets-scroller">
              {objects.slice(0, 26).map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => handleSelectPreset(obj.id)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-left border frosted-glass-hover transition-all text-xs cursor-pointer ${
                    selectedId === obj.id
                      ? 'bg-white/15 border-white/25 text-white shadow-lg'
                      : 'bg-white/5 border-white/5 text-slate-300'
                  }`}
                  id={`btn-preset-${obj.id}`}
                >
                  <div className="text-[8px] font-bold font-mono tracking-wider text-sky-400 uppercase">{obj.category.split(' ')[0]}</div>
                  <div className="font-semibold truncate max-w-[120px] mt-0.5">{obj.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Detailed Specimen Sidebar */}
        {selectedObject ? (
          <aside
            className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-slate-950/85 lg:bg-white/[0.02] backdrop-blur-2xl overflow-visible lg:overflow-y-auto flex flex-col z-10 shadow-2xl shrink-0"
            id="detail-sidebar"
          >
            {/* Sidebar header */}
            <div className="p-6 border-b border-white/10 flex flex-col gap-2" id="sidebar-header">
              <button
                type="button"
                onClick={() => {
                  document.getElementById('app-main-layout')?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="lg:hidden flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold mb-1 cursor-pointer w-fit"
                id="btn-sidebar-back-to-map"
              >
                <Orbit className="w-3.5 h-3.5 text-sky-400" />
                ← Back to 3D Space Map
              </button>
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="cosmic-tag mb-2" id="sidebar-category-tag">
                    {selectedObject.category}
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight mt-1" id="sidebar-object-name">
                    {selectedObject.name}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedId(null);
                    document.getElementById('app-main-layout')?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                  id="btn-close-sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Information Slots */}
            <div className="p-6 flex flex-col gap-6" id="specimen-details-section">
              {/* Distance slot */}
              <div>
                <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                  Distance from Earth
                </h4>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5" id="distance-slot">
                  <div className="text-sm font-semibold text-sky-300 font-mono">{formatKm(selectedObject.distanceLy)}</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-1">
                    ({selectedObject.distanceLy.toLocaleString(undefined, { maximumFractionDigits: 5 })} Light Years)
                  </div>
                </div>
              </div>

              {/* Physical Specifications Grid */}
              <div>
                <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-3">
                  Physical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-3" id="specs-grid">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl frosted-glass-hover">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Estimated Mass</div>
                    <div className="text-xs font-semibold text-slate-200 mt-1 font-mono truncate" title={selectedObject.specs.mass}>
                      {selectedObject.specs.mass}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl frosted-glass-hover">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Physical Radius</div>
                    <div className="text-xs font-semibold text-slate-200 mt-1 font-mono truncate" title={selectedObject.specs.radius}>
                      {selectedObject.specs.radius}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl frosted-glass-hover">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Core Temperature</div>
                    <div className="text-xs font-semibold text-slate-200 mt-1 font-mono truncate" title={selectedObject.specs.temperature}>
                      {selectedObject.specs.temperature}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl frosted-glass-hover">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Cosmological Age</div>
                    <div className="text-xs font-semibold text-slate-200 mt-1 font-mono truncate" title={selectedObject.specs.age}>
                      {selectedObject.specs.age}
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Astrophysical Data */}
              <div>
                <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  Advanced Astrophysical Data
                </h4>
                <div className="bg-white/[0.01] border border-white/10 rounded-xl p-4 flex flex-col gap-3 font-sans" id="advanced-specs-panel">
                  <div className="flex justify-between items-start border-b border-white/5 pb-2.5 text-xs">
                    <span className="text-slate-400 font-medium">Classification</span>
                    <span className="text-right font-mono text-sky-300 font-semibold max-w-[180px] break-words">
                      {selectedObject.advancedSpecs?.classification || 'Standard Cosmological Body'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2.5 text-xs">
                    <span className="text-slate-400 font-medium">Surface Gravity</span>
                    <span className="text-right font-mono text-indigo-300 font-semibold">
                      {selectedObject.advancedSpecs?.surfaceGravity || 'Varying Gravitational Field'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2.5 text-xs">
                    <span className="text-slate-400 font-medium">Escape Velocity</span>
                    <span className="text-right font-mono text-indigo-300 font-semibold">
                      {selectedObject.advancedSpecs?.escapeVelocity || 'Relativistic / Variable'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2.5 text-xs">
                    <span className="text-slate-400 font-medium">Bolometric Luminosity</span>
                    <span className="text-right font-mono text-amber-300 font-semibold">
                      {selectedObject.advancedSpecs?.luminosity || 'N/A (Reflective Only)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-start border-b border-white/5 pb-2.5 text-xs">
                    <span className="text-slate-400 font-medium">Primary Composition</span>
                    <span className="text-right font-mono text-slate-200 font-semibold max-w-[180px] break-words">
                      {selectedObject.advancedSpecs?.composition || 'Interstellar Dust, Heavy Elements'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Discovery / Calculation</span>
                    <span className="text-right font-mono text-slate-400 font-medium">
                      {selectedObject.advancedSpecs?.discoveryYear || 'Ancient Chronicles'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scientific Description */}
              <div>
                <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-2">
                  Scientific Profile Description
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans" id="specimen-description-text">
                  {selectedObject.description}
                </p>
              </div>

              {/* Interesting Trivia Points */}
              <div>
                <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Cosmic Field Notes
                </h4>
                <ul className="flex flex-col gap-3" id="trivia-list">
                  {selectedObject.trivia.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <span className="text-indigo-400 font-mono font-bold flex-shrink-0 mt-0.5">0{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        ) : (
          <aside
            className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-slate-950/85 lg:bg-white/[0.02] backdrop-blur-2xl overflow-visible lg:overflow-y-auto flex flex-col z-10 shadow-2xl shrink-0"
            id="detail-sidebar"
          >
            {/* Sidebar header */}
            <div className="p-6 border-b border-white/10 flex flex-col gap-2" id="sidebar-header">
              <span className="text-[8px] font-bold font-mono tracking-widest text-indigo-400 uppercase bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded w-fit">
                Simulation Telemetry
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mt-1" id="sidebar-universe-title">
                <Orbit className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '20s' }} />
                Observable Universe
              </h2>
            </div>

            {/* Universe Composition Stats */}
            <div className="p-6 flex flex-col gap-6" id="universe-composition-section">
              {/* Bento Scale Stats */}
              <div>
                <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-sky-400" />
                  Cosmological Demographics
                </h4>
                
                <div className="grid grid-cols-2 gap-3" id="universe-stats-grid">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl frosted-glass-hover">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Est. Galaxies</div>
                    <div className="text-xs font-bold text-sky-300 mt-1 font-mono">
                      200B — 2 Trillion
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl frosted-glass-hover">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Total Stars</div>
                    <div className="text-xs font-bold text-amber-300 mt-1 font-mono">
                      ~10²⁴ (Septillion)
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl frosted-glass-hover">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Exoplanets</div>
                    <div className="text-xs font-bold text-slate-200 mt-1 font-mono">
                      Trillions
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl frosted-glass-hover">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Supermassive BHs</div>
                    <div className="text-xs font-bold text-purple-400 mt-1 font-mono">
                      Billions
                    </div>
                  </div>
                </div>
              </div>

              {/* Mass-Energy Breakdown Visual bars */}
              <div>
                <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Mass-Energy Distribution
                </h4>
                
                <div className="flex flex-col gap-4 bg-white/[0.01] border border-white/10 p-4 rounded-xl" id="distribution-panel">
                  {/* Dark Energy */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow shadow-pink-500/50" />
                        Dark Energy
                      </span>
                      <span className="font-mono font-bold text-pink-400">68%</span>
                    </div>
                    <div className="w-full bg-slate-900/80 h-2.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-gradient-to-r from-pink-600 to-pink-400 h-full rounded-full shadow-lg shadow-pink-500/35" style={{ width: '68%' }} />
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-1.5">
                      The enigmatic, repulsive vacuum pressure driving the accelerated expansion of cosmological spacetime.
                    </p>
                  </div>

                  {/* Dark Matter */}
                  <div className="border-t border-white/5 pt-3">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow shadow-indigo-500/50" />
                        Dark Matter
                      </span>
                      <span className="font-mono font-bold text-indigo-400">27%</span>
                    </div>
                    <div className="w-full bg-slate-900/80 h-2.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full shadow-lg shadow-indigo-500/35" style={{ width: '27%' }} />
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-1.5">
                      Invisible non-baryonic mass forming the giant gravitational scaffolding upon which all galaxies and the cosmic web are constructed.
                    </p>
                  </div>

                  {/* Normal Matter */}
                  <div className="border-t border-white/5 pt-3">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow shadow-amber-400/50" />
                        Baryonic Matter
                      </span>
                      <span className="font-mono font-bold text-amber-400">5%</span>
                    </div>
                    <div className="w-full bg-slate-900/80 h-2.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full shadow-lg shadow-amber-400/35" style={{ width: '5%' }} />
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-1.5">
                      "Normal" matter—atoms, stars, gas, and planets. Contains **Radiation & Leftover Light** (forming the Cosmic Microwave Background).
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Layer Toggles */}
              <div>
                <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  Interactive Simulation Layers
                </h4>
                
                <div className="flex flex-col gap-2.5 bg-white/[0.01] border border-white/10 p-3.5 rounded-xl text-xs" id="simulation-layer-toggles">
                  {/* CMB Toggle */}
                  <label className="flex items-center justify-between cursor-pointer group hover:bg-white/5 p-1.5 rounded-lg transition-all" id="toggle-layer-cmb">
                    <span className="text-slate-300 group-hover:text-white transition-all font-medium">
                      Leftover Light (CMB Shell)
                    </span>
                    <input
                      type="checkbox"
                      checked={showCMB}
                      onChange={(e) => setShowCMB(e.target.checked)}
                      className="accent-pink-500 w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                    />
                  </label>

                  {/* Dark Matter Toggle */}
                  <label className="flex items-center justify-between cursor-pointer group hover:bg-white/5 p-1.5 rounded-lg transition-all" id="toggle-layer-darkmatter">
                    <span className="text-slate-300 group-hover:text-white transition-all font-medium">
                      Dark Matter Filament Web
                    </span>
                    <input
                      type="checkbox"
                      checked={showDarkMatter}
                      onChange={(e) => setShowDarkMatter(e.target.checked)}
                      className="accent-indigo-500 w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                    />
                  </label>

                  {/* Dark Energy Toggle */}
                  <label className="flex items-center justify-between cursor-pointer group hover:bg-white/5 p-1.5 rounded-lg transition-all" id="toggle-layer-darkenergy">
                    <span className="text-slate-300 group-hover:text-white transition-all font-medium">
                      Dark Energy Expansion Waves
                    </span>
                    <input
                      type="checkbox"
                      checked={showDarkEnergy}
                      onChange={(e) => setShowDarkEnergy(e.target.checked)}
                      className="accent-pink-500 w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Informative Help Card */}
              <div className="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl flex gap-3 text-xs text-indigo-200/90 leading-relaxed font-sans" id="universe-tips-card">
                <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Logarithmic Space Map:</strong> Distances are scaled logarithmically to fit the extreme magnitudes from Earth to the Cosmic Microwave Background (CMB) boundary at 46.5 Billion LY. Use the search or scale zone selectors to travel across structures.
                </p>
              </div>
            </div>
          </aside>
        )}
      </main>

      {/* 5. Footer and Metadata bar */}
      <footer className="hidden md:flex border-t border-white/5 bg-transparent p-3 text-center text-[10px] text-slate-500 font-mono justify-between items-center gap-2" id="app-footer">
        <div>3D Universe Simulator — Built in high-fidelity logarithmic spatial dimensions.</div>
        <div className="flex gap-4">
          <span>Active Coordinate Scale: log₁₀(Light Years)</span>
          <span>Port: 3000 (Ingress Active)</span>
        </div>
      </footer>
    </div>
  );
}
