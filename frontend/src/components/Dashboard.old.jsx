import { useEffect, useMemo, useRef, useState } from "react";
import Topbar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Icon from "./Icon.jsx";
import { CategoryIcon, ProductImage } from "./Media.jsx";
import Ticker from "./Ticker.jsx";
import ChatWidget from "./ChatWidget.jsx";
import PaymentPage from "./PaymentPage.jsx";
import CartPage from "./CartPage.jsx";
import CheckoutPage from "./CheckoutPage.jsx";
import OrdersPage from "./OrdersPage.jsx";
import AccountPage from "./AccountPage.jsx";
import { useStore, money } from "../store.jsx";
import { ACCEPTED_COINS, CATEGORIES, PRODUCTS } from "../data.js";
import "../dashboard.css";

export default function Dashboard({ onLogout }) {
  const { state, cartCount, add } = useStore();
  const [view, setView] = useState("home"); // home | cart | checkout | orders | account
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [payAmount, setPayAmount] = useState(null);
  const [flash, setFlash] = useState(null);
  const productsRef = useRef(null);

  // lock page scroll while the categories drawer is open; Escape closes it
  useEffect(() => {
    if (!drawer) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setDrawer(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [drawer]);

  const counts = useMemo(() => {
    const c = {};
    PRODUCTS.forEach((p) => { c[p.category] = (c[p.category] || 0) + 1; });
    return c;
  }, []);

  const visible = PRODUCTS.filter((p) => {
    const inCat = category === "all" || category === "all-products" || p.category === category;
    const inQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
    return inCat && inQuery;
  });

  const activeLabel = CATEGORIES.find((c) => c.id === category)?.label ?? "Featured Products";

  const go = (v) => {
    setView(v);
    setDrawer(false);
    window.scrollTo({ top: 0 });
  };

  const openPay = (amt) => {
    setPayAmount(typeof amt === "number" && amt > 0 ? amt : null);
    go("payment");
  };

  const goProducts = () => {
    setView("home");
    setDrawer(false);
    setTimeout(() => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  const select = (id) => { setCategory(id); goProducts(); };

  const home = () => {
    setCategory("all");
    setQuery("");
    go("home");
  };

  const search = (v) => {
    setQuery(v);
    if (view !== "home") setView("home");
  };

  const addToCart = (id) => {
    add(id);
    setFlash(id);
    setTimeout(() => setFlash((f) => (f === id ? null : f)), 1100);
  };

  return (
    <div className="dx">
      <Topbar
        user={state.profile.username}
        balance={state.balance}
        cartCount={cartCount}
        query={query}
        onQuery={search}
        onMenu={() => setDrawer(true)}
        onHome={home}
        onCart={() => go("cart")}
        onTopUp={openPay}
        onAccount={() => go("account")}
        onOrders={() => go("orders")}
        onLogout={onLogout}
      />

      <div className="dx-body">
        <Sidebar
          category={view === "home" ? category : null}
          counts={counts}
          total={PRODUCTS.length}
          open={drawer}
          onSelect={select}
          onHome={home}
          onClose={() => setDrawer(false)}
        />

        <main className="dx-main">
          <div className="dx-wallet">
            <div><span>Balance</span><b>{money(state.balance)}</b></div>
            <button className="dx-btn primary" onClick={openPay}><Icon name="plus" size={16} />Top Up</button>
          </div>

          {view === "cart" && <CartPage onBrowse={goProducts} onCheckout={() => go("checkout")} />}
          {view === "checkout" && (
            <CheckoutPage
              onBack={() => go("cart")}
              onTopUp={openPay}
              onOrders={() => go("orders")}
              onBrowse={goProducts}
            />
          )}
          {view === "orders" && <OrdersPage onBrowse={goProducts} />}
          {view === "payment" && <PaymentPage presetAmount={payAmount} onBack={goProducts} onAccount={() => go("account")} onCheckout={() => go("checkout")} />}
          {view === "account" && <AccountPage onTopUp={openPay} onOrders={() => go("orders")} />}

          {view === "home" && (
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
                    <button className="dx-btn primary" onClick={goProducts}><Icon name="orders" size={18} />Browse Products</button>
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
                  <button className="dx-link" onClick={goProducts}>View Products <Icon name="arrow" size={16} /></button>
                </article>
                <article>
                  <span className="dx-ico"><Icon name="bolt" /></span>
                  <h3>Why DARKSAUCE?</h3>
                  <div className="dx-badges">
                    <span><Icon name="trophy" size={16} />Top Tier</span>
                    <span><Icon name="refresh" size={16} />Fresh Stock</span>
                    <span><Icon name="lock" size={16} />Secure</span>
                    <span><Icon name="bolt" size={16} />Instant</span>
                  </div>
                </article>
              </section>

              <section className="dx-products" ref={productsRef}>
                <header>
                  <div>
                    <span className="dx-eyebrow">Collection</span>
                    <h2>{category === "all" || category === "all-products" ? "Featured Products" : activeLabel}</h2>
                  </div>
                  <span className="dx-count">{visible.length} {visible.length === 1 ? "item" : "items"}</span>
                </header>

                {visible.length === 0 ? (
                  <p className="dx-empty">No products match your search. Try a different word or pick another category.</p>
                ) : (
                  <div className="dx-grid">
                    {visible.map((p) => {
                      const cat = CATEGORIES.find((c) => c.id === p.category);
                      return (
                        <article key={p.id} className="dx-product">
                          <div className="dx-thumb"><ProductImage product={p} category={cat} size={34} />{p.badge && <i className="dx-ribbon">{p.badge}</i>}</div>
                          <span className="dx-cat">{cat.label}</span>
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
          )}
        </main>
      </div>

      {view === "home" && (
        <section className="dx-browse" aria-label="Browse categories">
          <h2>Browse categories</h2>
          <div className="dx-strip">
            <button
              className={`dx-cchip ${category === "all" || category === "all-products" ? "on" : ""}`}
              onClick={() => select("all-products")}
            >
              <Icon name="layers" size={20} /><span>All products</span><em>{PRODUCTS.length}</em>
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`dx-cchip ${category === c.id ? "on" : ""}`}
                onClick={() => select(c.id)}
              >
                <CategoryIcon category={c} size={20} /><span>{c.label}</span><em>{counts[c.id] ?? 0}</em>
              </button>
            ))}
          </div>
        </section>
      )}

      <Ticker />
      <ChatWidget />
      
    </div>
  );
}
