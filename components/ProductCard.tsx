import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ArrowRight, MessageCircle, MapPin, AlertTriangle } from 'lucide-react';
import { buildWhatsAppUrl, trackWhatsAppClick } from '../services/analytics';
import { useData } from '../store/DataContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { settings } = useData();
  const hasRealPhoto = product.image.startsWith('/');

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackWhatsAppClick({ ...product, category: product.category }, 'shop', 'compact');
    window.open(buildWhatsAppUrl(settings.whatsapp, product), '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full group">
      <div className="relative h-56 overflow-hidden">
        {product.isBestSeller && (
          <span className="absolute top-2 left-2 bg-harvest-orange text-white text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">
            BEST SELLER
          </span>
        )}
        {product.stockStatus === 'limited' && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded z-10 shadow-sm flex items-center gap-1 animate-pulse">
            <AlertTriangle size={10} /> LIMITED STOCK
          </span>
        )}
        {product.stockStatus === 'made-to-order' && (
          <span className="absolute top-2 right-2 bg-harvest-brown text-harvest-gold text-[10px] font-black px-2 py-1 rounded z-10 shadow-sm">
            MADE TO ORDER
          </span>
        )}
        <span className={`${hasRealPhoto ? 'bg-harvest-green' : 'bg-harvest-brown'} absolute bottom-2 left-2 text-white text-[10px] font-black px-2 py-1 rounded z-10 shadow-sm uppercase tracking-wider`}>
          {hasRealPhoto ? 'Actual photo' : 'Photo on request'}
        </span>
        <img 
          src={product.image} 
          alt={`${product.name} - angle view`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            const text = encodeURIComponent(e.currentTarget.alt || 'Product');
            e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="%23F5DEB3"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" font-weight="bold" fill="%238B4513" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-harvest-green font-semibold uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3 flex-grow">{product.description}</p>
        
        {/* Popular In badge */}
        {product.popularIn && product.popularIn.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <MapPin size={10} className="text-harvest-orange" />
            Popular in {product.popularIn.slice(0, 2).join(', ')}
          </div>
        )}
        
        <div className="mt-auto">
          <p className="text-harvest-green font-bold text-xl mb-3">KSh {product.price.toLocaleString('en-KE')}</p>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
            Pay on delivery | WhatsApp proof available
          </p>
          <div className="flex flex-col sm:flex-row gap-2 mt-auto">
            <button
              onClick={handleWhatsAppClick}
              className="w-full sm:flex-[1.2] bg-[#25D366] text-white py-3 px-4 rounded-xl hover:bg-green-600 transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md active:scale-95 sm:order-last"
            >
              <MessageCircle size={18} fill="white" /> Order on WhatsApp
            </button>
            <Link
              to={`/product/${product.id}`}
              className="w-full sm:flex-1 block text-center bg-gray-900 text-white hover:bg-harvest-green py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
            >
              View Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
