import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, trackWhatsAppClick, trackCallClick } from '../services/analytics';
import { useData } from '../store/DataContext';

interface StickyMobileCTAProps {
  product: {
    id: string;
    name: string;
    price: number;
  };
}

const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ product }) => {
  const { settings } = useData();
  const whatsappUrl = buildWhatsAppUrl(settings.whatsapp, product);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(product, 'product_detail', 'sticky');
  };

  const handleCallClick = () => {
    trackCallClick('product_detail_sticky');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[55] md:hidden">
      {/* Gradient fade effect */}
      <div className="h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 flex gap-3">
        <a
          href={`tel:${settings.phone}`}
          onClick={handleCallClick}
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-harvest-brown text-harvest-brown py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all active:scale-95"
        >
          <Phone size={18} />
          Call Now
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="flex-[1.4] flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg shadow-green-600/30 transition-all active:scale-95"
        >
          <MessageCircle size={18} fill="white" />
          WhatsApp Order
        </a>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
