# Analytics Plan — HarvestFarm Machineries

> Conversion tracking strategy for WhatsApp-first agricultural machinery e-commerce.

## Key Conversion Events

| Event Name | Trigger | Parameters | Priority |
|-----------|---------|------------|----------|
| `whatsapp_click` | Any WhatsApp CTA clicked | `product_id`, `product_name`, `price`, `source_page`, `cta_type` | 🔴 Critical |
| `call_click` | Any phone call link clicked | `source_page` | 🔴 Critical |
| `contact_form_submit` | Contact form submitted | `has_product_inquiry` | 🟡 High |
| `ai_chat_open` | AI advisor panel opened | — | 🟡 High |
| `ai_chat_message` | User sends a message to AI | `message_count` | 🟢 Medium |
| `product_view` | Product detail page loaded | `product_id`, `product_name`, `price`, `category` | 🟡 High |
| `quiz_started` | "Which machine?" quiz opened | — | 🟢 Medium |
| `quiz_completed` | Quiz shows recommendation | `recommended_product`, `budget_tier` | 🟡 High |

## CTA Types for `whatsapp_click`

| `cta_type` Value | Location |
|-----------------|----------|
| `header` | Header navigation WhatsApp button |
| `primary` | ProductDetail main CTA |
| `compact` | ProductCard grid shortcut |
| `sticky` | Mobile sticky bottom bar |
| `fab` | Floating WhatsApp button (FAB) |
| `hero` | Home page hero CTA |
| `footer` | Footer or CTA sections |

## Recommended Tools

### Phase 1 (Immediate)
- **Google Analytics 4 (GA4)** — Free, covers all event tracking needs
- **Google Tag Manager** — For managing event tags without code changes
- Add GA4 snippet to `index.html`

### Phase 2 (Month 2-3)
- **WhatsApp Business API** — Track message delivery, read receipts, response times
- **Hotjar or Microsoft Clarity** — Heatmaps and session recordings (free tier)

### Phase 3 (Month 4+)
- **Facebook Pixel** — If running social media ads
- **Google Ads Conversion Tracking** — If running search ads

## GA4 Implementation

Add to `index.html` `<head>`:
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

> [!IMPORTANT]
> Replace `G-XXXXXXXXXX` with the actual GA4 Measurement ID once the Google Analytics property is created.

Also update the Content Security Policy in `index.html` to allow GA4:
```
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
connect-src 'self' https://generativelanguage.googleapis.com https://www.google-analytics.com https://analytics.google.com;
img-src 'self' https://images.unsplash.com https://www.google-analytics.com data:;
```

## KPI Targets — First 3 Months

### Month 1: Baseline
| Metric | Target |
|--------|--------|
| WhatsApp clicks / month | 50+ |
| Call clicks / month | 20+ |
| Product page views / month | 200+ |
| AI chat opens / month | 30+ |
| Bounce rate | < 65% |

### Month 2: Growth
| Metric | Target |
|--------|--------|
| WhatsApp clicks / month | 100+ |
| Call clicks / month | 40+ |
| Quiz completion rate | 5%+ of shop visitors |
| Product → WhatsApp conversion | 8%+ |
| Average session duration | > 2 minutes |

### Month 3: Optimization
| Metric | Target |
|--------|--------|
| WhatsApp clicks / month | 150+ |
| Product → WhatsApp conversion | 10%+ |
| Top-performing product identified | ✓ |
| Top traffic source identified | ✓ |
| First A/B test completed | ✓ |

## A/B Test Ideas

### High Priority
1. **CTA Color Test** — Green (`#228B22`) vs Orange (`#FF8C00`) for the primary WhatsApp button
2. **CTA Text Test** — "Order on WhatsApp" vs "Get Best Price on WhatsApp" vs "Chat to Order"
3. **Price Display** — Standard price vs "From KSh X/month" installment framing

### Medium Priority
4. **Hero Image** — Machinery close-up vs farmer-using-machinery lifestyle shot
5. **Quiz Position** — Floating button vs inline section on Shop page
6. **Social Proof** — With notifications vs without (measure conversion impact)

### Low Priority
7. **Trust Badge Order** — Warranty-first vs Pay-on-Delivery-first
8. **Mobile CTA Bar** — Full-width vs two-button split
9. **Product Card Layout** — With WhatsApp shortcut vs without

## UTM Strategy

All external links (social media, Google Ads, WhatsApp status) should use UTM parameters:

```
https://harvestfarmnk.co.ke/#/shop?utm_source=whatsapp&utm_medium=status&utm_campaign=may_sale
```

Standard campaign names:
- `organic_search` — Google organic
- `whatsapp_status` — WhatsApp status posts
- `facebook_ad` — Facebook/Instagram ads
- `referral` — Partner referrals

## Reporting Cadence

| Frequency | Report |
|-----------|--------|
| Daily | Quick check: WhatsApp clicks, top product |
| Weekly | Full funnel: Traffic → Views → Clicks → Inquiries |
| Monthly | KPI review, A/B test results, product performance |

---

*This directive is maintained by the analytics team. Update when new features or pages are added.*
