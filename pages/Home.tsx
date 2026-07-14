import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle, Truck, Wrench, ShieldCheck, MessageCircle, Star } from 'lucide-react';
import { useData } from '../store/DataContext';
import ProductCard from '../components/ProductCard';
import WhyHarvestFarm from '../components/WhyHarvestFarm';
import HowItWorks from '../components/HowItWorks';
import GuaranteeBadges from '../components/GuaranteeBadges';
import FAQSection from '../components/FAQSection';
import { trackWhatsAppClick } from '../services/analytics';
import { canonicalUrl, categoryPath } from '../seo';

const Home: React.FC = () => {
  const { products, categories, testimonials, settings } = useData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bestSellers = products.filter(p => p.isBestSeller);
  
  // Calculate product counts by category for badges
  const productCountByCategory = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.id] = products.filter(p => p.category === cat.name).length;
    return acc;
  }, {});

  return (
    <main>
      <Helmet>
        <title>Harvest Farm Machineries Nakuru | Kenya's Most Reliable Farm Equipment</title>
        <meta name="description" content="Buy reliable posho mills, hullers, chopper mills, maize shellers, and farm machinery from Harvest Farm Machineries in Nakuru. Pay on delivery, training, and nationwide delivery." />
        <link rel="canonical" href={canonicalUrl('/')} />
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-[650px] bg-harvest-brown flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1920"
            alt="Harvest Farm Machineries agricultural equipment in action in Kenya" 
            className="w-full h-full object-cover opacity-75 animate-ken-burns"
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.onerror = null;
              const text = encodeURIComponent(e.currentTarget.alt || 'Harvest Farm Machineries');
              e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%23F5DEB3"/><text x="50%" y="50%" font-family="sans-serif" font-size="30" font-weight="bold" fill="%238B4513" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-3xl text-white">
            <span className="bg-harvest-green text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 inline-block border border-white/20">
              Trusted Partners in Nakuru
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
              Powering Kenya's <br />
              <span className="text-harvest-gold">Farms</span> with Reliability
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-light opacity-90">
              Posho mills, hullers & choppermills — delivered across all 47 counties. Pay only on delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/shop" className="bg-harvest-green hover:bg-green-700 text-white px-10 py-5 rounded-xl font-black text-center transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                Explore Machinery <ArrowRight size={20} />
              </Link>
              <a 
                href={settings.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppClick({ id: '0', name: 'General', price: 0 }, 'home_hero', 'hero')}
                className="bg-[#25D366] text-white hover:bg-green-600 px-10 py-5 rounded-xl font-black text-center transition-all hover:scale-105 shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} fill="white" /> WhatsApp Us Now
              </a>
            </div>
            <div className="mt-12 flex items-center gap-8 text-sm font-bold">
              <span className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"><CheckCircle size={18} className="text-harvest-gold" /> Nationwide Delivery</span>
              <span className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"><CheckCircle size={18} className="text-harvest-gold" /> Machine Training</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-gray-100 relative z-20 md:-mt-10 max-w-6xl mx-auto rounded-2xl shadow-2xl">
        <div className="px-8 flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex items-center gap-5">
              <div className="bg-harvest-green/10 p-4 rounded-2xl text-harvest-green shadow-inner">
                <Truck size={36} />
              </div>
              <div>
                <h3 className="font-black text-harvest-brown text-lg uppercase tracking-tight">Safe Transport</h3>
                <p className="text-gray-500 text-xs font-semibold">Reliable nationwide reach</p>
              </div>
            </div>
            <div className="h-16 w-px bg-gray-100 hidden md:block"></div>
            <div className="flex items-center gap-5">
              <div className="bg-harvest-green/10 p-4 rounded-2xl text-harvest-green shadow-inner">
                <Wrench size={36} />
              </div>
              <div>
                <h3 className="font-black text-harvest-brown text-lg uppercase tracking-tight">Full Training</h3>
                <p className="text-gray-500 text-xs font-semibold">Expert equipment demos</p>
              </div>
            </div>
            <div className="h-16 w-px bg-gray-100 hidden md:block"></div>
            <div className="flex items-center gap-5">
              <div className="bg-harvest-green/10 p-4 rounded-2xl text-harvest-green shadow-inner">
                <ShieldCheck size={36} />
              </div>
              <div>
                <h3 className="font-black text-harvest-brown text-lg uppercase tracking-tight">True Reliability</h3>
                <p className="text-gray-500 text-xs font-semibold">Machines as hard as you</p>
              </div>
            </div>
        </div>
      </section>

      {/* Why Harvest Farm — Stats */}
      <WhyHarvestFarm />

      {/* Categories */}
      <section className="py-20 bg-harvest-cream/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-harvest-green font-black text-xs uppercase tracking-widest mb-2 block">Our Product Line</span>
              <h2 className="text-4xl font-black text-harvest-brown mb-2 tracking-tight">Essential Equipment</h2>
              <p className="text-gray-600 font-medium italic">Reliable solutions for small and large-scale farmers.</p>
            </div>
            <Link to="/shop" className="bg-white border-2 border-harvest-brown text-harvest-brown px-6 py-2 rounded-lg font-bold hover:bg-harvest-brown hover:text-white transition-all hidden md:block uppercase text-xs">Browse All Machines</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, index) => (
              <Link 
                to={categoryPath(cat.name)} 
                key={cat.id} 
                className={`group relative rounded-xl overflow-hidden shadow-md ${
                  index === categories.length - 1 && categories.length % 2 !== 0 
                    ? 'col-span-2 aspect-[2/1] sm:col-span-1 sm:aspect-square' 
                    : 'aspect-square'
                }`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    const text = encodeURIComponent(e.currentTarget.alt || 'Category');
                    e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="%23F5DEB3"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" font-weight="bold" fill="%238B4513" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
                  }}
                />
                {productCountByCategory[cat.id] > 0 && (
                  <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-1 rounded-full z-10">
                    {productCountByCategory[cat.id]} {productCountByCategory[cat.id] === 1 ? 'machine' : 'machines'}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-lg">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Best Sellers */}
      <section className="py-20 bg-harvest-cream/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-harvest-brown font-black text-xs uppercase tracking-[0.2em]">Quality Assured</span>
            <h2 className="text-4xl font-black text-harvest-brown mt-4 tracking-tight">Best Selling Machines</h2>
            <div className="w-24 h-1 bg-harvest-gold mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/shop" className="inline-block border-2 border-harvest-brown text-harvest-brown font-black px-10 py-4 rounded-xl hover:bg-harvest-brown hover:text-white transition-all uppercase tracking-widest text-xs shadow-lg">
              See the Full Lineup
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-harvest-brown text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-harvest-gold/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-harvest-green/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-black text-center mb-4 tracking-tight">Buyer Notes from across <span className="text-harvest-gold">Kenya</span></h2>
          <p className="text-center text-white/60 max-w-2xl mx-auto mb-12">
            We show names, towns, and product context first. Customer photos are added only when the buyer has given permission.
          </p>
          <p className="text-center text-xs text-white/40 font-bold uppercase tracking-widest mb-6 md:hidden">Swipe to read more →</p>
          <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-hide -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0">
            {testimonials.map((t) => (
              <div key={t.id} className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-auto snap-start bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-harvest-gold/50 transition-all group">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-harvest-gold text-harvest-brown border-2 border-harvest-gold shadow-xl flex items-center justify-center font-black text-2xl transition-transform group-hover:scale-110">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" className="text-harvest-gold" />
                      ))}
                    </div>
                    <h4 className="font-bold text-lg">{t.name}</h4>
                    <span className="text-xs font-black text-harvest-gold/80 uppercase tracking-widest">{t.location}{t.product ? ` | ${t.product}` : ''}</span>
                  </div>
                </div>
                <p className="text-gray-200 leading-relaxed italic text-lg font-light opacity-90 group-hover:opacity-100">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* East African Exports */}
      <section className="py-20 bg-harvest-cream/30 border-t border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-harvest-green font-black text-xs uppercase tracking-widest mb-2 block">
              Cross-Border Shipping
            </span>
            <h2 className="text-4xl font-black text-harvest-brown tracking-tight">
              Exporting Machineries to East & Central Africa
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-medium text-sm">
              We arrange secure logistics, custom clearance, and duty-free transit across the region directly from Nakuru.
            </p>
            <div className="w-20 h-1 bg-harvest-gold mx-auto mt-5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow relative">
              <div className="text-4xl mb-4">🇺🇬</div>
              <h3 className="text-lg font-black text-harvest-brown mb-2">Uganda Delivery</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Daily shipping dispatched via Busia or Malaba border posts. Direct delivery to Kampala, Jinja, Mbale, and regional farming hubs within 48 hours.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow relative">
              <div className="text-4xl mb-4">🇹🇿</div>
              <h3 className="text-lg font-black text-harvest-brown mb-2">Tanzania Delivery</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Seamless transit via Namanga or Sirare borders. Serving Arusha, Dar es Salaam, Mwanza, and agricultural zones with full customs handling.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow relative">
              <div className="text-4xl mb-4">🇿🇲</div>
              <h3 className="text-lg font-black text-harvest-brown mb-2">Zambia & Beyond</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Arranged transport via Tunduma to Lusaka, Ndola, and major farming cooperatives. Standard USD and Mobile Money currencies accepted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <FAQSection />

      {/* CTA */}
      <section className="py-24 bg-harvest-cream overflow-hidden border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block p-4 bg-harvest-green/10 rounded-2xl text-harvest-green mb-8">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-harvest-brown mb-8 tracking-tight">Empowering Your Farm's Success</h2>
          <p className="text-gray-600 mb-8 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            At Harvest Farm Machinery, we believe in providing not just tools, but the knowledge for farmers to thrive. 
            Join the community of successful Kenyan farmers today.
          </p>
          
          {/* Guarantee badges */}
          <div className="mb-12">
            <GuaranteeBadges />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <a 
               href={settings.whatsapp}
               target="_blank"
               rel="noreferrer"
               onClick={() => trackWhatsAppClick({ id: '0', name: 'General', price: 0 }, 'home_cta', 'primary')}
               className="bg-[#25D366] shadow-xl shadow-green-600/20 text-white px-12 py-5 rounded-2xl font-black hover:bg-green-600 transition-all hover:-translate-y-1 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
             >
               <MessageCircle size={18} fill="white" /> WhatsApp Us Directly
             </a>
             <Link to="/contact" className="bg-white shadow-xl text-harvest-brown border border-gray-200 px-12 py-5 rounded-2xl font-black hover:bg-gray-50 transition-all hover:-translate-y-1 uppercase tracking-widest text-sm">
               Come See the Machines
             </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
