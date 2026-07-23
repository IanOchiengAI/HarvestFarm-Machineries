# HarvestFarm — Future Roadmap

## Phase 1 — CURRENT (Complete these first)
- [x] Build n8n social media automation workflow
- [x] Connect Google Sheets content calendar
- [x] Connect Groq AI for caption rewriting
- [x] Connect Facebook Page via Graph API
- [ ] Successfully run first live Facebook post
- [ ] Load 90 days of content into Google Sheet
- [ ] Enable the workflow schedule (publish it live)

## Phase 2 — Website Launch
- [ ] Finish and deploy the HarvestFarm website to harvestfarmnk.co.ke
- [ ] Add all 6+ products with proper descriptions, images, prices
- [ ] Add WhatsApp order button on each product page
- [ ] SEO optimization for Kenyan agricultural search terms

## Phase 3 — System Integration (Website + Social Media tied together)
### Concept: One action → Everything updates

**Option A: Google Sheet as single source of truth**
- Website reads product catalog directly from Google Sheet via API
- n8n reads same sheet to schedule Facebook posts
- Add one row → product appears on website AND gets posted to Facebook

**Option B: Website triggers social media**
- Adding a new product to the website auto-creates a Google Sheet row
- n8n detects the new row and schedules a Facebook post automatically

### What needs to be built:
| Feature | Estimated Time |
|---|---|
| Website reads products from Google Sheet | 2-3 hours |
| New website product auto-creates sheet row | 1-2 hours |
| New sheet row auto-schedules Facebook post | Already done |

## Phase 4 — Growth Features
- [ ] Instagram integration (auto-post same content)
- [ ] WhatsApp Business API integration (auto-reply to inquiries)
- [ ] Customer testimonials page on website
- [ ] Google Business Profile optimization

## Phase 5 — Productization (SaaS / Agency)
*Ideas for packaging the "Zero-Cost Autonomous Social Media Engine" built for HarvestFarm into a commercial product:*

1. **The "Done-For-You" Agency Service (Recurring Revenue):**
   - Offer a monthly subscription (e.g., $99/mo) to completely automate social media for other businesses.
   - You provide 30-60 pieces of content in a Google Sheet/CSV.
   - You set up the GitHub repo, GitHub Action, and Facebook Token behind the scenes. The client only sees the spreadsheet.

2. **The "One-Time Installation" (Consulting Model):**
   - Charge a flat fee ($300-$500) to install this exact GitHub Action + CSV system into another business's infrastructure to help them escape Hootsuite/Buffer subscription fees.

3. **The Digital Product / Course (Passive Income):**
   - Bundle the `social-poster.mjs` script, `.yml` workflow, and CSV template.
   - Record a 20-minute screen-share tutorial and sell the kit on Gumroad/Selar for $49 to indie hackers and creators.

4. **Real SaaS Web App:**
   - Build a React frontend where users log in with Facebook, upload their CSV, and a backend handles the cron jobs. Massive scaling potential but high engineering/maintenance effort.
