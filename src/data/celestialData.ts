import { CelestialObject } from '../types';

export const PRESETS_CELESTIAL_DATA: CelestialObject[] = [
  {
    id: 'cosmic-dust',
    name: 'Interstellar Silicate Grain',
    category: 'Cosmic Dust Grains',
    distanceLy: 1.58e-17, // ~150 meters from Earth in interstellar medium
    distanceString: '150 meters (1.58 × 10⁻¹⁷ LY)',
    description: 'Microscopic specks of silicates, amorphous carbon, iron, and water-ice mantle drifting between the stars. These grains absorb ultraviolet and visible stellar radiation, re-emitting it in the far-infrared, and serve as crucial catalytic sites for the formation of complex organic molecules in interstellar space.',
    specs: {
      mass: '~1.0 × 10⁻¹⁴ kg',
      radius: '0.2 micrometers',
      temperature: '10 K - 20 K',
      age: 'Variable (constantly recycled)'
    },
    advancedSpecs: {
      classification: 'Carbonaceous-Silicate Interstellar Dust',
      surfaceGravity: 'Negligible (~1.0 × 10⁻⁹ m/s²)',
      escapeVelocity: '< 0.01 mm/s',
      luminosity: 'Re-emission in Far-Infrared spectrum',
      composition: 'Amorphous Carbon, Olivine-like Silicates, H₂O/CO Ice Mantle',
      discoveryYear: 'Hypothesized 1930 (R.J. Trumpler), Confirmed via spectroscopy'
    },
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Cosmic dust plays a vital role in star formation by absorbing heating radiation and allowing gas clouds to collapse under their own gravity.',
      'Without interstellar dust grains, the dense molecular clouds would never get cold enough to form hydrogen molecules (H₂).',
      'Samples of cosmic dust have been captured and returned to Earth by NASA\'s Stardust mission from comet Wild 2.'
    ],
    visuals: {
      baseColor: '#a1a1aa',
      secondaryColor: '#38bdf8',
      visualShape: 'dust-grain'
    },
    scaleZone: 1
  },
  {
    id: 'meteoroid',
    name: 'Chelyabinsk Meteoroid',
    category: 'Meteoroids',
    distanceLy: 1.58e-11, // ~150,000 km
    distanceString: '150,000 km (1.58 × 10⁻¹¹ LY)',
    description: 'Space rocks ranging from the size of a grain of sand to boulders a few meters wide. The Chelyabinsk meteoroid was a superbolide asteroid debris that entered Earth\'s atmosphere over Russia in 2013, exploding with an energy release of approximately 500 kilotons of TNT.',
    specs: {
      mass: '1.2 × 10⁷ kg',
      radius: '10 meters',
      temperature: '250 K (in space)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'LL5 Ordinary Chondrite (Stony Meteorite)',
      surfaceGravity: '~3.3 × 10⁻⁶ m/s²',
      escapeVelocity: '0.012 m/s',
      luminosity: 'None (reflected solar albido only)',
      composition: 'Silicates (Olivine, Pyroxene), Troilite, Metallic Iron-Nickel',
      discoveryYear: '2013 (Atmospheric impact event)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Chelyabinsk meteoroid was undetected prior to its atmospheric entry because it approached Earth from the direction of the Sun.',
      'It was an LL5 ordinary chondrite, a class of stony meteorites rich in silicates and low in metallic iron.',
      'Its explosion created an intense shockwave that shattered windows across six Russian cities, injuring over 1,500 people.'
    ],
    visuals: {
      baseColor: '#78716c',
      secondaryColor: '#f97316',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'comet',
    name: 'Halley\'s Comet (1P/Halley)',
    category: 'Comets',
    distanceLy: 0.00057, // ~36 AU at aphelion
    distanceString: '36.1 AU (0.00057 LY) at aphelion',
    description: 'A periodic comet orbiting the Sun every 75-76 years, originating from the outer solar system. It is a "dirty snowball" of volatile water ice, frozen carbon monoxide, methane, and embedded rocky grains. When heated by the Sun, its volatile gases sublimate, forming a glowing coma and two dramatic tails.',
    specs: {
      mass: '2.2 × 10¹⁴ kg',
      radius: '5.5 km (mean)',
      temperature: '30 K - 350 K (extreme ranges)',
      age: '4.6 billion years'
    },
    advancedSpecs: {
      classification: 'Halley-type Periodic Comet (1P)',
      surfaceGravity: '0.002 m/s²',
      escapeVelocity: '2.4 m/s',
      luminosity: 'Sublimation coma & gas fluorescence',
      composition: 'Water Ice (80%), Carbon Monoxide (10%), Methane, Formaldehyde, Rock',
      discoveryYear: 'Ancient (Observed since 240 BC, Orbit calculated by Edmond Halley 1705)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Halley is the only periodic comet that is clearly visible to the naked eye from Earth and can appear twice in a single human lifetime.',
      'The comet\'s surface is incredibly dark—blacker than coal—reflecting only about 3-4% of the sunlight it receives.',
      'When the Giotto spacecraft flew within 600 km of Halley in 1986, it took the first close-up images of a comet\'s nucleus, revealing active jets of gas.'
    ],
    visuals: {
      baseColor: '#cbd5e1',
      secondaryColor: '#60a5fa',
      visualShape: 'ringed-sphere'
    },
    scaleZone: 1
  },
  {
    id: 'asteroid',
    name: '16 Psyche',
    category: 'Asteroids',
    distanceLy: 0.000041, // ~2.6 AU from Earth
    distanceString: '2.6 AU (0.000041 LY)',
    description: 'A massive, airless rocky and metallic asteroid in the outer asteroid belt. Unlike most stony/icy asteroids, 16 Psyche is composed almost entirely of iron and nickel, leading astronomers to believe it is the exposed protoplanetary metallic core of an early planetesimal whose mantle was stripped by violent collisions.',
    specs: {
      mass: '2.3 × 10¹⁹ kg',
      radius: '111 km',
      temperature: '160 K',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'M-type metallic asteroid',
      surfaceGravity: '0.06 m/s²',
      escapeVelocity: '124 m/s',
      luminosity: 'Albedo 0.12 (Reflected solar)',
      composition: 'Metallic Iron (80-90%), Nickel (10-15%), Silicate minerals',
      discoveryYear: '1852 (Annibale de Gasparis)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Psyche contains an estimated 1% of the total mass of the entire asteroid belt.',
      'If mined, the metal content of 16 Psyche is hypothetically valued at over $10,000 quadrillion, far exceeding the global economy.',
      'NASA launched the Psyche spacecraft in 2023, scheduled to arrive and orbit the metallic world in 2029 to study planetary cores directly.'
    ],
    visuals: {
      baseColor: '#57534e',
      secondaryColor: '#a8a29e',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'dwarf-planet',
    name: 'Pluto',
    category: 'Dwarf Planets',
    distanceLy: 0.00062, // ~39.5 AU
    distanceString: '39.5 AU (0.00062 LY)',
    description: 'A dwarf planet in the Kuiper belt, Pluto is a world of frozen nitrogen, carbon monoxide, and methane glaciers overlying a solid rock core. It was classified as the ninth planet until 2006, when the IAU redefined "planet" to require clearing its orbital neighborhood of other debris.',
    specs: {
      mass: '1.303 × 10²² kg',
      radius: '1,188 km',
      temperature: '44 K',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Kuiper Belt Dwarf Planet / Plutoid',
      surfaceGravity: '0.62 m/s² (0.063g)',
      escapeVelocity: '1,210 m/s',
      luminosity: 'Reflective albedo 0.49 - 0.66',
      composition: 'Nitrogen Ice, Methane Ice, Carbon Monoxide Ice, Water Ice mantle, Rocky core',
      discoveryYear: '1930 (Clyde Tombaugh)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Pluto features a massive, heart-shaped glacier named Tombaugh Regio, which is made of active nitrogen ice sheets that exhibit convection.',
      'Pluto\'s largest moon, Charon, is so massive that the center of mass (barycenter) of the system lies in open space between them, making it a binary system.',
      'The sky on Pluto is blue, due to complex atmospheric tholins that scatter sunlight similarly to Rayleigh scattering on Earth.'
    ],
    visuals: {
      baseColor: '#fed7aa',
      secondaryColor: '#f97316',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'moon',
    name: 'Europa',
    category: 'Moons (Natural Satellites)',
    distanceLy: 0.000067, // ~4.2 AU (orbiting Jupiter)
    distanceString: '4.2 AU (0.000067 LY)',
    description: 'The smallest of the four Galilean moons orbiting Jupiter. Europa features an incredibly smooth, highly reflective crust of water ice, crisscrossed by dark fractures (lineae). Underneath this 15-25 km thick ice shell lies a global saltwater ocean containing more liquid water than all of Earth\'s oceans combined, heated by tidal flexing.',
    specs: {
      mass: '4.8 × 10²² kg',
      radius: '1,560 km',
      temperature: '100 K',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Galilean Natural Satellite (Moon of Jupiter)',
      surfaceGravity: '1.315 m/s² (0.134g)',
      escapeVelocity: '2,025 m/s',
      luminosity: 'Reflective albedo 0.67',
      composition: 'Surface Water Ice, Deep Liquid Water Ocean (100km depth), Silicate mantle, Iron-Nickel Core',
      discoveryYear: '1610 (Galileo Galilei)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Europa is considered one of the most promising candidates for harboring extraterrestrial microbial life in our solar system.',
      'The dark lines on Europa\'s surface are likely mineral salts and complex compounds deposited by geysers erupting from the subsurface ocean.',
      'Tidal friction from orbiting Jupiter causes Europa\'s core to flex, generating thermal energy that keeps its deep ocean liquid.'
    ],
    visuals: {
      baseColor: '#e2e8f0',
      secondaryColor: '#ca8a04',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'mercury',
    name: 'Mercury',
    category: 'Terrestrial Planets',
    distanceLy: 0.0000061,
    distanceString: '0.39 AU (6.1 × 10⁻⁶ LY)',
    description: 'The smallest planet in the Solar System and the closest to the Sun. Mercury is a heavily cratered, airless rock with extreme temperature swings due to its lack of a thick atmosphere. It has a giant iron core that occupies about 85% of its planetary radius, generating a global magnetic field.',
    specs: {
      mass: '3.285 × 10²³ kg',
      radius: '2,439.7 km',
      temperature: '100 K - 700 K',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Terrestrial Planet',
      surfaceGravity: '3.7 m/s² (0.38g)',
      escapeVelocity: '4,250 m/s',
      luminosity: 'Reflective albedo 0.142',
      composition: '70% Metallic (iron) core, 30% Silicate crust/mantle',
      discoveryYear: 'Prehistoric (Observed since ancient times)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Despite being closest to the Sun, Mercury is not the hottest planet; Venus holds that title due to its runaway carbon dioxide greenhouse atmosphere.',
      'A year on Mercury is only 88 Earth days long, but a single day-night solar cycle takes 176 Earth days.',
      'Mercury is slowly shrinking; its massive iron core is cooling, causing the planet to contract and buckle, forming giant cliffs (wrinkle ridges).'
    ],
    visuals: {
      baseColor: '#8a8a93',
      secondaryColor: '#52525b',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'venus',
    name: 'Venus',
    category: 'Terrestrial Planets',
    distanceLy: 0.0000114,
    distanceString: '0.72 AU (1.14 × 10⁻⁵ LY)',
    description: 'The second planet from the Sun, Venus is Earth\'s sister world in size but a hellish desert of runaway greenhouse warming. Covered in dense, reflective sulfuric acid clouds, its surface pressure is 92 times that of Earth, and its temperatures are hot enough to melt lead.',
    specs: {
      mass: '4.867 × 10²⁴ kg',
      radius: '6,051.8 km',
      temperature: '737 K (average)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Terrestrial Planet',
      surfaceGravity: '8.87 m/s² (0.904g)',
      escapeVelocity: '10,360 m/s',
      luminosity: 'Reflective albedo 0.68',
      composition: '96.5% Carbon Dioxide atmosphere, basaltic rocky crust, iron core',
      discoveryYear: 'Prehistoric (The brightest star-like object in the night sky)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Venus spins backwards on its axis (retrograde rotation) compared to most other planets, meaning the sun rises in the west.',
      'The atmospheric pressure on Venus is equivalent to being 1,000 meters deep underwater on Earth.',
      'Soviet Venera probes landed on Venus in the 1970s and 1980s, surviving for only a few hours before being crushed and melted by the heat.'
    ],
    visuals: {
      baseColor: '#fbbf24',
      secondaryColor: '#ea580c',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'earth',
    name: 'Earth',
    category: 'Terrestrial Planets',
    distanceLy: 0.0,
    distanceString: '0.0 LY (Home Planet)',
    description: 'The third planet from the Sun and the only known astronomical object supporting life. Earth possesses a unique liquid water ocean, a protective nitrogen-oxygen atmosphere, and a active global magnetosphere generated by its spinning liquid iron-nickel outer core.',
    specs: {
      mass: '5.972 × 10²⁴ kg',
      radius: '6,371.0 km',
      temperature: '288 K (average)',
      age: '4.54 billion years'
    },
    advancedSpecs: {
      classification: 'Terrestrial Planet',
      surfaceGravity: '9.807 m/s² (1.0g)',
      escapeVelocity: '11,186 m/s',
      luminosity: 'Reflective albedo 0.306',
      composition: '78% Nitrogen, 21% Oxygen atmosphere, silicate mantle, nickel-iron core',
      discoveryYear: 'Prehistoric (Home to humanity)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Earth is the only planet in the Solar System not named after a Greek or Roman mythological god or goddess.',
      'Its rotation is gradually slowing down due to tidal acceleration caused by the Moon, making days 1.7 milliseconds longer per century.',
      'Earth is the densest planet in the Solar System, with an average density of 5.51 grams per cubic centimeter.'
    ],
    visuals: {
      baseColor: '#3b82f6',
      secondaryColor: '#22c55e',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'terrestrial-planet',
    name: 'Mars',
    category: 'Terrestrial Planets',
    distanceLy: 0.000024, // ~1.5 AU
    distanceString: '1.52 AU (0.000024 LY)',
    description: 'The fourth planet from the Sun, Mars is a cold, dry terrestrial world with a thin carbon dioxide atmosphere. Its surface is coated with iron oxide dust, giving it a distinctive reddish hue. Mars features polar ice caps, ancient river valleys, and Olympus Mons—the largest volcano in the Solar System.',
    specs: {
      mass: '6.39 × 10²³ kg',
      radius: '3,389 km',
      temperature: '210 K (average)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Terrestrial Planet',
      surfaceGravity: '3.71 m/s² (0.379g)',
      escapeVelocity: '5,027 m/s',
      luminosity: 'Reflective albedo 0.15',
      composition: 'Iron Oxide dust, Basaltic rock surface, Iron-Nickel-Sulfur core, CO₂ atmosphere',
      discoveryYear: 'Prehistoric (Known to all ancient civilizations)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Olympus Mons is a giant shield volcano standing 21.9 km tall—nearly three times the height of Mount Everest.',
      'Liquid water cannot exist on the surface of Mars due to its low atmospheric pressure (less than 1% of Earth\'s), boiling away almost instantly.',
      'Mars has two tiny asteroid-like moons, Phobos and Deimos, which are slowly spiraling toward and away from the planet respectively.'
    ],
    visuals: {
      baseColor: '#ef4444',
      secondaryColor: '#f97316',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'gas-giant',
    name: 'Jupiter',
    category: 'Gas Giants & Ice Giants',
    distanceLy: 0.000082, // ~5.2 AU
    distanceString: '5.2 AU (0.000082 LY)',
    description: 'The largest planet in our solar system, Jupiter is a massive gas giant composed primarily of hydrogen and helium gas. It lacks a well-defined solid surface and features high-speed atmospheric storm bands, a powerful magnetosphere, and the iconic Great Red Spot—a massive anticyclonic storm wider than Earth.',
    specs: {
      mass: '1.898 × 10²⁷ kg (318 Earths)',
      radius: '69,911 km',
      temperature: '165 K (at 1 bar pressure)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Gas Giant Planet',
      surfaceGravity: '24.79 m/s² (2.528g)',
      escapeVelocity: '59,500 m/s',
      luminosity: 'Albedo 0.52 / Heat emission is 1.6x received solar energy',
      composition: 'Molecular Hydrogen (90%), Helium (10%), Metallic Liquid Hydrogen layers, Dense rocky core',
      discoveryYear: 'Prehistoric (Known since antiquity)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Jupiter is so massive that its barycenter with the Sun actually lies outside the Sun\'s surface, at about 1.07 solar radii.',
      'The Great Red Spot is a giant hurricane-like storm that has raged for at least 350 years, though it has been shrinking in recent decades.',
      'Jupiter acts as a gravitational shield for the inner Solar System, vacuuming up or ejecting comets and asteroids that could impact Earth.'
    ],
    visuals: {
      baseColor: '#fbbf24',
      secondaryColor: '#b45309',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'saturn',
    name: 'Saturn',
    category: 'Gas Giants & Ice Giants',
    distanceLy: 0.000151,
    distanceString: '9.58 AU (1.51 × 10⁻⁴ LY)',
    description: 'The second-largest planet in the Solar System and a gas giant celebrated for its magnificent planetary ring system. Saturn is composed mostly of hydrogen and helium, has an average density lower than water, and is surrounded by over 140 moons, including giant, atmosphere-cloaked Titan.',
    specs: {
      mass: '5.683 × 10²⁶ kg (95 Earths)',
      radius: '58,232 km',
      temperature: '134 K',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Gas Giant Planet',
      surfaceGravity: '10.44 m/s² (1.065g)',
      escapeVelocity: '35,500 m/s',
      luminosity: 'Albedo 0.47',
      composition: '96% Hydrogen, 3% Helium, icy/rocky ring particles',
      discoveryYear: 'Prehistoric (Observed since antiquity)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Saturn\'s density is so low that if you could find a bathtub large enough, the entire planet would float on water.',
      'The magnificent rings are not solid, but are made of billions of individual particles of water ice and rock ranging from dust size to house-sized boulders.',
      'Saturn\'s north pole features a bizarre, persistent hexagonal jet stream storm wider than two Earths.'
    ],
    visuals: {
      baseColor: '#fef08a',
      secondaryColor: '#ca8a04',
      visualShape: 'ringed-sphere'
    },
    scaleZone: 1
  },
  {
    id: 'uranus',
    name: 'Uranus',
    category: 'Gas Giants & Ice Giants',
    distanceLy: 0.000302,
    distanceString: '19.22 AU (3.02 × 10⁻⁴ LY)',
    description: 'An ice giant planet with a pale cyan-blue hue resulting from atmospheric methane gas. Uranus is unique for its extreme axial tilt of 98 degrees, causing it to literally roll on its side as it orbits the Sun, likely due to an ancient planet-sized collision.',
    specs: {
      mass: '8.681 × 10²⁵ kg (14.5 Earths)',
      radius: '25,362 km',
      temperature: '76 K (coldest planetary atmosphere)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Ice Giant Planet',
      surfaceGravity: '8.69 m/s² (0.886g)',
      escapeVelocity: '21,300 m/s',
      luminosity: 'Albedo 0.51',
      composition: 'Ammonia/water icy mantle, hydrogen/helium atmosphere, rocky core',
      discoveryYear: '1781 (William Herschel)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Due to its extreme tilt, Uranus experiences 21-year-long seasons where one pole is bathed in continuous sunlight while the other is in total darkness.',
      'Deep inside Uranus, extreme pressure may compress carbon atoms into a literal rain of diamonds falling toward its core.',
      'Uranus has 13 faint, vertical ring bands and orbits the Sun once every 84 Earth years.'
    ],
    visuals: {
      baseColor: '#a5f3fc',
      secondaryColor: '#0891b2',
      visualShape: 'ringed-sphere'
    },
    scaleZone: 1
  },
  {
    id: 'neptune',
    name: 'Neptune',
    category: 'Gas Giants & Ice Giants',
    distanceLy: 0.000475,
    distanceString: '30.05 AU (4.75 × 10⁻⁴ LY)',
    description: 'The most distant planet from the Sun, Neptune is a deep-blue ice giant whipped by the fastest winds in the Solar System, reaching speeds up to 2,100 km/h. It orbits in the cold outer system, accompanied by its retrograding geyser-active moon Triton.',
    specs: {
      mass: '1.024 × 10²⁶ kg (17 Earths)',
      radius: '24,622 km',
      temperature: '72 K',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Ice Giant Planet',
      surfaceGravity: '11.15 m/s² (1.14g)',
      escapeVelocity: '23,500 m/s',
      luminosity: 'Albedo 0.41',
      composition: 'Hydrogen, helium, methane atmosphere, water/ammonia slush mantle, silicates core',
      discoveryYear: '1846 (Johann Galle, based on mathematical predictions by Urbain Le Verrier)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Neptune was the first planet discovered by mathematical calculation rather than direct telescope observation, after irregularities in Uranus\'s orbit were noticed.',
      'Neptune\'s moon Triton is the only large moon in the Solar System that orbits in the opposite direction of its planet\'s rotation (retrograde orbit).',
      'Its supersonic winds are five times stronger than the strongest winds recorded on Earth, despite Neptune receiving only 1/900th of Earth\'s sunlight.'
    ],
    visuals: {
      baseColor: '#2563eb',
      secondaryColor: '#1d4ed8',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'rogue-planet',
    name: 'PSO J318.5-22',
    category: 'Rogue Planets',
    distanceLy: 80.2,
    distanceString: '80.2 light years',
    description: 'An orphaned giant world drifting through interstellar space without orbiting a parent star. Ejected from its birth system due to gravitational interactions, PSO J318.5-22 is extremely young and glows in the infrared from residual heat of its formation, with an atmosphere full of hot clouds of liquid iron and silicates.',
    specs: {
      mass: '6.5 Jupiter masses',
      radius: '82,000 km',
      temperature: '1,160 K',
      age: '12 million years'
    },
    advancedSpecs: {
      classification: 'L7-type Free-Floating Planetary Mass Object',
      surfaceGravity: '~140 m/s²',
      escapeVelocity: '122,000 m/s',
      luminosity: 'Pure Infrared emission (~10⁻⁵ Solar Luminosity)',
      composition: 'Hydrogen, Helium, Gaseous Iron, Silicate cloud layers',
      discoveryYear: '2013 (Pan-STARRS 1 survey)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'PSO J318.5-22 is one of the lowest-mass free-floating objects discovered, exhibiting properties identical to young gas giant exoplanets.',
      'Because it has no blinding host star next to it, astronomers can directly study its atmosphere using spectroscopy with incredible precision.',
      'Calculations suggest there may be more rogue planets wandering the Milky Way than there are stars in the galaxy.'
    ],
    visuals: {
      baseColor: '#312e81',
      secondaryColor: '#e11d48',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'brown-dwarf',
    name: 'Luhman 16A',
    category: 'Brown Dwarfs ("Failed Stars")',
    distanceLy: 6.51,
    distanceString: '6.51 light years',
    description: 'A brown dwarf that is part of the Luhman 16 binary system, the closest substellar objects to Earth. Luhman 16A is an L-type substellar body that is too massive to be classified as a planet, but lacks the necessary core mass to initiate sustained hydrogen-1 nuclear fusion, classifying it as a "failed star."',
    specs: {
      mass: '34 Jupiter masses',
      radius: '71,000 km',
      temperature: '1,350 K',
      age: '800 million years'
    },
    advancedSpecs: {
      classification: 'L7.5 Substellar Brown Dwarf',
      surfaceGravity: '10,000 m/s² (~1,000g)',
      escapeVelocity: '340,000 m/s',
      luminosity: '3.5 × 10⁻⁵ L☉ (Solar Luminosity)',
      composition: 'Hydrogen, Helium, Deuterium fusion byproduct, Iron & silicate cloud decks',
      discoveryYear: '2013 (Kevin Luhman)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Luhman 16 is the third closest star/substellar system to Earth, behind only the Alpha Centauri system and Barnard\'s Star.',
      'Astronomers have mapped the atmospheric weather on Luhman 16B, revealing patchy global storm clouds consisting of molten rock and silicate rain.',
      'Luhman 16A generates most of its thermal energy through gravitational contraction rather than nuclear fusion.'
    ],
    visuals: {
      baseColor: '#7c2d12',
      secondaryColor: '#f97316',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'main-sequence-star',
    name: 'The Sun (Sol)',
    category: 'Main-Sequence Stars (Red Dwarfs, Yellow Dwarfs)',
    distanceLy: 1.58e-5, // ~1 AU
    distanceString: '149.6 million km (1.58 × 10⁻⁵ LY)',
    description: 'A G-type main-sequence star (yellow dwarf) sitting at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core, fusing 600 million tons of hydrogen into helium every second. It provides the light and heat that drives Earth\'s biosphere and climate.',
    specs: {
      mass: '1.989 × 10³⁰ kg',
      radius: '696,340 km',
      temperature: '5,778 K (surface)',
      age: '4.6 billion years'
    },
    advancedSpecs: {
      classification: 'G2V Main-Sequence Yellow Dwarf Star',
      surfaceGravity: '274.0 m/s² (27.9g)',
      escapeVelocity: '617,700 m/s',
      luminosity: '1.0 L☉ (3.828 × 10²⁶ W)',
      composition: 'Hydrogen (73.4%), Helium (24.8%), Oxygen, Carbon, Neon, Iron',
      discoveryYear: 'Ancient (Central life source)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Sun contains 99.86% of the total mass of the entire Solar System, with Jupiter making up most of the remainder.',
      'Light from the core of the Sun takes between 10,000 to 170,000 years to reach the surface due to dense plasma scattering, but only 8.3 minutes to travel to Earth.',
      'The Sun is currently in the middle of its main-sequence life, with enough fuel to fuse hydrogen for another 5 billion years.'
    ],
    visuals: {
      baseColor: '#eab308',
      secondaryColor: '#ef4444',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'giant-star',
    name: 'Betelgeuse (Alpha Orionis)',
    category: 'Giant & Supergiant Stars (Blue Giants, Red Supergiants)',
    distanceLy: 642.5,
    distanceString: '642.5 light years',
    description: 'A massive red supergiant star located in the constellation of Orion. Betelgeuse is one of the largest stars visible to the naked eye. If placed at the center of our Solar System, its surface would extend past the orbit of Mars and possibly Jupiter, swelling and pulsating as it burns helium and heavier elements.',
    specs: {
      mass: '16.5 Solar masses',
      radius: '617,000,000 km (887 Solar radii)',
      temperature: '3,500 K',
      age: '8.5 million years'
    },
    advancedSpecs: {
      classification: 'M1-2 Ia-ab Red Supergiant Star',
      surfaceGravity: '0.0005 m/s² (Tiny due to massive inflation)',
      escapeVelocity: '95,000 m/s',
      luminosity: '120,000 L☉ (Bolometric)',
      composition: 'Helium burning core, Outer Hydrogen envelope, Nitrogen, Carbon enrichment',
      discoveryYear: 'Ancient (Observed by Ptolemy, detailed in 1836 by John Herschel)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'In late 2019, Betelgeuse underwent a dramatic dimming event called "The Great Dimming," caused by the ejection of a giant dust cloud that temporarily blocked its light.',
      'Despite being hundreds of times larger than our Sun, Betelgeuse is much younger (less than 10 million years old) because massive stars burn their fuel at an astronomical rate.',
      'Betelgeuse is destined to end its life in a spectacular core-collapse supernova within the next 100,000 years, which will be visible even during daytime on Earth.'
    ],
    visuals: {
      baseColor: '#f97316',
      secondaryColor: '#ef4444',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'stellar-remnant',
    name: 'Sirius B',
    category: 'Stellar Remnants (White Dwarfs)',
    distanceLy: 8.6,
    distanceString: '8.6 light years',
    description: 'The white dwarf companion orbiting the bright star Sirius A. Sirius B is the dead, highly compressed stellar core left behind after a low-to-medium mass star exhausted its thermonuclear fuel. Composed of carbon-oxygen electron-degenerate matter, it is incredibly dense—packing the mass of the Sun into a volume no larger than Earth.',
    specs: {
      mass: '1.02 Solar masses',
      radius: '5,800 km',
      temperature: '25,200 K',
      age: '228 million years (since collapse)'
    },
    advancedSpecs: {
      classification: 'DA2-type Degenerate Stellar Core (White Dwarf)',
      surfaceGravity: '4,500,000 m/s² (~450,000g)',
      escapeVelocity: '5,200,000 m/s',
      luminosity: '0.0024 L☉ (Thermal emission only)',
      composition: 'Carbon and Oxygen electron-degenerate plasma, thin Hydrogen outer layer',
      discoveryYear: '1862 (Alvan Graham Clark)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Sirius B is so dense that a single teaspoon of its material would weigh more than 5 tons on Earth.',
      'It was the first white dwarf star discovered, first observed visually in 1862 by Alvan Graham Clark using a state-of-the-art telescope.',
      'Because it has no active nuclear fusion, Sirius B will slowly cool over trillions of years, eventually fading into a cold, dark lump of carbon known as a black dwarf.'
    ],
    visuals: {
      baseColor: '#e2e8f0',
      secondaryColor: '#38bdf8',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'neutron-star',
    name: 'Crab Pulsar (PSR B0531+21)',
    category: 'Neutron Stars & Pulsars',
    distanceLy: 6500,
    distanceString: '6,500 light years',
    description: 'An ultra-dense, rapidly spinning neutron star sitting at the center of the Crab Nebula. Formed during the SN 1054 supernova explosion witnessed by astronomers in 1054 AD, the Crab Pulsar rotates 30 times per second, blasting beams of highly focused electromagnetic radiation into space like a cosmic lighthouse.',
    specs: {
      mass: '1.4 Solar masses',
      radius: '10 km',
      temperature: '1,600,000 K',
      age: '972 years'
    },
    advancedSpecs: {
      classification: 'Young Rotation-Powered Radio & X-ray Pulsar',
      surfaceGravity: '2.0 × 10¹² m/s² (Highly degenerate)',
      escapeVelocity: '150,000,000 m/s (50% speed of light)',
      luminosity: '75,000 L☉ (Rotational power expenditure)',
      composition: 'Superfluid Neutrons, Superconducting Protons/Electrons, Iron-crystal crust',
      discoveryYear: '1968 (David H. Staelin and Edward C. Reifenstein)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Crab Pulsar contains more mass than our Sun, yet is compressed into a sphere with a diameter equivalent to a small city.',
      'It has a magnetic field strength estimated to be 10¹² gauss—over a trillion times stronger than Earth\'s magnetic field.',
      'The rotation of the Crab Pulsar is slowing down by approximately 38 nanoseconds per day due to the massive amount of energy it radiates away.'
    ],
    visuals: {
      baseColor: '#38bdf8',
      secondaryColor: '#c084fc',
      visualShape: 'pulsar'
    },
    scaleZone: 2
  },
  {
    id: 'stellar-black-hole',
    name: 'Cygnus X-1',
    category: 'Black Holes (Stellar-Mass)',
    distanceLy: 6070,
    distanceString: '6,070 light years',
    description: 'A stellar-mass black hole formed by the gravitational collapse of a massive star. Cygnus X-1 is part of a high-mass X-ray binary system, actively stripping gas from its blue supergiant companion star. This gas forms a superheated accretion disk spinning at relativistic speeds, radiating intense X-rays before crossing the event horizon.',
    specs: {
      mass: '21.2 Solar masses',
      radius: '62 km (Event Horizon)',
      temperature: 'Millions of K (Accretion disk)',
      age: '5 million years'
    },
    advancedSpecs: {
      classification: 'Kerr (Spinning) Stellar-Mass Black Hole Binary',
      surfaceGravity: 'Infinite at Singularity / Extremely high at horizon',
      escapeVelocity: '299,792,458 m/s (Speed of Light)',
      luminosity: 'Accretion Luminosity ~40,000 L☉ (X-ray)',
      composition: 'Spacetime Singularity, Accretion disk of ionized Hydrogen-Helium plasma',
      discoveryYear: '1964 (Discovered in X-ray surveys)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Cygnus X-1 was the subject of a famous friendly bet in 1974 between physicists Stephen Hawking and Kip Thorne, with Hawking betting it was not a black hole. Hawking conceded in 1990 after overwhelming observational evidence.',
      'Its event horizon is so tiny (62 km across) that it could fit inside a metropolitan city, yet it weighs 7 million times more than Earth.',
      'Gas in the inner accretion disk of Cygnus X-1 spins at over 800 times the speed of sound, heated to temperatures exceeding 10 million Kelvin.'
    ],
    visuals: {
      baseColor: '#09090b',
      secondaryColor: '#ec4899',
      visualShape: 'black-hole'
    },
    scaleZone: 3
  },
  {
    id: 'star-system',
    name: 'Alpha Centauri System',
    category: 'Star Systems (Binary, Ternary, Solar Systems)',
    distanceLy: 4.37,
    distanceString: '4.37 light years',
    description: 'The closest star system to our Solar System. It is a triple-star (ternary) system consisting of the tight binary pair Alpha Centauri A and B (Sun-like stars) orbiting a common barycenter, and a distant, dim red dwarf companion called Proxima Centauri, which is currently the closest individual star to Earth.',
    specs: {
      mass: '2.1 Solar masses (combined)',
      radius: 'Varies (A: 1.2, B: 0.86, Proxima: 0.15 Solar radii)',
      temperature: 'A: 5,790 K, B: 5,260 K, Proxima: 3,000 K',
      age: '4.85 billion years'
    },
    advancedSpecs: {
      classification: 'Ternary Stellar System (G2V + K1V + M6Ve)',
      surfaceGravity: 'A: 244 m/s², B: 310 m/s², Proxima: 385 m/s²',
      escapeVelocity: 'A: 618 km/s, B: 630 km/s',
      luminosity: 'Combined: ~2.0 L☉ (A: 1.519 L☉, B: 0.50 L☉, Proxima: 0.0017 L☉)',
      composition: 'Hydrogen, Helium, heavy elements (metallicity is 1.7x Sol)',
      discoveryYear: 'Prehistoric (Visible to southern cultures, Proxima discovered in 1915 by Robert Innes)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Alpha Centauri A is extremely similar to our Sun in mass, age, and temperature, making it a "solar twin."',
      'Proxima Centauri is orbited by at least two exoplanets, including Proxima Centauri b, an Earth-sized planet orbiting in the habitable zone where liquid water could exist.',
      'At 4.37 light years, standard chemical rockets would take over 75,000 years to reach the system, but laser-sail concepts (like Breakthrough Starshot) could do it in 20 years.'
    ],
    visuals: {
      baseColor: '#fef08a',
      secondaryColor: '#f87171',
      visualShape: 'star-system'
    },
    scaleZone: 2
  },
  {
    id: 'star-cluster',
    name: 'The Pleiades (Messier 45)',
    category: 'Star Clusters (Open and Globular Clusters)',
    distanceLy: 444,
    distanceString: '444 light years',
    description: 'An open star cluster containing middle-aged, hot B-type stars located in the constellation Taurus. Born from the same giant molecular cloud of gas and dust, these stars are bound together by mutual gravity. The cluster is dominated by glowing blue reflection nebulae formed by cosmic dust scattering the light of the young stars.',
    specs: {
      mass: '800 Solar masses',
      radius: '8 light years (core)',
      temperature: 'Up to 30,000 K',
      age: '100 million years'
    },
    advancedSpecs: {
      classification: 'Type I,3,r Open Galactic Cluster',
      surfaceGravity: 'Localized stellar gravity averages ~350 m/s²',
      escapeVelocity: 'Estimated 0.5 - 1.0 km/s for cluster core escape',
      luminosity: 'Combined Luminosity ~50,000 L☉',
      composition: 'Over 1,000 blue B-type stars, reflection silicate dust, interstellar gas',
      discoveryYear: 'Prehistoric (Mentioned in Odyssey, Biblical texts, Chinese annals)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Pleiades is also known as the "Seven Sisters," and is one of the nearest and most easily visible star clusters to the naked eye.',
      'In Japan, the Pleiades is known as "Subaru," and its cluster layout is depicted on the logo of the famous automobile manufacturer.',
      'The stars in the Pleiades will continue to drift apart over the next 250 million years as gravitational encounters with interstellar clouds disrupt the cluster.'
    ],
    visuals: {
      baseColor: '#60a5fa',
      secondaryColor: '#38bdf8',
      visualShape: 'star-cluster'
    },
    scaleZone: 3
  },
  {
    id: 'nebula',
    name: 'Orion Nebula (Messier 42)',
    category: 'Nebulae (Emission, Reflection, Dark)',
    distanceLy: 1344,
    distanceString: '1,344 light years',
    description: 'A colossal diffuse emission and reflection nebula situated in the Milky Way, just south of Orion\'s Belt. It is one of the most active star-forming regions (stellar nurseries) in nearby space, consisting of ionized hydrogen gas, cosmic dust, and the newborn "Trapezium" star cluster whose intense UV radiation lights up the cloud.',
    specs: {
      mass: '2,000 Solar masses',
      radius: '12 light years',
      temperature: '10,000 K (ionized gas)',
      age: '3 million years'
    },
    advancedSpecs: {
      classification: 'H II Diffuse Star-Forming Emission Nebula',
      surfaceGravity: 'Extremely diffuse, varying gas pressure forces',
      escapeVelocity: 'N/A (Non-cohesive cloud structure)',
      luminosity: 'Reflective gas scattering and ionized light emission',
      composition: 'Ionized Hydrogen (H II), Helium, Carbon monoxide, polycyclic aromatic hydrocarbons (PAHs)',
      discoveryYear: '1610 (Nicholas-Claude Fabri de Peiresc)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Orion Nebula is visible to the naked eye even in moderately light-polluted skies, appearing as a slightly blurry star in the sword of Orion.',
      'Hubble observations of the Orion Nebula revealed over 150 protoplanetary disks (proplyds)—infant planetary systems forming around young stars.',
      'The nebula contains high concentrations of water, carbon monoxide, and complex organic molecules like methanol and formaldehyde.'
    ],
    visuals: {
      baseColor: '#ec4899',
      secondaryColor: '#8b5cf6',
      visualShape: 'nebula-cloud'
    },
    scaleZone: 3
  },
  {
    id: 'dwarf-galaxy',
    name: 'Large Magellanic Cloud (LMC)',
    category: 'Dwarf Galaxies',
    distanceLy: 163000,
    distanceString: '163,000 light years',
    description: 'A satellite dwarf galaxy orbiting the Milky Way. It is the fourth-largest galaxy in the Local Group and is classified as a Magellanic spiral. It is packed with intense star-forming regions, including the gargantuan Tarantula Nebula—the most active stellar nursery in the entire Local Group.',
    specs: {
      mass: '1.0 × 10¹⁰ Solar masses',
      radius: '7,000 light years',
      temperature: 'Varies',
      age: '13 billion years'
    },
    advancedSpecs: {
      classification: 'SBm Barred Magellanic Dwarf Spiral Galaxy',
      surfaceGravity: 'Galactic potential well, average orbital rotation ~120 km/s',
      escapeVelocity: 'Estimated 250 km/s to escape galactic halo',
      luminosity: '1.5 × 10⁹ L☉',
      composition: 'Gaseous Interstellar Medium (9%), Population II Older Stars, Young stellar superclusters',
      discoveryYear: 'Ancient (Known in Southern Hemisphere, documented by Ferdinand Magellan\'s expedition 1519)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The LMC was home to SN 1987A, the closest supernova explosion witnessed by modern astronomers since the invention of the telescope.',
      'It is gravitationally bound to the Small Magellanic Cloud, and both galaxies are being slowly pulled in and devoured by the much larger Milky Way.',
      'Due to its high star formation rate, the LMC contains a disproportionately high density of supernova remnants and planetary nebulae.'
    ],
    visuals: {
      baseColor: '#f472b6',
      secondaryColor: '#a78bfa',
      visualShape: 'galaxy-elliptical'
    },
    scaleZone: 3
  },
  {
    id: 'galaxy',
    name: 'Andromeda Galaxy (Messier 31)',
    category: 'Galaxies (Spiral, Elliptical, Irregular)',
    distanceLy: 2537000,
    distanceString: '2.54 million light years',
    description: 'A majestic, massive barred spiral galaxy and the largest galaxy in the Local Group. Consisting of approximately one trillion stars, Andromeda is surrounded by a halo of dark matter, satellite galaxies, and globular clusters. It is currently on a collision course with our Milky Way galaxy, approaching at 110 km/s.',
    specs: {
      mass: '1.2 × 10¹² Solar masses',
      radius: '110,000 light years',
      temperature: 'Varies',
      age: '10 billion years'
    },
    advancedSpecs: {
      classification: 'SA(s)ab Giant Barred Spiral Galaxy',
      surfaceGravity: 'Galactic core orbital speeds ~225 km/s',
      escapeVelocity: 'Estimated 600 - 800 km/s to escape galactic cluster potential',
      luminosity: '2.6 × 10¹⁰ L☉',
      composition: 'One Trillion stars, massive Hydrogen disk, central supermassive black hole (M31*)',
      discoveryYear: 'Ancient (First recorded in 964 AD by Persian astronomer Al-Sufi)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Andromeda is the most distant object visible to the naked eye from Earth on dark, clear nights, appearing as a faint, smudge-like cloud.',
      'In 4.5 billion years, the Milky Way and Andromeda will collide and merge, forming a giant elliptical galaxy nicknamed "Milkomeda."',
      'Andromeda contains a supermassive black hole at its core that is 140 million times the mass of our Sun, surrounded by a double star cluster.'
    ],
    visuals: {
      baseColor: '#818cf8',
      secondaryColor: '#38bdf8',
      visualShape: 'galaxy-spiral'
    },
    scaleZone: 3
  },
  {
    id: 'quasar',
    name: '3C 273 (Active Quasar)',
    category: 'Supermassive Black Holes & Quasars',
    distanceLy: 2440000000,
    distanceString: '2.44 billion light years',
    description: 'The first quasar (quasi-stellar radio source) ever identified, sitting at the heart of an active elliptical galaxy. Driven by a gargantuan supermassive black hole feeding on interstellar gas, it releases blinding amounts of energy across the spectrum. It blasts out a giant, relativistic plasma jet spanning over 200,000 light years.',
    specs: {
      mass: '886,000,000 Solar masses',
      radius: '2.6 billion km (Schwarzschild)',
      temperature: 'Trillions of K (plasma jet)',
      age: '12 billion years'
    },
    advancedSpecs: {
      classification: 'Active Galactic Nucleus / Radio-Loud Quasar',
      surfaceGravity: 'Extremely high at event horizon boundary (~1,000g equivalent)',
      escapeVelocity: '299,792,458 m/s (Speed of Light)',
      luminosity: '4.0 × 10¹² L☉ (Blindingly bright across all wavelengths)',
      composition: 'Supermassive Black Hole core, dense orbiting gas accretion disks, relativistic polar jet',
      discoveryYear: '1959 (Identified in Third Cambridge Radio Catalogue, recognized as redshifted quasar 1963 by Maarten Schmidt)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      '3C 273 is the optically brightest quasar in our sky, so luminous that if it were placed 33 light years away (the distance of Vega), it would shine as brightly as the Sun.',
      'The relativistic jet of plasma erupted by the central black hole travels at approximately 90% the speed of light.',
      'Quasars are extremely valuable for astronomy as cosmological markers because their light has traveled billions of years, allowing us to study the early Universe.'
    ],
    visuals: {
      baseColor: '#fb7185',
      secondaryColor: '#f43f5e',
      visualShape: 'pulsar'
    },
    scaleZone: 4
  },
  {
    id: 'galaxy-cluster',
    name: 'Virgo Cluster',
    category: 'Galaxy Groups & Clusters',
    distanceLy: 53800000,
    distanceString: '53.8 million light years',
    description: 'A massive gravitationally bound network containing approximately 1,300 to 2,000 individual galaxies. It forms the core of the larger Virgo Supercluster (of which our Local Group is an outlying member), dominated by three gigantic elliptical galaxies, including the famous supergiant Messier 87.',
    specs: {
      mass: '1.2 × 10¹⁵ Solar masses',
      radius: '7.2 million light years',
      temperature: '30,000,000 K (intracluster gas)',
      age: '12 billion years'
    },
    advancedSpecs: {
      classification: 'Rich Irregular Galaxy Cluster (Bautz-Morgan Type III)',
      surfaceGravity: 'Cluster-wide dynamic potential well',
      escapeVelocity: 'Estimated ~1,500 km/s to escape cluster core potential',
      luminosity: 'Total Cluster Luminosity ~1.0 × 10¹² L☉',
      composition: '2,000+ galaxies (M87, M84, M86, etc.), hot X-ray emitting intercluster gas, dark matter halo (80%)',
      discoveryYear: '1781 (Discovered by Charles Messier, cataloging its giant member galaxies)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Virgo Cluster is so massive that its gravitational pull is actively slowing down the expansion of nearby galaxies in a phenomenon called "Virgo Infall."',
      'The space between galaxies in the cluster is filled with superheated, X-ray emitting plasma gas heated by gravitational compression.',
      'Messier 87, located at the core of the Virgo Cluster, houses the supermassive black hole whose shadow was first imaged by the Event Horizon Telescope.'
    ],
    visuals: {
      baseColor: '#a78bfa',
      secondaryColor: '#ec4899',
      visualShape: 'star-cluster'
    },
    scaleZone: 4
  },
  {
    id: 'supercluster',
    name: 'Laniakea Supercluster',
    category: 'Galaxy Superclusters',
    distanceLy: 250000000,
    distanceString: '250 million light years',
    description: 'The gargantuan galaxy supercluster that is home to the Milky Way and approximately 100,000 other nearby galaxies. Laniakea, which means "immeasurable heaven" in Hawaiian, is defined by the flow lines of galaxies inward toward a massive gravitational anomaly known as the Great Attractor.',
    specs: {
      mass: '1.0 × 10¹⁷ Solar masses',
      radius: '260 million light years',
      temperature: 'Varies',
      age: '13 billion years'
    },
    advancedSpecs: {
      classification: 'Local Universe Basin of Attraction (Supercluster)',
      surfaceGravity: 'N/A (Boundaries defined by velocity-flow lines)',
      escapeVelocity: 'Infinite (Unbound by cosmic expansion / dark energy)',
      luminosity: 'Combined stellar luminosity ~1.0 × 10¹⁴ L☉',
      composition: '100,000+ galaxies, Virgo Cluster, Centaurus Cluster, Norma Cluster, Great Attractor',
      discoveryYear: '2014 (Brent Tully, Hélène Courtois, Yehuda Hoffman, Daniel Pomarède)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Laniakea is not gravitationally bound and will eventually be torn apart by dark energy, making it a "watershed" of cosmic structures.',
      'Our Milky Way is located on the extreme outskirts of Laniakea, in a minor galactic stream called the Local Sheet.',
      'The boundaries of Laniakea were mapped in 2014 by analyzing the peculiar velocities of galaxies, subtraction the expansion of the Universe.'
    ],
    visuals: {
      baseColor: '#f472b6',
      secondaryColor: '#fb7185',
      visualShape: 'nebula-cloud'
    },
    scaleZone: 4
  },
  {
    id: 'filament',
    name: 'Sloan Great Wall',
    category: 'Galaxy Filaments (The Cosmic Web)',
    distanceLy: 1000000000,
    distanceString: '1.0 billion light years',
    description: 'A colossal cosmic filament—a thread-like wall of galaxies, dark matter, and gas that forms the large-scale structural scaffolding of the cosmos. As one of the largest known structures in the Universe, the Sloan Great Wall is packed with galaxy superclusters and defines the boundaries of vast cosmic voids.',
    specs: {
      mass: '1.2 × 10¹⁸ Solar masses',
      radius: '1.37 billion light years (length)',
      temperature: 'Warm-Hot Intergalactic Medium',
      age: '13.5 billion years'
    },
    advancedSpecs: {
      classification: 'Colossal Cosmic Filamentary Wall',
      surfaceGravity: 'Extremely weak global potential (governed by dark matter filaments)',
      escapeVelocity: 'N/A (Torn apart by cosmic expansion)',
      luminosity: 'Combined emission of thousands of stellar systems',
      composition: 'Superclusters (SCl 126, SCl 111, etc.), filaments, hot intergalactic baryonic plasma, dark matter filaments',
      discoveryYear: '2003 (J. Richard Gott III, Mario Jurić, et al.)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Sloan Great Wall is so massive that it challenges standard cosmological models, as there has barely been enough time since the Big Bang for such a structure to form.',
      'It was discovered in 2003 using data from the Sloan Digital Sky Survey (SDSS), which mapped millions of galaxies in 3D.',
      'Filaments like the Sloan Great Wall contain most of the baryonic (normal) matter in the Universe, locked in a web of diffuse intergalactic gas.'
    ],
    visuals: {
      baseColor: '#34d399',
      secondaryColor: '#10b981',
      visualShape: 'filament'
    },
    scaleZone: 5
  },
  {
    id: 'cosmic-void',
    name: 'Boötes Void',
    category: 'Cosmic Voids',
    distanceLy: 700000000,
    distanceString: '700 million light years',
    description: 'An unimaginably vast, spherical expanse of space sitting between galaxy filaments that contains almost no visible matter. Known as the "Great Void," the Boötes Void is approximately 330 million light-years in diameter, representing an extreme thermal fluctuation in the early Universe where matter density is exceptionally low.',
    specs: {
      mass: 'Exceptionally Low Density',
      radius: '165 million light years',
      temperature: '2.73 K (CMB background)',
      age: '13.7 billion years'
    },
    advancedSpecs: {
      classification: 'Supervoid (Low density cosmic bubble)',
      surfaceGravity: 'Negative gravitational potential (repels material due to void expanding)',
      escapeVelocity: 'N/A',
      luminosity: 'Almost zero (Only sparse galaxies)',
      composition: 'Cosmic Microwave Background radiation, extremely sparse hydrogen gas, ~60 sparse galaxies',
      discoveryYear: '1981 (Robert Kirshner, Augustus Oemler, Paul Schechter, Stephen Shectman)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'If the Milky Way had been placed at the center of the Boötes Void, we would not have discovered other galaxies until the 1960s because the sky would be completely black.',
      'Despite its size, only around 60 galaxies have ever been discovered inside the entire Boötes Void, whereas a typical region of that volume should have 10,000.',
      'One theory suggests that the Boötes Void was formed by the merging of smaller voids, similar to how soap bubbles coalesce.'
    ],
    visuals: {
      baseColor: '#09090b',
      secondaryColor: '#18181b',
      visualShape: 'void'
    },
    scaleZone: 5
  },
  {
    id: 'moon-luna',
    name: 'The Moon (Luna)',
    category: 'Major Moons (Solar System)',
    distanceLy: 4.06e-8,
    distanceString: '384,400 km (4.06 × 10⁻⁸ LY)',
    description: 'Earth’s only natural satellite, formed 4.5 billion years ago from a giant collision between infant Earth and a Mars-sized body named Theia. It is tidally locked to Earth, showing us only one face, and stabilizes Earth\'s axial wobble to sustain a steady biosphere.',
    specs: {
      mass: '7.342 × 10²² kg',
      radius: '1,737 km',
      temperature: '120 K to 390 K',
      age: '4.51 billion years'
    },
    advancedSpecs: {
      classification: 'Rocky Planetary Natural Satellite',
      surfaceGravity: '1.62 m/s² (0.166g)',
      escapeVelocity: '2,380 m/s',
      luminosity: 'Reflective albedo 0.12',
      composition: 'Silicate crust, basaltic maria plains, small iron core',
      discoveryYear: 'Prehistoric (Recorded by ancient cultures)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Moon is drifting away from Earth at a rate of approximately 3.8 centimeters per year due to tidal friction.',
      'There is locked water-ice in permanently shadowed craters at the lunar poles, which could sustain future human outposts.',
      'The dark plains on the Moon, called "maria" (Latin for seas), are ancient solidified basaltic lava flows.'
    ],
    visuals: {
      baseColor: '#cbd5e1',
      secondaryColor: '#94a3b8',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'moon-phobos',
    name: 'Phobos',
    category: 'Major Moons (Solar System)',
    distanceLy: 2.41e-5,
    distanceString: '9,377 km from Mars (2.41 × 10⁻⁵ LY from Earth)',
    description: 'The larger and closer of the two Martian moons, Phobos is a lumpy, dark asteroid-like body heavily scarred by craters. It orbits Mars extremely close—closer to its primary than any other moon in the solar system—speeding around the planet three times a day.',
    specs: {
      mass: '1.066 × 10¹⁶ kg',
      radius: '11.3 km (mean)',
      temperature: '112 K to 268 K',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Carbonaceous D-type Captured Asteroid Moon',
      surfaceGravity: '0.0057 m/s² (Extremely weak)',
      escapeVelocity: '11.3 m/s',
      luminosity: 'Albedo 0.071',
      composition: 'Chondritic material, water-ice, dust regolith',
      discoveryYear: '1877 (Asaph Hall)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Phobos is spiraling inward toward Mars at a rate of 1.8 meters per century, destined to crash into the planet or tear apart into a ring in 30-50 million years.',
      'Stickney Crater is the most dominant feature on Phobos, so large that the impact nearly shattered the entire moon.',
      'An astronaut on Phobos would weigh less than a thousandth of their weight on Earth, making it easy to jump into escape velocity.'
    ],
    visuals: {
      baseColor: '#78716c',
      secondaryColor: '#44403c',
      visualShape: 'dust-grain'
    },
    scaleZone: 1
  },
  {
    id: 'moon-deimos',
    name: 'Deimos',
    category: 'Major Moons (Solar System)',
    distanceLy: 2.42e-5,
    distanceString: '23,460 km from Mars (2.42 × 10⁻⁵ LY from Earth)',
    description: 'The smaller and more distant of Mars\' two asteroid-like moons. Its surface features a highly smooth, dusty appearance because its low gravity has allowed a thick, 100-meter blanket of loose impact regolith to accumulate and fill in ancient craters.',
    specs: {
      mass: '1.476 × 10¹⁵ kg',
      radius: '6.2 km (mean)',
      temperature: '233 K',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Carbonaceous D-type Captured Asteroid Moon',
      surfaceGravity: '0.003 m/s²',
      escapeVelocity: '5.6 m/s',
      luminosity: 'Albedo 0.068',
      composition: 'Carbonaceous-rich rock, water-ice mix',
      discoveryYear: '1877 (Asaph Hall)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Unlike Phobos, Deimos is orbiting far enough from Mars that it is slowly escaping the planet\'s gravity, eventually drifting into heliocentric orbit.',
      'From Deimos, Mars would appear 450 times larger and 1,000 times brighter than the full Moon appears from Earth.',
      'Because of its small size, Deimos has a highly irregular shape, resembling a space potato.'
    ],
    visuals: {
      baseColor: '#a8a29e',
      secondaryColor: '#57534e',
      visualShape: 'dust-grain'
    },
    scaleZone: 1
  },
  {
    id: 'moon-ganymede',
    name: 'Ganymede',
    category: 'Major Moons (Solar System)',
    distanceLy: 8.21e-5,
    distanceString: '1,070,000 km from Jupiter (8.21 × 10⁻⁵ LY from Earth)',
    description: 'Jupiter’s largest moon and the largest moon in our entire Solar System. It is larger in volume than the planet Mercury and the dwarf planet Pluto. It is the only moon in the solar system known to possess its own internally generated magnetic field.',
    specs: {
      mass: '1.481 × 10²³ kg (2.02 Earth Moons)',
      radius: '2,634 km',
      temperature: '110 K (average)',
      age: '4.52 billion years'
    },
    advancedSpecs: {
      classification: 'Icy/Rocky Natural Satellite (Galilean Moon)',
      surfaceGravity: '1.428 m/s² (0.146g)',
      escapeVelocity: '2,740 m/s',
      luminosity: 'Albedo 0.43',
      composition: 'Silicate core, thick liquid water/ice mantle, thin oxygen atmosphere',
      discoveryYear: '1610 (Galileo Galilei)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Ganymede possesses a subsurface liquid water ocean sandwiched between layers of ice, likely containing more water than all of Earth\'s oceans combined.',
      'Its magnetic field interacts with Jupiter\'s powerful magnetosphere, generating bright glowing auroral belts at its poles.',
      'The European Space Agency\'s JUICE spacecraft is currently en route to orbit Ganymede in the 2030s.'
    ],
    visuals: {
      baseColor: '#94a3b8',
      secondaryColor: '#475569',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'moon-titan',
    name: 'Titan',
    category: 'Major Moons (Solar System)',
    distanceLy: 1.511e-4,
    distanceString: '1,221,870 km from Saturn (1.51 × 10⁻⁴ LY from Earth)',
    description: 'Saturn\'s massive moon Titan is a spectacular, planet-like world. It is the only moon in the Solar System with a dense, nitrogen-rich atmosphere, and the only cosmic body other than Earth known to host stable, liquid lakes, rivers, and seas on its freezing surface.',
    specs: {
      mass: '1.345 × 10²³ kg',
      radius: '2,574 km',
      temperature: '94 K (-179°C)',
      age: '4.52 billion years'
    },
    advancedSpecs: {
      classification: 'Volatile-Rich Organic-Atmosphere Moon',
      surfaceGravity: '1.352 m/s² (0.138g)',
      escapeVelocity: '2,640 m/s',
      luminosity: 'Albedo 0.22',
      composition: '95% Nitrogen atmosphere, methane-ethane hydrologic cycle, water-ice shell, silicate core',
      discoveryYear: '1655 (Christiaan Huygens)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Titan\'s liquid lakes are composed of liquid methane, ethane, and propane, fed by organic rainstorms from methane clouds.',
      'The atmospheric pressure on Titan is 1.45 times that of Earth, and because of low gravity, a human could strap on cardboard wings and easily fly.',
      'In 2005, NASA\'s Huygens probe successfully landed on Titan\'s surface, photographing a plain strewn with rounded water-ice pebbles.'
    ],
    visuals: {
      baseColor: '#f59e0b',
      secondaryColor: '#b45309',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'moon-europa',
    name: 'Europa',
    category: 'Major Moons (Solar System)',
    distanceLy: 8.22e-5,
    distanceString: '670,900 km from Jupiter (8.22 × 10⁻⁵ LY from Earth)',
    description: 'A frozen jewel of the Galilean moons, Europa has the smoothest and brightest surface in the Solar System, crisscrossed by dark fractures called lineae. Scientists are almost certain a warm, global saltwater ocean hides beneath its icy crust, kept liquid by tidal heating.',
    specs: {
      mass: '4.80 × 10²² kg',
      radius: '1,560.8 km',
      temperature: '100 K (-173°C)',
      age: '4.51 billion years'
    },
    advancedSpecs: {
      classification: 'Icy Astrobiological Natural Satellite',
      surfaceGravity: '1.315 m/s² (0.134g)',
      escapeVelocity: '2,025 m/s',
      luminosity: 'Albedo 0.67 (highly reflective ice)',
      composition: 'Water-ice surface shell, 100-km deep liquid water ocean, silicate rock mantle, iron-nickel core',
      discoveryYear: '1610 (Galileo Galilei)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The water ocean on Europa is estimated to be up to 100 kilometers deep, containing twice as much liquid water as all Earth\'s oceans combined.',
      'The dark reddish stripes on the ice are minerals and sea salts erupted from the subsurface ocean, altered by intense radiation.',
      'NASA\'s Europa Clipper mission, launched recently, is flying to Europa to investigate its potential habitability.'
    ],
    visuals: {
      baseColor: '#bae6fd',
      secondaryColor: '#0ea5e9',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'moon-enceladus',
    name: 'Enceladus',
    category: 'Major Moons (Solar System)',
    distanceLy: 1.512e-4,
    distanceString: '238,000 km from Saturn (1.512 × 10⁻⁴ LY from Earth)',
    description: 'A small, active icy moon covered in pristine snow, making it the most reflective body in the Solar System. Under its frozen crust lies a global ocean that shoots towering geysers of water ice, organic compounds, and salts hundreds of kilometers into space through fractures at its south pole.',
    specs: {
      mass: '1.08 × 10²⁰ kg',
      radius: '252.1 km',
      temperature: '75 K (-198°C)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Active Cryovolcanic Ocean Moon',
      surfaceGravity: '0.113 m/s² (0.0115g)',
      escapeVelocity: '240 m/s',
      luminosity: 'Albedo 0.99 (Pristine ice reflection)',
      composition: 'Pure water-ice surface, global liquid ocean, porous silicate/metal core',
      discoveryYear: '1789 (William Herschel)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The geysers of Enceladus actively feed Saturn\'s E-ring, keeping it supplied with fresh, microscopic icy particles.',
      'The Cassini spacecraft flew directly through these geyser plumes, detecting salt, methane, carbon dioxide, and simple organic molecules.',
      'Hydrothermal vents on the ocean floor of Enceladus are believed to release molecular hydrogen, indicating active underwater volcanic vents similar to Earth\'s deep ocean.',
      'This volcanic heat and water make Enceladus one of the best targets to search for microscopic extraterrestrial life.'
    ],
    visuals: {
      baseColor: '#f8fafc',
      secondaryColor: '#38bdf8',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'moon-io',
    name: 'Io',
    category: 'Major Moons (Solar System)',
    distanceLy: 8.23e-5,
    distanceString: '421,700 km from Jupiter (8.23 × 10⁻⁵ LY from Earth)',
    description: 'The most volcanically active body in our entire Solar System. Io is caught in a violent gravitational tug-of-war between Jupiter and the moons Europa and Ganymede, squeezing its rock core with intense tidal friction. This generates enough interior heat to support hundreds of active volcanic vents erupting liquid sulfur.',
    specs: {
      mass: '8.932 × 10²² kg',
      radius: '1,821.6 km',
      temperature: '130 K (surface) / 1,500 K (lava flows)',
      age: '4.51 billion years'
    },
    advancedSpecs: {
      classification: 'Active Hyper-Volcanic Rocky Moon',
      surfaceGravity: '1.796 m/s² (0.183g)',
      escapeVelocity: '2,558 m/s',
      luminosity: 'Albedo 0.63',
      composition: 'Ultramafic silicate mantle, molten iron-iron sulfide core, sulfur and sulfur dioxide surface coatings',
      discoveryYear: '1610 (Galileo Galilei)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Io\'s volcanic plumes can shoot gas, ash, and sulfur compound clouds up to 500 kilometers above its surface into space.',
      'Its surface is covered in yellow, orange, red, and black sulfur compounds, giving it a mottled, pizza-like appearance.',
      'Io cuts across Jupiter\'s intense magnetic field lines, generating a 400,000-volt electric current of ion particles flowing between moon and planet.'
    ],
    visuals: {
      baseColor: '#facc15',
      secondaryColor: '#ca8a04',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'moon-triton',
    name: 'Triton',
    category: 'Major Moons (Solar System)',
    distanceLy: 4.751e-4,
    distanceString: '354,760 km from Neptune (4.75 × 10⁻⁴ LY from Earth)',
    description: 'Neptune\'s gargantuan moon Triton is a bizarre, icy, captured Kuiper Belt object. It is the only large moon in our Solar System that orbits in a direction opposite to its planet\'s rotation (retrograde orbit). Its surface resembles a cantaloupe melon, featuring nitrogen ice plains and active cryovolcanoes erupting nitrogen geysers.',
    specs: {
      mass: '2.14 × 10²² kg',
      radius: '1,353.4 km',
      temperature: '38 K (-235°C, coldest surface in Solar System)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Captured Retrograde Kuiper Belt Moon',
      surfaceGravity: '0.779 m/s² (0.0794g)',
      escapeVelocity: '1,455 m/s',
      luminosity: 'Albedo 0.76',
      composition: 'Nitrogen, water-ice crust, dense carbonaceous rock mantle, metallic core',
      discoveryYear: '1846 (William Lassell)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Triton\'s retrograde orbit causes it to lose orbital energy due to tidal interaction, slowly spiraling toward Neptune. It will eventually be ripped apart into a ring in ~3.6 billion years.',
      'Voyager 2 observed active geysers on Triton erupting plumes of dark nitrogen gas and dust that drifted in its thin, freezing atmosphere.',
      'Because Triton was captured by Neptune, it generated intense tidal heating that melted the moon\'s interior, differentiating its core, mantle, and crust.'
    ],
    visuals: {
      baseColor: '#bae6fd',
      secondaryColor: '#0284c7',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'moon-charon',
    name: 'Charon',
    category: 'Major Moons (Solar System)',
    distanceLy: 6.241e-4,
    distanceString: '19,570 km from Pluto (6.24 × 10⁻⁴ LY from Earth)',
    description: 'Pluto\'s massive moon Charon is so large relative to Pluto that their mutual center of mass (barycenter) lies in open space between them. Instead of Charon orbiting Pluto, they orbit each other like a cosmic double planet system, forever tidally locked and facing each other.',
    specs: {
      mass: '1.586 × 10²¹ kg (12% of Pluto\'s mass)',
      radius: '606 km',
      temperature: '53 K (-220°C)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Icy Plutino/KBO Binary Partner Natural Satellite',
      surfaceGravity: '0.288 m/s² (0.029g)',
      escapeVelocity: '590 m/s',
      luminosity: 'Albedo 0.49',
      composition: 'Ammonia-hydrated water ice mantle, silicate rock core',
      discoveryYear: '1978 (James Christy)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Charon\'s north pole features a giant, dark reddish region named Mordor Macula, covered in tholins—heavy organic molecules stolen from Pluto\'s leaking atmosphere.',
      'Both Pluto and Charon are mutually tidally locked, meaning they keep the same face pointing toward each other eternally; Charon never rises or sets from half of Pluto.',
      'The New Horizons spacecraft in 2015 revealed massive canyons on Charon\'s equator, indicating the moon\'s internal water ocean froze and ruptured the surface long ago.'
    ],
    visuals: {
      baseColor: '#cbd5e1',
      secondaryColor: '#64748b',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'dwarf-ceres',
    name: 'Ceres',
    category: 'Dwarf Planets',
    distanceLy: 4.38e-5,
    distanceString: '2.77 AU (4.38 × 10⁻⁵ LY)',
    description: 'The largest object in the asteroid belt between Mars and Jupiter, and the only dwarf planet in the inner Solar System. Ceres is a round, water-rich embryo planet containing mysterious, highly reflective sodium carbonate salt spots inside its Occator crater.',
    specs: {
      mass: '9.393 × 10²⁰ kg (1/3 of entire Asteroid Belt mass)',
      radius: '473 km',
      temperature: '168 K (-105°C)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Dwarf Planet / G-type Asteroid',
      surfaceGravity: '0.28 m/s² (0.029g)',
      escapeVelocity: '510 m/s',
      luminosity: 'Albedo 0.09',
      composition: 'Clay mineral crust, brine water-ice mantle, dense rocky core, thin water-vapor exosphere',
      discoveryYear: '1801 (Giuseppe Piazzi)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Ceres was classified as a planet for 50 years after its discovery, demoted to asteroid, and then promoted to dwarf planet in 2006.',
      'The bright salt spots inside Occator crater are residue left behind as subsurface saltwater evaporated into space.',
      'NASA\'s Dawn spacecraft orbited Ceres from 2015 to 2018, discovering that it is an active, salt-saturated water world.'
    ],
    visuals: {
      baseColor: '#94a3b8',
      secondaryColor: '#475569',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'dwarf-pluto',
    name: 'Pluto',
    category: 'Dwarf Planets',
    distanceLy: 6.24e-4,
    distanceString: '39.5 AU (6.24 × 10⁻⁴ LY)',
    description: 'An icy dwarf planet located in the Kuiper Belt, a ring of bodies beyond Neptune. Pluto features a spectacular, heart-shaped nitrogen ice plain called Tombaugh Regio, towering water-ice mountain ranges, glaciers, and a thin, blue-haze atmosphere.',
    specs: {
      mass: '1.303 × 10²² kg',
      radius: '1,188.3 km',
      temperature: '44 K (-229°C)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Kuiper Belt Dwarf Planet (Plutino)',
      surfaceGravity: '0.62 m/s² (0.063g)',
      escapeVelocity: '1,210 m/s',
      luminosity: 'Albedo 0.49 to 0.66',
      composition: 'Nitrogen, methane, carbon monoxide ice surface, water-ice crust, rocky core, thin nitrogen atmosphere',
      discoveryYear: '1930 (Clyde Tombaugh)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Pluto\'s heart-shaped plains are active, churning nitrogen-ice glaciers that recycle their surfaces, erasing all impact craters.',
      'Its atmosphere expands when Pluto is closer to the Sun and freezes, collapsing back onto the surface, when it moves further away.',
      'Pluto was considered the ninth planet until 2006, when the International Astronomical Union established new planet criteria.'
    ],
    visuals: {
      baseColor: '#fed7aa',
      secondaryColor: '#c2410c',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'dwarf-eris',
    name: 'Eris',
    category: 'Dwarf Planets',
    distanceLy: 0.00108,
    distanceString: '67.8 AU (1.08 × 10⁻³ LY)',
    description: 'One of the most massive dwarf planets known, located in the scattered disc of the outer Solar System. Its discovery in 2005 sparked a intense debate in astronomy, directly prompting the creation of the term "dwarf planet" and the reclassification of Pluto.',
    specs: {
      mass: '1.66 × 10²² kg (27% heavier than Pluto)',
      radius: '1,163 km',
      temperature: '30 K (-243°C)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Scattered-Disc Dwarf Planet',
      surfaceGravity: '0.82 m/s² (0.083g)',
      escapeVelocity: '1,372 m/s',
      luminosity: 'Albedo 0.96 (highly reflective ice)',
      composition: 'Methane and nitrogen ice surface, rocky core, icy mantle, thin transient atmosphere',
      discoveryYear: '2005 (Mike Brown, Chad Trujillo, David Rabinowitz)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Eris is so far from the Sun that its atmosphere freezes solid and falls as nitrogen snow, coating it in a highly reflective glaze.',
      'It has one small natural moon named Dysnomia, which orbits Eris once every 16 days.',
      'Eris takes 557 Earth years to complete a single orbit around the Sun.'
    ],
    visuals: {
      baseColor: '#e2e8f0',
      secondaryColor: '#cbd5e1',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'dwarf-haumea',
    name: 'Haumea',
    category: 'Dwarf Planets',
    distanceLy: 0.00068,
    distanceString: '43.1 AU (6.80 × 10⁻⁴ LY)',
    description: 'A bizarre, fast-spinning dwarf planet in the Kuiper Belt. It rotates so rapidly (once every 4 hours) that centrifugal force has deformed it into an elongated, football-like triaxial ellipsoid. It is surrounded by a dark ring and two small moons.',
    specs: {
      mass: '4.006 × 10²¹ kg',
      radius: '816 km (mean, dimensions 1,160 × 850 km)',
      temperature: '32 K (-241°C)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Kuiper Belt Dwarf Planet (Resonant KBO)',
      surfaceGravity: '0.401 m/s² (Variable)',
      escapeVelocity: '840 m/s',
      luminosity: 'Albedo 0.66',
      composition: 'Highly crystalline water-ice mantle, dense rocky core',
      discoveryYear: '2004 (Discovered by Jose Luis Ortiz / Mike Brown groups)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Haumea is the fastest-spinning large object in the Solar System; a day on Haumea lasts just 3.9 Earth hours.',
      'It is the only Kuiper Belt object known to have its own planetary ring system, spanning 70 kilometers wide.',
      'Its two moons, Hi\'iaka and Namaka, are named after daughters of the Hawaiian goddess of childbirth and volcano.'
    ],
    visuals: {
      baseColor: '#e2e8f0',
      secondaryColor: '#94a3b8',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'dwarf-makemake',
    name: 'Makemake',
    category: 'Dwarf Planets',
    distanceLy: 0.00072,
    distanceString: '45.8 AU (7.20 × 10⁻⁴ LY)',
    description: 'The second-brightest Kuiper Belt object after Pluto, Makemake has an extremely cold surface covered in frozen methane, ethane, and nitrogen ice, giving it a slightly reddish hue. It is named after the creator of humanity in Rapa Nui mythology.',
    specs: {
      mass: '3.1 × 10²¹ kg',
      radius: '715 km',
      temperature: '30 K (-243°C)',
      age: '4.5 billion years'
    },
    advancedSpecs: {
      classification: 'Kuiper Belt Dwarf Planet (Cubewano)',
      surfaceGravity: '0.5 m/s²',
      escapeVelocity: '800 m/s',
      luminosity: 'Albedo 0.81',
      composition: 'Methane and ethane ice glaze, rocky silicate core',
      discoveryYear: '2005 (Mike Brown, Chad Trujillo, David Rabinowitz)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Unlike Pluto, Makemake has no detectable atmosphere, likely due to its lower gravity and extreme cold.',
      'It has a very small, dark companion moon nicknamed MK2, which orbits Makemake once every 12 days.',
      'Its discovery, along with Eris, was crucial in defining the class of dwarf planets in 2006.'
    ],
    visuals: {
      baseColor: '#fca5a5',
      secondaryColor: '#f87171',
      visualShape: 'sphere'
    },
    scaleZone: 1
  },
  {
    id: 'exo-kepler22b',
    name: 'Kepler-22b',
    category: 'Exoplanets (Beyond the 8 Planets)',
    distanceLy: 635,
    distanceString: '635 light years',
    description: 'The first transiting exoplanet discovered by NASA\'s Kepler telescope to orbit in the habitable zone of a Sun-like star. Kepler-22b is a "super-Earth" or "mini-Neptune" likely covered in a massive global water ocean, possibly supporting an exotic aquatic biosphere.',
    specs: {
      mass: '8.3 Earth masses (estimated)',
      radius: '15,300 km (2.4 × Earth)',
      temperature: '295 K (22°C - moderate and temperate)',
      age: '4.0 billion years'
    },
    advancedSpecs: {
      classification: 'Super-Earth / Ocean World Exoplanet',
      surfaceGravity: '13.4 m/s² (~1.37g)',
      escapeVelocity: '21,000 m/s',
      luminosity: 'Orbits G5V star (0.79 Solar Luminosity)',
      composition: 'Supercritical water ocean mantle, volatile hydrogen atmosphere, silicate/iron core',
      discoveryYear: '2011 (Kepler Science Team)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'If Kepler-22b has a greenhouse effect similar to Earth, its average surface temperature is a highly comfortable 22°C.',
      'It orbits its star every 290 Earth days, very close to Earth\'s annual calendar.',
      'Because of its large size, it may be a water world, possessing no solid dry landmasses.'
    ],
    visuals: {
      baseColor: '#38bdf8',
      secondaryColor: '#0369a1',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'exo-55cancrie',
    name: '55 Cancri e',
    category: 'Exoplanets (Beyond the 8 Planets)',
    distanceLy: 41,
    distanceString: '41 light years',
    description: 'A hellish exoplanet twice the size of Earth, orbiting so close to its parent star that its surface is a molten lava ocean. It is exceptionally dense and thought to be rich in carbon, possibly featuring a mantle of diamond.',
    specs: {
      mass: '7.99 Earth masses',
      radius: '11,470 km (1.8 × Earth)',
      temperature: '2,300 K (molten surface)',
      age: '8.0 billion years'
    },
    advancedSpecs: {
      classification: 'Super-Earth / Carbon-Rich Lava World',
      surfaceGravity: '21.6 m/s² (2.2g)',
      escapeVelocity: '23,500 m/s',
      luminosity: 'Orbits K0V star 55 Cancri A',
      composition: 'Super-dense carbon (graphite & diamond), silicate mantle, iron core, heavy carbon dioxide atmosphere',
      discoveryYear: '2004 (Barbara McArthur)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The planet orbits its star in just 18 Earth hours, whipped by extreme gravitational tidal forces.',
      'It is so carbon-rich that up to a third of the planet\'s mass could be compressed into crystalline diamond.',
      'The James Webb Space Telescope recently detected indications of a thick secondary atmosphere on 55 Cancri e, likely replenished by gases escaping its boiling lava oceans.'
    ],
    visuals: {
      baseColor: '#f43f5e',
      secondaryColor: '#450a0a',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'exo-hd189733b',
    name: 'HD 189733b',
    category: 'Exoplanets (Beyond the 8 Planets)',
    distanceLy: 64.5,
    distanceString: '64.5 light years',
    description: 'A beautiful cobalt-blue exoplanet classified as a "Hot Jupiter." It features a savage, hostile atmosphere where temperatures exceed 1,200 K, and winds howl at 5,400 mph, causing it to literally rain molten glass sideways.',
    specs: {
      mass: '1.13 Jupiter masses',
      radius: '81,500 km',
      temperature: '1,200 K (extremely hot gas giant)',
      age: '5.0 billion years'
    },
    advancedSpecs: {
      classification: 'Hot Jupiter Gas Giant',
      surfaceGravity: '21.2 m/s² (2.16g)',
      escapeVelocity: '51,000 m/s',
      luminosity: 'Orbits K1.5V star HD 189733',
      composition: 'Hydrogen, helium gas, high-altitude silicate cloud decks',
      discoveryYear: '2005 (Bouchy et al.)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Its striking blue color is not from oceans, but from the scattering of light by silicate dust particles floating in its gas clouds.',
      'The winds on HD 189733b are seven times the speed of sound, carrying evaporated silicate particles at high speeds.',
      'It orbits very close to its star, completing a full orbit in just 2.2 Earth days.'
    ],
    visuals: {
      baseColor: '#2563eb',
      secondaryColor: '#1d4ed8',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'star-proximacentauri',
    name: 'Proxima Centauri',
    category: 'Stars (Stellar Scale)',
    distanceLy: 4.24,
    distanceString: '4.24 light years (Closest Star to Sol)',
    description: 'A low-mass red dwarf star in the Alpha Centauri ternary system. It is currently the closest individual star to Earth (after the Sun) and hosts at least two exoplanets, including Proxima b, an Earth-sized planet in its habitable zone.',
    specs: {
      mass: '0.122 Solar masses',
      radius: '107,300 km (0.15 Solar radii)',
      temperature: '3,040 K (cool red surface)',
      age: '4.85 billion years'
    },
    advancedSpecs: {
      classification: 'M6Ve Active Flare Red Dwarf Star',
      surfaceGravity: '385 m/s² (39.2g)',
      escapeVelocity: '562,000 m/s',
      luminosity: '0.0017 L☉ (Highly active red star)',
      composition: '73% Hydrogen, 25% Helium, fully convective core',
      discoveryYear: '1915 (Robert Innes)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Proxima is a flare star, subject to random, violent magnetic eruptions that double its brightness in minutes, releasing harsh UV radiation.',
      'Because red dwarfs burn hydrogen extremely slowly, Proxima will continue fusing fuel for another 4 trillion years, 400 times longer than our Sun.',
      'It takes about 550,000 years to complete its slow, distant orbit around the main Alpha Centauri binary pair.'
    ],
    visuals: {
      baseColor: '#ea580c',
      secondaryColor: '#b91c1c',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'star-siriusa',
    name: 'Sirius A (The Dog Star)',
    category: 'Stars (Stellar Scale)',
    distanceLy: 8.6,
    distanceString: '8.6 light years',
    description: 'The brightest star in Earth\'s night sky, visible from almost everywhere. Sirius A is a hot, luminous, blue-white main-sequence star twice as massive as our Sun, accompanied by a tiny, ultra-dense white dwarf partner, Sirius B.',
    specs: {
      mass: '2.063 Solar masses',
      radius: '1,190,000 km (1.71 Solar radii)',
      temperature: '9,940 K',
      age: '242 million years'
    },
    advancedSpecs: {
      classification: 'A1V Blue-White Main-Sequence Star',
      surfaceGravity: '120.0 m/s²',
      escapeVelocity: '520,000 m/s',
      luminosity: '25.4 L☉ (Extremely bright stellar system)',
      composition: 'Hydrogen core fusion, high metal enrichment',
      discoveryYear: 'Ancient (Central to Egyptian calendar)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Ancient Egyptians based their calendar on the "heliacal rising" of Sirius, which marked the annual flooding of the Nile River.',
      'Sirius is gradually moving closer to our Solar System, meaning its brightness in our sky will continue to increase over the next 60,000 years.',
      'Its intense brightness is a combination of its high intrinsic luminosity and its close distance to Earth.'
    ],
    visuals: {
      baseColor: '#ffffff',
      secondaryColor: '#38bdf8',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'star-rigel',
    name: 'Rigel (Beta Orionis)',
    category: 'Stars (Stellar Scale)',
    distanceLy: 860,
    distanceString: '860 light years',
    description: 'A brilliant blue supergiant star and the brightest star in the Orion constellation. It is a highly energetic, hot star that radiates tens of thousands of times more light than our Sun, dominating nearby space.',
    specs: {
      mass: '21 Solar masses',
      radius: '54.9 million km (78.9 Solar radii)',
      temperature: '12,100 K (intense hot blue-white)',
      age: '8.0 million years'
    },
    advancedSpecs: {
      classification: 'B8Ia Blue-White Supergiant Star',
      surfaceGravity: '0.25 m/s² (extremely low due to inflation)',
      escapeVelocity: '120,000 m/s',
      luminosity: '120,000 L☉ (Highly energetic blue star)',
      composition: 'Hydrogen fusion shell, massive helium core',
      discoveryYear: 'Ancient (Known as Rigel since Islamic golden age)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Rigel is actually a multiple star system, containing at least three smaller companion stars that are drowned out by its main blue glow.',
      'It is so luminous that its stellar wind blasts out tons of mass every second, creating a massive cavity in surrounding nebulae.',
      'Because of its massive weight, Rigel will burn its fuel in a short time, destined to explode as a supernova within a few million years.'
    ],
    visuals: {
      baseColor: '#e0f2fe',
      secondaryColor: '#0ea5e9',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'star-vega',
    name: 'Vega (Alpha Lyrae)',
    category: 'Stars (Stellar Scale)',
    distanceLy: 25,
    distanceString: '25 light years',
    description: 'A bright blue-white main-sequence star in the Lyra constellation. It is spinning so rapidly (once every 12.5 hours) that centrifugal force has bulged its equator outward, creating a flattened oblate spheroid shape.',
    specs: {
      mass: '2.135 Solar masses',
      radius: '1.9 million km (2.73 Solar radii)',
      temperature: '9,602 K',
      age: '450 million years'
    },
    advancedSpecs: {
      classification: 'A0V Rapidly-Rotating Oblate Star',
      surfaceGravity: '80.0 m/s²',
      escapeVelocity: '480,000 m/s',
      luminosity: '40.1 L☉',
      composition: 'Hydrogen core, low heavy metal abundance',
      discoveryYear: 'Ancient (First star photographed besides the Sun)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Vega was the first star ever to be photographed (in 1850) and the first to have its light spectrum recorded (in 1872).',
      'It served as the North Star in 12,000 BC due to Earth\'s axial precession, and will reclaim that title around 13,700 AD.',
      'It has a massive circumstellar disk of dust and debris, indicating a young planetary system may be forming.'
    ],
    visuals: {
      baseColor: '#60a5fa',
      secondaryColor: '#1d4ed8',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'star-polaris',
    name: 'Polaris (The North Star)',
    category: 'Stars (Stellar Scale)',
    distanceLy: 433,
    distanceString: '433 light years',
    description: 'The North Star, a yellow supergiant star aligned almost perfectly with Earth\'s northern rotational axis. It is a classic Cepheid variable star used for navigation and cosmic distance calculations.',
    specs: {
      mass: '5.4 Solar masses',
      radius: '26 million km (37.5 Solar radii)',
      temperature: '6,015 K',
      age: '70 million years'
    },
    advancedSpecs: {
      classification: 'F7Ib Yellow Supergiant Cepheid Variable',
      surfaceGravity: '1.2 m/s²',
      escapeVelocity: '180,000 m/s',
      luminosity: '2,500 L☉',
      composition: 'Helium core, convective outer envelope, iron enrichment',
      discoveryYear: 'Ancient (Recognized as celestial pivot for millennia)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Polaris is not a single star, but a triple star system consisting of the supergiant Polaris Aa and two small stellar companions.',
      'Its alignment with the north pole makes it appear stationary in time-lapse sky photography, with all other stars rotating around it.',
      'As a Cepheid variable, Polaris slowly pulses in brightness and size every 3.97 days.'
    ],
    visuals: {
      baseColor: '#fef08a',
      secondaryColor: '#ca8a04',
      visualShape: 'sphere'
    },
    scaleZone: 2
  },
  {
    id: 'star-stephenson218',
    name: 'Stephenson 2-18',
    category: 'Stars (Stellar Scale)',
    distanceLy: 19000,
    distanceString: '19,000 light years',
    description: 'An ultramassive red hypergiant star in the Stephenson 2 open cluster. It is currently one of the largest known stars, with a volume roughly 10 billion times that of the Sun. If placed in our Solar System, its surface would extend past Saturn\'s orbit.',
    specs: {
      mass: '30 to 50 Solar masses',
      radius: '1.5 billion km (2,150 Solar radii)',
      temperature: '3,200 K (cool red hypergiant)',
      age: '20 million years'
    },
    advancedSpecs: {
      classification: 'M6 Red Hypergiant Star',
      surfaceGravity: '0.0001 m/s² (Extremely bloated outer layers)',
      escapeVelocity: '60,000 m/s',
      luminosity: '440,000 L☉ (Extremely high red emission)',
      composition: 'Helium, carbon, oxygen core, hyper-extended hydrogen atmosphere',
      discoveryYear: '1990 (Charles Bruce Stephenson)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'If Stephenson 2-18 were scaled down to the size of a soccer ball, our Sun would be a microscopic dot invisible to the naked eye.',
      'Its outer layers are so loosely held by its weak gravity that it is actively shedding a massive amount of its weight into space.',
      'It represents the absolute physical limit of star size (the Hayashi limit) for stable stars.'
    ],
    visuals: {
      baseColor: '#dc2626',
      secondaryColor: '#450a0a',
      visualShape: 'sphere'
    },
    scaleZone: 3
  },
  {
    id: 'quasar-ton618',
    name: 'Ton 618',
    category: 'Supermassive Black Holes & Quasars',
    distanceLy: 18200000000,
    distanceString: '18.2 billion light years (Deep Space)',
    description: 'A hyper-luminous, radio-loud quasar powered by an ultramassive black hole that is currently one of the largest black holes ever discovered, with a mass of 66 billion solar masses. It radiates with the blinding light of 140 trillion suns.',
    specs: {
      mass: '66,000,000,000 Solar masses',
      radius: '390 billion km (Event Horizon)',
      temperature: 'Trillions of K (Accretion disk)',
      age: '13.0 billion years'
    },
    advancedSpecs: {
      classification: 'Ultramassive Black Hole & Radio-Loud Quasar',
      surfaceGravity: 'Extremely high at event horizon boundary',
      escapeVelocity: '299,792,458 m/s (Speed of Light)',
      luminosity: '1.4 × 10¹⁴ L☉ (One of the brightest objects in cosmos)',
      composition: 'Singularity, gargantuan plasma accretion disk, relativistic magnetic jets',
      discoveryYear: '1957 (Discovered as blue radio-emitting object)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The event horizon of Ton 618 is 390 billion kilometers across—about 40 times the orbit of Neptune, meaning it could easily swallow our entire solar system.',
      'Its central black hole is so massive that it challenges current models of how black holes form, suggesting it was born in the very early universe.',
      'The light we see from Ton 618 has been traveling for over 10 billion years, allowing astronomers to peek into the deep cosmic past.'
    ],
    visuals: {
      baseColor: '#a855f7',
      secondaryColor: '#c084fc',
      visualShape: 'black-hole'
    },
    scaleZone: 5
  },
  {
    id: 'nebula-eagle',
    name: 'Eagle Nebula (Messier 16)',
    category: 'Nebulae',
    distanceLy: 5700,
    distanceString: '5,700 light years',
    description: 'An active star-forming region in the Serpens constellation, famous for containing the "Pillars of Creation"—colossal columns of cold gas and cosmic dust where stars are hatching, made iconic by the Hubble Space Telescope.',
    specs: {
      mass: 'Over 8,000 Solar masses',
      radius: '70 × 55 light years',
      temperature: '10 K (pillars) to 10,000 K (ionized gas)',
      age: '5.5 million years'
    },
    advancedSpecs: {
      classification: 'H II Diffuse Star-Forming Nebula with Open Cluster',
      surfaceGravity: 'Extremely weak, turbulent dust compression forces',
      escapeVelocity: 'N/A',
      luminosity: 'Scattering ultraviolet radiation of young hot stars',
      composition: 'Molecular Hydrogen, cosmic dust, polycyclic aromatic hydrocarbons',
      discoveryYear: '1745 (Jean-Philippe de Cheseaux)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Pillars of Creation are giant columns of hydrogen gas and dust spanning about 4 to 5 light years in length.',
      'Inside these pillars, high gas density triggers gravitational collapse, hatching brand-new protostars and solar systems.',
      'Intense ultraviolet radiation from nearby giant stars is slowly vaporizing the pillars, a process called photoevaporation.'
    ],
    visuals: {
      baseColor: '#10b981',
      secondaryColor: '#d946ef',
      visualShape: 'nebula-cloud'
    },
    scaleZone: 3
  },
  {
    id: 'nebula-carina',
    name: 'Carina Nebula (NGC 3372)',
    category: 'Nebulae',
    distanceLy: 8500,
    distanceString: '8,500 light years',
    description: 'A massive, complex diffuse nebula containing several open clusters of stars in the southern sky. It houses Eta Carinae, a hyper-unstable, extremely luminous binary star system that erupted in 1843, briefly becoming the second brightest star.',
    specs: {
      mass: '900,000 Solar masses',
      radius: '230 light years',
      temperature: 'Varies',
      age: '3.0 million years'
    },
    advancedSpecs: {
      classification: 'Supergiant H II Emission / Star-Forming Nebula',
      surfaceGravity: 'Highly complex gas-dynamics and stellar feedback',
      escapeVelocity: 'N/A',
      luminosity: 'Vast emission, illuminated by dozens of massive O-type stars',
      composition: 'Ionized Hydrogen, interstellar dust, molecular carbon clouds',
      discoveryYear: '1751 (Nicolas-Louis de Lacaille)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Carina Nebula is four times larger and much brighter than the famous Orion Nebula, but less known because it is only visible from the southern hemisphere.',
      'It contains the spectacular "Mystic Mountain," a giant, three-light-year-tall pillar of gas and dust harboring infant stars shooting out jets of gas.',
      'It houses several of the most massive and luminous stars known in our galaxy, each over 100 times the weight of our Sun.'
    ],
    visuals: {
      baseColor: '#f43f5e',
      secondaryColor: '#f97316',
      visualShape: 'nebula-cloud'
    },
    scaleZone: 3
  },
  {
    id: 'nebula-crab',
    name: 'Crab Nebula (Messier 1)',
    category: 'Nebulae',
    distanceLy: 6500,
    distanceString: '6,500 light years',
    description: 'A supernova remnant in the Taurus constellation. It is the violently expanding leftover debris of a core-collapse supernova recorded by Chinese, Japanese, and Native American astronomers in 1054 AD, leaving a spinning pulsar at its core.',
    specs: {
      mass: '4.6 Solar masses (expanding envelope)',
      radius: '5.5 light years',
      temperature: '10,000 K (envelope)',
      age: '972 years (Exploded 1054 AD)'
    },
    advancedSpecs: {
      classification: 'Supernova Remnant / Pulsar Wind Nebula',
      surfaceGravity: 'N/A (Violently expanding gas envelope)',
      escapeVelocity: 'Envelope expanding at 1,500 km/s',
      luminosity: 'Relativistic synchrotron emission powered by central pulsar',
      composition: 'Ionized helium, hydrogen, iron filaments, relativistic electron cloud',
      discoveryYear: '1731 (John Bevis, identified supernova link 1921)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The supernova explosion that created this nebula was so bright that it was visible to the naked eye during daytime for 23 days.',
      'The heart of the nebula contains the Crab Pulsar, a spinning neutron star rotating 30 times per second, blasting out a wind of relativistic electrons.',
      'It is one of the most studied objects in astronomy, serving as a cosmic laboratory for high-energy physics.'
    ],
    visuals: {
      baseColor: '#ef4444',
      secondaryColor: '#06b6d4',
      visualShape: 'pulsar'
    },
    scaleZone: 3
  },
  {
    id: 'nebula-helix',
    name: 'Helix Nebula (NGC 7293)',
    category: 'Nebulae',
    distanceLy: 650,
    distanceString: '650 light years (Closest Planetary Nebula)',
    description: 'A large planetary nebula formed by a dying, low-mass star casting off its outer layers of gas as it runs out of fuel. Often referred to as the "Eye of God" due to its striking circular shape, it is a preview of the future of our own Sun.',
    specs: {
      mass: '0.3 Solar masses (gas envelope)',
      radius: '2.8 light years',
      temperature: '120,000 K (central hot white dwarf)',
      age: '10,600 years'
    },
    advancedSpecs: {
      classification: 'Planetary Nebula / Degenerate Core Shell',
      surfaceGravity: 'N/A',
      escapeVelocity: 'Expanding at 31 km/s',
      luminosity: 'Excited ultraviolet emission of gas shell',
      composition: 'Hydrogen, Helium, Nitrogen, Oxygen layers',
      discoveryYear: '1824 (Karl Ludwig Harding)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The central star of the Helix Nebula is a hot white dwarf, which excites the surrounding expanding gas with its intense ultraviolet light.',
      'It contains thousands of "cometary knots"—dense, finger-like gaseous structures with dusty heads and long tails pointing away from the central star.',
      'Despite its bright, detailed appearance in photographs, the Helix is very faint and requires dark skies to observe.'
    ],
    visuals: {
      baseColor: '#06b6d4',
      secondaryColor: '#ec4899',
      visualShape: 'nebula-cloud'
    },
    scaleZone: 3
  },
  {
    id: 'nebula-ring',
    name: 'Ring Nebula (Messier 57)',
    category: 'Nebulae',
    distanceLy: 2300,
    distanceString: '2,300 light years',
    description: 'The archetypal planetary nebula in the northern Lyra constellation. It appears as a neat, glowing, barrel-shaped ring of colorful gas cast off by a dying star, excited by the radiation of the hot central white dwarf.',
    specs: {
      mass: '0.2 Solar masses',
      radius: '0.9 light years',
      temperature: '10,000 K (gas shell)',
      age: '7,000 years'
    },
    advancedSpecs: {
      classification: 'Planetary Nebula / Bipolar Gas Shell',
      surfaceGravity: 'N/A',
      escapeVelocity: 'Expanding at 20-30 km/s',
      luminosity: 'UV excited gas glow',
      composition: 'Ionized Hydrogen, Helium, double-ionized Oxygen (green center)',
      discoveryYear: '1779 (Antoine Darquier de Pellepoix)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The colors of the Ring represent different gases at varying distances from the hot star: blue is helium, green is oxygen, and red is hydrogen.',
      'What looks like a flat ring is actually an elongated tube of gas seen from one of its open ends, pointing directly at Earth.',
      'Its central white dwarf is incredibly hot, with a surface temperature of approximately 125,000 Kelvin.'
    ],
    visuals: {
      baseColor: '#10b981',
      secondaryColor: '#ef4444',
      visualShape: 'nebula-cloud'
    },
    scaleZone: 3
  },
  {
    id: 'nebula-horsehead',
    name: 'Horsehead Nebula (Barnard 33)',
    category: 'Nebulae',
    distanceLy: 1375,
    distanceString: '1,375 light years',
    description: 'A distinct dark nebula in the Orion constellation, silhouetted against a glowing background of red, ionized hydrogen gas. Its dark, dense dust clouds resemble a horse\'s head, blocking the light of stars behind it.',
    specs: {
      mass: 'Estimated ~27 Solar masses',
      radius: '3.5 light years',
      temperature: '10 K to 20 K (extremely cold molecular dust)',
      age: '500,000 years'
    },
    advancedSpecs: {
      classification: 'Dark Absorption Nebula',
      surfaceGravity: 'Extremely weak molecular-cloud potential',
      escapeVelocity: 'N/A',
      luminosity: 'Blocks light, silhouetted against emission nebula IC 434',
      composition: 'Cold carbonaceous dust, molecular hydrogen gas',
      discoveryYear: '1888 (Williamina Fleming)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Horsehead was discovered in 1888 by Williamina Fleming, a prominent female astronomer working at Harvard Observatory.',
      'It is a highly dense pocket of dust and gas that is actively forming stars, but the dust hides them from optical telescopes.',
      'The red glow behind the Horsehead is hydrogen gas being ionized by the intense ultraviolet light of the nearby star Sigma Orionis.'
    ],
    visuals: {
      baseColor: '#18181b',
      secondaryColor: '#e11d48',
      visualShape: 'nebula-cloud'
    },
    scaleZone: 3
  },
  {
    id: 'galaxy-milkyway',
    name: 'The Milky Way Galaxy',
    category: 'Galaxies',
    distanceLy: 0,
    distanceString: '0 LY (Our Home Galaxy)',
    description: 'The barred spiral galaxy that contains our Solar System and hundreds of billions of other stars. Spanning over 100,000 light years, it features several spiral arms, a dense central bar of stars, and houses a supermassive black hole at its core, Sagittarius A*.',
    specs: {
      mass: '1.5 × 10¹² Solar masses',
      radius: '50,000 light years (radius)',
      temperature: 'Varies',
      age: '13.6 billion years'
    },
    advancedSpecs: {
      classification: 'SBc Barred Spiral Galaxy',
      surfaceGravity: 'Galactic potential well, solar rotation speed ~220 km/s',
      escapeVelocity: 'Estimated 550 km/s to escape solar neighborhood halo',
      luminosity: '2.0 × 10¹⁰ L☉',
      composition: '200-400 Billion stars, gas clouds, stellar remnants, Sagittarius A* core, Dark Matter (85%)',
      discoveryYear: 'Ancient (Observed since the dawn of humanity)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Our Solar System is located in the Orion Cygnus Arm, about 26,000 light years away from the energetic Galactic Center.',
      'Our Sun takes approximately 230 million years to complete a single orbit around the center of the galaxy, a period known as a galactic year.',
      'The Milky Way is currently devouring several dwarf satellite galaxies, including the Sagittarius Dwarf Galaxy, in a process of galactic cannibalism.'
    ],
    visuals: {
      baseColor: '#cbd5e1',
      secondaryColor: '#6366f1',
      visualShape: 'galaxy-spiral'
    },
    scaleZone: 3
  },
  {
    id: 'galaxy-triangulum',
    name: 'Triangulum Galaxy (Messier 33)',
    category: 'Galaxies',
    distanceLy: 2730000,
    distanceString: '2.73 million light years',
    description: 'The third-largest galaxy in our Local Group after Andromeda and the Milky Way. It is a spiral galaxy with an exceptionally clean, well-defined pinwheel structure, hosting a high density of star-forming regions.',
    specs: {
      mass: '5.0 × 10¹⁰ Solar masses',
      radius: '30,000 light years',
      temperature: 'Varies',
      age: '12.0 billion years'
    },
    advancedSpecs: {
      classification: 'SA(s)cd Unbarred Spiral Galaxy',
      surfaceGravity: 'Galactic potential well',
      escapeVelocity: 'Estimated 200 km/s to escape galactic halo',
      luminosity: '3.0 × 10⁹ L☉',
      composition: '40 Billion stars, massive hydrogen clouds, central stellar-mass black hole candidates',
      discoveryYear: '1654 (Giovanni Battista Hodierna)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'Triangulum is sometimes called the "Pinwheel Galaxy" due to its spectacular, face-on spiral structure.',
      'It contains NGC 604, one of the largest and most active H II starburst regions in the Local Group, spanning 1,500 light-years across.',
      'It is gravitationally bound to the larger Andromeda galaxy, and may eventually merge with it before colliding with the Milky Way.'
    ],
    visuals: {
      baseColor: '#60a5fa',
      secondaryColor: '#818cf8',
      visualShape: 'galaxy-spiral'
    },
    scaleZone: 3
  },
  {
    id: 'galaxy-smc',
    name: 'Small Magellanic Cloud (SMC)',
    category: 'Galaxies',
    distanceLy: 200000,
    distanceString: '200,000 light years',
    description: 'An irregular dwarf galaxy that is one of the closest satellites orbiting the Milky Way. It is visible to the naked eye from the southern hemisphere as a faint glowing cloud, heavily disrupted by gravitational tides.',
    specs: {
      mass: '7.0 × 10⁹ Solar masses',
      radius: '3,500 light years',
      temperature: 'Varies',
      age: '13.0 billion years'
    },
    advancedSpecs: {
      classification: 'SB(s)m Irregular Magellanic Dwarf Galaxy',
      surfaceGravity: 'Weak galactic potential',
      escapeVelocity: 'Estimated 100 km/s to escape SMC potential',
      luminosity: '5.0 × 10⁸ L☉',
      composition: 'Irregular gas clouds, older stars, young clusters',
      discoveryYear: 'Ancient (Known to southern cultures, documented by Ferdinand Magellan 1519)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The SMC is connected to the LMC by the "Magellanic Bridge," a massive stream of neutral hydrogen gas pulled from both galaxies.',
      'It contains a much lower abundance of metals (elements heavier than helium) than the Milky Way, representing early-universe conditions.',
      'Gravitational interactions with the Milky Way will eventually pull the SMC apart, absorbing its gas and stars.'
    ],
    visuals: {
      baseColor: '#f1f5f9',
      secondaryColor: '#c084fc',
      visualShape: 'galaxy-elliptical'
    },
    scaleZone: 3
  },
  {
    id: 'galaxy-whirlpool',
    name: 'Whirlpool Galaxy (Messier 51)',
    category: 'Galaxies',
    distanceLy: 23000000,
    distanceString: '23.0 million light years',
    description: 'A classic "grand design" spiral galaxy in the constellation Canes Venatici. It is actively colliding with its smaller dwarf companion galaxy, NGC 5195, causing intense gravity waves that trigger a burst of new star formation in its spiral arms.',
    specs: {
      mass: '1.6 × 10¹¹ Solar masses',
      radius: '38,000 light years',
      temperature: 'Varies',
      age: '10.0 billion years'
    },
    advancedSpecs: {
      classification: 'SA(s)bc Grand Design Spiral Galaxy',
      surfaceGravity: 'Strong galactic gravity waves',
      escapeVelocity: 'Estimated 450 km/s',
      luminosity: '1.0 × 10¹⁰ L☉',
      composition: '100 Billion stars, highly structured hydrogen spiral arms, colliding partner NGC 5195',
      discoveryYear: '1773 (Charles Messier)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Whirlpool was the first galaxy discovered to have a spiral structure, observed in 1845 by Lord Rosse using a massive 72-inch telescope.',
      'The gravitational interaction with its companion galaxy NGC 5195 acts like a giant rake, squeezing hydrogen clouds to hatch new massive stars.',
      'It contains numerous luminous X-ray binary systems, which are stellar-mass black holes devouring companion stars.'
    ],
    visuals: {
      baseColor: '#38bdf8',
      secondaryColor: '#a855f7',
      visualShape: 'galaxy-spiral'
    },
    scaleZone: 4
  },
  {
    id: 'galaxy-sombrero',
    name: 'Sombrero Galaxy (Messier 104)',
    category: 'Galaxies',
    distanceLy: 28000000,
    distanceString: '28.0 million light years',
    description: 'An unbarred spiral galaxy with a massive, bright central stellar bulge and a striking, prominent dark ring of dust lanes seen almost edge-on, giving it the appearance of a Mexican sombrero hats.',
    specs: {
      mass: '8.0 × 10¹¹ Solar masses',
      radius: '25,000 light years',
      temperature: 'Varies',
      age: '12.0 billion years'
    },
    advancedSpecs: {
      classification: 'SA(s)a Early-Type Edge-On Spiral Galaxy',
      surfaceGravity: 'Extremely strong central bulge potential',
      escapeVelocity: 'Estimated 550 km/s',
      luminosity: '2.4 × 10¹⁰ L☉',
      composition: 'Massive stellar bulge, dense dust ring, over 2,000 globular clusters, central supermassive black hole (1 billion Solar masses)',
      discoveryYear: '1781 (Pierre Méchain)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'The Sombrero houses an unusually large population of globular clusters—about 2,000, ten times more than our Milky Way.',
      'Its central supermassive black hole is one of the most massive found in nearby galaxies, weighing one billion solar masses.',
      'Its prominent dust lane is a dense ring of gas and dust where stars are actively forming.'
    ],
    visuals: {
      baseColor: '#e2e8f0',
      secondaryColor: '#1e293b',
      visualShape: 'galaxy-spiral'
    },
    scaleZone: 4
  },
  {
    id: 'galaxy-ic1101',
    name: 'IC 1101',
    category: 'Galaxies',
    distanceLy: 1040000000,
    distanceString: '1.04 billion light years (Deep Space)',
    description: 'A colossal supergiant elliptical galaxy at the center of the Abell 2029 galaxy cluster. It is currently one of the largest known galaxies, spanning up to 6 million light years across and holding over 100 trillion stars.',
    specs: {
      mass: '1.0 × 10¹⁴ Solar masses',
      radius: '2.0 million light years',
      temperature: 'Varies',
      age: '12.5 billion years'
    },
    advancedSpecs: {
      classification: 'cD4 Supergiant Elliptical Galaxy',
      surfaceGravity: 'Massive, cluster-wide gravitational potential well',
      escapeVelocity: 'Estimated >1,500 km/s',
      luminosity: '1.0 × 10¹² L☉',
      composition: '100 Trillion metal-rich older population stars, massive hot X-ray emitting gas halo',
      discoveryYear: '1790 (William Herschel)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'IC 1101 is so large that if it replaced our Milky Way, it would swallow the Andromeda, Triangulum, and Magellanic galaxies, filling the entire Local Group.',
      'It contains almost no active star-forming gas, and most of its stars are old, yellow-red dwarf stars that have lived for 10+ billion years.',
      'It was formed by the merging and swallowing of thousands of smaller spiral and elliptical galaxies over cosmic history.'
    ],
    visuals: {
      baseColor: '#fca5a5',
      secondaryColor: '#f43f5e',
      visualShape: 'galaxy-elliptical'
    },
    scaleZone: 5
  },
  {
    id: 'observable-universe',
    name: 'The Observable Universe Edge',
    category: 'The Observable Universe',
    distanceLy: 46500000000,
    distanceString: '46.5 billion light years (Radius)',
    description: 'The sphere of space-time centered on Earth that contains all matter and radiation that light has had time to travel through to reach us since the beginning of cosmological expansion (the Big Bang). Its outer boundary is the Cosmic Microwave Background radiation, representing the Universe as it was 380,000 years after its birth.',
    specs: {
      mass: '1.5 × 10⁵³ kg (estimated)',
      radius: '46.5 billion light years',
      temperature: '2.725 K (average CMB)',
      age: '13.78 billion years'
    },
    advancedSpecs: {
      classification: 'Flat FLRW Metric Observable Spacetime Sphere',
      surfaceGravity: 'None global (locally varying)',
      escapeVelocity: 'Infinite (expanding faster than light at boundary)',
      luminosity: 'Entire radiant energy output of all stellar matter',
      composition: 'Dark Energy (68.3%), Cold Dark Matter (26.8%), Baryonic normal matter (4.9%)',
      discoveryYear: 'Modern cosmological consensus (Hubble 1929, Penzias & Wilson 1964)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    trivia: [
      'While the Universe is only 13.8 billion years old, the observable radius is 46.5 billion light years because space-time has been expanding faster than light since the Big Bang.',
      'Beyond the cosmological horizon lies the "unobservable" Universe, which is theoretically infinite and identical in structure but forever out of our optical reach.',
      'Every day, the boundary of the Observable Universe expands by one light-day, but dark energy is actively moving distant galaxies out of our future reach.'
    ],
    visuals: {
      baseColor: '#f43f5e',
      secondaryColor: '#6366f1',
      visualShape: 'sphere'
    },
    scaleZone: 5
  },
{
  "id": "dwarf-sedna",
  "name": "Sedna",
  "category": "Dwarf Planets",
  "distanceLy": 0.0135,
  "distanceString": "86 AU at perihelion (0.0135 LY)",
  "description": "A large, reddish minor planet in the outer reaches of the Solar System, currently about three times as far from the Sun as Neptune. It has one of the largest orbital periods in our Solar System, estimated at roughly 11,400 years.",
  "specs": {
    "mass": "1.0 × 10²¹ kg",
    "radius": "497 km",
    "temperature": "12 K",
    "age": "4.5 billion years"
  },
  "advancedSpecs": {
    "classification": "Trans-Neptunian Object / Detached Object",
    "surfaceGravity": "0.05 m/s²",
    "escapeVelocity": "210 m/s",
    "luminosity": "Reflected albedo ~0.32",
    "composition": "Water ice, methane ice, tholins, rock",
    "discoveryYear": "2003 (Mike Brown, Chad Trujillo, David Rabinowitz)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Sedna's surface is one of the reddest in our Solar System, likely due to tholins formed by cosmic ray irradiation of simple organics.",
    "Its highly eccentric orbit takes it to an aphelion of nearly 937 AU, deep into the inner Oort cloud.",
    "It was named after the Inuit goddess of the sea, who is believed to live in the freezing depths of the Arctic Ocean."
  ],
  "visuals": {
    "baseColor": "#ea580c",
    "secondaryColor": "#7c2d12",
    "visualShape": "sphere"
  },
  "scaleZone": 1
},
{
  "id": "exo-wasp76b",
  "name": "WASP-76b",
  "category": "Exoplanets (Beyond the 8 Planets)",
  "distanceLy": 640,
  "distanceString": "640 light years",
  "description": "A tidally locked ultra-hot gas giant exoplanet orbiting very close to its host star. Its dayside temperature exceeds 2,600 K, vaporizing metals which are then carried by howling winds to the cooler nightside, where they condense and rain down as liquid iron.",
  "specs": {
    "mass": "0.92 Jupiter masses",
    "radius": "131,000 km (1.83 × Jupiter)",
    "temperature": "2,670 K (dayside)",
    "age": "2.5 billion years"
  },
  "advancedSpecs": {
    "classification": "Ultra-hot Jupiter",
    "surfaceGravity": "6.7 m/s²",
    "escapeVelocity": "34,000 m/s",
    "luminosity": "Orbits F-type star WASP-76",
    "composition": "Superheated Hydrogen, Helium, vaporized metals (Iron, Sodium)",
    "discoveryYear": "2013"
  },
  "imageUrl": "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "WASP-76b is so close to its parent star that a \"year\" lasts only 1.8 Earth days.",
    "The molecular bonds of water are broken apart on its extreme dayside, only to recombine on its cooler nightside.",
    "The transition zone between day and night features howling winds blowing at thousands of kilometers per hour."
  ],
  "visuals": {
    "baseColor": "#7c2d12",
    "secondaryColor": "#ea580c",
    "visualShape": "sphere"
  },
  "scaleZone": 2
},
{
  "id": "exo-toi849b",
  "name": "TOI-849b",
  "category": "Exoplanets (Beyond the 8 Planets)",
  "distanceLy": 730,
  "distanceString": "730 light years",
  "description": "The exposed, naked rocky core of a stripped gas giant. TOI-849b is an extremely rare planet orbiting deep within the Neptune Desert; it lost its massive gas envelope due to tidal disruption or intense stellar irradiation.",
  "specs": {
    "mass": "39.1 Earth masses",
    "radius": "21,900 km (3.4 × Earth)",
    "temperature": "1,800 K",
    "age": "6.0 billion years"
  },
  "advancedSpecs": {
    "classification": "Chthonian Planet / Stripped Gas Giant Core",
    "surfaceGravity": "32.1 m/s²",
    "escapeVelocity": "28,000 m/s",
    "luminosity": "Orbits Sun-like G-type star TOI-849",
    "composition": "Iron, nickel, silicates, negligible atmosphere",
    "discoveryYear": "2020 (TESS)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "TOI-849b is the first chthonian planet discovered, proving that gas giants can lose their entire atmospheres.",
    "Its density is similar to Earth's, meaning it is incredibly rich in heavy metals like iron.",
    "It orbits its star once every 18 hours, placing it extremely close to its star's scorching radiation."
  ],
  "visuals": {
    "baseColor": "#57534e",
    "secondaryColor": "#dc2626",
    "visualShape": "sphere"
  },
  "scaleZone": 2
},
{
  "id": "exo-draugr",
  "name": "PSR B1257+12 b (Draugr)",
  "category": "Exoplanets (Beyond the 8 Planets)",
  "distanceLy": 2300,
  "distanceString": "2,300 light years",
  "description": "One of the first exoplanets ever discovered, orbiting the dead pulsar PSR B1257+12. Draugr is an extremely low-mass rocky world bathed in the intense, high-energy electromagnetic radiation of its pulsar host.",
  "specs": {
    "mass": "0.02 Earth masses",
    "radius": "1,200 km",
    "temperature": "300 K (radiative heating)",
    "age": "3.0 billion years"
  },
  "advancedSpecs": {
    "classification": "Pulsar Planet (Rocky)",
    "surfaceGravity": "1.3 m/s²",
    "escapeVelocity": "2,000 m/s",
    "luminosity": "Orbits millisecond pulsar PSR B1257+12",
    "composition": "Highly irradiated silicates and metals",
    "discoveryYear": "1992 (Aleksander Wolszczan)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Draugr is about twice as massive as the Moon, making it the least massive exoplanet known.",
    "Its entire system of planets likely formed from the debris disk left behind by the supernova that created the pulsar.",
    "Its name, Draugr, refers to an undead creature from Norse mythology, fitting for a planet orbiting a dead star."
  ],
  "visuals": {
    "baseColor": "#475569",
    "secondaryColor": "#c084fc",
    "visualShape": "sphere"
  },
  "scaleZone": 3
},
{
  "id": "exo-kelt9b",
  "name": "Kelt-9b",
  "category": "Exoplanets (Beyond the 8 Planets)",
  "distanceLy": 670,
  "distanceString": "670 light years",
  "description": "The hottest exoplanet known, Kelt-9b is a gas giant with a dayside temperature hotter than the surfaces of most stars. Its atmosphere is so scorching that molecules like water and carbon dioxide are ripped apart into their constituent atoms.",
  "specs": {
    "mass": "2.88 Jupiter masses",
    "radius": "135,000 km (1.89 × Jupiter)",
    "temperature": "4,600 K (dayside)",
    "age": "300 million years"
  },
  "advancedSpecs": {
    "classification": "Ultra-hot Jupiter",
    "surfaceGravity": "19.8 m/s²",
    "escapeVelocity": "51,000 m/s",
    "luminosity": "Orbits high-temperature A-type star KELT-9",
    "composition": "Atomic Hydrogen, Helium, ionized metals",
    "discoveryYear": "2016"
  },
  "imageUrl": "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "With a dayside temperature of 4,600 Kelvin, Kelt-9b is hotter than most Red Dwarf stars.",
    "Its atmosphere is constantly being blown away by intense ultraviolet radiation from its hot host star, forming a glowing tail.",
    "Hydrogen molecules are completely dissociated on its dayside and can only reassociate on its nightside."
  ],
  "visuals": {
    "baseColor": "#bae6fd",
    "secondaryColor": "#fb923c",
    "visualShape": "sphere"
  },
  "scaleZone": 2
},
{
  "id": "exo-proxima-b",
  "name": "Proxima Centauri b",
  "category": "Exoplanets (Beyond the 8 Planets)",
  "distanceLy": 4.24,
  "distanceString": "4.24 light years",
  "description": "The closest rocky exoplanet to our solar system, orbiting within the habitable zone of the red dwarf Proxima Centauri. Because it is likely tidally locked, it may feature a permanent day-side ocean or glacier-rimmed \"eyeball\" surface.",
  "specs": {
    "mass": "1.07 Earth masses",
    "radius": "6,600 km (~1.03 × Earth)",
    "temperature": "234 K (-39°C average)",
    "age": "4.85 billion years"
  },
  "advancedSpecs": {
    "classification": "Habitable Zone Rocky Exoplanet",
    "surfaceGravity": "10.1 m/s²",
    "escapeVelocity": "11,500 m/s",
    "luminosity": "Orbits red dwarf Proxima Centauri",
    "composition": "Rocky silicate mantle, iron-nickel core, potential atmosphere",
    "discoveryYear": "2016 (ESO)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Proxima Centauri b is the prime candidate for future interstellar flyby missions like Breakthrough Starshot.",
    "It faces regular stellar flares from its active red dwarf host, which could strip its atmosphere over time.",
    "Its orbit lasts just 11.2 Earth days, meaning its calendar year is shorter than two Earth weeks."
  ],
  "visuals": {
    "baseColor": "#b45309",
    "secondaryColor": "#16a34a",
    "visualShape": "sphere"
  },
  "scaleZone": 2
},
{
  "id": "exo-trappist1e",
  "name": "TRAPPIST-1e",
  "category": "Exoplanets (Beyond the 8 Planets)",
  "distanceLy": 40,
  "distanceString": "40 light years",
  "description": "An Earth-sized rocky exoplanet orbiting within the ultra-compact TRAPPIST-1 system of seven planets. Among them, planet \"e\" is considered one of the most habitable exoplanets ever found, with an optimal balance of temperature and rocky composition.",
  "specs": {
    "mass": "0.69 Earth masses",
    "radius": "5,800 km (0.91 × Earth)",
    "temperature": "251 K (-22°C average)",
    "age": "7.6 billion years"
  },
  "advancedSpecs": {
    "classification": "M-Dwarf Habitable Zone Rocky Planet",
    "surfaceGravity": "8.1 m/s²",
    "escapeVelocity": "9,700 m/s",
    "luminosity": "Orbits ultra-cool M-dwarf TRAPPIST-1",
    "composition": "Iron-rich core, rocky silicate crust, potential water oceans",
    "discoveryYear": "2017 (NASA/Spitzer)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "TRAPPIST-1e is located in a system where all seven planets could fit inside the orbit of Mercury.",
    "From its surface, neighboring planets would appear as large, detailed disks in the sky, much larger than our Moon.",
    "It has a very high density, suggesting a large iron core similar to Earth's but even more compact."
  ],
  "visuals": {
    "baseColor": "#0284c7",
    "secondaryColor": "#cbd5e1",
    "visualShape": "sphere"
  },
  "scaleZone": 2
},
{
  "id": "exo-hoth",
  "name": "OGLE-2005-BLG-390Lb",
  "category": "Exoplanets (Beyond the 8 Planets)",
  "distanceLy": 21500,
  "distanceString": "21,500 light years",
  "description": "A freezing super-Earth orbiting a red dwarf star near the center of the Milky Way, nicknamed \"Hoth\" due to its extreme cold. Discovered via gravitational microlensing, it is a key proof of the abundance of cold rocky planets in our galaxy.",
  "specs": {
    "mass": "5.5 Earth masses",
    "radius": "10,000 km (1.6 × Earth)",
    "temperature": "50 K (-220°C)",
    "age": "9.0 billion years"
  },
  "advancedSpecs": {
    "classification": "Cold Super-Earth / Ice Planet",
    "surfaceGravity": "21.0 m/s²",
    "escapeVelocity": "21,000 m/s",
    "luminosity": "Orbits distant M-dwarf star",
    "composition": "Thick ice mantle, rocky core, frozen atmosphere",
    "discoveryYear": "2005 (RoboNet/PLANET)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "OGLE-2005-BLG-390Lb was the most Earth-like exoplanet known at the time of its discovery in terms of solid composition.",
    "Its nickname \"Hoth\" is a reference to the ice planet in the Star Wars universe.",
    "Due to its huge distance, it was detected using gravitational microlensing, which uses the gravity of a foreground star to magnify light from a background star."
  ],
  "visuals": {
    "baseColor": "#bae6fd",
    "secondaryColor": "#ffffff",
    "visualShape": "sphere"
  },
  "scaleZone": 3
},
{
  "id": "moon-mimas",
  "name": "Mimas",
  "category": "Major Moons (Solar System)",
  "distanceLy": 1.4e-7,
  "distanceString": "186,000 km from Saturn (1.4 × 10⁻⁷ LY)",
  "description": "An icy moon of Saturn famous for its uncanny resemblance to the Death Star from Star Wars, a shape caused by the massive, impact-formed Herschel Crater. Its internal heat is surprisingly low, despite its proximity to Saturn.",
  "specs": {
    "mass": "3.75 × 10¹⁹ kg",
    "radius": "198 km",
    "temperature": "64 K to 80 K",
    "age": "4.5 billion years"
  },
  "advancedSpecs": {
    "classification": "Icy Planetary Satellite",
    "surfaceGravity": "0.064 m/s²",
    "escapeVelocity": "159 m/s",
    "luminosity": "Albedo ~0.96 (Highly reflective)",
    "composition": "Water ice (99%), minor silicates",
    "discoveryYear": "1789 (William Herschel)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Herschel Crater is 130 km wide—nearly one-third of the entire moon's diameter. If a similar scale crater occurred on Earth, it would be as wide as Africa.",
    "Mimas is the smallest known astronomical body that is rounded in shape due to self-gravitation.",
    "Thermal maps of Mimas reveal a temperature distribution shaped like a Pac-Man, likely due to differences in surface ice texture."
  ],
  "visuals": {
    "baseColor": "#94a3b8",
    "secondaryColor": "#64748b",
    "visualShape": "sphere"
  },
  "scaleZone": 1
},
{
  "id": "moon-iapetus",
  "name": "Iapetus",
  "category": "Major Moons (Solar System)",
  "distanceLy": 3.7e-7,
  "distanceString": "3.56 million km from Saturn (3.7 × 10⁻⁷ LY)",
  "description": "A highly unusual, walnut-shaped moon of Saturn with a dual-contrast surface—one hemisphere is coal-black while the other is snow-white. It also features a massive, mysterious mountain ridge running perfectly along its equator.",
  "specs": {
    "mass": "1.8 × 10²¹ kg",
    "radius": "735 km",
    "temperature": "110 K to 130 K",
    "age": "4.5 billion years"
  },
  "advancedSpecs": {
    "classification": "Dual-Contrast Icy Moon",
    "surfaceGravity": "0.223 m/s²",
    "escapeVelocity": "573 m/s",
    "luminosity": "Albedo ranges from 0.04 (dark) to 0.60 (bright)",
    "composition": "Water ice (80%), rocky silicates, tholins",
    "discoveryYear": "1671 (Cassini)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "The dark hemisphere, Cassini Regio, is coated in a dark organic dust originating from Saturn's outer retrograde moon Phoebe.",
    "Its equatorial ridge is up to 20 km high, making some of Iapetus's mountains taller than Mount Everest.",
    "Because it is so far from Saturn, it is the only large moon of Saturn from which Saturn's rings would be clearly visible."
  ],
  "visuals": {
    "baseColor": "#1e293b",
    "secondaryColor": "#ffffff",
    "visualShape": "sphere"
  },
  "scaleZone": 1
},
{
  "id": "moon-miranda",
  "name": "Miranda",
  "category": "Major Moons (Solar System)",
  "distanceLy": 1.4e-7,
  "distanceString": "129,000 km from Uranus (1.4 × 10⁻⁷ LY)",
  "description": "A moon of Uranus with the most chaotic, fractured, and scrambled canyon terrain in the Solar System. It features giant canyon scars, patchwork cliffs, and Verona Rupes, which is the tallest sheer cliff known in the Solar System.",
  "specs": {
    "mass": "6.59 × 10¹⁷ kg",
    "radius": "235 km",
    "temperature": "60 K",
    "age": "4.5 billion years"
  },
  "advancedSpecs": {
    "classification": "Chaotic Icy Moon",
    "surfaceGravity": "0.079 m/s²",
    "escapeVelocity": "193 m/s",
    "luminosity": "Albedo ~0.32",
    "composition": "Water ice, methane ice, rocky silicates",
    "discoveryYear": "1948 (Gerard Kuiper)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Verona Rupes is a cliff roughly 20 km deep. Due to Miranda's low gravity, it would take a falling astronaut a full 12 minutes to reach the bottom.",
    "The chaotic surface suggests Miranda was once shattered into pieces by a major impact, only to reform haphazardly under gravity.",
    "It is named after Miranda, the daughter of the magician Prospero in Shakespeare's play The Tempest."
  ],
  "visuals": {
    "baseColor": "#cbd5e1",
    "secondaryColor": "#475569",
    "visualShape": "sphere"
  },
  "scaleZone": 1
},
{
  "id": "moon-hyperion",
  "name": "Hyperion",
  "category": "Major Moons (Solar System)",
  "distanceLy": 1.6e-7,
  "distanceString": "1.48 million km from Saturn (1.6 × 10⁻⁷ LY)",
  "description": "An irregular, low-density moon of Saturn with a sponge-like appearance. Hyperion is highly porous, has a chaotic tumble instead of a steady rotation, and accumulates static electricity from Saturn's magnetosphere.",
  "specs": {
    "mass": "5.6 × 10¹⁸ kg",
    "radius": "135 km (mean)",
    "temperature": "75 K",
    "age": "4.5 billion years"
  },
  "advancedSpecs": {
    "classification": "Spongy Irregular Moon",
    "surfaceGravity": "0.017 m/s²",
    "escapeVelocity": "74 m/s",
    "luminosity": "Albedo ~0.3",
    "composition": "Porous water ice, solid impurities",
    "discoveryYear": "1848 (William Cranch Bond)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Hyperion is so porous (about 40% empty space) that it has been described as a giant cosmic sponge.",
    "It is one of the only moons in the Solar System to have a chaotic rotation, meaning its pole orientation cannot be predicted.",
    "When the Cassini spacecraft flew by, it recorded a static electricity discharge of 200 volts from the moon's surface."
  ],
  "visuals": {
    "baseColor": "#e2e8f0",
    "secondaryColor": "#854d0e",
    "visualShape": "sphere"
  },
  "scaleZone": 1
},
{
  "id": "star-antares",
  "name": "Antares",
  "category": "Stars (Stellar Scale)",
  "distanceLy": 550,
  "distanceString": "550 light years",
  "description": "A cool, massive red supergiant star marking the \"heart\" of the Scorpius constellation. Antares is so vast that if placed in the center of our solar system, its outer envelope would extend past the orbit of Mars.",
  "specs": {
    "mass": "12.4 Solar masses",
    "radius": "470 million km (680 × Solar)",
    "temperature": "3,400 K",
    "age": "11 million years"
  },
  "advancedSpecs": {
    "classification": "M1.5Iab Red Supergiant",
    "surfaceGravity": "0.002 m/s²",
    "escapeVelocity": "120,000 m/s",
    "luminosity": "75,000 L☉ (Bolometric)",
    "composition": "Helium-fusing core, massive convective hydrogen shell",
    "discoveryYear": "Prehistoric (Known to ancient astronomers as the Rival of Mars)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Its name Antares comes from Ancient Greek, meaning \"rival to Ares (Mars)\" due to its brilliant reddish hue.",
    "Antares is surrounded by a vast dust nebula that is illuminated by the star's brilliant light.",
    "It is nearing the end of its life and is expected to explode as a supernova within the next few hundred thousand years."
  ],
  "visuals": {
    "baseColor": "#ea580c",
    "secondaryColor": "#7c2d12",
    "visualShape": "sphere"
  },
  "scaleZone": 2
},
{
  "id": "star-vycanismayoris",
  "name": "VY Canis Majoris",
  "category": "Stars (Stellar Scale)",
  "distanceLy": 3900,
  "distanceString": "3,900 light years",
  "description": "One of the most massive and extreme red hypergiants known in our galaxy. VY Canis Majoris is an unstable, highly evolved star surrounded by a complex nebula of ejected material, actively shedding its mass in violent outbursts.",
  "specs": {
    "mass": "17 Solar masses",
    "radius": "988 million km (1,420 × Solar)",
    "temperature": "3,500 K",
    "age": "8 million years"
  },
  "advancedSpecs": {
    "classification": "M5e Red Hypergiant Star",
    "surfaceGravity": "0.00003 m/s²",
    "escapeVelocity": "50,000 m/s",
    "luminosity": "178,000 L☉",
    "composition": "Convective stellar core, silicate dust shroud",
    "discoveryYear": "1801 (Jerôme Lalande)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "A passenger plane flying at 900 km/h would take over 1,100 years to fly around the circumference of VY Canis Majoris once.",
    "It is surrounded by a dense asymmetric nebula of dust grains and gas ejected during its massive stellar pulsations.",
    "It has lost nearly half of its birth mass through extreme stellar winds and eruptive events."
  ],
  "visuals": {
    "baseColor": "#dc2626",
    "secondaryColor": "#991b1b",
    "visualShape": "sphere"
  },
  "scaleZone": 3
},
{
  "id": "star-uyscuti",
  "name": "UY Scuti",
  "category": "Stars (Stellar Scale)",
  "distanceLy": 9500,
  "distanceString": "9,500 light years",
  "description": "A gargantuan, pulsating variable red hypergiant in the constellation Scutum. For many years, UY Scuti was considered the largest known star by radius, measuring approximately 1,700 times the size of our Sun.",
  "specs": {
    "mass": "8 to 10 Solar masses",
    "radius": "1.2 billion km (~1,700 × Solar)",
    "temperature": "3,360 K",
    "age": "10 million years"
  },
  "advancedSpecs": {
    "classification": "M4eIA-ab Red Hypergiant",
    "surfaceGravity": "0.0001 m/s²",
    "escapeVelocity": "60,000 m/s",
    "luminosity": "340,000 L☉",
    "composition": "Helium/Carbon core, extremely diffuse hydrogen envelope",
    "discoveryYear": "1860 (Bonn Observatory)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "At its peak size, UY Scuti can fit nearly 5 billion Suns inside its volume.",
    "Despite its immense volume, its mass is estimated to be only about 10 times that of the Sun, making its density extremely low.",
    "It is located in the zone of the Milky Way heavily obscured by interstellar dust, making precise distance measurements difficult."
  ],
  "visuals": {
    "baseColor": "#ef4444",
    "secondaryColor": "#450a0a",
    "visualShape": "sphere"
  },
  "scaleZone": 3
},
{
  "id": "star-r136a1",
  "name": "R136a1",
  "category": "Stars (Stellar Scale)",
  "distanceLy": 163000,
  "distanceString": "163,000 light years",
  "description": "The most massive and luminous star known in the observable universe, located in the R136 starburst cluster inside the Large Magellanic Cloud. This hypergiant star shines with the energy of over 6 million suns.",
  "specs": {
    "mass": "265 Solar masses",
    "radius": "21 million km (30 × Solar)",
    "temperature": "46,000 K (ultra-hot)",
    "age": "1.5 million years"
  },
  "advancedSpecs": {
    "classification": "WN5h Wolf-Rayet Star",
    "surfaceGravity": "100 m/s²",
    "escapeVelocity": "3,000,000 m/s",
    "luminosity": "6,200,000 L☉",
    "composition": "Ionized Helium, Nitrogen, and Carbon, extreme stellar winds",
    "discoveryYear": "1980 (ESO)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "R136a1 has a temperature of 46,000 Kelvin, nearly eight times hotter than the surface of our Sun.",
    "It is losing an incredible 3.2 × 10²⁰ kg of mass every second through intense stellar winds—equivalent to losing one Earth mass every 20 days.",
    "A single star like R136a1 produces more energy in a few seconds than our Sun does in an entire year."
  ],
  "visuals": {
    "baseColor": "#38bdf8",
    "secondaryColor": "#e0f2fe",
    "visualShape": "sphere"
  },
  "scaleZone": 3
},
{
  "id": "star-pistol",
  "name": "Pistol Star",
  "category": "Stars (Stellar Scale)",
  "distanceLy": 25000,
  "distanceString": "25,000 light years",
  "description": "A high-luminosity blue hypergiant star located near the center of the Milky Way, named for the pistol-shaped nebula it has cast off. It is one of the most energetic stars in our galaxy, releasing massive winds of plasma.",
  "specs": {
    "mass": "27.5 Solar masses",
    "radius": "210 million km (300 × Solar)",
    "temperature": "11,800 K",
    "age": "4 million years"
  },
  "advancedSpecs": {
    "classification": "Luminous Blue Variable (LBV)",
    "surfaceGravity": "0.1 m/s²",
    "escapeVelocity": "800,000 m/s",
    "luminosity": "1,600,000 L☉",
    "composition": "Hydrogen, Helium, heavy metals (highly metal-rich)",
    "discoveryYear": "1990 (Hubble Space Telescope)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "The Pistol Star is located so close to the dusty Galactic Center that it is completely invisible in optical light, requiring infrared telescopes to see.",
    "The Pistol Nebula surrounding it was created by giant eruptive outbursts that ejected nearly 10 solar masses of gas.",
    "It is expected to end its short life in a hypernova explosion within the next million years."
  ],
  "visuals": {
    "baseColor": "#0ea5e9",
    "secondaryColor": "#bae6fd",
    "visualShape": "sphere"
  },
  "scaleZone": 3
},
{
  "id": "star-etacarinae",
  "name": "Eta Carinae",
  "category": "Stars (Stellar Scale)",
  "distanceLy": 7500,
  "distanceString": "7,500 light years",
  "description": "A volatile, binary hypergiant star system surrounded by the double-lobed Homunculus Nebula. Famous for the \"Great Eruption\" in 1843, when it briefly became the second-brightest star in the sky, it is an extremely unstable system nearing a core-collapse.",
  "specs": {
    "mass": "100 + 30 Solar masses (binary)",
    "radius": "170 million km / 14 million km",
    "temperature": "9,400 K / 37,200 K",
    "age": "3 million years"
  },
  "advancedSpecs": {
    "classification": "Luminous Blue Variable (LBV) Binary System",
    "surfaceGravity": "0.1 m/s²",
    "escapeVelocity": "700,000 m/s",
    "luminosity": "5,000,000 L☉ (Combined)",
    "composition": "Hydrogen, Helium, CNO-cycle fusion products",
    "discoveryYear": "Ancient (Eruption studied in 1843)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "During its Great Eruption in 1843, it ejected an entire twin-lobed nebula of dust and gas, known as the Homunculus Nebula, which is expanding at 1,000 km/s.",
    "The two stars in the system orbit each other every 5.5 years in a highly eccentric orbit, colliding their stellar winds in massive shocks.",
    "It is a prime candidate for a future nearby supernova or hypernova that will release brilliant gamma rays."
  ],
  "visuals": {
    "baseColor": "#f97316",
    "secondaryColor": "#fb7185",
    "visualShape": "star-system"
  },
  "scaleZone": 3
},
{
  "id": "neutron-vela",
  "name": "Vela Pulsar",
  "category": "Neutron Stars & Pulsars",
  "distanceLy": 960,
  "distanceString": "960 light years",
  "description": "A super-dense neutron star spinning roughly 11 times per second. It is the powerhouse core of the Vela Supernova Remnant and is famous for emitting intense, rhythmic pulses of radio waves, optical light, X-rays, and gamma rays.",
  "specs": {
    "mass": "1.4 Solar masses",
    "radius": "11 km",
    "temperature": "1,200,000 K",
    "age": "11,000 years"
  },
  "advancedSpecs": {
    "classification": "Young Rotation-Powered Pulsar",
    "surfaceGravity": "1.9 × 10¹² m/s²",
    "escapeVelocity": "140,000,000 m/s",
    "luminosity": "3,000 L☉ (Rotational power)",
    "composition": "Superfluid neutrons, iron crystal lattice crust, extreme magnetic fields",
    "discoveryYear": "1968 (University of Sydney)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "The Vela Pulsar is located at the heart of the beautiful, filamentary Vela Supernova Remnant, a gas cloud spanning 100 light years.",
    "It was the first pulsar to be optically photographed, proving that neutron stars can emit visible light.",
    "It regularly undergoes sudden spin-ups called \"glitches\" as its internal superfluid structure reorganizes."
  ],
  "visuals": {
    "baseColor": "#38bdf8",
    "secondaryColor": "#818cf8",
    "visualShape": "pulsar"
  },
  "scaleZone": 2
},
{
  "id": "neutron-sgr1806",
  "name": "SGR 1806-20",
  "category": "Neutron Stars & Pulsars",
  "distanceLy": 50000,
  "distanceString": "50,000 light years",
  "description": "An ultra-magnetic neutron star, or magnetar, located on the far side of our galaxy. It holds the record for releasing the most powerful soft gamma repeater burst ever recorded, which briefly ionized Earth's upper atmosphere from 50,000 light years away.",
  "specs": {
    "mass": "1.4 Solar masses",
    "radius": "10 km",
    "temperature": "10,000,000 K (flaring)",
    "age": "10,000 years"
  },
  "advancedSpecs": {
    "classification": "Soft Gamma Repeater Magnetar",
    "surfaceGravity": "2.0 × 10¹² m/s²",
    "escapeVelocity": "150,000,000 m/s",
    "luminosity": "Variable (flares reach 10¹⁰ L☉)",
    "composition": "Neutron degenerate core, ultra-strong magnetic crust",
    "discoveryYear": "1979"
  },
  "imageUrl": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Its magnetic field is 10¹⁵ gauss—about 1,000 trillion times stronger than Earth's, capable of dissolving chemical bonds from 1,000 km away.",
    "On December 27, 2004, a giant starquake on SGR 1806-20 released more energy in 0.2 seconds than our Sun does in 150,000 years.",
    "The gamma ray flare from this starquake was so intense that it saturated scientific satellites and partially ionized Earth's ionosphere, despite crossing half the galaxy."
  ],
  "visuals": {
    "baseColor": "#cbd5e1",
    "secondaryColor": "#c084fc",
    "visualShape": "pulsar"
  },
  "scaleZone": 3
},
{
  "id": "neutron-psrb1919",
  "name": "PSR B1919+21",
  "category": "Neutron Stars & Pulsars",
  "distanceLy": 2280,
  "distanceString": "2,280 light years",
  "description": "The historic first pulsar ever discovered, originally designated LGM-1 (\"Little Green Men\") due to the highly regular, artificial-looking pulses of its radio signals. It orbits inside the constellation Vulpecula.",
  "specs": {
    "mass": "1.4 Solar masses",
    "radius": "11 km",
    "temperature": "800,000 K",
    "age": "16 million years"
  },
  "advancedSpecs": {
    "classification": "Radio Pulsar",
    "surfaceGravity": "1.9 × 10¹² m/s²",
    "escapeVelocity": "140,000,000 m/s",
    "luminosity": "Rotational radio emission",
    "composition": "Degenerate neutrons",
    "discoveryYear": "1967 (Jocelyn Bell Burnell and Antony Hewish)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Jocelyn Bell Burnell discovered the pulsar as a series of regular \"scruff\" markings on paper telescope charts, repeating every 1.33 seconds.",
    "The discovery was awarded the Nobel Prize in Physics in 1974, though Bell Burnell was famously excluded from the award.",
    "Its precise radio wave pulse pattern was famously used as the cover art for Joy Division's iconic 1979 album Unknown Pleasures."
  ],
  "visuals": {
    "baseColor": "#f1f5f9",
    "secondaryColor": "#475569",
    "visualShape": "pulsar"
  },
  "scaleZone": 3
},
{
  "id": "bh-sagitarius-a",
  "name": "Sagittarius A*",
  "category": "Supermassive Black Holes & Quasars",
  "distanceLy": 26000,
  "distanceString": "26,000 light years",
  "description": "The supermassive black hole fueling the Milky Way galaxy, located at our galactic center. With a mass of 4 million suns, it anchors our galaxy's spiral structure and is surrounded by a cluster of high-velocity stars orbiting in its immense gravity.",
  "specs": {
    "mass": "4.15 million Solar masses",
    "radius": "12 million km (Event Horizon)",
    "temperature": "Billions of K (Accretion region)",
    "age": "13.5 billion years"
  },
  "advancedSpecs": {
    "classification": "Supermassive Black Hole (Sgr A*)",
    "surfaceGravity": "Relativistic potential well",
    "escapeVelocity": "299,792,458 m/s",
    "luminosity": "Quiet state (~100 L☉)",
    "composition": "Singularity, relativistic magnetic plasma, orbiting S-stars",
    "discoveryYear": "1974 (Bruce Balick and Robert Brown)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "In 2022, the Event Horizon Telescope published the first direct image of the shadow of Sagittarius A*, revealing its glowing hot orange gas ring.",
    "Stars close to Sgr A*, called S-stars, travel at speeds exceeding 5% the speed of light to avoid falling in.",
    "It is currently in an extremely quiet phase, swallowing very little matter compared to active quasars in other galaxies."
  ],
  "visuals": {
    "baseColor": "#09090b",
    "secondaryColor": "#ea580c",
    "visualShape": "black-hole"
  },
  "scaleZone": 3
},
{
  "id": "bh-m87",
  "name": "M87*",
  "category": "Supermassive Black Holes & Quasars",
  "distanceLy": 53500000,
  "distanceString": "53.5 million light years",
  "description": "The core supermassive black hole of the giant elliptical galaxy Messier 87. Weighing a staggering 6.5 billion solar masses, it ejects a relativistic jet of plasma stretching 5,000 light years into space, and was the first black hole ever directly imaged.",
  "specs": {
    "mass": "6.5 billion Solar masses",
    "radius": "20 billion km (Event Horizon)",
    "temperature": "Trillions of K (plasma jet)",
    "age": "13.0 billion years"
  },
  "advancedSpecs": {
    "classification": "Supermassive Black Hole with Relativistic Jet",
    "surfaceGravity": "Relativistic boundary forces",
    "escapeVelocity": "299,792,458 m/s",
    "luminosity": "Active galactic nucleus jet output",
    "composition": "Ultra-massive singularity, relativistic magnetic field, jet plasma",
    "discoveryYear": "1918 (Jet observed by Heber Curtis)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "M87* was the historic first black hole ever imaged by the Event Horizon Telescope in 2019, showing its famous bright asymmetry.",
    "The event horizon of M87* is larger than the entire orbit of Pluto, easily wide enough to swallow our whole solar system.",
    "Its central plasma jet is launched by magnetic forces and travels at 99% the speed of light, piercing completely through the galaxy."
  ],
  "visuals": {
    "baseColor": "#09090b",
    "secondaryColor": "#dc2626",
    "visualShape": "black-hole"
  },
  "scaleZone": 4
},
{
  "id": "nebula-tarantula",
  "name": "Tarantula Nebula (30 Doradus)",
  "category": "Nebulae",
  "distanceLy": 160000,
  "distanceString": "160,000 light years",
  "description": "A hyper-active starburst region located in the Large Magellanic Cloud. It is the largest and most intense star-forming region in the Local Group, so bright that if it were as close to us as the Orion Nebula, it would cast visible shadows on Earth.",
  "specs": {
    "mass": "Roughly 1.5 million Solar masses",
    "radius": "300 light years (radius)",
    "temperature": "10 K to 15,000 K",
    "age": "8 million years"
  },
  "advancedSpecs": {
    "classification": "H II Giant Starburst Emission Nebula",
    "surfaceGravity": "Extremely diffuse",
    "escapeVelocity": "N/A",
    "luminosity": "Ultra-bright UV scattering of massive R136 stars",
    "composition": "Ionized Hydrogen, cosmic dust, heavy nebular gas",
    "discoveryYear": "1751 (Nicolas-Louis de Lacaille)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "If the Tarantula Nebula were placed at the distance of the Orion Nebula (~1,300 LY), it would occupy half the night sky and shine brightly enough to read by at night.",
    "The center of the Tarantula Nebula houses R136, the super-dense star cluster containing R136a1, the most massive star known.",
    "It is named \"Tarantula\" because its dusty, gas filaments resemble the long, spindly legs of a spider."
  ],
  "visuals": {
    "baseColor": "#ec4899",
    "secondaryColor": "#3b82f6",
    "visualShape": "nebula-cloud"
  },
  "scaleZone": 3
},
{
  "id": "nebula-lagoon",
  "name": "Lagoon Nebula (M8)",
  "category": "Nebulae",
  "distanceLy": 4100,
  "distanceString": "4,100 light years",
  "description": "A beautiful, deep interstellar dust lane cross-cut by a bright open cluster in the constellation Sagittarius. This massive star nursery is visible to the naked eye as a faint patch of glowing cloud.",
  "specs": {
    "mass": "Over 2,000 Solar masses",
    "radius": "55 × 25 light years",
    "temperature": "10,000 K (ionized gas)",
    "age": "2 million years"
  },
  "advancedSpecs": {
    "classification": "H II Emission Nebula with Open Cluster NGC 6530",
    "surfaceGravity": "Extremely weak",
    "escapeVelocity": "N/A",
    "luminosity": "Scattered UV emission of young hot stars",
    "composition": "Hydrogen gas, carbon molecules, cosmic dust",
    "discoveryYear": "1680 (Giovanni Battista Hodierna)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "The Lagoon Nebula contains the Hourglass Nebula at its core, a region of intense star formation powered by hot Herschel 36.",
    "Its name \"Lagoon\" is derived from the dark, lagoon-like dust lane dividing the glowing nebular gas in optical photographs.",
    "It is one of only two star-forming nebulae clearly visible to the naked eye from mid-northern latitudes."
  ],
  "visuals": {
    "baseColor": "#14b8a6",
    "secondaryColor": "#d946ef",
    "visualShape": "nebula-cloud"
  },
  "scaleZone": 3
},
{
  "id": "nebula-trifid",
  "name": "Trifid Nebula (M20)",
  "category": "Nebulae",
  "distanceLy": 5200,
  "distanceString": "5,200 light years",
  "description": "An extraordinary triple-lobed combination of an emission nebula (glowing pink), a reflection nebula (glowing blue), and a dark dust nebula that splits the main gas cloud into three distinct lobes.",
  "specs": {
    "mass": "Roughly 1,500 Solar masses",
    "radius": "15 light years (radius)",
    "temperature": "10,000 K (emission) / 100 K (reflection)",
    "age": "300,000 years"
  },
  "advancedSpecs": {
    "classification": "Combined H II Emission, Reflection, and Dark Nebula",
    "surfaceGravity": "Extremely weak",
    "escapeVelocity": "N/A",
    "luminosity": "Scattered stellar light and gas fluorescence",
    "composition": "Ionized and neutral Hydrogen, dust silicates",
    "discoveryYear": "1764 (Charles Messier)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "The Trifid Nebula is one of the youngest star nurseries known, with active protostars dating back less than 100,000 years.",
    "The dark dust lanes dividing the lobes are cataloged as Barnard 85, a cold, opaque cloud blocking all background light.",
    "Its beautiful contrast of pink and blue was famously chosen as the backdrop for numerous sci-fi posters and book covers."
  ],
  "visuals": {
    "baseColor": "#ec4899",
    "secondaryColor": "#0ea5e9",
    "visualShape": "nebula-cloud"
  },
  "scaleZone": 3
},
{
  "id": "nebula-dumbbell",
  "name": "Dumbbell Nebula (M27)",
  "category": "Nebulae",
  "distanceLy": 1360,
  "distanceString": "1,360 light years",
  "description": "The historic first planetary nebula ever cataloged by Charles Messier. It is a shell of ionized gas expelled by a dying, central white dwarf star, forming a dual-lobed shape resembling a dumbbell or apple core.",
  "specs": {
    "mass": "0.06 Solar masses",
    "radius": "1.44 light years",
    "temperature": "10,000 K (shell gas) / 85,000 K (white dwarf)",
    "age": "10,000 years"
  },
  "advancedSpecs": {
    "classification": "Planetary Nebula (expelled shell)",
    "surfaceGravity": "Extremely weak expansion front",
    "escapeVelocity": "N/A",
    "luminosity": "Fluorescing oxygen and hydrogen emissions",
    "composition": "Ionized Oxygen, Hydrogen, Helium, central carbon-oxygen white dwarf",
    "discoveryYear": "1764 (Charles Messier)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Planetary nebulae have nothing to do with planets; the name was coined by early astronomers because they resembled green-blue gas planets through low-power telescopes.",
    "Its central star is a hot white dwarf with a temperature of 85,000 Kelvin, actively glowing in ultraviolet light.",
    "The gas shell is expanding into space at a speed of 31 kilometers per second, meaning it will dissolve completely in another few tens of thousands of years."
  ],
  "visuals": {
    "baseColor": "#10b981",
    "secondaryColor": "#ef4444",
    "visualShape": "nebula-cloud"
  },
  "scaleZone": 3
},
{
  "id": "nebula-veil",
  "name": "Veil Nebula (NGC 6960)",
  "category": "Nebulae",
  "distanceLy": 2400,
  "distanceString": "2,400 light years",
  "description": "The delicate, braided strands of a massive ancient supernova remnant in Cygnus. Formed by the explosion of a star 20 times the mass of the Sun, its expanding gas front is colliding with interstellar material, heating it to a beautiful glow.",
  "specs": {
    "mass": "Varies (expanding shock front)",
    "radius": "50 light years (total diameter)",
    "temperature": "Millions of K (collision front)",
    "age": "10,000 to 20,000 years"
  },
  "advancedSpecs": {
    "classification": "Supernova Remnant (Oxygen/Hydrogen filaments)",
    "surfaceGravity": "N/A",
    "escapeVelocity": "N/A",
    "luminosity": "Shockwave heated gas collision emission",
    "composition": "Ionized Oxygen, Hydrogen, Helium, interstellar gas dust",
    "discoveryYear": "1784 (William Herschel)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "The Veil Nebula is so large that it is divided into multiple famous sub-structures, including the \"Witch's Broom\" and \"Fleming's Triangular Wisp.\"",
    "The original supernova explosion would have been bright enough to see in the daytime, outshining Venus in the ancient sky.",
    "The expanding shockwave of gas is traveling at over 1.5 million kilometers per hour, continuing to heat interstellar dust."
  ],
  "visuals": {
    "baseColor": "#0ea5e9",
    "secondaryColor": "#ef4444",
    "visualShape": "nebula-cloud"
  },
  "scaleZone": 3
},
{
  "id": "nebula-catseye",
  "name": "Cat's Eye Nebula (NGC 6543)",
  "category": "Nebulae",
  "distanceLy": 3300,
  "distanceString": "3,300 light years",
  "description": "One of the most structurally complex planetary nebulae known, featuring concentric rings, high-speed gas jets, and a beautiful central star. High-resolution Hubble images reveal an intricate, shell-like pattern resembling a cat's eye.",
  "specs": {
    "mass": "0.1 Solar masses (shell)",
    "radius": "0.2 light years (inner core)",
    "temperature": "8,000 K (shell) / 80,000 K (central star)",
    "age": "1,000 years"
  },
  "advancedSpecs": {
    "classification": "Complex Concentric Planetary Nebula",
    "surfaceGravity": "N/A",
    "escapeVelocity": "N/A",
    "luminosity": "Bipolar jet and stellar shell UV emission",
    "composition": "Ionized gas shells, nitrogen-helium central star",
    "discoveryYear": "1786 (William Herschel)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "The concentric rings surrounding the Cat's Eye are spaced like tree rings, indicating the central star ejected its mass in rhythmic pulses every 1,500 years.",
    "It was the first planetary nebula to be studied with a spectroscope, proving that nebulae are made of hot glowing gas.",
    "Its central star is currently losing mass rapidly, expelling a hot stellar wind at 1,900 kilometers per second."
  ],
  "visuals": {
    "baseColor": "#14b8a6",
    "secondaryColor": "#ec4899",
    "visualShape": "nebula-cloud"
  },
  "scaleZone": 3
},
{
  "id": "galaxy-cigar",
  "name": "Cigar Galaxy (M82)",
  "category": "Galaxies (Spiral, Elliptical, Irregular)",
  "distanceLy": 12000000,
  "distanceString": "12 million light years",
  "description": "A high-rate starburst galaxy famous for venting hot material perpendicular to its disk. M82 has been triggered into an intense burst of star formation by a close gravitational encounter with its larger neighbor, M81.",
  "specs": {
    "mass": "5.0 × 10¹⁰ Solar masses",
    "radius": "18,500 light years",
    "temperature": "Varies",
    "age": "12 billion years"
  },
  "advancedSpecs": {
    "classification": "I0 Irregular Starburst Galaxy",
    "surfaceGravity": "Galactic rotation speed ~140 km/s",
    "escapeVelocity": "Estimated 300 - 400 km/s",
    "luminosity": "Combined output ~1.5 × 10¹⁰ L☉",
    "composition": "High gas density, active starburst regions, central supermassive black hole",
    "discoveryYear": "1774 (Johann Elert Bode)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "M82 is forming stars 10 times faster than our Milky Way galaxy, earning it the title of a \"starburst\" galaxy.",
    "Its central regions are venting massive plumes of hot hydrogen gas extending 20,000 light years above and below its disk, driven by frequent supernovae.",
    "It was home to SN 2014J, one of the closest Type Ia supernovae observed in modern times."
  ],
  "visuals": {
    "baseColor": "#ef4444",
    "secondaryColor": "#818cf8",
    "visualShape": "galaxy-spiral"
  },
  "scaleZone": 4
},
{
  "id": "galaxy-centaurus-a",
  "name": "Centaurus A (NGC 5128)",
  "category": "Galaxies (Spiral, Elliptical, Irregular)",
  "distanceLy": 13000000,
  "distanceString": "13 million light years",
  "description": "An active giant elliptical galaxy warped by a colliding spiral disk. Centaurus A is famous for its prominent, thick dark dust lane cutting across its bright center, and its powerful radio jets launching from a central black hole.",
  "specs": {
    "mass": "1.0 × 10¹² Solar masses",
    "radius": "30,000 light years",
    "temperature": "Varies",
    "age": "12.5 billion years"
  },
  "advancedSpecs": {
    "classification": "S0/Ep Active Elliptical Galaxy",
    "surfaceGravity": "Vast elliptical potential well",
    "escapeVelocity": "Estimated ~600 km/s",
    "luminosity": "Combined radio/optical/X-ray output",
    "composition": "Elderly yellow stellar population, colliding young gas disk, 55-million-solar-mass black hole",
    "discoveryYear": "1826 (James Dunlop)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Centaurus A is the fifth-brightest galaxy in the sky, making it a favorite target for amateur astronomers.",
    "The dark dust lane across its middle is the leftover wreckage of a spiral galaxy that was swallowed by Centaurus A about 500 million years ago.",
    "It is one of the closest radio galaxies to Earth, launching massive jets of plasma that are longer than the galaxy itself."
  ],
  "visuals": {
    "baseColor": "#cbd5e1",
    "secondaryColor": "#ea580c",
    "visualShape": "galaxy-elliptical"
  },
  "scaleZone": 4
},
{
  "id": "galaxy-hoags",
  "name": "Hoag's Object",
  "category": "Galaxies (Spiral, Elliptical, Irregular)",
  "distanceLy": 600000000,
  "distanceString": "600 million light years",
  "description": "A rare, perfect ring galaxy consisting of a detached outer ring of bright blue stars surrounding an older, yellow central nucleus. The origin of Hoag's Object remains one of the great mysteries of galactic evolution.",
  "specs": {
    "mass": "7.0 × 10¹¹ Solar masses",
    "radius": "60,000 light years",
    "temperature": "Varies",
    "age": "11 billion years"
  },
  "advancedSpecs": {
    "classification": "Ring Galaxy (Hoag-type)",
    "surfaceGravity": "Unusual ring-bound orbit speeds",
    "escapeVelocity": "Estimated 500 km/s",
    "luminosity": "Combined ring and core emission",
    "composition": "Blue young stars (ring), older yellow stars (core), empty gap of space",
    "discoveryYear": "1950 (Arthur Hoag)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "For many years, Hoag's Object was mistaken for a planetary nebula or a gravitational lens due to its bizarre shape.",
    "Inside the gap between the core and the blue ring, another even more distant ring galaxy can be seen, which is a mind-boggling cosmic coincidence.",
    "Standard galactic collision theories fail to explain its symmetry, as there is no leftover \"bullet\" galaxy in its vicinity."
  ],
  "visuals": {
    "baseColor": "#3b82f6",
    "secondaryColor": "#fbbf24",
    "visualShape": "galaxy-spiral"
  },
  "scaleZone": 4
},
{
  "id": "galaxy-gnz11",
  "name": "GN-z11",
  "category": "Galaxies (Spiral, Elliptical, Irregular)",
  "distanceLy": 32000000000,
  "distanceString": "32 billion light years (Comoving)",
  "description": "An ultra-distant baby galaxy dating back to the earliest cosmic eras, observed just 400 million years after the Big Bang. Because of the expansion of space-time, its light has been highly redshifted into the infrared spectrum.",
  "specs": {
    "mass": "1.0 × 10⁹ Solar masses (1% of Milky Way)",
    "radius": "1,500 light years (extremely compact)",
    "temperature": "Young, hot starburst environment",
    "age": "400 million years (from Big Bang)"
  },
  "advancedSpecs": {
    "classification": "High-Redshift Compact Baby Galaxy (z=10.6)",
    "surfaceGravity": "High density compact potential",
    "escapeVelocity": "Estimated ~100 km/s",
    "luminosity": "Dense blue starburst output",
    "composition": "First-generation metal-poor stars, dense primordial hydrogen gas",
    "discoveryYear": "2015 (Hubble Space Telescope)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "GN-z11 was the most distant galaxy ever discovered until the James Webb Space Telescope detected even older ones in 2022.",
    "The light we see from GN-z11 left the galaxy 13.4 billion years ago, when the Universe was only 3% of its current age.",
    "Despite its tiny size (just 1% of the Milky Way's mass), it was forming stars 20 times faster than our galaxy does today."
  ],
  "visuals": {
    "baseColor": "#ef4444",
    "secondaryColor": "#7f1d1d",
    "visualShape": "galaxy-elliptical"
  },
  "scaleZone": 5
},
{
  "id": "cluster-local-group",
  "name": "The Local Group",
  "category": "Galaxy Groups & Clusters",
  "distanceLy": 5000000,
  "distanceString": "5 million light years (Diameter)",
  "description": "The gravity-bound collection of roughly 80 immediate home galaxies that includes the Milky Way, Andromeda, Triangulum, and dozens of smaller dwarf satellites like the Magellanic Clouds.",
  "specs": {
    "mass": "2.0 × 10¹² Solar masses",
    "radius": "5 million light years (diameter)",
    "temperature": "Varies",
    "age": "13 billion years"
  },
  "advancedSpecs": {
    "classification": "Local Galaxy Group",
    "surfaceGravity": "Group-wide gravitational center",
    "escapeVelocity": "N/A (Bound system)",
    "luminosity": "Total combined stellar luminosity",
    "composition": "Milky Way, Andromeda Galaxy, Triangulum Galaxy, 50+ dwarf satellite galaxies",
    "discoveryYear": "Defined by Edwin Hubble in 1936"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "The center of mass of the Local Group is located somewhere between the Milky Way and the Andromeda Galaxy.",
    "Andromeda and the Milky Way dominate the Local Group, together accounting for over 90% of its total mass.",
    "The Local Group is currently falling toward the much larger Virgo Cluster at a speed of 400 kilometers per second."
  ],
  "visuals": {
    "baseColor": "#c084fc",
    "secondaryColor": "#f472b6",
    "visualShape": "star-cluster"
  },
  "scaleZone": 3
},
{
  "id": "cluster-coma",
  "name": "Coma Cluster",
  "category": "Galaxy Groups & Clusters",
  "distanceLy": 321000000,
  "distanceString": "321 million light years",
  "description": "A densely packed, spherical cluster containing thousands of massive elliptical galaxies in the constellation Coma Berenices. It is a famous target for studying dark matter and cosmic structures.",
  "specs": {
    "mass": "2.0 × 10¹⁵ Solar masses",
    "radius": "10 million light years",
    "temperature": "100,000,000 K (intracluster plasma)",
    "age": "12.5 billion years"
  },
  "advancedSpecs": {
    "classification": "Rich Spherical Galaxy Cluster (Abell 1656)",
    "surfaceGravity": "Deep gravitational potential well",
    "escapeVelocity": "Estimated ~2,000 km/s",
    "luminosity": "Total Combined Cluster Output ~2.0 × 10¹² L☉",
    "composition": "1,000+ massive elliptical galaxies, hot gas plasma, massive dark matter halo",
    "discoveryYear": "1785 (William Herschel)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Astronomer Fritz Zwicky used the Coma Cluster in 1933 to first hypothesize the existence of \"dark matter\" after calculating its galaxies were moving too fast to stay bound.",
    "The central supergiant elliptical galaxy, NGC 4889, houses one of the largest black holes ever measured, weighing 21 billion solar masses.",
    "Its intercluster gas is heated by gravitational compression to 100 million Kelvin, glowing brightly in X-ray light."
  ],
  "visuals": {
    "baseColor": "#a78bfa",
    "secondaryColor": "#f472b6",
    "visualShape": "star-cluster"
  },
  "scaleZone": 4
},
{
  "id": "filament-huge-lqg",
  "name": "Huge-LQG (Large Quasar Group)",
  "category": "Galaxy Filaments (The Cosmic Web)",
  "distanceLy": 4000000000,
  "distanceString": "4.0 billion light years",
  "description": "A gargantuan cosmic structure composed of 73 active quasars, spanning over 4 billion light-years. It is so colossal that its existence challenges the cosmological principle, which states the Universe is homogeneous on large scales.",
  "specs": {
    "mass": "6.1 × 10¹⁸ Solar masses",
    "radius": "4.0 billion light years (length)",
    "temperature": "Quasar accretion gas reaches trillions of K",
    "age": "13.0 billion years"
  },
  "advancedSpecs": {
    "classification": "Large Quasar Group (LQG) Filament",
    "surfaceGravity": "Extremely weak global potential well",
    "escapeVelocity": "N/A",
    "luminosity": "Combined emission of 73 hyper-luminous quasars",
    "composition": "73 active quasars, superclusters, dark matter filaments",
    "discoveryYear": "2013"
  },
  "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "At 4 billion light-years long, Huge-LQG represents about 9% of the radius of the entire observable universe.",
    "It challenges Einstein's Cosmological Principle, which suggests that no structure larger than 1.2 billion light-years should exist in a uniform universe.",
    "The quasars in the group are powered by supermassive black holes that are actively devouring giant accretion disks of plasma."
  ],
  "visuals": {
    "baseColor": "#67e8f9",
    "secondaryColor": "#06b6d4",
    "visualShape": "filament"
  },
  "scaleZone": 5
},
{
  "id": "filament-hercules-wall",
  "name": "Hercules-Corona Borealis Great Wall",
  "category": "Galaxy Filaments (The Cosmic Web)",
  "distanceLy": 10000000000,
  "distanceString": "10.0 billion light years",
  "description": "The largest known structural filament in the observable universe, spanning an astonishing 10 billion light-years. Mapped using gamma-ray bursts, it is a colossal wall of galaxies and dark matter that represents the ultimate scale of the cosmic web.",
  "specs": {
    "mass": "Roughly 2.0 × 10¹⁹ Solar masses",
    "radius": "10 billion light years (length)",
    "temperature": "Warm-Hot Intergalactic Medium",
    "age": "13.5 billion years"
  },
  "advancedSpecs": {
    "classification": "Colossal Cosmic Filament / Great Wall of Galaxies",
    "surfaceGravity": "Negligible global potential",
    "escapeVelocity": "N/A",
    "luminosity": "Combined emission of millions of galaxy systems",
    "composition": "Gamma-ray burst clusters, galaxy superclusters, immense dark matter sheet",
    "discoveryYear": "2013 (István Horváth, Jon Hakkila, and Zsolt Bagoly)"
  },
  "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
  "trivia": [
    "Hercules-Corona Borealis Great Wall is so immense that it spans over 10% of the entire observable universe.",
    "It was discovered by analyzing the clustering of gamma-ray bursts, which are the most energetic explosions in the universe and act as beacons for distant galaxies.",
    "It takes light 10 billion years—nearly 75% of the age of the Universe—to travel from one end of this wall to the other."
  ],
  "visuals": {
    "baseColor": "#34d399",
    "secondaryColor": "#047857",
    "visualShape": "filament"
  },
  "scaleZone": 5
}
];
