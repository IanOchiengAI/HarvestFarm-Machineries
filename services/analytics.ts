/**
 * Analytics Utility — HarvestFarm Machineries
 * Lightweight wrapper for GA4 event tracking.
 * Gracefully degrades if GA4 is not loaded.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

import { dispatchAdminEvent } from '../store/StatsContext';

/**
 * Fire a custom GA4 event. No-ops if gtag is unavailable.
 */
export function trackEvent(eventName: string, params?: EventParams): void {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
    }
    // Dispatch to local admin dashboard stats
    dispatchAdminEvent(eventName, params);
    
    // Also log to console in development for debugging
    if (import.meta.env.DEV) {
      console.log(`[Analytics] ${eventName}`, params);
    }
  } catch {
    // Silent fail — analytics should never break the app
  }
}

/**
 * Track a WhatsApp CTA click with product context.
 */
export function trackWhatsAppClick(
  product: { id: string; name: string; price: number; category?: string },
  sourcePage: string,
  ctaType: 'primary' | 'compact' | 'sticky' | 'fab' | 'header' | 'hero' | 'proof_request' = 'primary'
): void {
  trackEvent('whatsapp_click', {
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    category: product.category,
    source_page: sourcePage,
    cta_type: ctaType,
  });
}

/**
 * Track a phone call CTA click.
 */
export function trackCallClick(sourcePage: string): void {
  trackEvent('call_click', { source_page: sourcePage });
}

/**
 * Track a product detail page view.
 */
export function trackProductView(product: { id: string; name: string; price: number; category: string }): void {
  trackEvent('product_view', {
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    category: product.category,
  });
}

/**
 * Track AI advisor interactions.
 */
export function trackAIChat(action: 'open' | 'message', messageCount?: number): void {
  trackEvent(action === 'open' ? 'ai_chat_open' : 'ai_chat_message', {
    message_count: messageCount,
  });
}

/**
 * Track quiz interactions.
 */
export function trackQuiz(action: 'started' | 'completed', recommendedProduct?: string, budgetTier?: string): void {
  trackEvent(action === 'started' ? 'quiz_started' : 'quiz_completed', {
    recommended_product: recommendedProduct,
    budget_tier: budgetTier,
  });
}

/**
 * Track contact form submissions.
 */
export function trackContactForm(hasProductInquiry: boolean): void {
  trackEvent('contact_form_submit', { has_product_inquiry: hasProductInquiry });
}

/**
 * Build a tracked WhatsApp URL with product context.
 */
export function buildWhatsAppUrl(
  baseUrl: string,
  product?: { id: string; name: string; price: number },
  customMessage?: string
): string {
  if (customMessage) {
    return `${baseUrl}?text=${encodeURIComponent(customMessage)}`;
  }
  
  if (product) {
    const message = `Hi! I'm interested in the *${product.name}* (KSh ${product.price.toLocaleString('en-KE')}). Is it available? I'd also like to know about delivery options.`;
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  
  return baseUrl;
}
