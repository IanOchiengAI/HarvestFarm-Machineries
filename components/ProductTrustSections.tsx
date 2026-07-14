import React from 'react';
import {
  BadgeCheck,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  PackageCheck,
  PlayCircle,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppUrl, trackWhatsAppClick } from '../services/analytics';
import { useData } from '../store/DataContext';

interface ProductTrustSectionsProps {
  product: Product;
}

const categoryProof: Record<string, string[]> = {
  'Posho Mills': [
    'Milling chamber, cyclone, huller, and motor setup can be shown before dispatch.',
    'Good for estate milling shops, market centres, and farm-based flour businesses.',
    'Ask for a short maize-milling demo clip before you commit.',
  ],
  Hullers: [
    'Hulling chamber, sieve section, cyclone, and frame are confirmed before delivery.',
    'Useful for millers who want cleaner maize before flour production.',
    'Ask for a grain-cleaning walkaround video before dispatch.',
  ],
  'Chopper Mills': [
    'Blade chamber, chute, wheels, belt drive, and engine or motor are checked before loading.',
    'Built for dairy farmers cutting Napier grass, stalks, and dry feed ingredients.',
    'Ask for a forage-chopping demo clip before the machine leaves Nakuru.',
  ],
  Chaffcutters: [
    'Blade count, flywheel, stand, belt drive, and motor or engine are confirmed with you.',
    'Good for daily Napier grass and fodder preparation on small and medium dairy farms.',
    'Ask for a blade and flywheel walkaround before delivery.',
  ],
  'Maize Shellers': [
    'Shelling drum, outlet, frame, and engine or motor compatibility are checked before loading.',
    'Made for harvest-season work where speed and clean cob separation matter.',
    'Ask for a maize-shelling demo clip before confirming delivery.',
  ],
  'Crop Spraying': [
    'Pump, hose reel, engine, pressure gun, and trolley frame are checked before dispatch.',
    'Good for horticulture, orchard, and medium-to-large shamba spraying work.',
    'Ask for a pressure test video before delivery.',
  ],
  'Block Machines': [
    'Moulds, vibrator units, hydraulic movement, and frame welds are checked before dispatch.',
    'Good for block yards, construction sites, and commercial masonry supply.',
    'Ask for a block-forming demo clip before delivery.',
  ],
  'Animal Feed Machines': [
    'Mixing or crushing chamber, motor size, outlet, belts, and guards are confirmed before loading.',
    'Useful for dairy, poultry, and feed formulation businesses.',
    'Ask for a dry-feed test video before dispatch.',
  ],
  'Roller Mills': [
    'Roller set, sifter table, motor plan, and installation requirements are reviewed before dispatch.',
    'Best for commercial millers who need premium sifted flour output.',
    'Ask for setup photos and installation requirements before ordering.',
  ],
};

const deliveryExamples: Record<string, string[]> = {
  'Posho Mills': ['Nakuru milling shop starter kit', 'Eldoret grain business setup', 'Bomet combined mill inquiry'],
  Hullers: ['Kericho maize huller delivery', 'Kisumu cereal processor setup', 'Nakuru huller support call'],
  'Chopper Mills': ['Nyandarua dairy farm delivery', 'Kericho silage preparation setup', 'Nyeri zero-grazing support'],
  Chaffcutters: ['Nakuru dairy farm delivery', 'Nyeri chaffcutter setup', 'Laikipia petrol unit inquiry'],
  'Maize Shellers': ['Trans Nzoia harvest-season order', 'Bungoma maize sheller delivery', 'Uasin Gishu farm pickup'],
  'Crop Spraying': ['Nakuru horticulture sprayer order', 'Meru orchard spraying setup', 'Nyeri pesticide trolley inquiry'],
  'Block Machines': ['Nakuru block yard setup', 'Nairobi construction supply inquiry', 'Thika hollow-block request'],
  'Animal Feed Machines': ['Nakuru feed crusher inquiry', 'Nanyuki dairy feed setup', 'Laikipia mixer quotation'],
  'Roller Mills': ['Eldoret commercial mill inquiry', 'Thika roller set quotation', 'Nairobi flour business setup'],
};

const hasRealProductPhoto = (image: string) => image.startsWith('/');

const ProductTrustSections: React.FC<ProductTrustSectionsProps> = ({ product }) => {
  const { settings } = useData();
  const realPhoto = hasRealProductPhoto(product.image);
  const proofItems = categoryProof[product.category] || [
    'Key machine parts can be shown clearly before dispatch.',
    'We confirm the right use case, power source, and delivery plan before loading.',
    'Ask for a short walkaround video before confirming your order.',
  ];
  const deliveries = deliveryExamples[product.category] || [
    'Nakuru showroom inquiry',
    'County delivery coordination',
    'WhatsApp after-sale support',
  ];
  const whatsappUrl = buildWhatsAppUrl(settings.whatsapp, product);

  const handleProofWhatsApp = () => {
    trackWhatsAppClick(product, 'product_trust_sections', 'proof_request');
  };

  return (
    <div className="space-y-16 mb-16">
      <section className="bg-harvest-cream/70 border border-harvest-gold/60 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex items-center gap-2 text-harvest-green text-xs font-black uppercase tracking-widest mb-3">
              <BadgeCheck size={16} />
              Product proof
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-harvest-brown tracking-tight mb-4">
              See the machine before you send money
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              Facebook and WhatsApp buyers should not have to guess. Ask Harvest Farm to confirm this exact machine with a fresh photo, close-up, or short demo clip before delivery is arranged.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {proofItems.map((item) => (
                <div key={item} className="bg-white border border-gray-100 rounded-xl p-4">
                  <CheckCircle2 className="text-harvest-green mb-3" size={20} />
                  <p className="text-sm font-semibold text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-harvest-gold/50">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] border border-gray-100">
              <img src={product.image} alt={`${product.name} proof view`} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className={`${realPhoto ? 'bg-harvest-green' : 'bg-harvest-brown'} text-white text-[11px] font-black uppercase tracking-widest px-3 py-2 rounded-full shadow-lg flex items-center gap-1.5`}>
                  <Camera size={13} />
                  {realPhoto ? 'Actual product photo' : 'Fresh photo on request'}
                </span>
                <span className="bg-white/95 text-harvest-brown text-[11px] font-black uppercase tracking-widest px-3 py-2 rounded-full shadow-lg">
                  Nakuru dispatch
                </span>
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleProofWhatsApp}
              className="mt-4 w-full bg-[#25D366] text-white py-4 px-5 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-600/20"
            >
              <MessageCircle size={19} fill="white" />
              Ask for fresh photos or video
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-harvest-green text-xs font-black uppercase tracking-widest mb-3">
              <PlayCircle size={16} />
              Video ready
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-harvest-brown tracking-tight">
              Ask for a short demo before dispatch
            </h2>
          </div>
          <span className="hidden md:inline-flex text-xs font-black uppercase tracking-widest text-gray-400">
            Phone-shot proof is welcome
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            ['15 sec', 'Close-up', 'Nameplate, frame, chamber, engine or motor, and visible moving parts.'],
            ['30 sec', 'Walkaround', 'Front, side, outlet, wheels, belts, guards, and included accessories.'],
            ['60-90 sec', 'Demo', `A simple working test for ${product.category.toLowerCase()} before loading.`],
          ].map(([time, title, copy]) => (
            <div key={title} className="border border-gray-200 rounded-2xl p-5 bg-white">
              <div className="h-32 rounded-xl bg-gray-900 text-white flex flex-col items-center justify-center mb-4">
                <PlayCircle size={34} className="mb-2 text-harvest-gold" />
                <span className="text-sm font-black uppercase tracking-widest">{time} video</span>
              </div>
              <h3 className="font-black text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 text-harvest-green text-xs font-black uppercase tracking-widest mb-3">
            <PackageCheck size={16} />
            Pay on delivery
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-harvest-brown tracking-tight mb-6">
            How payment and delivery works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ['1', 'Confirm the machine', `WhatsApp us the ${product.name} and your county so we confirm stock, price, power source, and transport.`],
              ['2', 'Receive proof', 'We can send a fresh photo, close-up, or demo video before the machine leaves Nakuru.'],
              ['3', 'Agree delivery terms', 'Transport cost and timing are shared clearly. Any booking or commitment fee is confirmed in writing before dispatch.'],
              ['4', 'Inspect, then pay', 'You check the machine on arrival, then pay by M-Pesa or agreed method before handover and training.'],
            ].map(([step, title, copy]) => (
              <div key={step} className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-harvest-green text-white flex items-center justify-center font-black shrink-0">
                  {step}
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-harvest-brown text-white rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 text-harvest-gold text-xs font-black uppercase tracking-widest mb-3">
            <MapPin size={16} />
            Delivery proof
          </div>
          <h2 className="text-2xl font-black tracking-tight mb-5">County delivery examples</h2>
          <div className="space-y-3">
            {deliveries.map((delivery) => (
              <div key={delivery} className="flex items-start gap-3 bg-white/10 rounded-xl p-3">
                <Truck size={18} className="text-harvest-gold mt-0.5 shrink-0" />
                <span className="text-sm font-semibold text-white/90">{delivery}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/60 mt-5 leading-relaxed">
            Customer names and photos are only shown when permission is given.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            icon: <ShieldCheck size={24} />,
            title: 'Warranty support',
            copy: 'One-year support is explained before purchase, including what is covered and who to call after delivery.',
          },
          {
            icon: <Wrench size={24} />,
            title: 'Spares and maintenance',
            copy: 'Ask about belts, blades, screens, pumps, hoses, bearings, and service parts for this machine category.',
          },
          {
            icon: <ClipboardCheck size={24} />,
            title: 'Installation and training',
            copy: 'Setup guidance and operator training are handled at handover so the buyer knows how to start safely.',
          },
        ].map((item) => (
          <div key={item.title} className="bg-harvest-cream/70 border border-harvest-gold/50 rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-white text-harvest-green flex items-center justify-center mb-4 shadow-sm">
              {item.icon}
            </div>
            <h3 className="font-black text-harvest-brown text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{item.copy}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProductTrustSections;
