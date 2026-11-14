import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Icon from "./Icon.jsx";
import { ProductImage } from "./Media.jsx";
import NotFound from "./NotFound.jsx";
import { useStore } from "../store.jsx";
import { ACCEPTED_COINS, CATEGORIES, PRODUCTS } from "../data.js";


const WHY = [
  { icon: "trophy", label: "Top Tier" },
  { icon: "refresh", label: "Fresh Stock" },
  { icon: "lock", label: "Secure" },
  { icon: "bolt", label: "Instant" },
];

// Used for  /  (dashboard),  /products  and  /category/:id
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
  const cat = id ? CATEGORIES.find((c) => c.id === id) : null;
  const showsProducts = path !== "/";

  // opening /products or a category jumps straight to the product list
  useEffect(() => {
    if (!showsProducts) return;
    const t = setTimeout(() => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    return () => clearTimeout(t);
  }, [path, showsProducts]);

  if (id && !cat) return <NotFound />;

  const visible = PRODUCTS.filter((p) => (!id || p.category === id) && p.name.toLowerCase().includes(query));
  const title = cat ? cat.label : "Featured Products";

  const browse = () => {
    if (path === "/products") productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    else navigate("/products");
  };

  const addToCart = (pid) => {
    add(pid);
    setFlash(pid);
    setTimeout(() => setFlash((f) => (f === pid ? null : f)), 1100);
  };

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
            <button className="dx-btn ghost"><Icon name="bell" size={18} />Contact Admin</button>
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
        <header>
          <div>
            <span className="dx-eyebrow">Collection</span>
            <h2>{title}</h2>
          </div>
          <span className="dx-count">{visible.length} {visible.length === 1 ? "item" : "items"}</span>
        </header>

        {visible.length === 0 ? (
          <p className="dx-empty">No products match your search. Try a different word or pick another category.</p>
        ) : (
          <div className="dx-grid">
            {visible.map((p) => {
              const pc = CATEGORIES.find((c) => c.id === p.category);
              return (
                <article key={p.id} className="dx-product">
                  <div className="dx-thumb">
                    <ProductImage product={p} category={pc} size={34} />
                    {p.badge && <i className="dx-ribbon">{p.badge}</i>}
                  </div>
                  <span className="dx-cat">{pc?.label}</span>
                  <h3>{p.name}</h3>
                  {p.description && <p className="dx-desc">{p.description}</p>}
                  <div className="dx-buy">
                    <b>${p.price.toFixed(2)}</b>
                    <button onClick={() => addToCart(p.id)} disabled={p.stock === 0} className={flash === p.id ? "ok" : ""}>
                      {p.stock === 0 ? "Sold out" : flash === p.id ? <><Icon name="check" size={16} />Added</> : <><Icon name="cart" size={16} />Add</>}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
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
