# Brand Identity — HarvestFarm Machineries

> The definitive brand reference for all design and content work on this project.

## Brand Essence

**Name:** Harvest Farm Machineries
**Tagline:** "Powering Kenya's Farms with Reliable Machinery"
**Personality:** Professional, warmly authoritative, empowering, trustworthy
**Voice:** Like a senior colleague who knows machinery — confident but approachable

## Color Palette

All colors are defined as Tailwind custom tokens under the `harvest-*` prefix.

> [!CAUTION]
> Never use the `agro-*` prefix — it's from the old brand and is undefined in Tailwind config.

### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `harvest-green` | `#228B22` (Forest Green) | Primary brand, CTAs, success states, nav active |
| `harvest-brown` | `#8B4513` (Earth Brown) | Secondary brand, headings, footer, dark sections |
| `harvest-gold` | `#F5DEB3` (Wheat Gold) | Accent highlights, badges, underlines, separator lines |

### Supporting Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `harvest-blue` | `#87CEEB` (Sky Blue) | Tertiary accent, info states |
| `harvest-cream` | `#FDFBF7` | Page backgrounds, light sections |
| `harvest-orange` | `#FF8C00` (Deep Orange) | CTA buttons, urgency, "Best Seller" badges |

### Semantic Mapping

| Context | Color |
|---------|-------|
| Primary CTA | `harvest-green` with white text |
| Secondary CTA | `harvest-gold` with `harvest-brown` text |
| Urgent CTA | `harvest-orange` with white text |
| Dark sections | `harvest-brown` background |
| Light sections | `harvest-cream` or white background |
| Links (hover) | `harvest-green` |
| Badges | `harvest-orange` (Best Seller), `harvest-green` (AI) |

## Typography

### Font Stack

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| All text | **Inter** | 300–700 | `sans-serif` |

Loaded via Google Fonts:
```
Inter:wght@300;400;500;600;700
```

### Type Scale

| Element | Size | Weight | Transform |
|---------|------|--------|-----------|
| Hero H1 | `text-5xl` / `md:text-7xl` | `font-black` | None |
| Section H2 | `text-4xl` | `font-black` | `tracking-tight` |
| Card H3 | `text-lg` – `text-2xl` | `font-bold` / `font-black` | `uppercase tracking-tight` |
| Labels | `text-xs` / `text-[10px]` | `font-black` | `uppercase tracking-widest` or `tracking-[0.2em]` |
| Body | `text-sm` – `text-lg` | `font-medium` | None |

### Typographic Conventions

- Section labels use: `text-xs font-black uppercase tracking-widest` in `harvest-green` or `harvest-brown`
- Page titles use: `font-black tracking-tight` in `harvest-brown`
- CTAs use: `font-black uppercase tracking-widest text-sm` with rounded corners (`rounded-xl` / `rounded-2xl`)
- Hover effects: `hover:scale-105`, `hover:-translate-y-1`, `hover:bg-green-700`

## Logo

- **File:** `logo.png` (314KB, stored in project root)
- **Fallback:** Text-based "HF" in white on `harvest-brown` background
- **Display:** Logo sits in a `harvest-brown` rounded container, with `brightness-0 invert` applied
- **Text treatment:** "Harvest Farm" (bold, large) + "MACHINERIES" (tiny, green, uppercase, wide tracking)

## Iconography

- **Library:** Lucide React (`lucide-react`)
- **Style:** Outlined, clean, consistent sizing
- **Key icons:** Truck, Wrench, ShieldCheck, Phone, MapPin, Mail, Clock, Bot, MessageCircle

## UI Patterns

### Cards
- White background, `rounded-xl` or `rounded-2xl`
- `shadow-sm` default → `shadow-xl` on hover
- `border border-gray-100`
- Group hover: image scale `group-hover:scale-110`

### Sections
- Alternating backgrounds: `white` ↔ `harvest-cream/50` ↔ `harvest-brown`
- Consistent max-width: `max-w-7xl mx-auto px-4`
- Vertical padding: `py-20` (sections) / `py-24` (feature sections)

### Buttons
- Primary: `bg-harvest-green text-white rounded-xl px-10 py-5 font-black uppercase tracking-widest text-sm shadow-xl`
- Secondary: `border-2 border-harvest-brown text-harvest-brown rounded-xl font-black uppercase`
- WhatsApp: `bg-[#25D366] text-white rounded-full` or `rounded-2xl`

### Animations
- Page elements: Subtle hover lifts (`hover:-translate-y-1`, `hover:scale-105`)
- AI chat: Framer Motion (`motion/react`) for open/close, message appear
- WhatsApp button: bounce animation
- Trust badges: pulse on status indicators

## Tone of Voice

### Content Guidelines
- **Professional but human** — not corporate jargon
- **Kenya-first** — use local context (shamba, shillings, Nakuru, counties)
- **Benefit-led** — always tie features to farmer outcomes
- **Trust signals** — emphasize warranties, on-site training, pay-on-delivery

### AI Advisor Persona
- Name: "Harvest Expert" (shown in chat header)
- Powered by: Gemini (shown as tiny badge)
- Tone: Senior colleague, warmly authoritative
- Language: English with common Kenyan terms
- Sign-off vibe: helpful, never pushy

---

*This directive is the single source of truth for all visual and verbal brand decisions.*
