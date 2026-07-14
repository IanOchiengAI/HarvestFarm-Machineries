import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const isProductPage = /^\/product\//.test(location.pathname);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed z-50 bg-harvest-brown text-white p-3 rounded-full shadow-xl hover:bg-harvest-green transition-all duration-200 hover:scale-110 active:scale-95 ${
        isProductPage
          ? 'bottom-24 right-6 md:bottom-20 md:right-6'
          : 'bottom-24 right-6'
      }`}
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default ScrollToTop;
