export interface PhysicalSpecs {
  mass: string;
  radius: string;
  temperature: string;
  age: string;
}

export interface VisualParams {
  baseColor: string;
  secondaryColor: string;
  visualShape:
    | 'sphere'
    | 'ringed-sphere'
    | 'pulsar'
    | 'black-hole'
    | 'galaxy-spiral'
    | 'galaxy-elliptical'
    | 'nebula-cloud'
    | 'star-cluster'
    | 'dust-grain'
    | 'filament'
    | 'void'
    | 'star-system';
}

export interface AdvancedSpecs {
  classification?: string;
  surfaceGravity?: string;
  escapeVelocity?: string;
  luminosity?: string;
  composition?: string;
  discoveryYear?: string;
}

export interface CelestialObject {
  id: string;
  name: string;
  category: string;
  distanceLy: number; // raw distance in light years
  distanceString: string; // readable distance representation
  description: string;
  specs: PhysicalSpecs;
  advancedSpecs?: AdvancedSpecs;
  imageUrl?: string;
  trivia: string[];
  visuals: VisualParams;
  custom?: boolean; // dynamic from Gemini search
  x?: number; // 3D x-coordinate
  y?: number; // 3D y-coordinate
  z?: number; // 3D z-coordinate
  scaleZone: number; // 1 to 5 matching cosmic scales
}

export interface CosmicScale {
  id: number;
  name: string;
  range: string;
  description: string;
}

export const COSMIC_SCALES: CosmicScale[] = [
  {
    id: 1,
    name: 'Solar System & Planets',
    range: '< 1 LY',
    description: 'Debris, moons, rocky planets, and gas giants within our solar system and nearby interstellar space.'
  },
  {
    id: 2,
    name: 'Stellar Neighborhood',
    range: '1 LY - 1,000 LY',
    description: 'Stars, binary systems, stellar remnants, pulsars, and immediate stellar groupings.'
  },
  {
    id: 3,
    name: 'Galactic Structure',
    range: '1,000 LY - 10,000,000 LY',
    description: 'Star clusters, vast nebulae, satellite dwarf galaxies, stellar black holes, and monolithic spiral/elliptical galaxies.'
  },
  {
    id: 4,
    name: 'Intergalactic Clusters',
    range: '10M LY - 1,000M LY',
    description: 'Gravitationally bound clusters of galaxies, cosmic voids, and massive superclusters.'
  },
  {
    id: 5,
    name: 'Cosmological Horizon',
    range: '1,000M LY+',
    description: 'The large-scale structure of the Cosmic Web, deep space filaments, and the Observable Universe edge.'
  },
  {
    id: 6,
    name: 'Multiverse & Beyond',
    range: 'Observable Edge+',
    description: 'Bubble universes, higher dimensions, eternal inflation space, and parallel quantum timelines outside our observable universe.'
  }
];
