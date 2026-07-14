# Content Guide — HarvestFarm Machineries

> Standards for product catalog content, page copy, and SEO.

## Product Catalog Standards

### Required Fields

Every product in `constants.ts` must have:

| Field | Format | Example |
|-------|--------|---------|
| `id` | String, unique | `'1'` |
| `name` | Descriptive, title case | `'Standard Combined Posho Mill'` |
| `category` | Must match a `CATEGORIES` entry | `'Posho Mills'` |
| `price` | Number in KES (no decimals) | `95000` |
| `image` | HTTPS URL, min 800px wide | Unsplash or self-hosted |
| `description` | 1-2 sentences, benefit-focused | Focus on farmer outcomes |
| `specs` | Key-value pairs | Power Source, Capacity, Warranty |
| `isBestSeller` | Optional boolean | Only for top products |

### Product Categories

| Category | ID | Target Farmer / Operator |
|----------|-----|--------------|
| Posho Mills | `posho-mills` | Milling business starters |
| Hullers | `hullers` | Cereal processors, millers |
| Chopper Mills | `chopper-mills` | Livestock farmers (dairy, cattle) |
| Roller Mills | `roller-mills` | Large commercial flour millers |
| Maize Shellers | `maize-shellers` | Maize farmers (post-harvest) |
| Animal Feed Machines | `animal-feed-machines` | Feed formulation yards, cooperatives |
| Crop Spraying | `crop-spraying` | Horticulturalists, general crop farmers |
| Block Machines | `block-machines` | Construction sites, block makers |
| Chaffcutters | `chaffcutters` | Small/medium dairy farmers |

### Image Standards

> [!WARNING]
> Current images are all Unsplash stock photos. These should be replaced with real product photography as soon as available from the client.

- **Product images:** At least 800×800px, showing the actual machine
- **Category images:** Contextual shots (farming, processing scenes)
- **Testimonial photos:** Real customer headshots (with permission)
- **Hero:** Farm/agricultural scene relevant to Kenya

## SEO Requirements

### Per-Page Meta

| Page | Title Pattern | Description Focus |
|------|---------------|-------------------|
| Home | `Harvest Farm Machineries Nakuru | Kenya's Most Reliable Farm Equipment` | Full value proposition |
| Shop | `Shop Farm Machinery | Posho Mills & Hullers | Harvest Farm Nakuru` | Product discovery |
| Product | `{Product Name} | Buy in Nakuru | Harvest Farm Machineries` | Product-specific benefits |
| Services | `Our Mission & Services | Harvest Farm Machineries Nakuru` | Service offerings |
| Contact | `Contact Us | Visit Our Showroom in Nakuru | Harvest Farm Machineries` | Location + action |

### Schema.org

Product pages must include `Product` structured data with:
- Brand: **"Harvest Farm Machineries"** (not "Agro Farm")
- Seller: **"Harvest Farm Machineries Nakuru"**
- Currency: `KES`
- Condition: `NewCondition`
- Availability: `InStock`

### Keywords Strategy

**Primary:** farm machinery Nakuru, posho mill Kenya, agricultural equipment Kenya
**Secondary:** posho mill price, coffee huller, maize sheller Kenya, chopper mill
**Local:** farm equipment Nakuru, machinery shop Kenya, agricultural tools Nakuru CBD

## Copy Tone

### Do's
- ✅ Lead with farmer benefits ("Save time", "Boost production")
- ✅ Use Kenyan context ("shamba", "shillings", county names)
- ✅ Mention trust signals (warranty, training, pay-on-delivery)
- ✅ Keep sentences short and direct
- ✅ Use active voice

### Don'ts
- ❌ Generic marketing speak ("revolutionary", "state-of-the-art")
- ❌ Overpromising ("the best in Africa")
- ❌ Technical jargon without explanation
- ❌ Passive voice in CTAs
- ❌ Using "Agro Farm" anywhere (it's "Harvest Farm")

### CTA Hierarchy

| Priority | Label | Action |
|----------|-------|--------|
| Primary | "Explore Machinery" / "Order on WhatsApp" | Product discovery, direct order |
| Secondary | "Get Expert Advice" / "WhatsApp Us Directly" | Inquiry |
| Tertiary | "View Details" / "Call Now" | Information |

## Testimonial Standards

- Real names and locations (Kenyan towns/counties)
- Specific product mentions where possible
- Natural language (conversational, not polished)
- Keep under 2 sentences

---

*Update this guide when the product catalog changes or new pages are added.*
