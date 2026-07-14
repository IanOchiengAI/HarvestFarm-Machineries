import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Do you deliver outside Nakuru?',
    a: 'Yes — we deliver to all 47 counties in Kenya. Delivery within Nakuru is often same-day. For the rest of the country we use trusted transport partners; most orders arrive within 24–48 hours after dispatch.',
  },
  {
    q: 'How does "Pay on Delivery" work?',
    a: 'We ask for a small commitment fee before we dispatch the machine. You pay the remaining balance only after the machine has been delivered to your farm, inspected, and tested in front of you.',
  },
  {
    q: 'Do you provide installation and training?',
    a: 'Yes! For complex machines like Roller Mills and Combined Posho Mills, our technicians will come to your farm, handle the full installation, and train you and your operators on safe, efficient use.',
  },
  {
    q: 'Where can I get spare parts?',
    a: 'We stock all genuine spare parts for our machines at our Nakuru CBD showroom. We can also courier parts to you anywhere in Kenya via G4S or Fargo Courier — usually within 1–2 business days.',
  },
  {
    q: 'What does the 1-Year Warranty cover?',
    a: 'Our warranty covers all manufacturing defects and engine faults for 12 months. It does not cover normal wear-and-tear items such as belts, screens, and grinding plates, or damage caused by improper use.',
  },
  {
    q: 'Can I see the machine before I buy?',
    a: 'Absolutely. Our showroom in Nakuru CBD has working display units. You are welcome to visit Monday–Saturday 8am–6pm and our team will walk you through every machine.',
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-harvest-green font-black text-xs uppercase tracking-widest mb-2 block">
            Common Questions
          </span>
          <h2 className="text-4xl font-black text-harvest-brown tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-harvest-gold mx-auto mt-5 rounded-full" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                id={`faq-btn-${i}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-harvest-cream/50 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="font-bold text-harvest-brown pr-4 text-base leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-harvest-green transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 pt-1 bg-harvest-cream/30 text-gray-600 leading-relaxed font-medium text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
