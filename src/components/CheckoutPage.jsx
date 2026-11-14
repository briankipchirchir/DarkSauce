import { useState } from "react";
import Icon from "./Icon.jsx";
import { useStore, money } from "../store.jsx";

export default function CheckoutPage({ onBack, onTopUp, onOrders, onBrowse }) {
  const { cartItems, cartTotal, state, checkout } = useStore();
  const [paid, setPaid] = useState(null);
  const [busy, setBusy] = useState(false);

  const short = Math.round((cartTotal - state.balance) * 100) / 100;
  const enough = short <= 0;

  const pay = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    const id = checkout();
    setBusy(false);
    if (id) setPaid(id);
  };

  if (paid) {
    const order = state.orders.find((o) => o.id === paid);
    return (
      <section className="dx-page">
        <div className="dx-panel dx-center">
          <div className="dx-done"><Icon name="check" size={30} /></div>
          <h2>Order placed</h2>
          <p className="dx-muted">
            Order <b>{paid}</b>{order ? <> for <b>{money(order.total)}</b></> : null} was paid from your balance.
          </p>
          <div className="dx-actions" style={{ justifyContent: "center" }}>
            <button className="dx-btn primary" onClick={onOrders}>View orders</button>
            <button className="dx-btn ghost" onClick={onBrowse}>Keep shopping</button>
          </div>
        </div>
      </section>
    );
  }

  if (!cartItems.length) {
    return (
      <section className="dx-page">
        <div className="dx-panel dx-center">
          <div className="dx-ico"><Icon name="cart" /></div>
          <h2>Nothing to check out</h2>
          <p className="dx-muted">Your cart is empty.</p>
          <button className="dx-btn primary" onClick={onBrowse}>Browse products</button>
        </div>
      </section>
    );
  }

  return (
    <section className="dx-page">
      <div className="dx-page-head">
        <div><span className="dx-eyebrow">Checkout</span><h1>Review and pay</h1></div>
        <button className="dx-link" onClick={onBack}>Back to cart</button>
      </div>

      <div className="dx-two">
        <div className="dx-panel">
          <h2>Items</h2>
          {cartItems.map((p) => (
            <div className="dx-row" key={p.id}>
              <span>{p.name} × {p.qty}</span><b>{money(p.price * p.qty)}</b>
            </div>
          ))}
        </div>

        <aside className="dx-panel dx-sum">
          <h2>Pay from balance</h2>
          <div className="dx-row"><span>Total</span><b>{money(cartTotal)}</b></div>
          <div className="dx-row"><span>Your balance</span><b>{money(state.balance)}</b></div>
          <div className="dx-row total">
            <span>Balance after</span>
            <b>{enough ? money(state.balance - cartTotal) : "—"}</b>
          </div>

          {!enough && (
            <p className="dx-warn">
              You need {money(short)} more to pay for this order. Top up your balance, then come back.
            </p>
          )}

          {enough ? (
            <button className="dx-btn primary dx-wide" onClick={pay} disabled={busy}>
              {busy ? "Processing…" : `Pay ${money(cartTotal)}`}
            </button>
          ) : (
            <button className="dx-btn primary dx-wide" onClick={() => onTopUp(Math.ceil(short))}><Icon name="wallet" size={18} />Top up balance</button>
          )}
        </aside>
      </div>
    </section>
  );
}
