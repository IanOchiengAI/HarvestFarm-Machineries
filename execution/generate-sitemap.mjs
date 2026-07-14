import fs from 'node:fs';
import path from 'node:path';
import { canonicalUrl, categoryPath, escapeXml, loadCatalog, productPath } from './seo-utils.mjs';

const rootDir = process.cwd();
const { PRODUCTS, CATEGORIES } = loadCatalog(rootDir);
const today = new Date().toISOString().slice(0, 10);

const urls = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/shop', priority: '0.8', changefreq: 'weekly' },
  ...CATEGORIES.map((category) => ({
    path: categoryPath(category.name),
    priority: category.id === 'posho-mills' ? '0.95' : '0.85',
    changefreq: 'weekly',
  })),
  ...PRODUCTS.map((product) => ({
    path: productPath(product),
    priority: product.category === 'Posho Mills' ? '0.9' : '0.8',
    changefreq: 'weekly',
  })),
  { path: '/services', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

const uniqueUrls = Array.from(new Map(urls.map((url) => [url.path, url])).values());

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(canonicalUrl(url.path))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log(`Generated sitemap with ${uniqueUrls.length} URLs at ${outputPath}`);
