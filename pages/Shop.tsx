import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../store/DataContext';
import ProductCard from '../components/ProductCard';
import MachineQuiz from '../components/MachineQuiz';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { trackQuiz } from '../services/analytics';
import { canonicalUrl } from '../seo';

const PRICE_TIERS = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under KSh 50K', value: 'under50', min: 0, max: 49999 },
  { label: 'KSh 50K–100K', value: '50to100', min: 50000, max: 100000 },
  { label: 'Over KSh 100K', value: 'over100', min: 100001, max: Infinity },
];

const Shop: React.FC = () => {
  const { products, categories } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('default');
  const [quizOpen, setQuizOpen] = useState(false);

  const activeCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('q') || '';
  const priceTier = searchParams.get('price') || 'all';

  const updateParam = (key: string, value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value === 'All' || value === '' || value === 'all') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      return next;
    }, { replace: true });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const tier = PRICE_TIERS.find(t => t.value === priceTier);
    const matchesPrice = !tier || priceTier === 'all' || (product.price >= (tier.min || 0) && product.price <= (tier.max || Infinity));
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  const categoryNames = ['All', ...categories.map(c => c.name)];

  const handleQuizOpen = () => {
    trackQuiz('started');
    setQuizOpen(true);
  };

  return (
    <div className="bg-harvest-cream min-h-screen py-8">
      <Helmet>
        <title>Shop Farm Machinery | Posho Mills & Hullers | Harvest Farm Nakuru</title>
        <meta name="description" content="Explore our catalog of reliable farm machinery. Search for posho mills, hullers, and more. Quality equipment for Kenyan farmers." />
        <link rel="canonical" href={canonicalUrl('/shop')} />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Quiz Banner */}
        <div className="mb-8 bg-gradient-to-r from-harvest-brown to-harvest-brown/90 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4 text-white">
            <div className="bg-harvest-gold/20 p-3 rounded-2xl">
              <Sparkles size={28} className="text-harvest-gold" />
            </div>
            <div>
              <h3 className="font-black text-lg uppercase tracking-tight">Not Sure Which Machine?</h3>
              <p className="text-sm text-gray-300 font-medium">Answer 4 quick questions and get a personalized recommendation</p>
            </div>
          </div>
          <button
            onClick={handleQuizOpen}
            className="bg-harvest-gold text-harvest-brown px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-yellow-200 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
          >
            Find My Machine →
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
                 {/* Sidebar / Filters */}
          <div className="hidden md:block w-full md:w-72 flex-shrink-0">
            <div className="bg-white p-8 rounded-3xl shadow-xl sticky top-24 border border-white">
              <div className="flex items-center gap-3 mb-8 text-harvest-brown">
                <div className="bg-harvest-gold/20 p-2 rounded-xl">
                  <SlidersHorizontal size={20} className="text-harvest-brown" />
                </div>
                <h3 className="font-black text-xl uppercase tracking-tight">Filters</h3>
              </div>
              
              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="font-black mb-4 text-[10px] text-gray-400 uppercase tracking-[0.2em] flex justify-between items-center">
                  <span>Categories</span>
                  <span className="bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">{categories.length}</span>
                </h4>
                <div className="flex flex-col gap-1.5">
                  {categoryNames.map(cat => (
                    <button
                      key={cat}
                      onClick={() => updateParam('category', cat)}
                      className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        activeCategory === cat
                          ? 'bg-harvest-brown text-harvest-gold shadow-lg shadow-harvest-brown/20 -translate-x-1'
                          : 'hover:bg-harvest-cream text-gray-600 hover:text-harvest-green'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Tier Filter */}
              <div className="mb-8">
                <h4 className="font-black mb-4 text-[10px] text-gray-400 uppercase tracking-[0.2em]">Price Range</h4>
                <div className="flex flex-col gap-1.5">
                  {PRICE_TIERS.map(tier => (
                    <button
                      key={tier.value}
                      onClick={() => updateParam('price', tier.value)}
                      className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        priceTier === tier.value
                          ? 'bg-harvest-green text-white shadow-lg shadow-harvest-green/20 -translate-x-1'
                          : 'hover:bg-harvest-cream text-gray-600 hover:text-harvest-green'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSearchParams({}, { replace: true })}
                className="w-full py-3 rounded-xl border-2 border-gray-100 text-gray-400 text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            
            {/* Search Header */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-white mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={22} className="text-harvest-brown opacity-40" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => updateParam('q', e.target.value)}
                  placeholder="Search by name or keyword (e.g. 'diesel', 'milling', 'huller')..."
                  className="w-full bg-harvest-cream/50 border-2 border-transparent focus:border-harvest-green focus:bg-white rounded-2xl pl-12 pr-12 py-4 text-gray-800 font-bold placeholder:text-gray-400 focus:outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => updateParam('q', '')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-harvest-brown"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile category tabs — horizontal scroll pills */}
            <div className="md:hidden mb-4 -mx-4 px-4 overflow-x-auto scroll-hide">
              <div className="flex gap-2 pb-2">
                {categoryNames.map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateParam('category', cat)}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? 'bg-harvest-brown text-harvest-gold shadow-md'
                        : 'bg-white border border-gray-200 text-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile price filter — horizontal scroll pills */}
            <div className="md:hidden mb-8 -mx-4 px-4 overflow-x-auto scroll-hide">
              <div className="flex gap-2 pb-2">
                {PRICE_TIERS.map(tier => (
                  <button
                    key={tier.value}
                    onClick={() => updateParam('price', tier.value)}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                      priceTier === tier.value
                        ? 'bg-harvest-green text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-600'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Info & Sort */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-black text-harvest-brown tracking-tight">
                  {activeCategory === 'All' ? 'Full Catalog' : activeCategory}
                </h1>
                {searchQuery && (
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    Showing results for "<span className="text-harvest-green font-bold">{searchQuery}</span>"
                  </p>
                )}
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort By:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-bold text-harvest-brown focus:outline-none bg-transparent cursor-pointer"
                  >
                    <option value="default">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100">
                  <span className="text-harvest-brown font-black text-[10px] uppercase tracking-widest">
                    {filteredProducts.length} Machines Found
                  </span>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[3rem] shadow-xl border border-gray-100">
                <div className="bg-harvest-cream w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-harvest-brown mb-2">No Matching Machines</h3>
                <p className="text-gray-500 max-w-sm mx-auto font-medium">
                  We couldn't find any equipment matching your current filters. Try a different term or browse categories.
                </p>
                <button
                  onClick={() => setSearchParams({}, { replace: true })}
                  className="mt-8 bg-harvest-green text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                >
                  Clear all search filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Machine Quiz Modal */}
      <MachineQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
};

export default Shop;
