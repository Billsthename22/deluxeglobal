import type { Product } from '@/lib/products';

export const COLLECTIONS = [
  {
    slug: 'perfume-oils',
    label: 'Undiluted perfume oils',
    shortLabel: 'Perfume oils',
    eyebrow: 'FIND YOUR SIGNATURE',
    description: 'Discover undiluted perfume oils and find a scent that feels like you.',
    image: '/collections/perfume-oils.webp',
    imageAlt: 'Perfume oil bottles arranged on a warm neutral background',
  },
  {
    slug: 'surprise-gifting',
    label: 'Surprise gifting',
    shortLabel: 'Surprise gifting',
    eyebrow: 'MAKE THEIR DAY',
    description: 'Thoughtful gifts, beautiful bouquets, and personal surprises for your favourite people.',
    image: '/heroimg.png',
    imageAlt: 'A thoughtfully arranged Deluxe Global gift box',
  },
  {
    slug: 'girly-essentials',
    label: 'Girly essentials',
    shortLabel: 'Girly essentials',
    eyebrow: 'A LITTLE SOMETHING FOR YOU',
    description: 'Beauty favourites, pretty accessories, and little extras for your everyday.',
    image: '/items/purse.jpg',
    imageAlt: 'A purse from the Deluxe Global accessories collection',
  },
] as const;

export type CollectionSlug = (typeof COLLECTIONS)[number]['slug'];

export function getCollection(slug?: string | null) {
  return COLLECTIONS.find((collection) => collection.slug === slug);
}

export function getProductCollection(product: Pick<Product, 'category' | 'name'>): CollectionSlug {
  const category = product.category.toLowerCase().replace(/[-_]/g, ' ');
  const name = product.name.toLowerCase();
  const perfumeKeywords = /\b(?:perfumes?|fragrances?|attars?|oud|scents?)\b/;
  const giftKeywords = /\b(?:gifts?|gifting|surprises?|hampers?|flowers?|bouquets?|keepsakes?|teddy|teddies|balloons?|money box(?:es)?|love letters?)\b/;

  // Existing gift categories remain together even when a box includes perfume or beauty items.
  if (giftKeywords.test(category)) {
    return 'surprise-gifting';
  }
  if (perfumeKeywords.test(category)) return 'perfume-oils';
  if (/girly|beauty|accessor|jewel|skin|makeup|make up|cosmetic|hair|lash|lip|self care|fashion|stationery|bath|body/.test(category)) {
    return 'girly-essentials';
  }
  if (/\boils?\b/.test(category) || perfumeKeywords.test(name)) return 'perfume-oils';
  if (giftKeywords.test(name)) {
    return 'surprise-gifting';
  }
  return 'girly-essentials';
}
