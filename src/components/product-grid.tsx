'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { FiArrowRight, FiArrowUpRight, FiSearch, FiShoppingBag, FiX } from 'react-icons/fi';
import { COLLECTIONS, getCollection, getProductCollection, type CollectionSlug } from '@/lib/collections';
import type { Product } from '@/lib/products';

const money = (price: number) => new Intl.NumberFormat('en-NG', {
  style: 'currency', currency: 'NGN', maximumFractionDigits: 0,
}).format(price);

export function ProductGrid({ featured = false, collection }: {
  featured?: boolean;
  collection?: CollectionSlug;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderError, setOrderError] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [selected, setSelected] = useState<Product | null>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const activeCollection = getCollection(collection);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/products', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Could not load products.');
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Invalid collection.');
        setProducts(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError('We couldn’t load the collection. Please refresh to try again.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelected(null);
      if (event.key !== 'Tab') return;
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input, select, textarea, [tabindex="0"]');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [selected]);

  const collectionProducts = products.filter((product) => !collection || getProductCollection(product) === collection);
  const query = search.trim().toLowerCase();
  const filtered = collectionProducts
    .filter((product) => `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query))
    .sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0);

  function openProduct(product: Product, event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setOrderError('');
    setSelected(product);
  }

  function buy(product: Product) {
    try {
      const productCollection = getCollection(getProductCollection(product));
      localStorage.setItem('selectedBoxSize', productCollection?.label || 'Deluxe selection');
      localStorage.setItem('orderItems', JSON.stringify([{ ...product, price: String(product.price) }]));
      localStorage.setItem('orderComment', '');
      window.location.href = '/Checkout';
    } catch {
      setOrderError('Your browser could not save your bag. Please enable browser storage.');
    }
  }

  return <>
    {!featured && <div className="shop-controls">
      <nav className="filter-tabs collection-tabs" aria-label="Shop by collection">
        <Link href="/Shop" className={!collection ? 'active' : ''} aria-current={!collection ? 'page' : undefined}>All collections</Link>
        {COLLECTIONS.map((item) => <Link
          key={item.slug}
          href={`/Shop?collection=${item.slug}`}
          className={collection === item.slug ? 'active' : ''}
          aria-current={collection === item.slug ? 'page' : undefined}
        >{item.shortLabel}</Link>)}
      </nav>
      <div className="search-sort">
        <label className="search"><FiSearch aria-hidden="true" /><input type="search" aria-label="Search products" placeholder="Find your little luxury…" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
        <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="newest">Collection order</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>
    </div>}

    {error && <p role="alert" className="message">{error}</p>}
    {orderError && !selected && <p role="alert" className="message">{orderError}</p>}
    {loading ? <p role="status" className="empty">Opening the collection…</p> : !error && <>
      {!featured && <p className="shop-results" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'find' : 'finds'}{activeCollection ? ` in ${activeCollection.shortLabel.toLowerCase()}` : ' to make your day'}</p>}
      <div className="product-grid">
        {(featured ? filtered.slice(0, 4) : filtered).map((product) => <article className="product-card" key={product.id}>
          <button className="product-photo" onClick={(event) => openProduct(product, event)} aria-label={`View ${product.name}`}>
            <img src={product.image} alt={product.name} loading="lazy" />
            <span className="product-badge">{getCollection(getProductCollection(product))?.shortLabel}</span>
            <span className="photo-arrow"><FiArrowUpRight aria-hidden="true" /></span>
          </button>
          <div className="product-meta">
            <span>{product.category}</span>
            <h3><button onClick={(event) => openProduct(product, event)}>{product.name}</button></h3>
            <div><p>{money(product.price)}</p><button className="quick-add" onClick={() => buy(product)} aria-label={`Order ${product.name}`}><FiShoppingBag aria-hidden="true" /></button></div>
          </div>
        </article>)}
      </div>
      {!filtered.length && <div className="empty collection-empty">
        <p>{query ? 'No little luxuries match that search.' : activeCollection ? `Our ${activeCollection.shortLabel.toLowerCase()} collection has no available finds right now.` : 'Something lovely is on its way. Check back for new finds.'}</p>
        <div className="empty-actions">
          {query && <button className="text-link reset-filters" onClick={() => setSearch('')}>Clear search <FiX aria-hidden="true" /></button>}
          {collection && <Link className="text-link" href="/Shop">Explore all collections <FiArrowRight aria-hidden="true" /></Link>}
          {collection === 'surprise-gifting' && <Link className="button" href="/Build">Build a personal gift <FiArrowUpRight aria-hidden="true" /></Link>}
        </div>
      </div>}
    </>}

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" className="product-dialog" onClick={(event) => event.stopPropagation()}>
        <button className="close-modal" onClick={() => setSelected(null)} aria-label="Close product">×</button>
        <img src={selected.image} alt={selected.name} />
        <div>
          <p className="eyebrow">{getCollection(getProductCollection(selected))?.label}</p>
          <h2 id="product-dialog-title">{selected.name}</h2>
          <p>{selected.description}</p>
          <h3>{money(selected.price)}</h3>
          {orderError && <p role="alert" className="message">{orderError}</p>}
          <button className="button" onClick={() => buy(selected)}>Order this find <FiArrowRight aria-hidden="true" /></button>
        </div>
      </section>
    </div>}
  </>;
}
