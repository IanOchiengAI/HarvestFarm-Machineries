import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, LucideIcon, MessageCircle, Phone, ShieldCheck, Truck, Wrench } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useData } from '../store/DataContext';
import { buildWhatsAppUrl, trackCallClick, trackWhatsAppClick } from '../services/analytics';
import { canonicalUrl, categoryFromSlug, categoryPath, productPath } from '../seo';

const POSHO_FAQS = [
  {
    question: 'What is the price of a posho mill in Kenya?',
    answer: 'Harvest Farm posho mills currently start from KSh 75,000 for a standard electric poshomill, with commercial combined setups ranging higher depending on power source, capacity, and hulling needs.',
  },
  {
    question: 'Should I choose an electric or diesel posho mill?',
    answer: 'Choose electric if you have reliable power and want lower daily running costs. Choose diesel if your area has power cuts, no grid connection, or you need to mill in rural market centres.',
  },
  {
    question: 'Can I start a maize milling business with one machine?',
    answer: 'Yes. Many starters begin with a standard poshomill, then add a huller or combined unit when customer demand grows for sifted flour.',
  },
  {
    question: 'Does Harvest Farm deliver and install posho mills?',
    answer: 'Yes. Harvest Farm supplies from Nakuru, offers nationwide delivery, and helps with installation and machine training after delivery.',
  },
];

const TRUST_POINTS: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Truck, title: 'Nationwide delivery', text: 'Transport arranged from Nakuru to your county.' },
  { icon: Wrench, title: 'Installation and training', text: 'We help you set up and learn safe operation.' },
  { icon: ShieldCheck, title: 'Warranty support', text: 'New machines with clear after-sale support.' },
];

const CategoryHub: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { products, categories, settings } = useData();
  const category = categoryFromSlug(categories, categorySlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-harvest-cream px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-black text-harvest-brown mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">Browse the full machinery catalog to find the right equipment.</p>
          <Link to="/shop" className="inline-flex bg-harvest-green text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs">
            View All Machines
          </Link>
        </div>
      </div>
    );
  }

  const categoryProducts = products.filter((product) => product.category === category.name);
  const bestSeller = categoryProducts.find((product) => product.isBestSeller) || categoryProducts[0];
  const isPoshoMills = category.id === 'posho-mills';
  const pagePath = categoryPath(category.name);
  const pageTitle = isPoshoMills
    ? 'Posho Mills in Kenya | Prices, Electric & Diesel Options | Harvest Farm'
    : `${category.name} in Kenya | Harvest Farm Machineries Nakuru`;
  const pageDescription = isPoshoMills
    ? 'Compare posho mill prices in Kenya from Harvest Farm Machineries Nakuru. Electric, diesel, combined poshomills, delivery, training, and pay-on-delivery support.'
    : `Shop ${category.name.toLowerCase()} in Kenya from Harvest Farm Machineries Nakuru. Compare machines, prices, delivery, warranty, and WhatsApp ordering.`;

  const faqSchema = isPoshoMills
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: POSHO_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl('/') },
      { '@type': 'ListItem', position: 2, name: category.name, item: canonicalUrl(pagePath) },
    ],
  };

  const whatsappUrl = bestSeller ? buildWhatsAppUrl(settings.whatsapp, bestSeller) : settings.whatsapp;

  return (
    <main className="bg-harvest-cream min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl(pagePath)} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl(pagePath)} />
        <meta property="og:image" content={bestSeller?.image || '/og-image.png'} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <div className="text-sm text-gray-500 mb-8">
              <Link to="/" className="hover:text-harvest-green">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-harvest-brown font-bold">{category.name}</span>
            </div>
            <span className="text-harvest-green font-black text-xs uppercase tracking-widest mb-4 block">
              Nakuru machinery supply
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-harvest-brown mb-6">
              {isPoshoMills ? 'Posho Mills for Kenyan Maize Milling' : `${category.name} for Kenyan Farms`}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              {isPoshoMills
                ? 'Compare electric, diesel, and combined posho mills for home milling, market centres, and commercial sifted flour businesses. See prices, capacity, power options, and talk to Ian before you buy.'
                : `Compare reliable ${category.name.toLowerCase()} from Harvest Farm Machineries in Nakuru. Get plain advice, visible prices, nationwide delivery, warranty support, and WhatsApp ordering.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {bestSeller && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackWhatsAppClick(bestSeller, `${category.id}_hub`, 'hero')}
                  className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-green-600/20"
                >
                  <MessageCircle size={18} fill="white" /> Ask on WhatsApp
                </a>
              )}
              <a
                href={`tel:${settings.phone}`}
                onClick={() => trackCallClick(`${category.id}_hub`)}
                className="bg-white border-2 border-harvest-brown text-harvest-brown px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Call {settings.phone}
              </a>
            </div>
          </div>
          {bestSeller && (
            <Link to={productPath(bestSeller)} className="group bg-harvest-brown rounded-2xl overflow-hidden shadow-2xl border border-harvest-brown">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={bestSeller.image} alt={`${bestSeller.name} available from Harvest Farm Nakuru`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 text-white flex items-center justify-between gap-4">
                <div>
                  <p className="text-harvest-gold text-xs font-black uppercase tracking-widest mb-1">Featured machine</p>
                  <h2 className="text-2xl font-black">{bestSeller.name}</h2>
                </div>
                <p className="text-harvest-gold font-black whitespace-nowrap">KSh {bestSeller.price.toLocaleString('en-KE')}</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {isPoshoMills && (
        <section className="py-14 bg-harvest-cream">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
            {[
              ['Electric posho mills', 'Best for towns and estates with stable power. Lower daily running costs and simple operation.'],
              ['Diesel posho mills', 'Best for off-grid centres, market days, and places where power cuts can stop business.'],
              ['Combined posho mills', 'Best when customers want hulling plus fine maize meal from one coordinated setup.'],
            ].map(([title, text]) => (
              <div key={title} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <CheckCircle className="text-harvest-green mb-4" size={28} />
                <h2 className="font-black text-harvest-brown text-xl mb-3">{title}</h2>
                <p className="text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <div>
              <span className="text-harvest-green font-black text-xs uppercase tracking-widest">Machines and prices</span>
              <h2 className="text-3xl md:text-4xl font-black text-harvest-brown mt-3">
                {category.name} Available Now
              </h2>
            </div>
            <Link to="/shop" className="text-harvest-brown font-black uppercase tracking-widest text-xs underline underline-offset-8">
              Browse full catalog
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {isPoshoMills && (
        <>
          <section className="py-16 bg-harvest-cream">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
              <div>
                <span className="text-harvest-green font-black text-xs uppercase tracking-widest">Buying advice</span>
                <h2 className="text-3xl md:text-4xl font-black text-harvest-brown mt-3 mb-5">
                  How to choose the right posho mill
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Start with your expected maize volume, your power source, and whether customers need sifted flour. If you are starting a business, choose a machine that can run for long hours and leave room to add a huller later.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-harvest-brown text-harvest-gold">
                    <tr>
                      <th className="p-4 text-sm">Need</th>
                      <th className="p-4 text-sm">Good option</th>
                      <th className="p-4 text-sm">Why</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-4 font-bold text-gray-800">Low starting budget</td>
                      <td className="p-4">Electric Poshomill</td>
                      <td className="p-4 text-gray-600">Simple setup from KSh 75,000.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-gray-800">Off-grid milling</td>
                      <td className="p-4">Diesel Poshomill</td>
                      <td className="p-4 text-gray-600">Keeps working without grid power.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-gray-800">Sifted flour business</td>
                      <td className="p-4">Combined Electric Poshomill</td>
                      <td className="p-4 text-gray-600">Hulls and mills in one flow.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="faq" className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-10">
                <ShieldCheck className="mx-auto text-harvest-green mb-4" size={40} />
                <h2 className="text-3xl md:text-4xl font-black text-harvest-brown">Posho Mill Questions</h2>
              </div>
              <div className="space-y-4">
                {POSHO_FAQS.map((faq) => (
                  <div key={faq.question} className="bg-harvest-cream rounded-xl p-6 border border-gray-100">
                    <h3 className="font-black text-harvest-brown text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <section className="py-14 bg-harvest-brown text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {TRUST_POINTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <Icon className="text-harvest-gold flex-shrink-0" size={30} />
              <div>
                <h2 className="font-black text-lg mb-1">{title}</h2>
                <p className="text-white/75">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CategoryHub;
