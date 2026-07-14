import React from 'react';
import { Truck, Wrench, CreditCard, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { canonicalUrl } from '../seo';

const Services: React.FC = () => {
  const values = [
    { name: 'Reliability', desc: 'We provide dependable machinery that farmers can count on.' },
    { name: 'Innovation', desc: 'We continuously seek ways to improve our products and services.' },
    { name: 'Customer-Centric', desc: 'We prioritize our customers\' needs and satisfaction.' },
    { name: 'Empowerment', desc: 'We aim to equip farmers with the tools and knowledge to boost their productivity.' },
    { name: 'Integrity', desc: 'We conduct our business with honesty and transparency.' }
  ];

  return (
    <div className="bg-harvest-cream min-h-screen">
      <Helmet>
        <title>Our Mission & Services | Harvest Farm Machineries Nakuru</title>
        <meta name="description" content="Reliable transport, expert training, and flexible payments for Kenyan farmers. Visit Harvest Farm Machineries in Nakuru." />
        <link rel="canonical" href={canonicalUrl('/services')} />
      </Helmet>
      {/* Header */}
      <div className="bg-harvest-brown text-white py-20 text-center px-4 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-harvest-gold font-black text-xs uppercase tracking-[0.3em] mb-4 block">Our Commitment</span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Mission & Values</h1>
          <p className="text-gray-300 text-xl font-light italic">
            "To revolutionize Kenyan agriculture by providing reliable, innovative farm machinery and empowering farmers with the tools and knowledge they need to thrive."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Core Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-harvest-brown uppercase tracking-tight">Our Core Values</h2>
          <div className="w-16 h-1.5 bg-harvest-green mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-24">
          {values.map((v, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-xl hover:-translate-y-2 transition-all border-b-4 border-harvest-gold">
              <h3 className="font-black text-harvest-green mb-3 uppercase text-sm tracking-widest">{v.name}</h3>
              <p className="text-gray-600 text-xs leading-relaxed font-medium">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          <div className="bg-white p-10 rounded-3xl shadow-2xl relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-harvest-green"></div>
            <div className="bg-harvest-green/10 w-20 h-20 rounded-2xl flex items-center justify-center text-harvest-green mb-8 group-hover:scale-110 transition-transform">
              <Truck size={40} />
            </div>
            <h3 className="text-2xl font-black text-harvest-brown mb-4 tracking-tight">Reliable Transport</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              We provide reliable transport services to ensure your equipment reaches you safely across the country. We understand that downtime is not an option.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-2xl relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-harvest-gold"></div>
            <div className="bg-harvest-gold/10 w-20 h-20 rounded-2xl flex items-center justify-center text-harvest-brown mb-8 group-hover:scale-110 transition-transform">
              <Wrench size={40} />
            </div>
            <h3 className="text-2xl font-black text-harvest-brown mb-4 tracking-tight">Expert Training</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              We offer comprehensive training on our machines. We believe in empowering farmers with not just equipment, but the knowledge to use it correctly.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-2xl relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-harvest-blue"></div>
            <div className="bg-harvest-blue/10 w-20 h-20 rounded-2xl flex items-center justify-center text-harvest-brown mb-8 group-hover:scale-110 transition-transform">
              <CreditCard size={40} />
            </div>
            <h3 className="text-2xl font-black text-harvest-brown mb-4 tracking-tight">Flexible Payments</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              Join our community of satisfied customers. We offer various models and payment terms to suit both small-scale and large-scale farmers.
            </p>
          </div>
        </div>

        {/* Coverage Section */}
        <div className="bg-harvest-brown text-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10">
          <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
            <span className="text-harvest-gold font-black text-xs uppercase tracking-[0.3em] mb-4">Our Reach</span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Serving All 47 Counties</h2>
            <p className="text-gray-300 mb-8 text-lg font-light leading-relaxed">
              From our base in Nakuru, we coordinate deliveries and on-site support to farmers throughout Kenya.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-4 font-bold text-gray-100">
                <div className="bg-harvest-gold p-1 rounded-full"><MapPin className="text-harvest-brown" size={16} /></div> Same day delivery in Nakuru
              </li>
              <li className="flex items-center gap-4 font-bold text-gray-100">
                <div className="bg-harvest-gold p-1 rounded-full"><MapPin className="text-harvest-brown" size={16} /></div> Expert technicians on-site
              </li>
              <li className="flex items-center gap-4 font-bold text-gray-100">
                <div className="bg-harvest-gold p-1 rounded-full"><MapPin className="text-harvest-brown" size={16} /></div> Lifelong maintenance support
              </li>
            </ul>
            <Link to="/shop" className="bg-harvest-green text-white px-10 py-4 rounded-xl font-black w-fit hover:bg-green-700 transition-all hover:scale-105 shadow-xl uppercase tracking-widest text-xs">
              Find Your Machine
            </Link>
          </div>
          <div className="md:w-1/2 bg-harvest-cream/10 min-h-[400px] relative">
            <img 
               src="https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&q=80&w=800"
               alt="Kenya landscape" 
               className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-all duration-700"
               loading="lazy"
               onError={(e) => {
                 e.currentTarget.onerror = null;
                 const text = encodeURIComponent(e.currentTarget.alt || 'Map');
                 e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%23F5DEB3"/><text x="50%" y="50%" font-family="sans-serif" font-size="30" font-weight="bold" fill="%238B4513" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
               }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
               <div className="bg-harvest-brown/80 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl">
                  <h4 className="text-harvest-gold font-black text-2xl mb-2">Based in Nakuru</h4>
                  <p className="text-white font-medium italic">Your Hub for Agricultural Excellence</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
