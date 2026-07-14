import React from 'react';
import { Search, MessageCircle, Truck, GraduationCap, ArrowRight } from 'lucide-react';
import { trackWhatsAppClick } from '../services/analytics';
import { useData } from '../store/DataContext';

const steps = [
  {
    icon: <Search size={28} />,
    number: '01',
    title: 'Choose',
    description: 'Browse online. Tell us your county on WhatsApp.',
    color: 'bg-harvest-green',
    iconBg: 'bg-harvest-green/10 text-harvest-green',
  },
  {
    icon: <MessageCircle size={28} />,
    number: '02',
    title: 'Confirm Proof',
    description: 'Request photos or a video clip before we send.',
    color: 'bg-[#25D366]',
    iconBg: 'bg-[#25D366]/10 text-[#25D366]',
  },
  {
    icon: <Truck size={28} />,
    number: '03',
    title: 'Pay on Delivery',
    description: 'Agree on transport and timing. No upfront payment.',
    color: 'bg-harvest-orange',
    iconBg: 'bg-harvest-orange/10 text-harvest-orange',
  },
  {
    icon: <GraduationCap size={28} />,
    number: '04',
    title: 'Handover',
    description: 'Inspect, pay by M-Pesa, get hands-on setup help.',
    color: 'bg-harvest-brown',
    iconBg: 'bg-harvest-brown/10 text-harvest-brown',
  },
];

const HowItWorks: React.FC = () => {
  const { settings } = useData();

  const handleWhatsAppClick = () => {
    trackWhatsAppClick({ id: '0', name: 'General Inquiry', price: 0 }, 'home_how_it_works', 'primary');
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-harvest-green font-black text-xs uppercase tracking-[0.3em] mb-4 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-harvest-brown tracking-tight">
            How It <span className="text-harvest-green">Works</span>
          </h2>
          <p className="text-gray-500 mt-4 text-lg font-medium max-w-2xl mx-auto">
            From browsing to farming — we make it easy to get the right machine for your shamba.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-harvest-green via-[#25D366] via-harvest-orange to-harvest-brown opacity-20" />

          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              {/* Step number */}
              <div className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center font-black text-sm mb-4 shadow-lg relative z-10 group-hover:scale-110 transition-transform`}>
                {step.number}
              </div>

              {/* Mobile connecting line */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute top-12 left-1/2 w-0.5 h-8 bg-gray-200 -translate-x-1/2" />
              )}

              {/* Card */}
              <div className="bg-harvest-cream/50 rounded-2xl p-6 w-full hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                <div className={`${step.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  {step.icon}
                </div>
                <h3 className="font-black text-harvest-brown text-lg uppercase tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href={settings.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-green-600 transition-all hover:-translate-y-1 shadow-xl shadow-green-600/20"
          >
            <MessageCircle size={20} fill="white" />
            Start on WhatsApp
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
