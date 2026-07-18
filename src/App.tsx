import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Info,
  Database,
  Cpu,
  Orbit,
  X,
  AlertCircle
} from 'lucide-react';
import { PRESETS_CELESTIAL_DATA } from './data/celestialData';
import { CelestialObject, COSMIC_SCALES } from './types';
import CosmicCanvas from './components/CosmicCanvas';

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

export default function App() {
  // Application State
  const [objects] = useState<CelestialObject[]>(PRESETS_CELESTIAL_DATA);
  const [selectedId, setSelectedId] = useState<string | null>('cosmic-dust'); // default selected first item
  const [activeScaleZone, setActiveScaleZone] = useState<number | null>(null); // null means "All Scales"
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMobileView, setActiveMobileView] = useState<'simulation' | 'details'>('simulation');
  
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

  const handleSelectSuggestion = (obj: CelestialObject) => {
    setSelectedId(obj.id);
    setActiveScaleZone(null); // Clear filter to ensure matched node is visible
    setSearchQuery('');
    setIsDropdownOpen(false);
    setActiveMobileView('simulation');
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
      setActiveMobileView('simulation');
    } else {
      setErrorMsg(`No celestial object matching "${searchQuery}" was found in our pre-calibrated database.`);
    }
  };

  const handleSelectPreset = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="h-full w-full cosmic-radial-bg text-slate-100 flex flex-col font-sans relative overflow-hidden" id="app-root-container">
      {/* Background Star Field Overlay */}
      <div className="star-field-overlay" />

      {/* 1. Header Navigation Bar */}
      <header className="frosted-glass-header px-4 py-3 md:px-6 md:py-3.5 flex flex-col md:flex-row justify-between items-center gap-3 z-20" id="app-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-tr from-sky-400 via-indigo-500 to-rose-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 animate-pulse" id="header-logo">
            <Orbit className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-sm md:text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400" id="header-title">
              3D UNIVERSE SIMULATOR
            </h1>
            <p className="text-[9px] md:text-[10px] font-mono text-slate-400 tracking-wider">LOGARITHMIC SCALE COSMOS EXPLORER</p>
          </div>
        </div>

        {/* Search Engine & Form */}
        <form onSubmit={handleSearch} className="relative w-full max-w-md flex gap-2 animate-fade-in" id="search-form">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search e.g. Saturn, Orion Nebula..."
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
              className="w-full bg-white/5 border border-white/10 focus:border-white/20 focus:ring-1 focus:ring-indigo-500/30 text-slate-100 placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all"
              id="input-cosmic-search"
              autoComplete="off"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />

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
            className="bg-indigo-600/65 hover:bg-indigo-500/80 border border-indigo-400/20 disabled:bg-white/5 disabled:text-slate-500 disabled:border-transparent text-white text-xs px-4 rounded-xl font-medium tracking-wide transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/10 cursor-pointer disabled:cursor-not-allowed"
            id="btn-search-trigger"
          >
            Search
          </button>
        </form>
      </header>

      {/* 2. Main Space Layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-10" id="app-main-layout">
        {/* Mobile View Segmented Tabs Control */}
        <div className="lg:hidden flex border-b border-white/10 bg-slate-950/40 p-2 gap-1.5 shrink-0 z-20" id="mobile-view-tabs">
          <button
            type="button"
            onClick={() => setActiveMobileView('simulation')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-semibold tracking-wide transition-all ${
              activeMobileView === 'simulation'
                ? 'bg-indigo-600/60 text-white border border-indigo-400/30 font-bold shadow-md shadow-indigo-600/10'
                : 'text-slate-400 border border-transparent hover:text-slate-200 hover:bg-white/5'
            }`}
            id="tab-mobile-simulation"
          >
            <Orbit className="w-4 h-4 text-sky-400" />
            3D Simulation Space
          </button>
          <button
            type="button"
            onClick={() => setActiveMobileView('details')}
            disabled={!selectedObject}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-semibold tracking-wide transition-all ${
              !selectedObject ? 'opacity-30 cursor-not-allowed' : ''
            } ${
              activeMobileView === 'details'
                ? 'bg-indigo-600/60 text-white border border-indigo-400/30 font-bold shadow-md shadow-indigo-600/10'
                : 'text-slate-400 border border-transparent hover:text-slate-200 hover:bg-white/5'
            }`}
            id="tab-mobile-details"
          >
            <Info className="w-4 h-4 text-amber-400" />
            Scientific Profile {selectedObject ? `(${selectedObject.name})` : ''}
          </button>
        </div>

        {/* Central Exploration Stage */}
        <div className={`flex-1 min-w-0 flex flex-col relative bg-transparent ${activeMobileView === 'simulation' ? 'flex' : 'hidden lg:flex'}`} id="center-stage-container">
          {/* Scale Magnitude Filter tabs */}
          <div className="bg-white/[0.01] backdrop-blur-md border-b border-white/5 px-4 py-2 flex flex-wrap gap-1.5 items-center shrink-0" id="scale-magnitude-tabs">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mr-1.5">Filters:</span>
            <button
              onClick={() => setActiveScaleZone(null)}
              className={`text-[10px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
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
                className={`text-[10px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeScaleZone === scale.id
                    ? 'bg-indigo-500/25 text-sky-300 border-indigo-400/40 font-medium shadow-sm shadow-indigo-500/10'
                    : 'bg-transparent text-slate-400 border-transparent hover:text-slate-100 hover:bg-white/5'
                }`}
                id={`tab-filter-${scale.id}`}
              >
                Zone {scale.id}: {scale.name}
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
              onSelectObject={(obj) => setSelectedId(obj.id)}
              activeScaleZone={activeScaleZone}
            />

            {/* Selected Object Target HUD for mobile & desktop overview */}
            {selectedObject && (
              <div 
                className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 bg-slate-950/90 border border-indigo-500/30 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl shadow-indigo-500/20 max-w-sm flex flex-col gap-2.5 animate-fade-in z-20 pointer-events-auto"
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
                      setActiveMobileView('simulation');
                    }}
                    className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                    title="Deselect Target"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/5 pt-2">
                  <span className="text-slate-400">Log-Scale Distance:</span>
                  <span className="text-sky-300 font-semibold">{selectedObject.distanceString}</span>
                </div>

                <div className="flex gap-2 mt-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMobileView('details');
                      const sidebar = document.getElementById('detail-sidebar');
                      if (sidebar) sidebar.scrollTop = 0;
                    }}
                    className="flex-1 bg-indigo-600/80 hover:bg-indigo-500 text-white font-medium text-[10px] py-2 px-3 rounded-xl shadow-lg shadow-indigo-600/10 transition-all cursor-pointer text-center active:scale-95 flex items-center justify-center gap-1.5 border border-indigo-400/20"
                    id="hud-view-specs-btn"
                  >
                    <Info className="w-3.5 h-3.5" />
                    Open Scientific Profile
                  </button>
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
          <div className="border-t border-white/5 bg-white/[0.01] backdrop-blur-md p-4 flex flex-col gap-2 w-full overflow-hidden shrink-0" id="bottom-presets-shelf">
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
        {selectedObject && (
          <aside
            className={`w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-slate-950/85 lg:bg-white/[0.02] backdrop-blur-2xl overflow-y-auto flex flex-col z-10 shadow-2xl ${
              activeMobileView === 'details' ? 'flex' : 'hidden lg:flex'
            }`}
            id="detail-sidebar"
          >
            {/* Sidebar header */}
            <div className="p-6 border-b border-white/10 flex flex-col gap-2" id="sidebar-header">
              <button
                type="button"
                onClick={() => setActiveMobileView('simulation')}
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
                    setActiveMobileView('simulation');
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
                  <div className="text-sm font-semibold text-sky-300 font-mono">{selectedObject.distanceString}</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                    ({selectedObject.distanceLy.toExponential(3)} Light Years)
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
