/**
 * Mission: Mars - Core Data Models and Constants
 */

export interface TelemetryMetric {
  label: string;
  value: string;
  unit: string;
  detail: string;
}

export interface SpacecraftSubsystem {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  specs: { label: string; value: string }[];
  description: string;
  technicalDetails: string;
  status: 'Nominal' | 'Active' | 'Optimized';
}

export interface MarsLocation {
  id: string;
  name: string;
  designation: string;
  coordinates: string;
  elevation: string;
  diameter: string;
  type: string;
  description: string;
  scientificValue: string;
  status: string;
  pos: [number, number, number]; // 3D coordinates on sphere
}

export interface ColonyStructure {
  id: string;
  name: string;
  category: string;
  crewCapacity: string;
  powerDraw: string;
  shielding: string;
  description: string;
  specifications: string[];
  keyFunction: string;
}

export interface RoverInstrument {
  id: string;
  code: string;
  name: string;
  purpose: string;
  detectionType: string;
  sampleTargets: {
    name: string;
    composition: string;
    significance: string;
    compPercent: number;
  }[];
}

export const MISSION_STAGES = [
  { id: 'earth', index: '01', name: 'Earth', subtitle: 'The Cradle of Humanity' },
  { id: 'launch', index: '02', name: 'Launch', subtitle: 'Trans-Mars Injection' },
  { id: 'space', index: '03', name: 'Deep Space', subtitle: 'Hohmann Transfer' },
  { id: 'arrival', index: '04', name: 'Mars Arrival', subtitle: 'Atmospheric Entry' },
  { id: 'exploration', index: '05', name: 'Exploration', subtitle: 'Surface Reconnaissance' },
  { id: 'colony', index: '06', name: 'Colony', subtitle: 'Ares Base Alpha' },
  { id: 'future', index: '07', name: 'The Future', subtitle: 'Interplanetary Species' },
] as const;

export const SPACECRAFT_SUBSYSTEMS: SpacecraftSubsystem[] = [
  {
    id: 'propulsion',
    name: 'Propulsion Array',
    tagline: 'Dual-mode Methalox vacuum engines + High-efficiency Ion cruise',
    icon: 'Flame',
    status: 'Nominal',
    specs: [
      { label: 'Thrust (Vacuum)', value: '6,600 kN' },
      { label: 'Specific Impulse (Isp)', value: '382 s / 3,400 s (Ion)' },
      { label: 'Propellant Mass', value: '1,200 Metric Tons' },
      { label: 'TMI Delta-V', value: '3,800 m/s' }
    ],
    description: 'High-thrust methane and liquid oxygen engines execute the initial Trans-Mars Injection burn, followed by low-thrust continuous Hall-effect ion propulsion to fine-tune trajectory.',
    technicalDetails: 'Full-flow staged combustion cycles ensure maximum thermodynamic efficiency and allow deep throttling during mid-course orbital trims.'
  },
  {
    id: 'lifesupport',
    name: 'Life Support (ECLSS)',
    tagline: 'Closed-loop environmental control & bioregenerative recycling',
    icon: 'HeartPulse',
    status: 'Nominal',
    specs: [
      { label: 'Oxygen Recovery', value: '98.4 %' },
      { label: 'Water Recycling', value: '98.8 %' },
      { label: 'Internal Pressure', value: '101.3 kPa (1 atm)' },
      { label: 'CO2 Removal Rate', value: '1.2 kg / crew / day' }
    ],
    description: 'Advanced solid amine vacuum desorption loops scrub metabolic carbon dioxide, while upgraded Sabatier reactors synthesize potable water and breathable oxygen.',
    technicalDetails: 'Electrolytic cells run in tandem with algae bioreactors to scrub trace particulates and replenish cabin atmosphere without consuming expendables.'
  },
  {
    id: 'communication',
    name: 'Deep Space Comm Array',
    tagline: 'Optical Laser Transceiver + Steerable X/Ka-band radio',
    icon: 'Radio',
    status: 'Active',
    specs: [
      { label: 'Laser Downlink', value: '250 Mbps' },
      { label: 'RF Backup Link', value: '12 Mbps' },
      { label: 'Current Latency', value: '14 min 22 sec' },
      { label: 'Pointing Accuracy', value: '0.00008 deg' }
    ],
    description: 'Laser communications revolutionize deep space exploration, sending high-definition scientific data and 4K telepresence feeds across hundreds of millions of kilometers.',
    technicalDetails: 'Piezo-stabilized mirrors correct for spacecraft micro-vibrations, maintaining pinpoint lock with Earth Deep Space Optical Network receivers in California and Canberra.'
  },
  {
    id: 'navigation',
    name: 'Autonomous Navigation',
    tagline: 'Deep space optical star trackers & relativistic orbital fix',
    icon: 'Compass',
    status: 'Optimized',
    specs: [
      { label: 'Star Tracker FOV', value: '28 deg (Dual Head)' },
      { label: 'Position Accuracy', value: '± 12.4 m' },
      { label: 'Guidance Refresh', value: '100 Hz' },
      { label: 'Autonomy Level', value: 'Level 5 (Unattended)' }
    ],
    description: 'Because round-trip radio signals take tens of minutes, the spacecraft calculates its trajectory, gravitational perturbations, and trim maneuvers completely autonomously.',
    technicalDetails: 'Optical triangulations against Jupiter, Mars, and known pulsars continuously calibrate the inertial measurement units without relying on ground command.'
  }
];

export const MARS_LOCATIONS: MarsLocation[] = [
  {
    id: 'olympus-mons',
    name: 'Olympus Mons',
    designation: 'Tharsis Volcanic Region',
    coordinates: '18.65° N, 226.2° E',
    elevation: '21.9 km (72,000 ft)',
    diameter: '624 km',
    type: 'Shield Volcano',
    description: 'The tallest planetary mountain in the Solar System. Its peak extends almost three times higher than Mount Everest, penetrating past the dense lower atmosphere into near-vacuum.',
    scientificValue: 'Ancient lava tube networks along the caldera slopes provide natural subterranean radiation shielding for future deep exploration camps.',
    status: 'Surveyed by MRO HiRISE',
    pos: [0.72, 0.32, 0.61]
  },
  {
    id: 'valles-marineris',
    name: 'Valles Marineris',
    designation: 'Equatorial Tectonic Trough',
    coordinates: '13.9° S, 300.8° E',
    elevation: '−7.0 km below datum',
    diameter: '4,000 km length',
    type: 'Tectonic Canyon System',
    description: 'A colossal tectonic chasm spanning roughly one-fifth of the circumference of Mars. If placed on Earth, it would stretch from New York to Los Angeles.',
    scientificValue: 'Exposes deep crustal geological stratigraphy spanning four billion years of Martian history, with recurrent slope lineae hinting at seasonal hydration.',
    status: 'High Priority Exploration Corridor',
    pos: [0.35, -0.24, 0.90]
  },
  {
    id: 'jezero-crater',
    name: 'Jezero Crater',
    designation: 'Syrtis Major Quadrangle',
    coordinates: '18.38° N, 77.58° E',
    elevation: '−2.5 km',
    diameter: '45 km',
    type: 'Paleo-Lake Delta',
    description: 'The historic touchdown zone of the NASA Perseverance rover. A billion years ago, a prominent river breached the crater rim, depositing an immense sediment delta.',
    scientificValue: 'Fine-grained clay minerals preserve prime conditions for the fossilization of microscopic organic biosignatures.',
    status: 'Active Rover Sampling Site',
    pos: [-0.68, 0.31, 0.66]
  },
  {
    id: 'planum-boreum',
    name: 'Planum Boreum',
    designation: 'Northern Polar Plateau',
    coordinates: '88.0° N, 0.0° E',
    elevation: '2.0 km above plains',
    diameter: '1,000 km',
    type: 'Perennial Ice Cap',
    description: 'The vast northern polar cap, composed primarily of water-ice layered with atmospheric dust, capped by a seasonal winter mantle of solid carbon dioxide frost.',
    scientificValue: 'Contains an estimated 1.6 million cubic kilometers of water ice—enough to sustain a human colony for hundreds of generations and fuel return voyages.',
    status: 'Strategic Water Resource Reserve',
    pos: [0.05, 0.98, 0.12]
  },
  {
    id: 'arcadia-planitia',
    name: 'Arcadia Planitia',
    designation: 'Lowland Volcanic Plain',
    coordinates: '39.3° N, 189.7° E',
    elevation: '−4.0 km',
    diameter: '1,800 km',
    type: 'Ice-Rich Alluvial Plain',
    description: 'A smooth, geologically stable volcanic plain characterized by shallow, accessible sheets of clean glacial water ice buried just 1 to 2 meters beneath the surface regolith.',
    scientificValue: 'Prime landing and settlement candidate due to low elevation (higher atmospheric density aids braking) and direct access to surface-excavatable ice for ISRU.',
    status: 'Candidate Settlement Zone Alpha',
    pos: [0.65, 0.63, 0.42]
  }
];

export const COLONY_STRUCTURES: ColonyStructure[] = [
  {
    id: 'habitat-alpha',
    name: 'Pressurized Geodesic Habitat',
    category: 'Crew Living Quarters',
    crewCapacity: '32 Astronauts',
    powerDraw: '45 kW',
    shielding: '3.0 m Compacted Regolith Berm',
    description: 'Tri-level interlocking subterranean vaults providing crew quarters, medical infirmary, galley, recreational space, and dual redundant airlocks.',
    specifications: [
      'Atmospheric pressure maintained at 101.3 kPa with 21% O2 / 79% N2 mix',
      'Structural shell built from carbon-composite ribs and 3D sintered basalt arches',
      'Integrated water wall jackets reduce galactic cosmic ray dosage by 92%'
    ],
    keyFunction: 'Provides habitable sanctuary and radiation protection for all long-duration expedition personnel.'
  },
  {
    id: 'biogreenhouse',
    name: 'Aeroponic Agricultural Dome',
    category: 'Food & Biomass Production',
    crewCapacity: 'Support 40 Crew Daily',
    powerDraw: '85 kW (LED PAR Spectrum)',
    shielding: 'ETFE Double-Glazed UV-C Filter',
    description: 'High-density vertical aeroponic farming bays cultivating dwarf wheat, potatoes, spirulina algae, soybeans, and nitrogen-fixing legumes under automated LED lighting.',
    specifications: [
      'Water consumption reduced by 95% compared to conventional soil agriculture',
      'Biomass turnover: 180 kg dry caloric food equivalent harvested every 30 Sols',
      'Provides supplemental biological air scrub and psychological green space'
    ],
    keyFunction: 'Ensures dietary independence from Earth supply chains and closes the biological oxygen-carbon loop.'
  },
  {
    id: 'research-lab',
    name: 'Astrobiology & Geology Lab',
    category: 'Scientific Analysis',
    crewCapacity: '12 Researchers',
    powerDraw: '60 kW',
    shielding: 'Reinforced Sintered Shell',
    description: 'ISO-4 cleanrooms equipped with automated electron microscopy, DNA sequencer chips, mass spectrometers, and sample quarantine gloveboxes for pristine core handling.',
    specifications: [
      'Positive pressure bio-containment prevents cross-contamination of planetary samples',
      'Real-time isotopic analysis for radiogenic dating and ancient organic molecule verification',
      'Direct fiber data link to Earth university and agency consortiums'
    ],
    keyFunction: 'Unlocks the answers to whether life ever emerged independently on Mars.'
  },
  {
    id: 'energy-grid',
    name: 'Nuclear & Solar Energy Hub',
    category: 'Primary Power Generation',
    crewCapacity: 'Autonomous / Remote',
    powerDraw: 'Supplies 1.2 MW Continuous',
    shielding: 'Subsurface Placement / Borated Concrete',
    description: 'A resilient hybrid grid combining four 10-kWe Kilopower Stirling fission reactors buried in remote craters with a 10-hectare dust-repellent solar array and vanadium redox flow batteries.',
    specifications: [
      'Kilopower fission cores provide unyielding baseload power through Martian dust storms',
      'Electrostatic dust-shedding solar panels maintain 94% efficiency even during seasonal haze',
      'Cryogenic heat exchangers capture reactor waste heat to warm colony living quarters'
    ],
    keyFunction: 'Supplies uninterrupted megawatt-class electricity to life support, ISRU chemical plants, and rovers.'
  },
  {
    id: 'rover-hangar',
    name: 'Pressurized Rover & Logistics Bay',
    category: 'Surface Mobility & EVA Hub',
    crewCapacity: '4 Heavy Rovers + 8 Crew',
    powerDraw: '50 kW',
    shielding: 'Regolith Arched Hangar',
    description: 'A pressurized maintenance depot capable of docking multi-crew long-range pressurized rovers, servicing robotic haulers, and staging 14-day traverse expeditions.',
    specifications: [
      'Automated dust-removal air showers decontaminate EVA space suits in 90 seconds',
      '3D additive manufacturing lathe mills replacement gears and titanium brackets on demand',
      'Fast-charging umbilical arms recharge rover solid-state batteries in 40 minutes'
    ],
    keyFunction: 'Expands the expedition exploration radius up to 500 kilometers from the central outpost.'
  },
  {
    id: 'isru-launchpad',
    name: 'ISRU Fuel Plant & Return Pad',
    category: 'Propellant Synthesis & Launch',
    crewCapacity: 'Autonomous / Remote Operations',
    powerDraw: '450 kW (Peak Electrolysis)',
    shielding: 'Blast Deflector Berms',
    description: 'The In-Situ Resource Utilization plant mines subsurface water ice and captures atmospheric carbon dioxide, converting them via the Sabatier reaction into liquid methane and liquid oxygen for Earth return.',
    specifications: [
      'Chemical reaction: CO2 + 4H2 -> CH4 + 2H2O -> Liquid Methane (CH4) & Cryogenic LOX',
      'Production capacity: 30 metric tons of rocket propellant synthesized every 100 Sols',
      'Reinforced landing pad equipped with acoustic suppression trenches and laser landing beacons'
    ],
    keyFunction: 'Enables the return leg of the mission, proving the feasibility of reusable interplanetary flight.'
  }
];

export const ROVER_INSTRUMENTS: RoverInstrument[] = [
  {
    id: 'mastcam',
    code: 'MASTCAM-Z',
    name: 'Multispectral Stereo Imaging Mast',
    purpose: 'High-resolution zoomable 3D imaging and mineral reflectance spectroscopy',
    detectionType: 'Visible & Near-Infrared Optics (400 - 1000 nm)',
    sampleTargets: [
      { name: 'Basaltic Regolith', composition: 'Pyroxene & Plagioclase feldspar', significance: 'Primary igneous volcanic crust', compPercent: 68 },
      { name: 'Hematite Spherules', composition: 'Iron oxide (Fe2O3) "blueberries"', significance: 'Formed through ancient groundwater percolation', compPercent: 84 },
      { name: 'Silica Sinter Bed', composition: 'Hydrated amorphous silica (SiO2·nH2O)', significance: 'Evidence of former hydrothermal spring vents', compPercent: 92 }
    ]
  },
  {
    id: 'pixl',
    code: 'PIXL',
    name: 'Planetary Instrument for X-ray Lithochemistry',
    purpose: 'Micro-focus X-ray fluorescence spectrometer for fine element mapping',
    detectionType: 'Sub-millimeter X-ray beam elemental detection',
    sampleTargets: [
      { name: 'Carbonate Outcrop', composition: 'Magnesium-iron carbonate (Mg,Fe)CO3', significance: 'Direct indicator of non-acidic ancient waters', compPercent: 79 },
      { name: 'Clay Mudstone', composition: 'Smectite phyllosilicates', significance: 'High preservation potential for ancient micro-fossils', compPercent: 95 },
      { name: 'Sulfate Veins', composition: 'Calcium sulfate (Gypsum / Bassanite)', significance: 'Crystallized from evaporating terminal saline brines', compPercent: 88 }
    ]
  },
  {
    id: 'sherloc',
    code: 'SHERLOC',
    name: 'Scanning Habitable Environments with Raman & Luminescence',
    purpose: 'Deep ultraviolet fluorescence and Raman spectroscopy for organic molecules',
    detectionType: '248.6 nm Deep-UV Laser Pulse',
    sampleTargets: [
      { name: 'Aromatic Hydrocarbons', composition: 'Ring-structured carbon polymers', significance: 'Potential pre-biotic or biological organic signatures', compPercent: 82 },
      { name: 'Subsurface Perchlorates', composition: 'Magnesium perchlorate Mg(ClO4)2', significance: 'Hazardous soil oxidizer; critical to soil remediation', compPercent: 91 },
      { name: 'Glacial Water Ice', composition: 'H2O with dissolved mineral salts', significance: 'Vital drinking and rocket fuel precursor resource', compPercent: 99 }
    ]
  },
  {
    id: 'rimfax',
    code: 'RIMFAX',
    name: 'Radar Imager for Mars Subsurface Experiment',
    purpose: 'Ground-penetrating radar probing structural geological layers up to 15m deep',
    detectionType: 'Ultra-Wideband GPR (150 - 1200 MHz)',
    sampleTargets: [
      { name: 'Cross-Bedded Sandstone', composition: 'Lithified ancient dune structures', significance: 'Records paleo-wind regimes and climatic shifts', compPercent: 74 },
      { name: 'Buried Ice Sheet', composition: 'Porous basalt regolith over massive ice', significance: 'Direct accessible reservoir for colony ISRU wells', compPercent: 96 },
      { name: 'Fault Boundary Zone', composition: 'Fractured bedrock breccia', significance: 'Subsurface conduits for hydrothermal fluids', compPercent: 65 }
    ]
  }
];

export const PLANETARY_COMPARISONS = [
  {
    parameter: 'Surface Gravity',
    earthValue: '9.81 m/s² (1.00 g)',
    marsValue: '3.72 m/s² (0.38 g)',
    ratio: 38,
    unit: 'm/s²',
    implication: '38% of Earth gravity. Causes long-term bone density and muscle loss without daily resistance exercise and artificial centrifuges.'
  },
  {
    parameter: 'Atmospheric Pressure',
    earthValue: '101.3 kPa (1.00 atm)',
    marsValue: '0.61 kPa (0.006 atm)',
    ratio: 1,
    unit: 'kPa',
    implication: 'Less than 1% of Earth pressure. Unprotected human blood would boil at body temperature (Armstrong limit ~6.3 kPa). Requires pressurized suits.'
  },
  {
    parameter: 'Average Temperature',
    earthValue: '+14.9 °C (Global Mean)',
    marsValue: '−63.0 °C (Ranges −140 to +20 °C)',
    ratio: 35,
    unit: '°C',
    implication: 'Extreme arctic cold requiring multi-layer thermal insulation and waste heat recycling from fission cores.'
  },
  {
    parameter: 'Atmosphere Composition',
    earthValue: '78% N2, 21% O2, 0.04% CO2',
    marsValue: '95.3% CO2, 2.6% N2, 0.13% O2',
    ratio: 95,
    unit: '% CO2',
    implication: 'Carbon dioxide is lethal to breathe directly, but serves as abundant raw material for oxygen and methane synthesis via MOXIE.'
  },
  {
    parameter: 'Annual Radiation Dose',
    earthValue: '0.33 mSv / year (Background)',
    marsValue: '240 – 300 mSv / year (Surface)',
    ratio: 80,
    unit: 'mSv/yr',
    implication: 'No planetary magnetosphere leaves the surface exposed to solar particle events and cosmic rays. Demands 2–3m regolith shielding on habitats.'
  },
  {
    parameter: 'One-Way Light Speed Delay',
    earthValue: '< 0.05 seconds (Global Net)',
    marsValue: '3.1 to 22.3 minutes (Orbital distance)',
    ratio: 70,
    unit: 'min',
    implication: 'Real-time conversation with Earth is physically impossible. All landing procedures, medical emergencies, and rover navigation must be autonomous.'
  }
];
