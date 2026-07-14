import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '../services/analytics';
import { useData } from '../store/DataContext';

const WhatsAppButton: React.FC = () => {
  const { settings } = useData();
  const location = useLocation();
  const isProductPage = /^\/product\//.test(location.pathname);

  const handleClick = () => {
    trackWhatsAppClick({ id: '0', name: 'General Inquiry', price: 0 }, 'fab', 'fab');
  };

  return (
    <a
      id="whatsapp-fab"
      href={settings.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 items-center gap-2 bg-[#25D366] text-white p-4 md:px-5 md:py-3 rounded-full shadow-lg hover:scale-105 transition-transform animate-bounce-slight ${isProductPage ? 'hidden md:flex' : 'flex'}`}
    >
      <MessageCircle size={24} fill="white" />
      <span className="font-bold hidden md:inline">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;