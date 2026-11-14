import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Icon from "./Icon.jsx";
import { ProductImage, CategoryIcon } from "./Media.jsx";
import NotFound from "./NotFound.jsx";
import { useStore } from "../store.jsx";
import { ACCEPTED_COINS, CATEGORIES, PRODUCTS } from "../data.js";

const WHY = [
  { icon: "trophy", label: "Top Tier" },
  { icon: "refresh", label: "Fresh Stock" },
  { icon: "lock", label: "Secure" },
  { icon: "bolt", label: "Instant" },
];

// Your admin's Telegram username (without the @) or a t.me invite link
const ADMIN_TELEGRAM = "https://t.me/flowers0890";

const usd = (n) => `$${Number(n).toLocaleString("en-US")}`;

// How many products each category shows on the dashboard (/). /products shows all.
const HOME_PREVIEW = 4;

/* One product card.
   - With a balance (e.g. gift cards): shows Balance and Price, then the Add button.
   - Without a balance: shows just the price next to the Add button. */
function ProductCard({ p, flash, onAdd }) {
  const pc = CATEGORIES.find((c) => c.id === p.category);
  const hasBalance = p.balance != null;
  const soldOut = p.stock === 0;

  const button = (
    <button onClick={() => onAdd(p.id)} disabled={soldOut} className={flash === p.id ? "ok" : ""}>
      {soldOut ? "Sold out" : flash === p.id
        ? <><Icon name="check" size={16} />Added</>
        : <><Icon name="cart" size={16} />Add</>}
    </button>
  );

  return (
    <article className="dx-product">
      <div className="dx-thumb">
        <ProductImage product={p} category={pc} size={34} />
        {p.badge && <i className="dx-ribbon">{p.badge}</i>}
      </div>
      <span className="dx-cat">{pc?.label}</span>
      <h3>{p.name}</h3>
      {p.description && <p className="dx-desc">{p.description}</p>}

      {hasBalance ? (
        <>
          <div className="dx-figs">
            <span><small>Balance</small><b className="bal">{usd(p.balance)}</b></span>
            <span><small>Price</small><b>${p.price.toFixed(2)}</b></span>
          </div>
          <div className="dx-buy solo">{button}</div>
        </>
      ) : (
        <div className="dx-buy">
          <b>${p.price.toFixed(2)}</b>
          {button}
        </div>
      )}
    </article>
  );
}

// Used for  /  (dashboard),  /products,  /category/:id  and  /category/:id?sub=<subcategory id>
export default function HomePage() {
  const { add } = useStore();
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [flash, setFlash] = useState(null);
  const productsRef = useRef(null);

  const path = pathname.replace(/\/+$/, "") || "/";
  const query = (params.get("q") || "").trim().toLowerCase();
  const subParam = params.get("sub");
  const cat = id ? CATEGORIES.find((c) => c.id === id) : null;
  const showsProducts = path !== "/";

  const subs = cat?.subcategories || [];
  const showAll = subParam === "all";
  const subObj = subs.find((s) => s.id === subParam) || null;
  // In a category with subcategories, customers choose one first (unless searching).
  const pickingSub = Boolean(cat) && subs.length > 0 && !subObj && !showAll && !query;

  // opening /products or a category jumps straight to the list
  useEffect(() => {
    if (!showsProducts) return;
    const t = setTimeout(() => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    return () => clearTimeout(t);
  }, [path, subParam, showsProducts]);

  if (id && !cat) return <NotFound />;

  const visible = PRODUCTS.filter((p) =>
    (!id || p.category === id) &&
    (!subObj || p.sub === subObj.id) &&
    p.name.toLowerCase().includes(query));

  const title = cat
    ? subObj ? `${cat.label}: ${subObj.label}` : cat.label
    : "Featured Products";

  // Dashboard and /products (no category, no search): one section per category
  const grouped = !cat && !query;
  const perSection = path === "/" ? HOME_PREVIEW : Infinity;
  const sections = CATEGORIES
    .map((c) => ({ cat: c, items: PRODUCTS.filter((p) => p.category === c.id) }))
    .filter((s) => s.items.length > 0);

  const browse = () => {
    if (path === "/products") productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    else navigate("/products");
  };

  const addToCart = (pid) => {
    add(pid);
    setFlash(pid);
    setTimeout(() => setFlash((f) => (f === pid ? null : f)), 1100);
  };

  const pickSub = (subId) => navigate(`/category/${cat.id}?sub=${subId}`);
  const backToSubs = () => navigate(`/category/${cat.id}`);
  const countIn = (subId) => PRODUCTS.filter((p) => p.category === cat.id && p.sub === subId).length;
  const totalIn = cat ? PRODUCTS.filter((p) => p.category === cat.id).length : 0;

  return (
    <>
      <section className="dx-hero">
        <div className="dx-hero-copy">
          <span className="dx-chip">Welcome back</span>
          <h1>DARKSAUCE <em>Market</em></h1>
          <p>
            A marketplace built on trust, security and straightforward checkout.
            Every listing is reviewed before it goes live, and your account stays private.
          </p>
          <div className="dx-actions">
            <button className="dx-btn primary" onClick={browse}><Icon name="orders" size={18} />Browse Products</button>
            <a className="dx-btn ghost" href={ADMIN_TELEGRAM} target="_blank" rel="noopener noreferrer">
              <Icon name="bell" size={18} />Contact Admin
            </a>
          </div>
        </div>
        <blockquote className="dx-quote">
          <strong>Built on trust. Backed by verification.</strong>
          <span>The marketplace that never compromises.</span>
        </blockquote>
      </section>

      <section className="dx-info">
        <article>
          <span className="dx-ico"><Icon name="shield" /></span>
          <h3>Privacy First</h3>
          <p>Your data stays yours. Payments are made from your account balance, and you only share what checkout needs.</p>
          <div className="dx-tags">{ACCEPTED_COINS.map((c) => <b key={c.symbol}>{c.symbol}</b>)}</div>
        </article>
        <article>
          <span className="dx-ico"><Icon name="bell" /></span>
          <h3>Get Started in 3 Steps</h3>
          <ol className="dx-steps">
            <li><i>1</i>Browse</li><li><i>2</i>Add to Cart</li><li><i>3</i>Checkout</li>
          </ol>
          <button className="dx-link" onClick={browse}>View Products <Icon name="arrow" size={16} /></button>
        </article>
        <article className="dx-why">
          <span className="dx-ico"><Icon name="bolt" /></span>
          <h3>Why DARKSAUCE?</h3>
          <div className="dx-marquee" aria-label="Top tier, fresh stock, secure, instant">
            <div className="dx-marquee-track">
              {[0, 1].map((n) => (
                <div className="dx-marquee-set" key={n} aria-hidden={n === 1}>
                  {WHY.map((w) => (
                    <span key={w.label}><Icon name={w.icon} size={16} />{w.label}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="dx-products" ref={productsRef}>
        {pickingSub ? (
          <>
            <header>
              <div>
                <span className="dx-eyebrow">Choose a type</span>
                <h2>{cat.label}</h2>
              </div>
              <span className="dx-count">{subs.length} {subs.length === 1 ? "type" : "types"}</span>
            </header>

            <div className="dx-subs">
              {subs.map((s) => (
                <button key={s.id} type="button" className="dx-sub" onClick={() => pickSub(s.id)}>
                  <span className="dx-sub-ico"><Icon name={s.icon || cat.icon} size={24} /></span>
                  <span>
                    <b>{s.label}</b>
                    <small>{countIn(s.id)} {countIn(s.id) === 1 ? "item" : "items"}</small>
                  </span>
                </button>
              ))}
              <button type="button" className="dx-sub dx-sub-all" onClick={() => pickSub("all")}>
                <span className="dx-sub-ico"><Icon name="layers" size={24} /></span>
                <span>
                  <b>All {cat.label.toLowerCase()}</b>
                  <small>{totalIn} items</small>
                </span>
              </button>
            </div>
          </>
        ) : grouped ? (
          <>
            <header>
              <div>
                <span className="dx-eyebrow">Shop</span>
                <h2>{path === "/" ? "Shop by category" : "All products"}</h2>
              </div>
              <span className="dx-count">{PRODUCTS.length} items</span>
            </header>

            <div className="dx-sections">
              {sections.map(({ cat: c, items }) => (
                <section key={c.id} className="dx-sec">
                  <div className="dx-sec-head">
                    <span className="dx-sec-ico"><CategoryIcon category={c} size={28} /></span>
                    <div>
                      <h3>{c.label}</h3>
                      <small>{items.length} {items.length === 1 ? "item" : "items"}</small>
                    </div>
                    <button type="button" className="dx-viewall" onClick={() => navigate(`/category/${c.id}`)}>
                      View all <Icon name="arrow" size={14} />
                    </button>
                  </div>
                  <div className="dx-grid">
                    {items.slice(0, perSection).map((p) => (
                      <ProductCard key={p.id} p={p} flash={flash} onAdd={addToCart} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        ) : (
          <>
            <header>
              <div>
                {cat && subs.length > 0 && !query && (
                  <button type="button" className="dx-back" onClick={backToSubs}>
                    <Icon name="arrow" size={14} />All {cat.label.toLowerCase()} types
                  </button>
                )}
                <span className="dx-eyebrow">{cat ? "Collection" : "Search"}</span>
                <h2>{cat ? title : "Search results"}</h2>
              </div>
              <span className="dx-count">{visible.length} {visible.length === 1 ? "item" : "items"}</span>
            </header>

            {visible.length === 0 ? (
              <p className="dx-empty">No products match your search. Try a different word or pick another category.</p>
            ) : (
              <div className="dx-grid">
                {visible.map((p) => <ProductCard key={p.id} p={p} flash={flash} onAdd={addToCart} />)}
              </div>
            )}
          </>
        )}
      </section>

      <footer className="dx-notes">
        <p><Icon name="shield" size={16} />By using DARKSAUCE, you agree to our{" "}
          {/* TODO: link to your real Terms & Privacy pages */}
          <a href="#terms" onClick={(e) => e.preventDefault()}>Terms &amp; Privacy Policy</a></p>
        <p><Icon name="coin" size={16} />Blockchain payments only — {ACCEPTED_COINS.map((c) => c.symbol).join(", ")}</p>
        <p><Icon name="dollar" size={16} />No refunds to external wallets — balance used in-store</p>
      </footer>
    </>
  );
}