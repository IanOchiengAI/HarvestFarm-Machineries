import { Product, Category, Testimonial } from './types';

export const PHONE_NUMBER = "+254713812392";
export const WHATSAPP_LINK = `https://wa.me/254713812392`;
export const LOCATION_LINK = "https://maps.google.com/?q=Nakuru+Kenya+Harvest+Farm+Machinery";

export const CATEGORIES: Category[] = [
  { id: 'posho-mills', name: 'Posho Mills', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600' },
  { id: 'hullers', name: 'Hullers', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=600' },
  { id: 'chopper-mills', name: 'Chopper Mills', image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600' },
  { id: 'roller-mills', name: 'Roller Mills', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600' },
  { id: 'maize-shellers', name: 'Maize Shellers', image: 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&q=80&w=600' },
  { id: 'animal-feed-machines', name: 'Animal Feed Machines', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600' },
  { id: 'crop-spraying', name: 'Crop Spraying', image: '/trolley-sprayer.jpg' },
  { id: 'block-machines', name: 'Block Machines', image: '/electric-solid-block-making-machine.jpg' },
  { id: 'chaffcutters', name: 'Chaffcutters', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'trolley-sprayer',
    name: 'Trolley Sprayer',
    category: 'Crop Spraying',
    price: 45000,
    image: '/trolley-sprayer.jpg',
    description: 'High-pressure trolley sprayer powered by a reliable 8HP petrol engine. Designed for fast, uniform, and effortless liquid chemical, pesticide, and fertilizer application. Ideal for medium to large horticultural shambas.',
    specs: {
      'Engine': '8HP Petrol Engine',
      'Pump Type': 'High-Pressure Piston Pump',
      'Frame': 'Sturdy black steel trolley with wheels',
      'Hose Reel': 'Manual reel with 50m high-pressure hose',
      'Application': 'Water, insecticides, pesticides, herbicides, foliar fertilizers',
      'Mobility': 'Excellent maneuverability across uneven terrain'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Nyeri', 'Meru']
  },
  {
    id: 'electric-solid-block-machine',
    name: 'Electric Solid Block-Making Machine',
    category: 'Block Machines',
    price: 260000,
    image: '/electric-solid-block-making-machine.jpg',
    description: 'Imported high-performance electric concrete solid block-making machine. Built with robust hydraulic cylinders and dual heavy-duty electric vibrators for high-density compression and optimal brick strength.',
    specs: {
      'Block Type': 'Solid Concrete Blocks',
      'Production Capacity': 'Produces 3 complete blocks per cycle',
      'Operation': 'Hydraulic system for smooth molds',
      'Vibration': 'Dual electric vibrators for maximum compaction',
      'Power Source': 'Heavy Duty Electric Motor',
      'Ideal For': 'Commercial construction and brick-making yards'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Nairobi', 'Eldoret']
  },
  {
    id: 'electric-hollow-block-machine',
    name: 'Electric Hollow Block-Making Machine',
    category: 'Block Machines',
    price: 260000,
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800',
    description: 'Robust electric hollow concrete block-making machine. Specifically optimized for standard commercial hollow building blocks, delivering consistent dimensional accuracy and superior compression density.',
    specs: {
      'Block Type': 'Hollow Concrete Blocks',
      'Production Capacity': 'Produces 3 complete hollow blocks per cycle',
      'Operation': 'Hydraulic leverage system',
      'Compression': 'Dual structural vibrator units',
      'Power Source': 'Electric motor drive',
      'Durability': 'Reinforced structural steel frame'
    },
    stockStatus: 'in-stock',
    popularIn: ['Mombasa', 'Kisumu', 'Thika']
  },
  {
    id: 'electric-block-machine-pair',
    name: 'Electric Block-Making Machine (PAIR)',
    category: 'Block Machines',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    description: 'Double production setup featuring two synchronized high-performance electric block-making units. Increases commercial yard throughput and scales masonry supply operations efficiently. Bundle saving included.',
    specs: {
      'Units Included': 'Two (2) complete block-making machines',
      'Total Output': 'Up to 6 blocks per compression cycle',
      'Compression System': 'Dual hydraulic + vibrator sets',
      'Savings': 'Ksh 20,000 bundle discount',
      'Target Users': 'Large construction firms and block suppliers'
    },
    stockStatus: 'limited',
    popularIn: ['Nakuru', 'Nairobi', 'Machakos']
  },
  {
    id: '7-5hp-electric-choppermill',
    name: '7.5 HP Electric Choppermill',
    category: 'Chopper Mills',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'High-performance commercial chopper mill equipped with a powerful 7.5 HP electric motor. Easily chops Napier grass and silage, while crushing dried grains for comprehensive stock feed preparation.',
    specs: {
      'Motor': '7.5 HP Heavy Duty Electric Motor',
      'Chute': 'Dual entry chute for forage and grains',
      'Capacity': '1.5 - 2 Tonnes per Hour',
      'Frame': 'Sturdy iron chassis on heavy-duty wheels',
      'Warranty': '1 Year Full Support'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Nyandarua', 'Kericho', 'Nyeri']
  },
  {
    id: '3hp-electric-choppermill',
    name: '3HP Electric Choppermill',
    category: 'Chopper Mills',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Efficient, compact agricultural chopper mill powered by a 3HP single-phase electric motor. Ideal for small-scale dairy shambas looking to simplify Napier grass chopping and maize crushing.',
    specs: {
      'Motor': '3 HP Single-Phase Electric Motor',
      'Capacity': '800 - 1000 Kg per Hour',
      'Portability': 'Compact lightweight frame on wheels',
      'Power requirement': 'Standard domestic 240V connection'
    },
    stockStatus: 'in-stock',
    popularIn: ['Kiambu', 'Murang\'a', 'Embu']
  },
  {
    id: 'electric-car-wash-machine',
    name: 'Electric Car Wash Machine',
    category: 'Crop Spraying',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800',
    description: 'Commercial grade high-pressure electric car wash machine. Mounted on a heavy-duty cart with pneumatic wheels, designed for commercial car washes, agricultural cleaning, and dairy parlour sanitation.',
    specs: {
      'Motor': 'High-Efficiency Electric Motor',
      'Pump': 'Heavy-Duty Brass Triplex Plunger Pump',
      'Pressure': 'Adjustable high-pressure stream',
      'Frame': 'Steel trolley protective cage',
      'Attachments': 'Includes pressure gun and heavy-duty hose'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru CBD', 'Nairobi', 'Kisumu']
  },
  {
    id: 'gam-unga-no2-poshomill',
    name: 'GAM Unga No.2 Poshomill',
    category: 'Posho Mills',
    price: 100000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'The standard choice for commercial milling business. The GAM Unga No.2 hammer mill crushes grains into fine sifted maize meal in a single pass. Designed for reliability in busy Rift Valley market centres.',
    specs: {
      'Category': 'Commercial Poshomill',
      'Capacity': '4-5 Bags per Hour',
      'Sifter': 'Built-in rotary fine grade sifter',
      'Chassis': 'Vibration-damped structural steel',
      'Cyclone': 'Side-mount air discharge cyclone'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Eldoret', 'Bomet']
  },
  {
    id: 'duo-choppermill-petrol',
    name: 'Duo Choppermill (Petrol)',
    category: 'Chopper Mills',
    price: 60000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Dual-purpose chopper mill powered by an 8HP petrol engine. Chops green crops like Napier grass and stalks into silage, while simultaneously grinding dry corn cobs and grains into customized animal feeds.',
    specs: {
      'Engine': '8HP Petrol Engine',
      'Dual Function': 'Silage chopping + dry grain grinding',
      'Portability': 'Sturdy wheeled frame with drag handles',
      'Silage Output': '1.2 - 1.5 Tonnes per Hour'
    },
    stockStatus: 'in-stock',
    popularIn: ['Kericho', 'Bomet', 'Narok']
  },
  {
    id: 'duo-choppermill-diesel',
    name: 'Duo Choppermill (Diesel)',
    category: 'Chopper Mills',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Heavy-duty diesel powered duo choppermill. Equipped with a high-torque 10HP diesel engine for superior fuel economy and relentless operational capacity, designed for large dairy estates.',
    specs: {
      'Engine': '10HP Fuel-Efficient Diesel Engine',
      'Function': 'Dual forage cutter and crop crusher',
      'Output': 'Up to 2.5 Tonnes per Hour',
      'Chassis': 'Reinforced heavy-duty cart with wheels'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nyandarua', 'Laikipia', 'Trans Nzoia']
  },
  {
    id: 'maize-sheller',
    name: 'Maize Sheller',
    category: 'Maize Shellers',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&q=80&w=800',
    description: 'Fast, efficient maize sheller designed to shell dry maize and separate the cobs cleanly. Saves time and eliminates labor-intensive manual shelling during the harvest rush.',
    specs: {
      'Capacity': '15-20 Bags of maize per Hour',
      'Power Source': '7.5HP Engine / Motor compatible',
      'Grain Loss': 'Under 1.5%',
      'Casing': 'Heavy gauge welded iron plate'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Trans Nzoia', 'Uasin Gishu', 'Bungoma']
  },
  {
    id: 'feed-crusher',
    name: 'Feed Crusher',
    category: 'Animal Feed Machines',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&q=80&w=800',
    description: 'High-speed feed crusher optimized for grinding dry crops, maize kernels, sunflower hulls, and sorghum into high-nutrient livestock feeds. Essential for professional feed formulation yards.',
    specs: {
      'Motor': '5HP Electric Motor or Engine equivalent',
      'Grinding Chamber': 'Multi-hammer impact system',
      'Output Capacity': '500 - 800 Kg per Hour',
      'Sieving Screen': 'Interchangeable screen meshes for coarse/fine feeds'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Laikipia', 'Nanyuki']
  },
  {
    id: 'feed-mixer',
    name: 'Feed Mixer',
    category: 'Animal Feed Machines',
    price: 275000,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
    description: 'Industrial-grade vertical animal feed mixer. Ensures perfectly homogeneous blending of dry grains, mineral concentrates, and silage mixes, maximizing dairy and poultry nutritional intake.',
    specs: {
      'Mixing Drum Capacity': '500 Kg per Batch',
      'Mixing Mechanism': 'Heavy-duty central auger screw',
      'Motor': '10HP Electric Motor',
      'Material': 'Industrial-grade steel sheeting'
    },
    stockStatus: 'limited',
    popularIn: ['Nairobi', 'Kiambu', 'Nakuru']
  },
  {
    id: 'choppermill-milano',
    name: 'Choppermill-Milano',
    category: 'Chopper Mills',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Premium chopper mill featuring the advanced Milano forage-cutting head. Painted in vibrant red and yellow, it chops silage and grinds grains with unmatched precision and speed.',
    specs: {
      'Chamber Type': 'Milano structural head',
      'Engine': '8HP Keystart Petrol Engine compatible',
      'Mounting': 'Premium wheeled frame with support legs',
      'Blades': 'Tempered carbon steel forage blades'
    },
    stockStatus: 'in-stock',
    popularIn: ['Meru', 'Embu', 'Kirinyaga']
  },
  {
    id: 'electric-chaffcutter',
    name: 'Electric Chaffcutter',
    category: 'Chaffcutters',
    price: 53000,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
    description: 'Classic high-torque electric chaffcutter mounted on a sturdy tripod stand. Features a heavy circular cast-iron flywheel with 3 precision cutting blades, optimized for clean forage slicing.',
    specs: {
      'Power Source': '3HP High-Torque Electric Motor',
      'Flywheel': 'Heavy-duty cast iron balancing wheel',
      'Stand': 'Triangular vibration-absorbing steel base',
      'Suitable For': 'Napier grass, hay, lucerne, straw'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Nyeri', 'Nyandarua']
  },
  {
    id: '3-blade-petrol-chaffcutter',
    name: '3 Blade Petrol Chaffcutter',
    category: 'Chaffcutters',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
    description: 'Independent 3-blade forage cutter powered by an efficient 5HP petrol engine. Designed for farms without electric hookups, enabling premium quality silage cutting directly in the shamba.',
    specs: {
      'Engine': '5HP Petrol Engine',
      'Blade Count': '3 hardened steel cutting blades',
      'Transmission': 'Double V-belt drive',
      'Flywheel': 'Large balancing flywheel for smooth stroke inertia'
    },
    stockStatus: 'in-stock',
    popularIn: ['Kericho', 'Kisii', 'Narok']
  },
  {
    id: '2-blade-petrol-chaffcutter',
    name: '2 Blade Petrol Chaffcutter',
    category: 'Chaffcutters',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
    description: 'Highly economical 2-blade petrol chaffcutter. Slices through Napier grass and green forage cleanly, keeping feed prep fast and simple for smallholder dairy shambas.',
    specs: {
      'Engine': '5.5HP Petrol Engine',
      'Blade Count': '2 balanced steel blades',
      'Portability': 'Compact footprint, easy to transport'
    },
    stockStatus: 'in-stock',
    popularIn: ['Laikipia', 'Samburu', 'Baringo']
  },
  {
    id: 'lpg-chaffcutter',
    name: 'LPG Chaffcutter',
    category: 'Chaffcutters',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
    description: 'Innovative and environmentally friendly chaffcutter modified to run on LPG gas cylinder fuel. Offers cleaner operations, easier keystarts, and significant fuel cost savings over standard petrol.',
    specs: {
      'Fuel Source': 'LPG Gas Cylinder connection',
      'Engine': 'Eco-efficient gas converted engine',
      'Blade System': '3 precision balanced steel blades',
      'Chassis': 'Tripod steel frame on wheels'
    },
    stockStatus: 'limited',
    popularIn: ['Nakuru', 'Nairobi', 'Kiambu']
  },
  {
    id: 'pto-choppermill',
    name: 'P.T.O Choppermill',
    category: 'Chopper Mills',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Tractor-driven Power Take-Off (PTO) chopper mill. Hooks up directly to standard tractor drives, enabling high-volume silage chopping and grain crushing directly in the fields.',
    specs: {
      'Power Source': 'Tractor PTO Shaft driven',
      'Output': 'Up to 3 Tonnes per Hour',
      'Connection': 'Standard 3-point tractor linkage',
      'Blades': 'Heavy-duty steel hammer and knife system'
    },
    stockStatus: 'in-stock',
    popularIn: ['Trans Nzoia', 'Uasin Gishu', 'Narok']
  },
  {
    id: 'pto-silage-blower',
    name: 'PTO Silage Blower',
    category: 'Chopper Mills',
    price: 130000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Heavy duty tractor-driven silage blower. Designed to shoot cut silage and forage directly into high silos or bulk silage transportation trailers with extreme speed.',
    specs: {
      'Power Source': 'Tractor PTO driven',
      'Blowing Fan': 'Multi-paddle high velocity air turbine',
      'Outlet': '360 degree adjustable blowing spout',
      'Frame': 'Reinforced steel linkage frame on wheels'
    },
    stockStatus: 'in-stock',
    popularIn: ['Uasin Gishu', 'Nakuru', 'Laikipia']
  },
  {
    id: '22hp-diesel-silage-blower',
    name: '22HP Diesel Silage Blower',
    category: 'Chopper Mills',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-powerful silage blower powered by an independent 22HP heavy-duty diesel engine. Blows silage into elevated silos at massive capacities without needing a tractor.',
    specs: {
      'Engine': '22HP Heavy-Duty Diesel Engine',
      'Starter': 'Key start ignition system',
      'Air Blower': 'High-velocity steel paddle turbine',
      'Chassis': 'Heavy-duty steel trailer with wheels'
    },
    stockStatus: 'limited',
    popularIn: ['Trans Nzoia', 'Nakuru', 'Meru']
  },
  {
    id: '22hp-diesel-choppermill',
    name: '22HP Diesel Choppermill',
    category: 'Chopper Mills',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate independent chopper mill. Utilizing an enormous 22HP diesel engine, it chops, grinds, and crushes bulk crops at commercial silage depot rates.',
    specs: {
      'Engine': '22HP High-Torque Diesel Engine',
      'Capacity': '3.5 - 4.5 Tonnes per Hour',
      'Function': 'Dual commercial forage cutter + crop crusher',
      'Drive': 'Tri-belt power transmission'
    },
    stockStatus: 'limited',
    popularIn: ['Nyandarua', 'Nandi', 'Eldoret']
  },
  {
    id: '10hp-diesel-choppermill',
    name: '10HP Diesel Powered Choppermill',
    category: 'Chopper Mills',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Highly competitive and fuel-efficient 10HP diesel choppermill. Perfect for farmers looking for diesel durability and low running costs at an exceptionally accessible price.',
    specs: {
      'Engine': '10HP Fuel-efficient Diesel Engine',
      'Silage Capacity': '1.8 - 2.2 Tonnes per Hour',
      'Frame': 'Wheeled steel cart frame'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Narok', 'Kericho']
  },
  {
    id: '13hp-keystart-petrol-choppermill',
    name: '13HP Keystart Petrol Choppermill',
    category: 'Chopper Mills',
    price: 90000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Vibrant and robust choppermill featuring a 13HP petrol engine with an electric keystart system. Eliminates pull-cord strain, providing high horsepower on demand.',
    specs: {
      'Engine': '13HP Petrol Engine',
      'Starter': 'Key start (electric ignition) + manual recoil backup',
      'Capacity': '2.5 Tonnes per Hour',
      'Blades': 'Reinforced hammer/knife heads'
    },
    stockStatus: 'in-stock',
    popularIn: ['Meru', 'Nyeri', 'Kakamega']
  },
  {
    id: '7-5hp-petrol-choppermill',
    name: '7.5HP Petrol Choppermill',
    category: 'Chopper Mills',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Vibrant, cost-effective petrol chopper mill. Driven by a 7.5HP petrol engine, it offers excellent forage chopping and crop grinding at our most accessible price point.',
    specs: {
      'Engine': '7.5HP Petrol Engine',
      'Capacity': '1.2 - 1.5 Tonnes per Hour',
      'Frame': 'Compact wheeled cart'
    },
    stockStatus: 'in-stock',
    popularIn: ['Bungoma', 'Kakamega', 'Kisii']
  },
  {
    id: 'poshomill-huller-set',
    name: 'Poshomill and Huller',
    category: 'Posho Mills',
    price: 155000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate grain milling bundle. Combines a high-efficiency maize huller and a commercial poshomill with cyclones into a coordinated, synchronized commercial setup.',
    specs: {
      'Included Units': '1 Maize Huller + 1 Poshomill unit',
      'Combined Capacity': '3-4 Bags per Hour (Hulling & Milling)',
      'Power Source': 'Standard electric motors / engines included',
      'Bundle Discount': 'Excellent price advantage over individual purchases'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Eldoret', 'Bomet']
  },
  {
    id: 'maize-huller',
    name: 'Maize Huller',
    category: 'Hullers',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800',
    description: 'Precision maize huller designed to remove husks and bran from maize kernels prior to milling, ensuring clean white grains for premium grade sifted flour.',
    specs: {
      'Capacity': '500 - 800 Kg per Hour',
      'Power Source': '5HP Electric Motor compatible',
      'Cyclone': 'Side-mount dust/bran separator cyclone',
      'Efficiency': '98% hulling recovery rate'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Kericho', 'Kisumu']
  },
  {
    id: 'huller-shaker',
    name: 'Huller Shaker',
    category: 'Hullers',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced maize huller integrated with a reciprocating sieve shaking table. Separates hulled grains, fine dust, and broken particles instantly for exceptional output quality.',
    specs: {
      'Huller Type': 'Combined Huller and Shaker Sieve',
      'Separation': 'Reciprocating grade sieve table',
      'Power Source': 'Single or three-phase electric motor',
      'Frame': 'Vibration-damping structural steel base'
    },
    stockStatus: 'in-stock',
    popularIn: ['Uasin Gishu', 'Trans Nzoia', 'Nairobi']
  },
  {
    id: 'disc-mill',
    name: 'Disc Mill',
    category: 'Posho Mills',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'High-speed industrial disc mill. Utilizes heavy-duty grinding discs to crush dried grains, maize, rice, and sorghum into fine flour or customized cereal feed meals.',
    specs: {
      'Milling Mechanism': 'Cast-iron grinding plates/discs',
      'Capacity': '400 - 600 Kg per Hour',
      'Motor': '5HP High-Speed Electric Motor',
      'Suitable Crops': 'Maize, Rice, Wheat, Sorghum, Millet'
    },
    stockStatus: 'in-stock',
    popularIn: ['Kisumu', 'Kakamega', 'Siaya']
  },
  {
    id: 'combined-rice-disc-mill',
    name: 'Combined Rice and Disc Mill',
    category: 'Posho Mills',
    price: 130000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Innovative dual-action machine combining a precision rice mill and a high-speed disc mill in a single frame. Allows commercial operators to mill rice and crush other grains on a single setup.',
    specs: {
      'Left Side': 'Precision Rice Dehusker and Polisher',
      'Right Side': 'High-Speed Disc Grinding Mill',
      'Motor': '7.5HP Electric Motor driving both systems',
      'Structure': 'Compact dual-belt iron stand chassis'
    },
    stockStatus: 'in-stock',
    popularIn: ['Mwea', 'Ahero', 'Kisumu']
  },
  {
    id: 'degermer-rice-mill',
    name: 'Degermer/Rice Mill',
    category: 'Hullers',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800',
    description: 'High-performance grain degermer and rice polisher. Removes tough germ heads, outer hulls, and polishes rice or maize kernels to standard commercial grades.',
    specs: {
      'Primary Function': 'Corn degerming and rice polishing',
      'Capacity': '800 - 1000 Kg per Hour',
      'Frame': 'Heavy-duty steel plate casing',
      'Air System': 'High pressure blower fan for chaff separation'
    },
    stockStatus: 'limited',
    popularIn: ['Kirinyaga', 'Busia', 'Migori']
  },
  {
    id: 'rollermill-set',
    name: 'Rollermill Set',
    category: 'Roller Mills',
    price: 395000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    description: 'Double roller mill set with dual sifter tables. Engineered to crush maize kernels between high-pressure rollers, producing top-grade, bakery-quality sifted flour that commands premium prices.',
    specs: {
      'Milling Type': 'Graduated pressure iron rollers',
      'Total Units': '2 roller mills in tandem assembly',
      'Sifting': 'Reciprocating multi-grade flour sifters',
      'Capacity': '6-8 Bags per Hour',
      'Output Quality': 'Premium grade-1 sifted flour'
    },
    stockStatus: 'made-to-order',
    popularIn: ['Nairobi', 'Thika', 'Eldoret']
  },
  {
    id: 'hybrid-poshomill',
    name: 'Hybrid Poshomill',
    category: 'Posho Mills',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced hybrid poshomill offering selectable diesel or electric motor belt-drives. Enables operators to switch instantly based on power grid availability, ensuring 100% uptime.',
    specs: {
      'Drive System': 'Dual belt tensioner (Electric & Diesel compatible)',
      'Motors included': 'Both 7.5HP Electric + 10HP Diesel engines',
      'Cyclone': 'Oversized air-cooling discharge cyclone',
      'Capacity': '5-6 Bags per Hour'
    },
    stockStatus: 'limited',
    popularIn: ['Nakuru', 'Narok', 'Baringo']
  },
  {
    id: 'indian-10hp-diesel-poshomill',
    name: 'Indian 10HP Diesel Poshomill',
    category: 'Posho Mills',
    price: 160000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Heavy duty Indian-style commercial hammer mill driven by a robust 10HP diesel engine. Built with thick cast-iron components for endless commercial milling in off-grid market centres.',
    specs: {
      'Engine': '10HP High-Torque Indian Diesel Engine',
      'Cooling': 'Water-cooled engine block',
      'Capacity': '5 Bags per Hour',
      'Hammer Blades': 'Tempered carbon steel commercial hammers'
    },
    stockStatus: 'in-stock',
    popularIn: ['Eldoret', 'Kitale', 'Kakamega']
  },
  {
    id: 'diesel-poshomill',
    name: 'Diesel Poshomill',
    category: 'Posho Mills',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Economical diesel hammer mill driven by an 8HP diesel engine. Offers commercial-grade milling independence and low running costs at our most competitive price point.',
    specs: {
      'Engine': '8HP Fuel-efficient Diesel Engine',
      'Capacity': '3-4 Bags per Hour',
      'Cyclone': 'Side-mount air discharge cyclone'
    },
    stockStatus: 'in-stock',
    popularIn: ['Kajiado', 'Narok', 'West Pokot']
  },
  {
    id: 'combined-electric-poshomill',
    name: 'Combined Electric Poshomill',
    category: 'Posho Mills',
    price: 135000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'All-in-one commercial electric milling unit. Integrated huller and hammer mill driven by a powerful electric motor, designed for premium sifted flour production in single-pass.',
    specs: {
      'Huller Section': 'Combined iron-roller huller',
      'Mill Section': 'High speed hammer poshomill',
      'Motor': '7.5HP Three-Phase Electric Motor',
      'Piping': 'Premium air duct connection with dual cyclones'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nairobi', 'Nakuru', 'Machakos']
  },
  {
    id: 'duo-combined-poshomill',
    name: 'Duo Combined Poshomill',
    category: 'Posho Mills',
    price: 165000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Double hopper combined poshomill powered by an independent petrol/diesel engine. Offers ultimate versatility with dual separate processing lines for grain hulling and fine grinding.',
    specs: {
      'Hoppers': 'Dual input steel hoppers',
      'Engine': '10HP Petrol/Diesel engine included',
      'Capacity': '4-5 Bags per Hour',
      'Output': 'Grade-1 sifted flour'
    },
    stockStatus: 'in-stock',
    popularIn: ['Laikipia', 'Laikipia West', 'Kericho']
  },
  {
    id: 'gm25-indian-combined-poshomill',
    name: 'GM 25 Indian Combined Posho Mill (10HP)',
    category: 'Posho Mills',
    price: 220000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Heavy duty GM 25 Indian combined poshomill with a premium 10HP engine. The choice of commercial grain mills, designed to run 12+ hours daily in highly demanding off-grid centres.',
    specs: {
      'Chamber Model': 'GM 25 Heavy-duty casting',
      'Engine': '10HP Water-cooled Diesel Engine',
      'Hulling Unit': 'High-performance grain dehusker',
      'Cyclone': 'Dual oversized industrial air cyclones'
    },
    stockStatus: 'limited',
    popularIn: ['Nakuru', 'Bungoma', 'Eldoret']
  },
  {
    id: 'duo-poshomill',
    name: 'Duo Poshomill',
    category: 'Posho Mills',
    price: 115000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Double chamber electric poshomill. Built with dual separate hammer milling heads driven by a single high-torque motor, allowing synchronized milling of different grain types.',
    specs: {
      'Heads': 'Dual separate cast-iron grinding heads',
      'Motor': '7.5HP Electric Motor',
      'Separation': 'Reciprocating sieve screen tables',
      'Capacity': '5-6 Bags per Hour'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Naivasha', 'Nyeri']
  },
  {
    id: 'electric-poshomill',
    name: 'Electric Poshomill',
    category: 'Posho Mills',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Standard electric poshomill powered by a 5HP single-phase motor. A reliable and highly economical option for local neighborhood posho mills in Nakuru estate centres.',
    specs: {
      'Motor': '5HP Single-Phase Electric Motor (240V compatible)',
      'Capacity': '3 Bags per Hour',
      'Cyclone': 'Single side-mount discharge cyclone',
      'Vibration': 'Rubber-damped support feet'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Njoro', 'Gilgil']
  },
  {
    id: '10hp-electric-poshomill',
    name: '10HP Electric Poshomill (Single Phase)',
    category: 'Posho Mills',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Single phase electric poshomill suitable for maize and any other grain. Features a highly effective 10 Horsepower motor for reliable estate-scale milling.',
    specs: {
      'Motor': '10 HP Single-Phase Electric Motor',
      'Application': 'Maize, wheat, sorghum, and other grains',
      'Voltage': '240V standard domestic power requirement',
      'Capacity': '5-6 Bags per Hour'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Eldoret', 'Nyeri']
  },
  {
    id: '7-5hp-petrol-maize-sheller',
    name: '7.5 HP Petrol Maize Sheller',
    category: 'Maize Shellers',
    price: 42500,
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&q=80&w=800',
    description: 'Petrol-powered maize sheller equipped with a reliable 7.5 Horsepower engine. Delivers a clean output of 15 bags per hour, perfect for medium-sized farm harvests.',
    specs: {
      'Engine': '7.5 HP Petrol Engine',
      'Output Capacity': '15 Bags per Hour',
      'Fuel Type': 'Regular Petrol',
      'Mobility': 'Lightweight wheeled steel frame structure'
    },
    stockStatus: 'in-stock',
    popularIn: ['Trans Nzoia', 'Uasin Gishu', 'Bungoma']
  },
  {
    id: '10hp-combined-poshomill',
    name: '10 HP Combined Poshomill',
    category: 'Posho Mills',
    price: 130000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Grade 1 and 2 combined poshomill powered by a high-torque 10 Horsepower electric motor. Offers efficient, high-output single-pass sifted flour production.',
    specs: {
      'Motor': '10 HP Electric Motor',
      'Grade Output': 'Grade 1 and Grade 2 combined milling',
      'Milling Type': 'Single-pass sifter system',
      'Capacity': '6 Bags per Hour'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Nairobi', 'Machakos']
  },
  {
    id: '7-5hp-combined-poshomill',
    name: '7.5 HP Combined Poshomill',
    category: 'Posho Mills',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Grade 1 and 2 combined poshomill powered by a reliable 7.5 Horsepower electric motor. Perfect for estate-scale milling operations seeking single-pass sifting.',
    specs: {
      'Motor': '7.5 HP Electric Motor',
      'Grade Output': 'Grade 1 and Grade 2 combined milling',
      'Capacity': '4-5 Bags per Hour'
    },
    stockStatus: 'in-stock',
    popularIn: ['Meru', 'Embu', 'Kakamega']
  },
  {
    id: 'petrol-animal-feed-chopper',
    name: 'Petrol Animal Feed Chopper',
    category: 'Animal Feed Machines',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Petrol-driven animal feed chopper designed for fast, efficient forage prep. Powered by a high-reliability petrol motor, ideal for Napier grass and silage cutting in the shamba.',
    specs: {
      'Engine': 'Petrol Driven Motor',
      'Ideal For': 'Napier grass, crop stalks, silage prep',
      'Frame': 'Compact tripod stand base'
    },
    stockStatus: 'in-stock',
    popularIn: ['Kericho', 'Bomet', 'Kisii']
  },
  {
    id: 'diesel-animal-feed-chopper',
    name: 'Diesel Animal Feed Chopper',
    category: 'Animal Feed Machines',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    description: 'Heavy-duty diesel-powered animal feed chopper. Built for commercial forage yards and large-scale dairy shambas seeking maximum fuel economy and high throughput.',
    specs: {
      'Engine': 'Diesel Powered Motor',
      'Durability': 'Heavy duty structural steel frame',
      'Chassis': 'Equipped with transport wheels'
    },
    stockStatus: 'limited',
    popularIn: ['Nyandarua', 'Laikipia', 'Nanyuki']
  },
  {
    id: '7-5hp-electric-poshomill',
    name: '7.5 HP Electric Poshomill',
    category: 'Posho Mills',
    price: 72500,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: '7.5 Horsepower electric poshomill delivering a solid output of 4 bags per hour. Ideal for estate-level commercial milling with standard industrial single-phase power.',
    specs: {
      'Motor': '7.5 HP Electric Motor',
      'Output Capacity': '4 Bags per Hour',
      'Cyclone': 'Single side-mount discharge cyclone'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Njoro', 'Eldoret']
  },
  {
    id: 'commercial-roller-mill',
    name: 'Commercial Roller Mill',
    category: 'Roller Mills',
    price: 400000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    description: 'Heavy duty commercial roller mill optimized for producing premium Grade 1 sifted flour. Delivers quiet, highly efficient grain crushing between high-pressure rollers.',
    specs: {
      'Output Quality': 'Grade 1 Sifted Flour',
      'Milling Type': 'High-pressure roller crushing',
      'Application': 'Premium commercial sifted flour yards'
    },
    stockStatus: 'made-to-order',
    popularIn: ['Nairobi', 'Thika', 'Eldoret']
  },
  {
    id: 'standard-feed-mixer',
    name: 'Standard Animal Feed Mixer',
    category: 'Animal Feed Machines',
    price: 100000,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
    description: 'Reliable animal feed mixer designed to achieve perfectly homogeneous blends of mineral concentrates, grains, and chaff. Cost-effective and highly durable.',
    specs: {
      'Price Point': 'Extremely cost-effective feed prep solution',
      'Application': 'Blends grain, meal, and concentrates',
      'Mixing Mechanism': 'Heavy-duty central auger'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Kiambu', 'Nyeri']
  },
  {
    id: '10hp-diesel-poshomill',
    name: '10 HP Diesel Poshomill',
    category: 'Posho Mills',
    price: 140000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: '10 Horsepower diesel poshomill built for continuous off-grid operation. Delivers reliable, fuel-efficient commercial hammer-milling in rural market centres.',
    specs: {
      'Engine': '10 HP Diesel Engine',
      'Cooling': 'Water/Air cooled setup',
      'Capacity': '5 Bags per Hour'
    },
    stockStatus: 'in-stock',
    popularIn: ['Kajiado', 'Narok', 'Baringo']
  },
  {
    id: 'compact-hybrid-poshomill',
    name: 'Compact Hybrid Poshomill',
    category: 'Posho Mills',
    price: 100000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Highly cost-effective compact hybrid poshomill. Can be driven by either a diesel engine or an electric motor, giving you complete flexibility when power grids fail.',
    specs: {
      'Drive': 'Dual-belt diesel and electric compatible drive',
      'Cyclone': 'Single side-discharge cyclone'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Narok', 'West Pokot']
  },
  {
    id: '3-phase-electric-poshomill',
    name: '3 Phase Electric Poshomill',
    category: 'Posho Mills',
    price: 100000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Heavy duty 3 phase electric poshomill designed for industrial and commercial milling zones with stable industrial power supply.',
    specs: {
      'Power Source': '3 Phase Electric Motor',
      'Application': 'Continuous industrial milling',
      'Capacity': '5 Bags per Hour'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nairobi', 'Nakuru', 'Machakos']
  },
  {
    id: 'andimax-10hp-poshomill',
    name: 'Andimax 10 HP Poshomill',
    category: 'Posho Mills',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: '10 Horsepower Andimax poshomill featuring a radiator-cooled diesel engine for continuous, high-temperature operations in hot climates.',
    specs: {
      'Engine': '10 HP Andimax Diesel Engine',
      'Cooling': 'Radiator-Cooled',
      'Fuel Economy': 'Highly efficient direct injection'
    },
    stockStatus: 'in-stock',
    popularIn: ['Kisumu', 'Kakamega', 'Eldoret']
  },
  {
    id: 'hybrid-grain-milling-machine-450',
    name: 'Hybrid Grain Milling Machine (450kg/h)',
    category: 'Posho Mills',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Clean, effective, and highly affordable hybrid milling machine. Capable of processing 250-450 kg of grains per hour. Grinds maize, wheat, and other consumables to fine flour.',
    specs: {
      'Capacity': '250 - 450 Kg per Hour',
      'Output': 'Fine flour from maize, wheat, and grains',
      'Design': 'Clean, dust-free hybrid assembly'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Nairobi', 'Thika']
  },
  {
    id: 'small-scale-poshomill-peeler',
    name: 'Small Scale Maize Poshomill and Peeler',
    category: 'Posho Mills',
    price: 115000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'Affordable, small-scale equipment designed for both milling and peeling grains. Extremely effective and reaches speeds of up to 300 kg per hour.',
    specs: {
      'Capacity': 'Up to 300 Kg per Hour',
      'Functions': 'Combined grain peeling and milling',
      'Efficiency': 'Saves time by processing in tandem'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Nyeri', 'Eldoret']
  },
  {
    id: '10hp-jd-poshomill',
    name: '10HP JD Poshomill',
    category: 'Posho Mills',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'The JD 10HP poshomill — a trusted workhorse for busy market-centre milling businesses. Produces clean Grade 2 (Unga No. 2) flour reliably, shift after shift, at an excellent price point.',
    specs: {
      'Model': 'JD Series',
      'Motor': '10HP Engine / Motor drive',
      'Output': 'Grade 2 (Unga No. 2) Flour',
      'Capacity': '5 Bags per Hour',
      'Cyclone': 'Side-mount air discharge cyclone'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Eldoret', 'Kisumu']
  },
  {
    id: '10hp-gm22-poshomill',
    name: '10HP GM22 Poshomill',
    category: 'Posho Mills',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    description: 'The GM22 10HP poshomill — a popular and affordable entry into commercial-grade milling. Produces standard Grade 2 (Unga No. 2) flour with low running costs and minimal maintenance.',
    specs: {
      'Model': 'GM22 Series',
      'Motor': '10HP Engine drive',
      'Output': 'Grade 2 (Unga No. 2) Flour',
      'Capacity': '4-5 Bags per Hour',
      'Frame': 'Compact vibration-damped steel chassis'
    },
    stockStatus: 'in-stock',
    popularIn: ['Nakuru', 'Naivasha', 'Bomet']
  },
  {
    id: 'diesel-maize-sheller',
    name: 'Diesel Powered Maize Sheller',
    category: 'Maize Shellers',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&q=80&w=800',
    description: 'High-output diesel maize sheller delivering a clean 35 bags per hour. Ideal for large-scale harvest operations in off-grid farms where electricity is unavailable.',
    specs: {
      'Power Source': 'Diesel Engine',
      'Output Capacity': '35 Bags per Hour',
      'Fuel': 'Diesel (economical at scale)',
      'Casing': 'Heavy gauge welded iron plate',
      'Portability': 'Wheeled steel frame for easy farm-to-farm movement'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Trans Nzoia', 'Bungoma', 'Uasin Gishu']
  },
  {
    id: '12-stones-maize-huller',
    name: '12 Stones Maize Huller',
    category: 'Hullers',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800',
    description: 'Large-scale 12-stone maize huller powered by a 10HP motor. Designed for high-volume muthokoi production and for prepping maize to Grade 1 flour quality. The industry choice for large cooperatives and commercial mills.',
    specs: {
      'Motor': '10HP Electric Motor',
      'Stones': '12 grinding stones for high throughput',
      'Primary Use': 'Muthokoi production and Grade 1 flour prep',
      'Scale': 'Large commercial / cooperative grade',
      'Output Quality': 'Premium hulled maize for Grade 1 milling'
    },
    stockStatus: 'in-stock',
    popularIn: ['Kakamega', 'Bungoma', 'Machakos']
  },
  {
    id: '9hp-petrol-speed-chaffcutter-conveyor',
    name: '9HP Petrol Speed Chaffcutter (Metallic Conveyor)',
    category: 'Chaffcutters',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
    description: 'High-speed petrol chaffcutter equipped with a robust metallic conveyor belt feed system. Processes 2 tonnes of Napier grass per hour with zero manual feeding — the fastest chaffcutter in our lineup.',
    specs: {
      'Engine': '9HP Petrol Engine',
      'Feed System': 'Metallic conveyor belt (automatic feeding)',
      'Capacity': '2 Tonnes of Napier grass per Hour',
      'Starter': 'Recoil pull start',
      'Ideal For': 'Large zero-grazing dairy farms, commercial silage yards'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Nyandarua', 'Kericho', 'Meru']
  },
  {
    id: '6fy-35-unga-ya-jogoo-rollermill',
    name: '6Fy-35 Unga ya Jogoo Rollermill',
    category: 'Roller Mills',
    price: 370000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    description: 'The original Unga ya Jogoo 6Fy-35 rollermill — the gold standard for Grade 1 sifted flour production in Kenya. If you want to produce premium white flour that commands top prices at market, this is the machine.',
    specs: {
      'Model': '6Fy-35 Series Rollermill',
      'Output Quality': 'Grade 1 Extra-White Sifted Flour (Unga ya Jogoo standard)',
      'Milling Type': 'Graduated high-pressure iron roller crushing',
      'Capacity': '6-8 Bags per Hour',
      'Delivery': 'Order, pay after delivery and installation'
    },
    isBestSeller: true,
    stockStatus: 'in-stock',
    popularIn: ['Nairobi', 'Nakuru', 'Eldoret']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'John Kamau',
    location: 'Kericho',
    text: 'I bought the GAM Unga No.2 Poshomill six months ago. I\'m now milling for my neighbours too — the machine pays for itself. Installation was done the same week.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
    product: 'Posho Mill'
  },
  {
    id: '2',
    name: 'Mary Wanjiku',
    location: 'Nyandarua',
    text: 'The 7.5 HP Electric Choppermill has changed how I run my dairy farm. I chop Napier grass in minutes instead of hours. My cows give more milk now. Asante sana Harvest Farm.',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
    product: 'Chopper Mill'
  },
  {
    id: '3',
    name: 'Peter Omondi',
    location: 'Kisumu',
    text: 'I tested the Maize Sheller before paying — legit pay-on-delivery. It shells my entire harvest in two days instead of two weeks. Every maize farmer needs this.',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=200',
    product: 'Maize Sheller'
  },
  {
    id: '4',
    name: 'Grace Muthoni',
    location: 'Nyeri',
    text: 'The Maize Huller has been a game-changer for our cooperative. We process our own maize now instead of selling raw. Better prices, better control.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    product: 'Maize Huller'
  },
  {
    id: '5',
    name: 'Samuel Kipchoge',
    location: 'Eldoret',
    text: 'I run a commercial flour mill in Eldoret. The Rollermill Set produces the finest sifted flour — my bakery clients won\'t buy from anyone else now.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    product: 'Roller Mill'
  }
];
