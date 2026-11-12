import { Header, Footer } from '@/components/store';
import { ProductGrid } from '@/components/product-grid';
import { getCollection } from '@/lib/collections';

export default async function Shop({ searchParams }: {
  searchParams: Promise<{ collection?: string | string[] }>;
}) {
  const params = await searchParams;
  const collection = getCollection(typeof params.collection === 'string' ? params.collection : undefined);

  return <>
    <Header />
    <main className="shop-page" id="main-content">
      <section className="shop-heading">
        <p className="eyebrow">{collection?.eyebrow || 'THREE COLLECTIONS. ONE DELUXE WORLD.'}</p>
        <h1>{collection ? collection.label : <>Your little <em>luxuries.</em></>}</h1>
        <p>{collection?.description || 'Signature scents, thoughtful surprises, and pretty everyday essentials. Find a little something for them, or for you.'}</p>
      </section>
      <ProductGrid key={collection?.slug || 'all'} collection={collection?.slug} />
    </main>
    <Footer />
  </>;
}
