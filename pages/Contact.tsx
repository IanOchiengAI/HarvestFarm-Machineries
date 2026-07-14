import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useData } from '../store/DataContext';
import { trackContactForm } from '../services/analytics';
import { canonicalUrl } from '../seo';

// Sanitize input helper to prevent XSS
const sanitize = (str: string) => {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
};

const Contact: React.FC = () => {
  const { settings } = useData();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const validateForm = () => {
    const newErrors = { name: '', phone: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name is too long';
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^(07|01|\+254)[0-9]{8}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Enter a valid Kenyan number (e.g. 07XX or +254)';
      isValid = false;
    } else if (formData.phone.length > 15) {
      newErrors.phone = 'Phone number is too long';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message must be under 1000 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0 || isSubmitting) return;

    if (validateForm()) {
      setIsSubmitting(true);
      
      const sanitizedData = {
        name: sanitize(formData.name),
        phone: sanitize(formData.phone),
        message: sanitize(formData.message)
      };

      trackContactForm(true);

      const messageText = `*New Inquiry via Website*\n\n*Name:* ${sanitizedData.name}\n*Phone:* ${sanitizedData.phone}\n*Inquiry:* ${sanitizedData.message}`;
      const whatsappUrl = `${settings.whatsapp}?text=${encodeURIComponent(messageText)}`;

      // Simulate short processing delay then open WhatsApp
      setTimeout(() => {
        setIsSubmitting(false);
        setStatus('success');
        setFormData({ name: '', phone: '', message: '' });
        setCooldown(30); // 30 second rate limit
        
        window.open(whatsappUrl, '_blank');
        
        setTimeout(() => setStatus('idle'), 5000);
      }, 800);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Contact Us | Visit Our Showroom in Nakuru | Harvest Farm Machineries</title>
        <meta name="description" content="Call +254713812392 or visit our Nakuru Industrial Area showroom. Expert advice on posho mills, hullers, and farm equipment." />
        <link rel="canonical" href={canonicalUrl('/contact')} />
      </Helmet>
      <div className="bg-harvest-brown text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-black tracking-tight uppercase">Get in Touch</h1>
        <p className="text-harvest-gold mt-2 font-bold tracking-[0.2em]">Contact Harvest Farm Machineries</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-black mb-8 text-harvest-brown tracking-tight">Our Showroom</h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed font-medium">
              Join the hundreds of farmers who have powered their success with a Harvest machine. 
              Founded by Ian Wambugu Ochieng Sitati, we offer expert advice on all agricultural equipment.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="bg-harvest-green/10 p-4 rounded-2xl text-harvest-green group-hover:scale-110 transition-transform">
                  <Phone size={32} />
                </div>
                <div>
                  <h3 className="font-black text-xl text-harvest-brown">Call or WhatsApp</h3>
                  <p className="text-gray-500 mb-1 font-semibold uppercase text-xs tracking-wider">Expert Advice Line</p>
                  <a href={`tel:${settings.phone}`} className="text-harvest-green font-black text-2xl hover:underline">{settings.phone}</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-harvest-green/10 p-4 rounded-2xl text-harvest-green group-hover:scale-110 transition-transform">
                  <MapPin size={32} />
                </div>
                <div>
                  <h3 className="font-black text-xl text-harvest-brown">Our Location</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {settings.location}<br/>
                    Open to all Farmers in Kenya.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-harvest-green/10 p-4 rounded-2xl text-harvest-green group-hover:scale-110 transition-transform">
                  <Mail size={32} />
                </div>
                <div>
                  <h3 className="font-black text-xl text-harvest-brown">Email Inquiries</h3>
                  <a href={`mailto:${settings.email}`} className="text-gray-600 font-bold hover:text-harvest-green text-lg">{settings.email}</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-harvest-green/10 p-4 rounded-2xl text-harvest-green group-hover:scale-110 transition-transform">
                  <Clock size={32} />
                </div>
                <div>
                  <h3 className="font-black text-xl text-harvest-brown">Office Hours</h3>
                  <p className="text-gray-600 font-medium">{settings.officeHours}</p>
                  <p className="text-harvest-brown font-bold uppercase text-xs mt-1">Closed on Sundays & Holidays</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <a href={settings.whatsapp} target="_blank" rel="noreferrer" className="block w-full bg-[#25D366] text-white text-center py-5 rounded-2xl font-black text-xl hover:bg-green-600 transition-all shadow-xl hover:-translate-y-1 uppercase tracking-widest text-sm">
                Start a WhatsApp Conversation
              </a>
            </div>
          </div>

          {/* Form & Map */}
          <div className="flex flex-col gap-10">
            <div className="bg-harvest-cream/50 p-10 rounded-[2.5rem] shadow-2xl border border-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-harvest-green opacity-20"></div>
              <h3 className="text-2xl font-black text-harvest-brown mb-8 uppercase tracking-tight">Send an Inquiry</h3>
              
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-sm font-bold text-center">
                  WhatsApp is opening — tap <span className="underline">Send</span> inside the app to complete your inquiry.
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="farmer-name" className="block text-xs font-black text-harvest-brown uppercase tracking-widest pl-1">Farmer Name</label>
                  <input 
                    id="farmer-name"
                    name="name"
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className={`w-full rounded-2xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-harvest-green/30 focus:border-harvest-green py-4 px-6 font-medium shadow-sm outline-none transition-colors`} 
                    placeholder="John Ochieng" 
                    maxLength={100}
                    pattern="[a-zA-Z\s]*"
                    aria-label="Farmer Name"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    required
                  />
                  {errors.name && <p id="name-error" className="text-red-500 text-xs font-bold pl-2">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="mobile-contact" className="block text-xs font-black text-harvest-brown uppercase tracking-widest pl-1">Mobile Contact</label>
                  <input 
                    id="mobile-contact"
                    name="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className={`w-full rounded-2xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-harvest-green/30 focus:border-harvest-green py-4 px-6 font-medium shadow-sm outline-none transition-colors`} 
                    placeholder="07XX XXX XXX or +254..." 
                    maxLength={15}
                    aria-label="Mobile Contact"
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    required
                  />
                  {errors.phone && <p id="phone-error" className="text-red-500 text-xs font-bold pl-2">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="machinery-inquiry" className="block text-xs font-black text-harvest-brown uppercase tracking-widest pl-1">Specific Machinery Inquiry</label>
                  <textarea 
                    id="machinery-inquiry"
                    name="message"
                    rows={4} 
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className={`w-full rounded-2xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-harvest-green/30 focus:border-harvest-green py-4 px-6 font-medium shadow-sm outline-none transition-colors`} 
                    placeholder="Tell us about your farm and the equipment you need..."
                    maxLength={1000}
                    aria-label="Specific Machinery Inquiry"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    required
                  ></textarea>
                  {errors.message && <p id="message-error" className="text-red-500 text-xs font-bold pl-2">{errors.message}</p>}
                  <p className="text-xs text-gray-400 text-right">{formData.message.length}/1000</p>
                </div>
                <button 
                  type="submit"
                  disabled={cooldown > 0 || isSubmitting}
                  className="w-full bg-harvest-brown text-white font-black py-5 rounded-2xl hover:bg-brown-700 transition-all hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest text-sm disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Send My Inquiry'}
                </button>
              </form>
            </div>
            
            <div className="bg-gray-100 rounded-[2.5rem] h-80 w-full overflow-hidden shadow-2xl border-4 border-white relative">
              <iframe
                title="Harvest Farm Machineries Showroom Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.018903332158!2d36.0631627!3d-0.2872332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18298d72e3a5a741%3A0x0!2sNakuru+Industrial+Area%2C+Nakuru!5e0!3m2!1sen!2ske!4v1710000000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
