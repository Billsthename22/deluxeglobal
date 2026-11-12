'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiDroplet,
  FiGift,
  FiHeart,
  FiShoppingBag,
} from 'react-icons/fi';
import { COLLECTIONS } from '@/lib/collections';
import { ProductGrid } from '@/components/product-grid';

export { ProductGrid };

export const money = (price: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(price);

const collectionDetails = {
  'perfume-oils': {
    icon: FiDroplet,
    note: 'FIND YOUR SIGNATURE',
    description: 'Undiluted oils for your own signature scent.',
    action: 'Discover the scents',
  },
  'surprise-gifting': {
    icon: FiGift,
    note: 'MAKE THEIR DAY',
    description: 'Thoughtful gifts. The sweetest kind of surprise.',
    action: 'Find their something special',
  },
  'girly-essentials': {
    icon: FiHeart,
    note: 'A LITTLE SOMETHING FOR YOU',
    description: 'Beauty, accessories, and pretty everyday things.',
    action: 'Explore the pretty things',
  },
};

function CollectionNavigation() {
  const pathname = usePathname();
  const params = useSearchParams();

  return (
    <nav aria-label="Main navigation">
      {COLLECTIONS.map((collection) => (
        <Link
          href={`/Shop?collection=${collection.slug}`}
          key={collection.slug}
          aria-current={
            pathname === '/Shop' && params.get('collection') === collection.slug
              ? 'page'
              : undefined
          }
        >
          {collection.shortLabel}
        </Link>
      ))}
    </nav>
  );
}

export function Header() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement">
        Smell lovely. <span aria-hidden="true">✦</span> Gift thoughtfully.
        <span aria-hidden="true">✦</span> Treat yourself.
      </div>
      <header className="store-header">
        <Link href="/" className="wordmark" aria-label="Deluxe Global home">
          deluxe<span>G L O B A L</span>
        </Link>
        <Suspense fallback={<nav aria-label="Main navigation">{COLLECTIONS.map((collection) => <Link href={`/Shop?collection=${collection.slug}`} key={collection.slug}>{collection.shortLabel}</Link>)}</nav>}>
          <CollectionNavigation />
        </Suspense>
        <div className="header-actions">
          <Link href="/Build" className="header-gift-link">Build a gift <FiArrowUpRight aria-hidden="true" /></Link>
          <Link href="/Checkout" className="bag-link">
            <FiShoppingBag aria-hidden="true" /><span>Your bag</span>
          </Link>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="store-footer">
      <div className="footer-brand">
        <Link href="/" className="wordmark">deluxe<span>G L O B A L</span></Link>
        <p>Good scents. Sweet surprises.<br />Little things to love.</p>
      </div>
      <div className="footer-links">
        <div>
          <p className="eyebrow">OUR COLLECTIONS</p>
          {COLLECTIONS.map((collection) => <Link key={collection.slug} href={`/Shop?collection=${collection.slug}`}>{collection.label}</Link>)}
        </div>
        <div>
          <p className="eyebrow">A LITTLE MORE DELUXE</p>
          <Link href="/Shop">Shop everything</Link>
          <Link href="/Build">Build a gift</Link>
          <Link href="/#story">Our story</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Deluxe Global. Made with love.</small>
        <Link href="/admin">Store admin <FiArrowUpRight aria-hidden="true" /></Link>
      </div>
    </footer>
  );
}

export function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="home-intro" aria-labelledby="home-title">
          <div>
            <p className="eyebrow intro-eyebrow"><span aria-hidden="true">✦</span> WELCOME TO YOUR LITTLE WORLD OF DELUXE</p>
            <h1 id="home-title">Your everyday,<br /><em>a little more deluxe.</em></h1>
          </div>
          <div className="intro-copy">
            <p>Undiluted perfume oils, thoughtful surprises,<br className="desktop-break" /> and pretty little things. All in one happy place.</p>
            <div className="hero-actions">
              <Link className="button" href="#collections">Explore our world <FiArrowRight aria-hidden="true" /></Link>
              <Link className="text-link" href="/Build">Make someone smile <FiArrowUpRight aria-hidden="true" /></Link>
            </div>
            <span className="intro-note"><FiHeart aria-hidden="true" /> For you. For them. Just because.</span>
          </div>
        </section>

        <section className="worlds-section" id="collections" aria-label="Our three collections">
          <div className="worlds-grid">
            {COLLECTIONS.map((collection) => {
              const details = collectionDetails[collection.slug];
              const Icon = details.icon;

              return (
                <Link className={`world-card world-${collection.slug}`} href={`/Shop?collection=${collection.slug}`} key={collection.slug}>
                  <div className="world-photo">
                    <img src={collection.image} alt={collection.imageAlt} fetchPriority={collection.slug === 'perfume-oils' ? 'high' : 'auto'} />
                    <span className="world-tag"><Icon aria-hidden="true" /> {details.note}</span>
                    <span className="world-photo-arrow" aria-hidden="true"><FiArrowUpRight /></span>
                  </div>
                  <div className="world-copy">
                    <h2>{collection.label}</h2>
                    <p>{details.description}</p>
                    <span className="world-action">{details.action} <FiArrowRight aria-hidden="true" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="deluxe-mantra" aria-label="The Deluxe way">
            <span><FiDroplet aria-hidden="true" /> Find your signature.</span>
            <span><FiGift aria-hidden="true" /> Make their day.</span>
            <span><FiHeart aria-hidden="true" /> Romanticise your everyday.</span>
          </div>
        </section>

        <section className="collection-section" aria-labelledby="featured-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A FEW LOVELY FINDS</p>
              <h2 id="featured-title">Little things. <em>Big feelings.</em></h2>
            </div>
            <Link className="text-link" href="/Shop">Shop everything <FiArrowUpRight aria-hidden="true" /></Link>
          </div>
          <ProductGrid featured />
        </section>

        <section className="gift-feature" aria-labelledby="gift-title">
          <div className="gift-feature-image"><img src="/heroimg.png" alt="A gift hamper with pink roses, a teddy bear, and treats, finished with a satin bow" loading="lazy" /></div>
          <div className="gift-feature-copy">
            <p className="eyebrow"><FiGift aria-hidden="true" /> THE SURPRISE STARTS WITH YOU</p>
            <h2 id="gift-title">Some gifts say<br /><em>“I just get you.”</em></h2>
            <p>A birthday, a big moment, or no reason at all. Pick their favourite little things, add a note from the heart, and make it a surprise that feels like them.</p>
            <div className="gift-steps"><span><b>01</b> Pick their favourites</span><span><b>02</b> Add your love note</span></div>
            <Link href="/Build" className="button button-cream">Build their perfect gift <FiArrowUpRight aria-hidden="true" /></Link>
            <span className="gift-signature">A little thought goes a lovely long way.</span>
          </div>
        </section>

        <section className="brand-story" id="story" aria-labelledby="story-title">
          <span className="story-flower" aria-hidden="true">✳</span>
          <p className="eyebrow">THREE LOVES. ONE DELUXE GLOBAL.</p>
          <h2 id="story-title">Life’s better with<br /><em>little things to love.</em></h2>
          <p>A scent that feels like you. A surprise that makes their day. A pretty little find you couldn’t leave behind. We bring them together because joy belongs in the everyday, too.</p>
          <Link className="text-link" href="#collections">Find your kind of lovely <FiArrowRight aria-hidden="true" /></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
