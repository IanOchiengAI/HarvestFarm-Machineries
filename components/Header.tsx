import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Search, MessageCircle } from 'lucide-react';
import { trackCallClick, trackWhatsAppClick } from '../services/analytics';
import { useData } from '../store/DataContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useData();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Machines', path: '/shop' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      {/* Cross-border shipping alert banner */}
      <div className="bg-harvest-gold text-harvest-brown text-center py-1.5 px-4 text-[11px] font-black uppercase tracking-wider flex justify-center items-center gap-2">
        <span>🌍 Exporting Duty-Free to Uganda 🇺🇬, Tanzania 🇹🇿 & Zambia 🇿🇲!</span>
        <Link to="/contact" className="underline hover:text-white transition-colors ml-1 normal-case font-bold">Inquire Now &rarr;</Link>
      </div>

      {/* Mobile-only quick contact bar */}
      <div className="md:hidden bg-harvest-green text-white px-4 py-2 flex justify-between items-center text-xs font-bold">
        <a href={`tel:${settings.phone}`} onClick={() => trackCallClick('mobile_top_bar')} className="flex items-center gap-1.5 hover:text-harvest-gold transition-colors">
          <Phone size={13} /> {settings.phone}
        </a>
        <a
          href={settings.whatsapp}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWhatsAppClick({ id: '0', name: 'General', price: 0 }, 'mobile_top_bar', 'header')}
          className="bg-white text-harvest-green px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider hover:bg-gray-100 transition-colors"
        >
          WhatsApp Us
        </a>
      </div>

      {/* Top Bar */}
      <div className="bg-harvest-green text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>📍 Nakuru, Kenya</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={14} /> {settings.phone}
            </span>
            <span className="font-semibold bg-harvest-orange px-2 py-0.5 rounded text-xs uppercase italic tracking-wider">Powering Kenya's Farms</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <div className="bg-harvest-brown p-1.5 rounded-lg overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Harvest Farm Logo" 
                className="w-10 h-10 object-contain" 
                onError={(e) => {
                  (e.target as any).style.display = 'none';
                  (e.target as any).parentElement.innerHTML = '<span class="text-white font-bold text-xl">HF</span>';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-none">Harvest Farm</span>
              <span className="text-[10px] text-harvest-green font-bold uppercase tracking-[0.2em] mt-1">Machineries</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wider hover:text-harvest-green transition-colors ${isActive(link.path) ? 'text-harvest-green underline decoration-2 underline-offset-8' : 'text-gray-600'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/shop" className="text-gray-600 hover:text-harvest-green">
              <Search size={22} />
            </Link>
            <a
              href={settings.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsAppClick({ id: '0', name: 'General', price: 0 }, 'header', 'header')}
              className="hidden md:flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-600 transition-colors shadow-sm"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
            <button
              className="md:hidden text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-harvest-cream/30">
          <span className="font-black tracking-tight text-harvest-brown uppercase text-sm">Menu</span>
          <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-gray-900 bg-white rounded-full p-1 shadow-sm border border-gray-100">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold uppercase tracking-wider py-3 border-b border-gray-50 ${isActive(link.path) ? 'text-harvest-green' : 'text-gray-800'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-harvest-green font-bold py-3 bg-harvest-green/10 px-4 rounded-xl">
            <Phone size={18} /> Call {settings.phone}
          </a>
          <a href={settings.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white font-bold py-3 bg-[#25D366] px-4 rounded-xl shadow-sm">
            <MessageCircle size={18} fill="white" /> WhatsApp Us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;