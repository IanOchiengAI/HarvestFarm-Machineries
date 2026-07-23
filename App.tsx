import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AIAdvisor from './components/AIAdvisor';
import ScrollToTop from './components/ScrollToTop';
import SocialProofNotification from './components/SocialProofNotification';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CategoryHub from './pages/CategoryHub';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { canonicalUrl } from './seo';

import { DataProvider } from './store/DataContext';
import { StatsProvider } from './store/StatsContext';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminSettings from './pages/admin/AdminSettings';

const App: React.FC = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'Store'],
    name: 'Harvest Farm Machineries',
    url: canonicalUrl('/'),
    logo: canonicalUrl('/logo.png'),
    image: canonicalUrl('/og-image.png'),
    telephone: '+254713812392',
    email: 'info@harvestfarm.co.ke',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nakuru Industrial Area',
      addressCountry: 'KE',
    },
    areaServed: 'Kenya',
    priceRange: 'KSh 45,000 - KSh 500,000',
    sameAs: ['https://wa.me/254713812392'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Harvest Farm Machineries',
    url: canonicalUrl('/'),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${canonicalUrl('/shop')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <DataProvider>
      <StatsProvider>
        <Router>
          <div className="flex flex-col min-h-screen font-sans">
            <Helmet>
              <title>Harvest Farm Machineries | Reliable Farm Machines in Nakuru</title>
              <meta name="description" content="Shop reliable posho mills, hullers, and maize shellers in Nakuru, Kenya. Founded by Ian Wambugu Ochieng Sitati. Nationwide delivery and training." />
              <link rel="canonical" href={canonicalUrl('/')} />
              <meta property="og:type" content="website" />
              <meta property="og:title" content="Harvest Farm Machineries - Kenya's Trusted Farm Equipment Partner" />
              <meta property="og:description" content="Quality agricultural machinery for Kenyan farmers. Visit Harvest Farm in Nakuru for posho mills, choppermills, and shellers." />
              <meta property="og:image" content="https://harvestfarmnk.co.ke/og-image.png" />
              <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
              <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
            </Helmet>
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/:categorySlug" element={<CategoryHub />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <AIAdvisor />
            <SocialProofNotification />
            <WhatsAppButton />
            <ScrollToTop />
            <Footer />
          </div>
        </Router>
      </StatsProvider>
    </DataProvider>
  );
};

export default App;
