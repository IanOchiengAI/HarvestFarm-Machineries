import { Category, Product } from './types';

export const SITE_URL = 'https://harvestfarmnk.co.ke';

export const CATEGORY_PATHS: Record<string, string> = {
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

export const CATEGORY_GUIDES = [
  '/posho-mills',
  '/maize-shellers',
  '/chopper-mills',
  '/hullers',
  '/chaffcutters',
  '/animal-feed-machines',
  '/crop-spraying',
  '/block-machines',
  '/roller-mills',
];

export function canonicalUrl(path = '/'): string {
  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  return `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
}

export function productPath(product: Pick<Product, 'id'>): string {
  return `/product/${product.id}`;
}

export function categoryPath(categoryName: string): string {
  return CATEGORY_PATHS[categoryName] || `/shop?category=${encodeURIComponent(categoryName)}`;
}

export function categoryFromSlug(categories: Category[], slug: string | undefined): Category | undefined {
  if (!slug) return undefined;
  return categories.find((category) => categoryPath(category.name).replace('/', '') === slug);
}

export function productMetaDescription(product: Product): string {
  return `${product.name} price in Kenya from Harvest Farm Machineries Nakuru. KSh ${product.price.toLocaleString('en-KE')}. Pay on delivery, training, warranty, and nationwide delivery.`;
}
