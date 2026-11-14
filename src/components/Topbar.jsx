import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Topbar({
  user, balance, cartCount, query, onQuery,
  onMenu, onHome, onCart, onTopUp, onAccount, onOrders, onLogout,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (fn) => () => { setOpen(false); fn(); };
  const shown = `$${balance.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

  return (
    <header className="dx-top">
      <div className="dx-left">
        <button className="dx-icon-btn dx-menu" onClick={onMenu} aria-label="Open categories">
          <Icon name="menu" />
        </button>
        <Link className="dx-brand" to="/">
          <Logo size={38} />
          <span>DARKSAUCE</span>
        </Link>
      </div>

      <label className="dx-search">
        <Icon name="search" size={18} />
        <input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          aria-label="Search products"
        />
      </label>

      <div className="dx-right">
        <div className="dx-pill dx-balance"><span>Balance</span><b>{shown}</b></div>
        <button className="dx-topup" onClick={onTopUp}>
          <Icon name="plus" size={16} /><span>Top Up</span>
        </button>

        <button className="dx-icon-btn dx-cart" onClick={onCart} aria-label={`Cart, ${cartCount} items`}>
          <Icon name="cart" />
          <i className="dx-badge">{cartCount}</i>
        </button>

        <div className="dx-profile" ref={ref}>
          <button className="dx-user" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>
            <span className="dx-avatar">{user.charAt(0).toUpperCase()}</span>
            <span className="dx-uname">{user}</span>
            <span className={`dx-caret ${open ? "up" : ""}`}><Icon name="chevron" size={14} /></span>
          </button>

          {open && (
            <div className="dx-menu-pop" role="menu">
              <button role="menuitem" onClick={pick(onAccount)}><Icon name="user" size={18} />My Account</button>
              <button role="menuitem" onClick={pick(onOrders)}><Icon name="orders" size={18} />My Orders</button>
              <hr />
              <button role="menuitem" className="danger" onClick={pick(onLogout)}><Icon name="logout" size={18} />Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
