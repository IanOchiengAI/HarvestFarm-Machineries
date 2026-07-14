import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

export const SITE_URL = 'https://harvestfarmnk.co.ke';

export const CATEGORY_PATHS = {
  'Posho Mills': '/posho-mills',
  Hullers: '/hullers',
  'Chopper Mills': '/chopper-mills',
  'Roller Mills': '/roller-mills',
  'Maize Shellers': '/maize-shellers',
  'Animal Feed Machines': '/animal-feed-machines',
  'Crop Spraying': '/crop-spraying',
  'Block Machines': '/block-machines',
  Chaffcutters: '/chaffcutters',
};

export function loadCatalog(rootDir = process.cwd()) {
  const constantsPath = path.join(rootDir, 'constants.ts');
  const source = fs
    .readFileSync(constantsPath, 'utf8')
    .replace(/import\s+\{[^}]+\}\s+from\s+['"].\/types['"];\s*/, '')
    .replace(/export const /g, 'const ');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.None,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const sandbox = { console, globalThis: {} };
  vm.runInNewContext(`${transpiled}\nglobalThis.__seoCatalog = { PRODUCTS, CATEGORIES, TESTIMONIALS };`, sandbox, {
    filename: constantsPath,
  });
  return sandbox.globalThis.__seoCatalog;
}

export function canonicalUrl(routePath = '/') {
  const normalized = routePath === '/' ? '' : `/${routePath.replace(/^\/+|\/+$/g, '')}`;
  return `${SITE_URL}${normalized}`;
}

export function categoryPath(categoryName) {
  return CATEGORY_PATHS[categoryName] || `/shop?category=${encodeURIComponent(categoryName)}`;
}

export function productPath(product) {
  return `/product/${product.id}`;
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeXml(value) {
  return escapeHtml(value);
}

export function productMetaDescription(product) {
  return `${product.name} price in Kenya from Harvest Farm Machineries Nakuru. KSh ${Number(product.price).toLocaleString('en-KE')}. Pay on delivery, training, warranty, and nationwide delivery.`;
}

export function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}
