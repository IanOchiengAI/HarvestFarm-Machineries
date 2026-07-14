import React, { useEffect, useRef, useState } from 'react';
import { Award, Truck, MapPin, ShieldCheck } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: <Award size={32} />, value: 3, suffix: '+', label: 'Years Serving Farmers' },
  { icon: <ShieldCheck size={32} />, value: 500, suffix: '+', label: 'Machines Sold' },
  { icon: <MapPin size={32} />, value: 47, suffix: '', label: 'Counties Reached' },
  { icon: <Truck size={32} />, value: 24, suffix: 'hr', label: 'Delivery Turnaround' },
];

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
}

const StatCard: React.FC<{ stat: StatItem; index: number }> = ({ stat, index }) => {
  return (
    <div
      className="flex flex-col items-center text-center group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="bg-harvest-gold/20 p-4 rounded-2xl text-harvest-gold mb-4 group-hover:scale-110 transition-transform">
        {stat.icon}
      </div>
      <div className="text-5xl md:text-6xl font-black text-white mb-1 tracking-tight">
        {stat.value}<span className="text-harvest-gold">{stat.suffix}</span>
      </div>
      <p className="text-gray-300 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
    </div>
  );
};

const WhyHarvestFarm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-harvest-brown relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-harvest-green/10 rounded-full blur-3xl -ml-32 -mt-32" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-harvest-gold/10 rounded-full blur-3xl -mr-40 -mb-40" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-harvest-gold font-black text-xs uppercase tracking-[0.3em] mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Why Harvest Farm <span className="text-harvest-gold">Machineries?</span>
          </h2>
          <p className="text-gray-300 mt-4 text-lg font-light max-w-2xl mx-auto">
            Trusted by hundreds of farmers across Kenya. We don't just sell machines — we build farming businesses.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHarvestFarm;
