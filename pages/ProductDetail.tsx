import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useData } from '../store/DataContext';
import { Check, Phone, MessageCircle, Star, Truck, MapPin, AlertTriangle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import StickyMobileCTA from '../components/StickyMobileCTA';
import GuaranteeBadges from '../components/GuaranteeBadges';
import ProductTrustSections from '../components/ProductTrustSections';
import { buildWhatsAppUrl, trackWhatsAppClick, trackCallClick, trackProductView } from '../services/analytics';
import { canonicalUrl, categoryPath, productMetaDescription, productPath } from '../seo';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, settings } = useData();
  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      trackProductView(product);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-harvest-green underline">Go back to shop</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const whatsappUrl = buildWhatsAppUrl(settings.whatsapp, product);
  const hasRealPhoto = product.image.startsWith('/');

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(product, 'product_detail', 'primary');
  };

  const handleCallClick = () => {
    trackCallClick('product_detail');
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": canonicalUrl('/') },
      { "@type": "ListItem", "position": 2, "name": product.category, "item": canonicalUrl(categoryPath(product.category)) },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": canonicalUrl(productPath(product)) }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.image],
    "description": product.description,
    "sku": product.id,
    "url": canonicalUrl(productPath(product)),
    "brand": {
      "@type": "Brand",
      "name": "Harvest Farm Machineries"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "KES",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "url": canonicalUrl(productPath(product)),
      "seller": {
        "@type": "Organization",
        "name": "Harvest Farm Machineries Nakuru"
      }
    }
  };

  return (
    <div className="bg-white min-h-screen pb-28 md:pb-16">
      <Helmet>
        <title>{product.name} | Buy in Nakuru | Harvest Farm Machineries</title>
        <meta name="description" content={productMetaDescription(product)} />
        <link rel="canonical" href={canonicalUrl(productPath(product))} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name} | Harvest Farm Machineries`} />
        <meta property="og:description" content={productMetaDescription(product)} />
        <meta property="og:url" content={canonicalUrl(productPath(product))} />
        <meta property="og:image" content={product.image} />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-harvest-green">Home</Link>
          <span className="mx-2">/</span>
          <Link to={categoryPath(product.category)} className="hover:text-harvest-green">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Gallery Side */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square relative">
              {product.stockStatus === 'limited' && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 animate-pulse shadow-lg">
                  <AlertTriangle size={14} /> Limited Stock — Order Now
                </div>
              )}
              {product.stockStatus === 'made-to-order' && (
                <div className="absolute top-4 left-4 z-10 bg-harvest-brown text-harvest-gold px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg">
                  Made to Order — 5-7 Days
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover" 
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  const text = encodeURIComponent(e.currentTarget.alt || 'Product');
                  e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><rect width="100%" height="100%" fill="%23F5DEB3"/><text x="50%" y="50%" font-family="sans-serif" font-size="30" font-weight="bold" fill="%238B4513" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <span className={`${hasRealPhoto ? 'bg-harvest-green' : 'bg-harvest-brown'} text-white px-3 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg`}>
                  {hasRealPhoto ? 'Actual machine photo' : 'Fresh photo available on WhatsApp'}
                </span>
                <span className="bg-white/95 text-harvest-brown px-3 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg">
                  Nakuru dispatch
                </span>
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div>
            <span className="text-harvest-green font-bold text-sm tracking-wide uppercase">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4 bg-harvest-green/10 text-harvest-green px-3 py-1.5 rounded-full w-fit">
              <Star size={14} fill="currentColor" />
              <span className="text-xs font-bold uppercase tracking-wide">Trusted by farmers across Kenya</span>
            </div>

            {/* Popular In */}
            {product.popularIn && product.popularIn.length > 0 && (
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 font-medium">
                <MapPin size={14} className="text-harvest-orange" />
                Most popular in {product.popularIn.join(', ')}
              </div>
            )}

            <div className="text-4xl font-bold text-gray-900 mb-2">
              KSh {product.price.toLocaleString('en-KE')}
            </div>
            <p className="text-sm text-gray-500 font-semibold mb-6">
              Pay on delivery  inspect first  M-Pesa accepted  delivery arranged from Nakuru
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description} Built for durability and high efficiency in Kenyan farming conditions.
            </p>

            {/* Guarantee Badges */}
            <div className="mb-8">
              <GuaranteeBadges variant="grid" />
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-green-100 p-1 rounded-full"><Check size={16} className="text-harvest-green" /></div>
                <span>{product.stockStatus === 'limited' ? 'Limited stock — order soon' : product.stockStatus === 'made-to-order' ? 'Made to order — 5-7 business days' : 'Available in stock (Nakuru)'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-green-100 p-1 rounded-full"><Check size={16} className="text-harvest-green" /></div>
                <span>Pay on delivery after machine proof and delivery terms are confirmed</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-green-100 p-1 rounded-full"><Check size={16} className="text-harvest-green" /></div>
                <span>Warranty support, spare-parts guidance, and operator training included</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noreferrer"
                onClick={handleWhatsAppClick}
                className="flex-1 bg-[#25D366] text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-600/20"
              >
                <MessageCircle size={22} fill="white" /> Order on WhatsApp
              </a>
              <a 
                href={`tel:${settings.phone}`}
                onClick={handleCallClick}
                className="flex-1 bg-white border-2 border-gray-200 text-gray-900 py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:border-gray-900 transition-colors"
              >
                <Phone /> Talk to an Expert
              </a>
            </div>

            <div className="bg-harvest-cream p-4 rounded-xl border border-orange-100 space-y-4 text-left">
               <div>
                 <div className="flex items-center gap-3 mb-2">
                   <Truck className="text-harvest-orange" />
                   <span className="font-bold text-gray-900">Delivery Information</span>
                 </div>
                 <p className="text-sm text-gray-600">
                   We confirm your county, transport cost, timing, and any booking requirement on WhatsApp before dispatch. 
                   You can ask for fresh photos or a short demo video before the machine leaves Nakuru.
                 </p>
               </div>
               <div className="pt-3 border-t border-orange-200">
                 <div className="flex items-center gap-3 mb-2">
                   <span className="text-lg">🌍</span>
                   <span className="font-bold text-gray-900">Uganda, Tanzania & Zambia Orders</span>
                 </div>
                 <p className="text-sm text-gray-600">
                   We ship agricultural machinery duty-free across East & Central Africa. Shipping cost, transit insurance, customs clearance, and USD/Mobile Money payments will be structured and verified via WhatsApp before dispatch.
                 </p>
               </div>
            </div>
          </div>
        </div>

        <ProductTrustSections product={product} />

        {/* Specs Table */}
        <div className="mb-16">
           <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
           <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
             <table className="w-full text-left">
               <tbody className="divide-y divide-gray-100">
                 {Object.entries(product.specs).map(([key, value], index) => (
                   <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                     <td className="p-4 font-semibold text-gray-700 w-1/3">{key}</td>
                     <td className="p-4 text-gray-600">{value}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA product={product} />
    </div>
  );
};

export default ProductDetail;
