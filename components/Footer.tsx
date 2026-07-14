import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useData } from '../store/DataContext';

const SocialIcon: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 bg-white/10 hover:bg-harvest-gold hover:text-harvest-brown rounded-xl flex items-center justify-center transition-all hover:scale-110 text-gray-300"
  >
    {children}
  </a>
);

const Footer: React.FC = () => {
  const { settings } = useData();

  return (
    <footer className="bg-harvest-brown text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Harvest Farm <span className="text-harvest-gold underline decoration-harvest-green decoration-4 underline-offset-8">Machineries</span></h3>
          <p className="text-gray-300 mb-4 font-medium italic">
            "Powering Kenya's Farms with Reliable Machinery"
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Founded by Ian Wambugu Ochieng Sitati, we empower farmers with high-quality equipment, training, and support.
          </p>
          {/* Social Media */}
          <div className="flex gap-3">
            <SocialIcon href="https://facebook.com/harvestfarmmachineries" label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </SocialIcon>
            <SocialIcon href="https://instagram.com/harvestfarmmachineries" label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </SocialIcon>
            <SocialIcon href="https://tiktok.com/@harvestfarmmachineries" label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.27a8.19 8.19 0 004.78 1.54V7.36a4.85 4.85 0 01-1.01-.67z"/></svg>
            </SocialIcon>
            <SocialIcon href={settings.whatsapp} label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.145.565 4.155 1.548 5.897L.064 23.314a.75.75 0 00.922.922l5.417-1.484A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.733 9.733 0 01-5.017-1.388l-.36-.213-3.732 1.022 1.022-3.732-.213-.36A9.733 9.733 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
            </SocialIcon>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4 uppercase tracking-widest text-harvest-gold">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/shop" className="hover:text-harvest-gold transition-colors">All Equipment</Link></li>
            <li><Link to="/services" className="hover:text-harvest-gold transition-colors">Our Mission</Link></li>
            <li><Link to="/contact" className="hover:text-harvest-gold transition-colors">Contact Us</Link></li>
            <li><a href={settings.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-harvest-gold transition-colors">WhatsApp Order</a></li>
            <li className="pt-2 border-t border-white/10 mt-2">
              <span className="text-harvest-gold text-[10px] font-black uppercase tracking-widest block mb-1">Top Categories</span>
            </li>
            <li><Link to="/posho-mills" className="hover:text-harvest-gold transition-colors">Posho Mills</Link></li>
            <li><Link to="/hullers" className="hover:text-harvest-gold transition-colors">Hullers</Link></li>
            <li><Link to="/chopper-mills" className="hover:text-harvest-gold transition-colors">Chopper Mills</Link></li>
            <li><Link to="/maize-shellers" className="hover:text-harvest-gold transition-colors">Maize Shellers</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold mb-4 uppercase tracking-widest text-harvest-gold">Find Us</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 text-harvest-gold flex-shrink-0" size={20} />
              <a href={`https://maps.google.com/?q=${encodeURIComponent(settings.location)}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                {settings.location}<br />Visit our Showroom
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-harvest-gold flex-shrink-0" size={20} />
              <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">{settings.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-harvest-gold flex-shrink-0" size={20} />
              <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="text-harvest-gold mt-1 flex-shrink-0" size={20} />
              <span className="text-gray-400 text-sm leading-relaxed">{settings.officeHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Harvest Farm Machineries. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;