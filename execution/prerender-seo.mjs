import fs from 'node:fs';
import path from 'node:path';
import {
  canonicalUrl,
  categoryPath,
  ensureDir,
  escapeHtml,
  loadCatalog,
  productMetaDescription,
  productPath,
  SITE_URL,
} from './seo-utils.mjs';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');
const shell = fs.readFileSync(indexPath, 'utf8');
const { PRODUCTS, CATEGORIES } = loadCatalog(rootDir);

const POSHO_FAQS = [
  {
    question: 'What is the price of a posho mill in Kenya?',
    answer:
      'Harvest Farm posho mills currently start from KSh 75,000 for a standard electric poshomill, with commercial combined setups ranging higher depending on power source, capacity, and hulling needs.',
  },
  {
    question: 'Should I choose an electric or diesel posho mill?',
    answer:
      'Choose electric if you have reliable power and want lower daily running costs. Choose diesel if your area has power cuts, no grid connection, or you need to mill in rural market centres.',
  },
  {
    question: 'Can I start a maize milling business with one machine?',
    answer:
      'Yes. Many starters begin with a standard poshomill, then add a huller or combined unit when customer demand grows for sifted flour.',
  },
  {
    question: 'Does Harvest Farm deliver and install posho mills?',
    answer:
      'Yes. Harvest Farm supplies from Nakuru, offers nationwide delivery, and helps with installation and machine training after delivery.',
  },
];

const CATEGORY_PROOF = {
  'Posho Mills': [
    'Milling chamber, cyclone, huller, and motor setup can be shown before dispatch.',
    'Good for estate milling shops, market centres, and farm-based flour businesses.',
    'Ask for a short maize-milling demo clip before you commit.',
  ],
  Hullers: [
    'Hulling chamber, sieve section, cyclone, and frame are confirmed before delivery.',
    'Useful for millers who want cleaner maize before flour production.',
    'Ask for a grain-cleaning walkaround video before dispatch.',
  ],
  'Chopper Mills': [
    'Blade chamber, chute, wheels, belt drive, and engine or motor are checked before loading.',
    'Built for dairy farmers cutting Napier grass, stalks, and dry feed ingredients.',
    'Ask for a forage-chopping demo clip before the machine leaves Nakuru.',
  ],
  Chaffcutters: [
    'Blade count, flywheel, stand, belt drive, and motor or engine are confirmed with you.',
    'Good for daily Napier grass and fodder preparation on small and medium dairy farms.',
    'Ask for a blade and flywheel walkaround before delivery.',
  ],
  'Maize Shellers': [
    'Shelling drum, outlet, frame, and engine or motor compatibility are checked before loading.',
    'Made for harvest-season work where speed and clean cob separation matter.',
    'Ask for a maize-shelling demo clip before confirming delivery.',
  ],
  'Crop Spraying': [
    'Pump, hose reel, engine, pressure gun, and trolley frame are checked before dispatch.',
    'Good for horticulture, orchard, and medium-to-large shamba spraying work.',
    'Ask for a pressure test video before delivery.',
  ],
  'Block Machines': [
    'Moulds, vibrator units, hydraulic movement, and frame welds are checked before dispatch.',
    'Good for block yards, construction sites, and commercial masonry supply.',
    'Ask for a block-forming demo clip before delivery.',
  ],
  'Animal Feed Machines': [
    'Mixing or crushing chamber, motor size, outlet, belts, and guards are confirmed before loading.',
    'Useful for dairy, poultry, and feed formulation businesses.',
    'Ask for a dry-feed test video before dispatch.',
  ],
  'Roller Mills': [
    'Roller set, sifter table, motor plan, and installation requirements are reviewed before dispatch.',
    'Best for commercial millers who need premium sifted flour output.',
    'Ask for setup photos and installation requirements before ordering.',
  ],
};

const DELIVERY_EXAMPLES = {
  'Posho Mills': ['Nakuru milling shop starter kit', 'Eldoret grain business setup', 'Bomet combined mill inquiry'],
  Hullers: ['Kericho maize huller delivery', 'Kisumu cereal processor setup', 'Nakuru huller support call'],
  'Chopper Mills': ['Nyandarua dairy farm delivery', 'Kericho silage preparation setup', 'Nyeri zero-grazing support'],
  Chaffcutters: ['Nakuru dairy farm delivery', 'Nyeri chaffcutter setup', 'Laikipia petrol unit inquiry'],
  'Maize Shellers': ['Trans Nzoia harvest-season order', 'Bungoma maize sheller delivery', 'Uasin Gishu farm pickup'],
  'Crop Spraying': ['Nakuru horticulture sprayer order', 'Meru orchard spraying setup', 'Nyeri pesticide trolley inquiry'],
  'Block Machines': ['Nakuru block yard setup', 'Nairobi construction supply inquiry', 'Thika hollow-block request'],
  'Animal Feed Machines': ['Nakuru feed crusher inquiry', 'Nanyuki dairy feed setup', 'Laikipia mixer quotation'],
  'Roller Mills': ['Eldoret commercial mill inquiry', 'Thika roller set quotation', 'Nairobi flour business setup'],
};

function absoluteImage(image) {
  if (!image) return `${SITE_URL}/og-image.png`;
  if (/^https?:\/\//i.test(image)) return image;
  return `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
}

function pageHtml({ title, description, routePath, image = '/og-image.png', body, schemas = [] }) {
  const url = canonicalUrl(routePath);
  const seoHead = `
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${escapeHtml(absoluteImage(image))}" />
    <style>.js #seo-static{display:none!important}</style>
    <script>document.documentElement.classList.add('js')</script>
${schemas
  .map(
    (schema) => `    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
  )
  .join('\n')}`;

  return shell
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace('</head>', `${seoHead}\n</head>`)
    .replace(
      '<div id="root"></div>',
      `<main id="seo-static">${body}</main>\n    <div id="root"></div>`
    );
}

function writeRoute(routePath, html) {
  const outputPath =
    routePath === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, routePath.replace(/^\/+|\/+$/g, ''), 'index.html');
  ensureDir(outputPath);
  fs.writeFileSync(outputPath, html, 'utf8');
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'Store'],
    name: 'Harvest Farm Machineries',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.png`,
    telephone: '+254713812392',
    email: 'info@harvestfarm.co.ke',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nakuru CBD',
      addressCountry: 'KE',
    },
    areaServed: 'Kenya',
    priceRange: 'KSh 45,000 - KSh 500,000',
    sameAs: ['https://wa.me/254713812392'],
  };
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Harvest Farm Machineries',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/shop?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

function productSchema(product) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: [absoluteImage(product.image)],
    description: product.description,
    sku: product.id,
    url: canonicalUrl(productPath(product)),
    brand: {
      '@type': 'Brand',
      name: 'Harvest Farm Machineries',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KES',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl(productPath(product)),
      seller: {
        '@type': 'Organization',
        name: 'Harvest Farm Machineries Nakuru',
      },
    },
  };
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function productCard(product) {
  return `<article>
    <h2><a href="${escapeHtml(productPath(product))}">${escapeHtml(product.name)}</a></h2>
    <img src="${escapeHtml(absoluteImage(product.image))}" alt="${escapeHtml(product.name)}" />
    <p>${escapeHtml(product.description)}</p>
    <p><strong>KSh ${Number(product.price).toLocaleString('en-KE')}</strong></p>
  </article>`;
}

function homeBody() {
  const bestSellers = PRODUCTS.filter((product) => product.isBestSeller);
  return `<section>
    <h1>Harvest Farm Machineries Nakuru</h1>
    <p>Powering Kenya's farms with reliable machinery. Buy posho mills, hullers, chopper mills, maize shellers, chaffcutters, animal feed machines, crop sprayers, and block machines from Nakuru.</p>
    <p>Call or WhatsApp +254713812392 for machine advice, delivery, installation, and training.</p>
    <h2>Shop by Category</h2>
    <ul>${CATEGORIES.map((category) => `<li><a href="${escapeHtml(categoryPath(category.name))}">${escapeHtml(category.name)}</a></li>`).join('')}</ul>
    <h2>Best Selling Machines</h2>
    ${bestSellers.map(productCard).join('')}
  </section>`;
}

function shopBody() {
  return `<section>
    <h1>Shop Farm Machinery in Kenya</h1>
    <p>Browse Harvest Farm Machineries products with prices, specifications, delivery support, pay-on-delivery options, and WhatsApp ordering from Nakuru.</p>
    <h2>All Machines</h2>
    ${PRODUCTS.map(productCard).join('')}
  </section>`;
}

function categoryBody(category) {
  const products = PRODUCTS.filter((product) => product.category === category.name);
  const isPoshoMills = category.id === 'posho-mills';
  return `<section>
    <h1>${isPoshoMills ? 'Posho Mills in Kenya' : `${escapeHtml(category.name)} in Kenya`}</h1>
    <p>${escapeHtml(
      isPoshoMills
        ? 'Compare electric, diesel, and combined posho mills for home milling, market centres, and commercial sifted flour businesses. Harvest Farm Machineries supplies from Nakuru with prices, delivery, installation, training, and warranty support.'
        : `Compare ${category.name.toLowerCase()} from Harvest Farm Machineries Nakuru with visible prices, specifications, delivery, warranty, and WhatsApp ordering.`
    )}</p>
    ${
      isPoshoMills
        ? `<h2>How to choose a posho mill</h2>
    <p>Choose electric if you have reliable power and want lower running costs. Choose diesel for off-grid milling or market centres with power cuts. Choose a combined posho mill when customers need hulling and fine maize meal from one setup.</p>`
        : ''
    }
    <h2>${escapeHtml(category.name)} Available Now</h2>
    ${products.map(productCard).join('')}
    ${
      isPoshoMills
        ? `<h2>Posho Mill Questions</h2>${POSHO_FAQS.map(
            (faq) => `<h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p>`
          ).join('')}`
        : ''
    }
  </section>`;
}

function productBody(product) {
  const proofItems = CATEGORY_PROOF[product.category] || [
    'Key machine parts can be shown clearly before dispatch.',
    'We confirm the right use case, power source, and delivery plan before loading.',
    'Ask for a short walkaround video before confirming your order.',
  ];
  const deliveries = DELIVERY_EXAMPLES[product.category] || [
    'Nakuru showroom inquiry',
    'County delivery coordination',
    'WhatsApp after-sale support',
  ];

  return `<section>
    <p><a href="/">Home</a> / <a href="${escapeHtml(categoryPath(product.category))}">${escapeHtml(product.category)}</a></p>
    <h1>${escapeHtml(product.name)}</h1>
    <img src="${escapeHtml(absoluteImage(product.image))}" alt="${escapeHtml(product.name)}" />
    <p>${escapeHtml(product.description)} Built for durability and high efficiency in Kenyan farming conditions.</p>
    <p><strong>Price: KSh ${Number(product.price).toLocaleString('en-KE')}</strong></p>
    <p>Available from Harvest Farm Machineries in Nakuru with pay on delivery, nationwide transport, installation, and machine training.</p>
    <h2>Machine proof before delivery</h2>
    <p>Ask Harvest Farm to confirm this exact machine with a fresh photo, close-up, or short demo clip before delivery is arranged.</p>
    <ul>${proofItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    <h2>Video and payment proof</h2>
    <p>Request a 15-second close-up, a 30-second walkaround, or a 60-90 second working demo before dispatch. Transport cost, timing, and any booking or commitment fee are confirmed in writing on WhatsApp before loading.</p>
    <p>You inspect the machine on arrival, then pay by M-Pesa or the agreed method before handover and training.</p>
    <h2>Delivery, warranty, and spare parts</h2>
    <ul>${deliveries.map((delivery) => `<li>${escapeHtml(delivery)}</li>`).join('')}</ul>
    <p>Warranty support, spare-parts guidance, maintenance advice, installation, and operator training are discussed before purchase.</p>
    <h2>Technical Specifications</h2>
    <table><tbody>${Object.entries(product.specs)
      .map(([key, value]) => `<tr><th>${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`)
      .join('')}</tbody></table>
  </section>`;
}

writeRoute(
  '/',
  pageHtml({
    title: "Harvest Farm Machineries Nakuru | Kenya's Most Reliable Farm Equipment",
    description:
      'Buy reliable posho mills, hullers, chopper mills, maize shellers, and farm machinery from Harvest Farm Machineries in Nakuru. Pay on delivery, training, and nationwide delivery.',
    routePath: '/',
    body: homeBody(),
    schemas: [organizationSchema(), websiteSchema()],
  })
);

writeRoute(
  '/shop',
  pageHtml({
    title: 'Shop Farm Machinery | Posho Mills & Hullers | Harvest Farm Nakuru',
    description:
      'Explore reliable farm machinery in Kenya. Search for posho mills, hullers, chopper mills, maize shellers, chaffcutters, and more from Harvest Farm Nakuru.',
    routePath: '/shop',
    body: shopBody(),
    schemas: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Shop', path: '/shop' }])],
  })
);

for (const category of CATEGORIES) {
  const routePath = categoryPath(category.name);
  const isPoshoMills = category.id === 'posho-mills';
  writeRoute(
    routePath,
    pageHtml({
      title: isPoshoMills
        ? 'Posho Mills in Kenya | Prices, Electric & Diesel Options | Harvest Farm'
        : `${category.name} in Kenya | Harvest Farm Machineries Nakuru`,
      description: isPoshoMills
        ? 'Compare posho mill prices in Kenya from Harvest Farm Machineries Nakuru. Electric, diesel, combined poshomills, delivery, training, and pay-on-delivery support.'
        : `Shop ${category.name.toLowerCase()} in Kenya from Harvest Farm Machineries Nakuru. Compare machines, prices, delivery, warranty, and WhatsApp ordering.`,
      routePath,
      image: category.image,
      body: categoryBody(category),
      schemas: [
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: category.name, path: routePath }]),
        ...(isPoshoMills ? [faqSchema(POSHO_FAQS)] : []),
      ],
    })
  );
}

for (const product of PRODUCTS) {
  writeRoute(
    productPath(product),
    pageHtml({
      title: `${product.name} | Buy in Nakuru | Harvest Farm Machineries`,
      description: productMetaDescription(product),
      routePath: productPath(product),
      image: product.image,
      body: productBody(product),
      schemas: [
        productSchema(product),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: product.category, path: categoryPath(product.category) },
          { name: product.name, path: productPath(product) },
        ]),
      ],
    })
  );
}

writeRoute(
  '/services',
  pageHtml({
    title: 'Our Mission & Services | Harvest Farm Machineries Nakuru',
    description:
      'Reliable transport, expert training, warranty support, and flexible payments for Kenyan farmers buying machines from Harvest Farm Machineries in Nakuru.',
    routePath: '/services',
    body: `<section><h1>Mission and Services</h1><p>Harvest Farm Machineries provides reliable transport, expert training, flexible payment support, installation, and after-sale help across Kenya.</p></section>`,
    schemas: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])],
  })
);

writeRoute(
  '/contact',
  pageHtml({
    title: 'Contact Us | Visit Our Showroom in Nakuru | Harvest Farm Machineries',
    description:
      'Call +254713812392 or visit the Harvest Farm Machineries showroom in Nakuru CBD for expert advice on posho mills, hullers, and farm equipment.',
    routePath: '/contact',
    body: `<section><h1>Contact Harvest Farm Machineries</h1><p>Call or WhatsApp +254713812392. Visit Harvest Farm Machineries in Nakuru CBD, Kenya for posho mills, hullers, maize shellers, chopper mills, and farm equipment advice.</p></section>`,
    schemas: [organizationSchema(), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])],
  })
);

console.log('Generated crawlable static HTML for products, categories, and core pages.');
