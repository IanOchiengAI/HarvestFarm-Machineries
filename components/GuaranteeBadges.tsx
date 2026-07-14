import React from 'react';
import { ShieldCheck, Truck, Wrench, Smartphone } from 'lucide-react';

interface GuaranteeBadgesProps {
  variant?: 'horizontal' | 'grid';
}

const badges = [
  {
    icon: <ShieldCheck size={20} />,
    label: '1 Year Warranty',
    sublabel: 'Full parts & labor',
    color: 'text-harvest-green',
    bg: 'bg-harvest-green/10',
  },
  {
    icon: <Truck size={20} />,
    label: 'Pay on Delivery',
    sublabel: 'Inspect before handover',
    color: 'text-harvest-orange',
    bg: 'bg-harvest-orange/10',
  },
  {
    icon: <Wrench size={20} />,
    label: 'Spares Support',
    sublabel: 'Blades, belts & parts',
    color: 'text-harvest-brown',
    bg: 'bg-harvest-brown/10',
  },
  {
    icon: <Smartphone size={20} />,
    label: 'M-Pesa Accepted',
    sublabel: 'Pay via Safaricom',
    color: 'text-[#4CAF50]',
    bg: 'bg-[#4CAF50]/10',
  },
];

const GuaranteeBadges: React.FC<GuaranteeBadgesProps> = ({ variant = 'horizontal' }) => {
  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`${badge.bg} p-3 rounded-xl ${badge.color} mb-3`}>
              {badge.icon}
            </div>
            <span className="font-black text-xs text-gray-900 uppercase tracking-wider">
              {badge.label}
            </span>
            <span className="text-[10px] text-gray-400 font-semibold mt-0.5">
              {badge.sublabel}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6">
      {badges.map((badge, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`${badge.bg} p-2 rounded-lg ${badge.color}`}>
            {badge.icon}
          </div>
          <div>
            <span className="font-black text-xs text-gray-900 uppercase tracking-wider block leading-tight">
              {badge.label}
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">
              {badge.sublabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuaranteeBadges;
