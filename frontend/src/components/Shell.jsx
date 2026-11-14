import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Topbar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Ticker from "./Ticker.jsx";
import ChatWidget from "./ChatWidget.jsx";
import Icon from "./Icon.jsx";
import { CategoryIcon } from "./Media.jsx";
import { useStore, money } from "../store.jsx";
import { CATEGORIES, PRODUCTS } from "../data.js";
import "../dashboard.css";

// The frame around every page: top bar, categories sidebar, ticker, chat.
export default function Shell({ onLogout }) {
  const { state, cartCount } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [drawer, setDrawer] = useState(false);

  const path = pathname.replace(/\/+$/, "") || "/";
  const catMatch = path.match(/^\/category\/([^/]+)/);
  const showsProducts = path === "/products" || Boolean(catMatch);
  const isHomeish = path === "/" || showsProducts;
  const category = path === "/" ? "all" : path === "/products" ? "all-products" : catMatch ? decodeURIComponent(catMatch[1]) : null;
  const query = params.get("q") || "";

  const counts = useMemo(() => {
    const c = {};
    PRODUCTS.forEach((p) => { c[p.category] = (c[p.category] || 0) + 1; });
    return c;
  }, []);

  // new page: close the drawer, and start at the top (product pages scroll to the products themselves)
  useEffect(() => {
    setDrawer(false);
    if (!showsProducts) window.scrollTo({ top: 0 });
  }, [path, showsProducts]);

  // lock page scroll while the categories drawer is open; Escape closes it
  useEffect(() => {
    if (!drawer) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setDrawer(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [drawer]);

  const select = (id) => navigate(id === "all-products" ? "/products" : `/category/${id}`);

  const onQuery = (v) => {
    const next = new URLSearchParams(params);
    if (v) next.set("q", v); else next.delete("q");
    const search = next.toString() ? `?${next}` : "";
    navigate({ pathname: isHomeish ? path : "/", search }, { replace: true });
  };

  const openPay = (amt) =>
    navigate(typeof amt === "number" && amt > 0 ? `/pay?amount=${Math.ceil(amt)}` : "/pay");

  const logout = () => {
    navigate("/", { replace: true });
    onLogout();
  };

  return (
    <div className="dx">
      <Topbar
        user={state.profile.username}
        balance={state.balance}
        cartCount={cartCount}
        query={query}
        onQuery={onQuery}
        onMenu={() => setDrawer(true)}
        onHome={() => navigate("/")}
        onCart={() => navigate("/cart")}
        onTopUp={openPay}
        onAccount={() => navigate("/account")}
        onOrders={() => navigate("/orders")}
        onLogout={logout}
      />

      <div className="dx-body">
        <Sidebar
          category={category}
          counts={counts}
          total={PRODUCTS.length}
          open={drawer}
          onSelect={select}
          onHome={() => navigate("/")}
          onClose={() => setDrawer(false)}
        />

        <main className="dx-main">
          <div className="dx-wallet">
            <div><span>Balance</span><b>{money(state.balance)}</b></div>
            <button className="dx-btn primary" onClick={openPay}><Icon name="plus" size={16} />Top Up</button>
          </div>
          <Outlet />
        </main>
      </div>

      {isHomeish && (
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
