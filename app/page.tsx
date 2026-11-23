'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CircleCheck,
  Gift,
  Heart,
  Leaf,
  Mail,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import { products, type Product, type ProductTone } from './catalog';

const categories = [
  { name: 'Soaps', description: 'Fourteen considered bathing rituals', number: '01' },
  { name: 'Skin + care', description: 'Daily essentials, beautifully simple', number: '02' },
  { name: 'Home fragrance', description: 'Atmosphere for every room', number: '03' },
  { name: 'Gifting', description: 'Thoughtful moments, beautifully wrapped', number: '04' },
];

const collections = [
  ['Botanical Collection', 'Plant-led rituals for a slower kind of care'],
  ['Everyday Essentials', 'Quietly considered, made for every day'],
  ['Bath Rituals', 'A more beautiful way to begin and end the day'],
  ['Home Fragrance', 'Warm notes for considered spaces'],
  ['Festive Gifting', 'Gifts with a little more feeling'],
];

const toneClasses: Record<ProductTone, string> = {
  amber: 'tone-amber',
  lavender: 'tone-lavender',
  sage: 'tone-sage',
  ocean: 'tone-ocean',
  rose: 'tone-rose',
  charcoal: 'tone-charcoal',
  ivory: 'tone-ivory',
};

function BrandLockup() {
  return (
    <span className="brand-lockup">
      <span className="brand-monogram" aria-hidden="true">V+S</span>
      <span className="brand-wordmark"><strong>VnS</strong><span>Veritas</span></span>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All products');
  const [searchTerm, setSearchTerm] = useState('');
  const [bag, setBag] = useState<Record<string, number>>({});
  const [notice, setNotice] = useState('');
  const [email, setEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % 2), 6500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery = !query || `${product.name} ${product.description} ${product.ingredients}`.toLowerCase().includes(query);
      const matchesCategory = activeCategory === 'All products' || activeCategory === 'Soaps';
      return matchesQuery && matchesCategory;
    });
  }, [activeCategory, searchTerm]);

  const bagItems = products.filter((product) => bag[product.slug]);
  const bagCount = bagItems.reduce((total, product) => total + (bag[product.slug] ?? 0), 0);

  const scrollToShop = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const addToBag = (product: Product) => {
    setBag((current) => ({ ...current, [product.slug]: (current[product.slug] ?? 0) + 1 }));
    setNotice(`${product.name} added to your enquiry bag`);
  };

  const updateQuantity = (product: Product, change: number) => {
    setBag((current) => {
      const nextQuantity = (current[product.slug] ?? 0) + change;
      if (nextQuantity <= 0) {
        const next = { ...current };
        delete next[product.slug];
        return next;
      }
      return { ...current, [product.slug]: nextQuantity };
    });
  };

  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setNewsletterMessage('Newsletter signup will be activated when your email service is connected.');
    setEmail('');
  };

  return (
    <main>
      <header className="site-header">
        <div className="announcement">Thoughtfully crafted · beautifully experienced</div>
        <div className="container nav">
          <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <Menu size={19} strokeWidth={1.5} />
          </button>
          <a className="logo" href="#top" aria-label="VnS Veritas home">
            <BrandLockup />
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#top">Home</a>
            <a href="#shop">Shop</a>
            <a href="#collections">Collections</a>
            <a href="#story">Our story</a>
            <a href="#gifting">Gifting</a>
          </nav>
          <div className="nav-actions">
            <button className="icon-button" aria-label="Search products" onClick={scrollToShop}>
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button className="icon-button account-action" aria-label="Customer account">
              <UserRound size={18} strokeWidth={1.5} />
            </button>
            <button className="icon-button account-action" aria-label="Wishlist">
              <Heart size={18} strokeWidth={1.5} />
            </button>
            <button className="icon-button" aria-label={`Open bag with ${bagCount} items`} onClick={() => setBagOpen(true)}>
              <PackageCheck size={18} strokeWidth={1.5} />
              {bagCount > 0 && <span className="bag-count">{bagCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <a className="logo" href="#top" onClick={() => setMenuOpen(false)}>
              <BrandLockup />
            </a>
            <button className="icon-button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="mobile-menu-links" aria-label="Mobile navigation">
            <a href="#top" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
            <a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a>
            <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
            <a href="#gifting" onClick={() => setMenuOpen(false)}>Gifting</a>
          </nav>
        </div>
      )}

      <section className={`hero hero-feature hero-slide-${heroSlide}`} id="top">
        <div className="hero-feature-inner">
          <div className="hero-feature-top"><BrandLockup /><span>Small rituals. Softer days.</span></div>
          <div className="hero-feature-content">
            <div className="hero-copy">
              <div className="eyebrow">{heroSlide === 0 ? 'Winter skin, meet your match' : 'A little joy, beautifully wrapped'}</div>
              <h1 className="serif">{heroSlide === 0 ? <>Comfort for the <em>cold</em> days.</> : <>A season made for <em>giving</em>.</>}</h1>
              <p>{heroSlide === 0 ? 'Triple Butter Soap brings cocoa, mango and shea butters together for a rich, creamy cleanse when winter leaves skin feeling dry.' : 'Christmas gift hampers, thoughtfully filled with bath-time favourites and ready to make someone’s season.'}</p>
              <div className="button-row">
                <button className="primary-button" onClick={heroSlide === 0 ? scrollToShop : () => document.getElementById('gifting')?.scrollIntoView({ behavior: 'smooth' })}>{heroSlide === 0 ? 'Discover triple butter' : 'Explore gift hampers'} <ArrowRight size={15} /></button>
                {heroSlide === 1 && <a className="secondary-button" href="tel:+919987534881">Bulk order call · +91 99875 34881</a>}
              </div>
              <div className="hero-dots" aria-label="Choose featured slide">
                {[0, 1].map((slide) => <button key={slide} className={heroSlide === slide ? 'selected' : ''} aria-label={`Show ${slide === 0 ? 'winter soap' : 'Christmas hampers'}`} aria-pressed={heroSlide === slide} onClick={() => setHeroSlide(slide)} />)}
                <span>{heroSlide === 0 ? '01 — WINTER CARE' : '02 — FESTIVE GIFTING'}</span>
              </div>
            </div>
            <div className={`hero-product-scene ${heroSlide === 1 ? 'gift-scene' : ''}`} aria-label={heroSlide === 0 ? 'Triple Butter Soap winter feature' : 'Christmas gift hampers feature'}>
              {heroSlide === 0 ? <img className="hero-product-photo" src="/images/products/triple-butter-soap.jpeg" alt="Triple Butter Soap from the VnS Veritas product catalogue" /> : <div className="hero-hamper"><span className="hamper-bow">✳</span><div className="hamper-box"><span>VnS VERITAS</span><strong>Season’s<br />warmth</strong><small>A FESTIVE SOAP COLLECTION</small></div><div className="hamper-soap one"/><div className="hamper-soap two"/><div className="hamper-soap three"/></div>}
              <span className="hero-scene-note">{heroSlide === 0 ? 'A richer kind of clean' : 'Gifts for every gathering'}</span>
            </div>
          </div>
          <div className="hero-feature-footer"><span>Thoughtfully made for everyday rituals</span><a href="#shop">SHOP THE COLLECTION <ArrowRight size={13} /></a></div>
        </div>
      </section>

      <section className="category-section section-pad" aria-labelledby="category-title">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">Find your ritual</div>
              <h2 id="category-title">A considered collection for every kind of care.</h2>
            </div>
            <p>Explore the beginnings of a collection made to bring more intention to your bathroom, home and gifting moments.</p>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.name}>
                <span className="category-number">{category.number}</span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <button className="category-link" onClick={scrollToShop}>Shop now <ArrowUpRight size={13} /></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-section section-pad" id="shop" aria-labelledby="shop-title">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">The collection</div>
              <h2 id="shop-title">The soap edit.</h2>
            </div>
            <p>Fourteen original soap varieties, presented with their catalogue descriptions. Pricing and stock will be added when confirmed.</p>
          </div>
          <div className="shop-toolbar">
            <div className="filter-row" aria-label="Product filters">
              {['All products', 'Soaps'].map((category) => (
                <button key={category} className={`filter-button ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}>{category}</button>
              ))}
              <span className="filter-button" aria-label="More filters coming soon"><ChevronDown size={13} /> Filters</span>
            </div>
            <label className="search-box">
              <Search size={15} strokeWidth={1.5} />
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search the collection" aria-label="Search products" />
            </label>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.slug}>
                  <div className="product-visual catalog-product-visual">
                    <img src={product.image} alt={`${product.name} product from the VnS Veritas soap catalogue`} loading="lazy" />
                    <button className="product-save" aria-label={`Save ${product.name} to wishlist`}><Heart size={15} strokeWidth={1.5} /></button>
                  </div>
                  <div className="product-info">
                    <div className="product-meta"><span>Soap · {product.weight}</span><span>Catalogued</span></div>
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-action">
                      <button className="enquire-button" onClick={() => setActiveProduct(product)}>View details <ArrowRight size={13} /></button>
                      <span className="price-note">Price to be confirmed</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">No products matched that search. Try a botanical, floral or skin-type search instead.</div>
          )}
        </div>
      </section>

      <section className="story-section section-pad" id="story" aria-labelledby="story-title">
        <div className="container story-grid">
          <div className="story-mark" aria-hidden="true" />
          <div className="story-copy">
            <div className="eyebrow">Our point of view</div>
            <h2 id="story-title">More than products. A thoughtful experience.</h2>
            <p>VnS Veritas brings together personal care, lifestyle and gifting through a slower, more considered lens. We believe the everyday deserves beautiful details, honest presentation and a little more intention.</p>
            <a className="text-link" href="#collections">See the collections <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="section-pad" id="collections" aria-labelledby="collections-title">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">Curated by feeling</div>
              <h2 id="collections-title">Collections for the way you live.</h2>
            </div>
            <p>As the range grows, these considered edits will make it easier to find the right ritual or gift.</p>
          </div>
          <div className="collection-grid">
            {collections.map(([title, description]) => (
              <article className="collection-card" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gift-section section-pad" id="gifting" aria-labelledby="gift-title">
        <div className="container">
          <div className="gift-banner">
            <div className="gift-copy">
              <div className="eyebrow">For every beautiful reason</div>
              <h2 id="gift-title">Thoughtful gifting, beautifully presented.</h2>
              <p>Explore future-ready gifting edits for celebrations, festive moments and the people who make ordinary days feel special.</p>
              <a className="primary-button" href="tel:+919987534881">Bulk order call · +91 99875 34881 <Gift size={15} /></a>
            </div>
            <div className="gift-stack" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="values-section section-pad" aria-labelledby="values-title">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">The VnS Veritas standard</div>
              <h2 id="values-title">The details matter.</h2>
            </div>
          </div>
          <div className="values-grid">
            <article className="value-card"><Leaf className="value-icon" size={22} strokeWidth={1.4} /><h3>Thoughtful selection</h3><p>A collection shaped around considered ingredients, everyday rituals and a sense of occasion.</p></article>
            <article className="value-card"><Sparkles className="value-icon" size={22} strokeWidth={1.4} /><h3>Beautifully simple</h3><p>Clear information and quiet visual details that let the products speak for themselves.</p></article>
            <article className="value-card"><ShieldCheck className="value-icon" size={22} strokeWidth={1.4} /><h3>Honest presentation</h3><p>Verified product details only. No invented reviews, certifications, claims or stock promises.</p></article>
            <article className="value-card"><Gift className="value-icon" size={22} strokeWidth={1.4} /><h3>Made to be given</h3><p>Personal care and lifestyle essentials with a natural place in thoughtful gifting.</p></article>
          </div>
        </div>
      </section>

      <section className="newsletter section-pad" id="newsletter" aria-labelledby="newsletter-title">
        <div className="container newsletter-grid">
          <div>
            <div className="eyebrow">A note from VnS</div>
            <h2 id="newsletter-title">Stay connected.</h2>
          </div>
          <div>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <Mail size={16} strokeWidth={1.5} />
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" aria-label="Your email address" required />
              <button type="submit">Join the list <ArrowRight size={14} /></button>
            </form>
            <p className="newsletter-note">No noise. Just new collections, rituals and considered gifting ideas.</p>
            {newsletterMessage && <p className="newsletter-note"><CircleCheck size={13} /> {newsletterMessage}</p>}
          </div>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-logo"><BrandLockup /></span>
              <p>Thoughtfully crafted personal-care and lifestyle essentials for everyday rituals, beautiful experiences and meaningful gifting.</p>
            </div>
            <div><div className="footer-heading">Explore</div><div className="footer-links"><a href="#shop">Shop soaps</a><a href="#collections">Collections</a><a href="#story">Our story</a><a href="#gifting">Gifting</a></div></div>
            <div><div className="footer-heading">Support + bulk orders</div><div className="footer-links"><a href="tel:+919987534881">India · +91 99875 34881</a><a href="tel:+918446506516">India · +91 84465 06516</a><a href="tel:+971589209564">UAE · +971 58 920 9564</a></div></div>
            <div><div className="footer-heading">The VnS journal</div><p className="footer-brand-note">Notes on personal care, considered living and the rituals that make an everyday moment feel special.</p><a className="footer-journal-link" href="#newsletter">Join the journal <ArrowUpRight size={13} /></a></div>
          </div>
          <div className="footer-bottom"><span>© 2026 VnS Veritas. All rights reserved.</span><span>Inspired by purpose.</span></div>
        </div>
      </footer>

      {bagOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Enquiry bag" onClick={() => setBagOpen(false)}>
          <aside className="drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-header"><h2>Your bag</h2><button className="icon-button" aria-label="Close bag" onClick={() => setBagOpen(false)}><X size={20} strokeWidth={1.5} /></button></div>
            {bagItems.length > 0 ? bagItems.map((product) => (
              <div className="drawer-item" key={product.slug}>
                <div className={`mini-visual ${toneClasses[product.tone]}`}><span /></div>
                <div><h3>{product.name}</h3><p>{product.weight} · price to be confirmed</p></div>
                <div className="qty-control"><button aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(product, -1)}><Minus size={12} /></button><span>{bag[product.slug]}</span><button aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(product, 1)}><Plus size={12} /></button></div>
              </div>
            )) : <div className="empty-state" style={{ marginTop: 24 }}>Your enquiry bag is waiting for something beautiful.</div>}
            <div className="drawer-foot"><p>Pricing, stock and shipping are intentionally not shown until the business confirms the commercial catalogue.</p><button className="primary-button" onClick={() => { setBagOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact VnS Veritas <ArrowRight size={15} /></button></div>
          </aside>
        </div>
      )}

      {activeProduct && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label={`${activeProduct.name} details`} onClick={() => setActiveProduct(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="icon-button modal-close" aria-label="Close product details" onClick={() => setActiveProduct(null)}><X size={20} strokeWidth={1.5} /></button>
            <div className="modal-grid">
              <div className="modal-visual"><img src={activeProduct.image} alt={`${activeProduct.name} product`} /></div>
              <div><div className="eyebrow">Soap · {activeProduct.weight}</div><h2>{activeProduct.name}</h2><p className="modal-copy">{activeProduct.description}</p><div className="detail-list"><div className="detail-row"><span>Ingredients</span><span>{activeProduct.ingredients}</span></div><div className="detail-row"><span>Recommended for</span><span>{activeProduct.skinType}</span></div><div className="detail-row"><span>Commercial details</span><span>To be confirmed</span></div></div><button className="primary-button" onClick={() => { addToBag(activeProduct); setActiveProduct(null); }}>Add to enquiry bag <ArrowRight size={15} /></button></div>
            </div>
          </div>
        </div>
      )}

      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}
