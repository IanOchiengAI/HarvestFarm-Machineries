# Design System — HarvestFarm Machineries

> Component patterns, layout conventions, and implementation standards.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.x |
| Bundler | Vite | 6.x |
| Language | TypeScript | 5.8 |
| Styling | TailwindCSS (CDN) | Latest |
| Routing | React Router DOM (BrowserRouter) | 7.x |
| Animations | Motion (Framer Motion) | 12.x |
| Icons | Lucide React | 0.574 |
| AI | Google Generative AI (Gemini 1.5 Flash) | 0.24 |
| SEO | react-helmet-async | 3.x |

## Project Structure

```
Root files (flat — no src/ directory):
├── index.html          → HTML shell, Tailwind CDN, Google Fonts
├── index.tsx           → React entry (HelmetProvider + StrictMode)
├── App.tsx             → Router + layout (Header, Footer, WhatsApp, AI)
├── constants.ts        → Products, categories, testimonials, contact info
├── types.ts            → Product, Category, Testimonial interfaces
├── vite.config.ts      → Vite config with env + path aliases
│
├── components/
│   ├── Header.tsx      → Sticky nav + top bar + mobile menu
│   ├── Footer.tsx      → 3-column footer with links, brand, contact
│   ├── ProductCard.tsx  → Reusable product card for grids
│   ├── WhatsAppButton.tsx → Fixed FAB (bottom-right)
│   └── AIAdvisor.tsx   → AI chat panel (bottom-left)
│
├── pages/
│   ├── Home.tsx        → Hero + trust badges + categories + best sellers + testimonials + CTA
│   ├── Shop.tsx        → Filter sidebar + search + sort + product grid
│   ├── ProductDetail.tsx → Gallery + specs + CTA + related products
│   ├── Services.tsx    → Mission, values, services, coverage map
│   └── Contact.tsx     → Contact info + form + map placeholder
│
└── services/
    └── aiService.ts    → Gemini chat with product catalog context
```

## Routing

| Path | Page | Notes |
|------|------|-------|
| `/` | Home | Landing page |
| `/shop` | Shop | Full catalog with filters |
| `/product/:id` | ProductDetail | Individual product page |
| `/:categorySlug` | CategoryHub | Crawlable category hub pages |
| `/services` | Services | Mission, values, service offerings |
| `/contact` | Contact | Contact form + info |

Uses `BrowserRouter` for clean public URLs. Production hosting should serve generated static route files from `dist/` and fall back to `/index.html` for client-only routes such as admin screens.

Build-time SEO generation runs through:
- `execution/generate-sitemap.mjs` before Vite build.
- `execution/prerender-seo.mjs` after Vite build.

The generated output creates crawlable HTML for home, shop, product, category, services, and contact URLs.

## Layout Architecture

```
┌──────────────────────────────────────────┐
│ Top Bar (green, desktop only)            │
├──────────────────────────────────────────┤
│ Header (sticky, white, shadow)           │
├──────────────────────────────────────────┤
│                                          │
│ <main> — flex-grow                       │
│   └── Page content (Routes)             │
│                                          │
├──────────────────────────────────────────┤
│ Footer (harvest-brown)                   │
└──────────────────────────────────────────┘

Fixed overlays:
  ┌─── AI Advisor (bottom-left, z-60) ────┐
  └─── WhatsApp FAB (bottom-right, z-50) ─┘
```

## Component Patterns

### ProductCard
- **Props:** `{ product: Product }`
- **Layout:** Image (h-56) → Category label → Name → Description → Price → CTA link
- **Interactions:** Group hover image zoom, shadow elevation
- **Badge:** "BEST SELLER" if `product.isBestSeller`

### Header
- **Desktop:** Top bar (green) + Main nav with active underline + Search/Cart icons
- **Mobile:** Hamburger menu → slide-down panel
- **Sticky:** `sticky top-0 z-40`

### AIAdvisor
- **State:** Toggle open/close with AnimatePresence
- **Chat:** Message history with user/model bubbles
- **Quick prompts:** Pre-set question buttons when empty
- **Powered by:** Gemini badge in header

### WhatsAppButton
- **Fixed:** `bottom-6 right-6 z-50`
- **Style:** Green pill with icon + text (text hidden on mobile)

## Data Model

### Product
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;        // KES
  image: string;        // URL
  description: string;
  specs: Record<string, string>;
  isBestSeller?: boolean;
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  image: string;
}
```

### Testimonial
```typescript
interface Testimonial {
  id: string;
  name: string;
  location: string;    // Kenyan county/town
  text: string;
  image: string;
}
```

## Spacing Conventions

| Context | Value |
|---------|-------|
| Section padding | `py-20` or `py-24` |
| Content max-width | `max-w-7xl mx-auto px-4` |
| Card padding | `p-4` (compact) / `p-8` or `p-10` (feature) |
| Grid gap | `gap-6` / `gap-8` / `gap-10` |
| Component gap | `gap-2` to `gap-5` |

## Responsive Breakpoints

| Breakpoint | Usage |
|-----------|-------|
| Default (mobile) | Single column, hidden elements |
| `md:` (768px) | Multi-column grids, desktop nav, top bar |
| `lg:` (1024px) | Wider grids, side-by-side layouts |

## SEO Pattern

Each page should include a `<Helmet>` block:
```tsx
<Helmet>
  <title>{PageTitle} | Harvest Farm Machineries</title>
  <meta name="description" content="{page-specific description}" />
</Helmet>
```

Product pages additionally include Schema.org `Product` structured data.

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GEMINI_API_KEY` | Powers the AI Advisor chatbot |

Loaded via Vite's `loadEnv` and exposed as `process.env.GEMINI_API_KEY`.

---

*Reference this directive before making any structural changes to the codebase.*
