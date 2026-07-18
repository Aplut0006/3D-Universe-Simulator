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
  }
];
