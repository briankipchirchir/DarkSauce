import Icon from "./Icon.jsx";
import { ProductImage } from "./Media.jsx";
import { useStore, money } from "../store.jsx";
import { CATEGORIES } from "../data.js";

export default function CartPage({ onBrowse, onCheckout }) {
  const { cartItems, cartTotal, cartCount, state, setQty } = useStore();

  if (!cartItems.length) {
    return (
      <section className="dx-page">
        <div className="dx-page-head"><div><span className="dx-eyebrow">Your cart</span><h1>Cart</h1></div></div>
        <div className="dx-panel dx-center">
          <div className="dx-ico"><Icon name="cart" /></div>
          <h2>Your cart is empty</h2>
          <p className="dx-muted">Add a product and it will show up here.</p>
          <button className="dx-btn primary" onClick={onBrowse}>Browse products</button>
        </div>
      </section>
    );
  }

  return (
    <section className="dx-page">
      <div className="dx-page-head">
        <div><span className="dx-eyebrow">Your cart</span><h1>Cart ({cartCount})</h1></div>
        <button className="dx-link" onClick={onBrowse}>Keep shopping</button>
      </div>

      <div className="dx-two">
        <div className="dx-panel">
          {cartItems.map((p) => {
            const cat = CATEGORIES.find((c) => c.id === p.category);
            return (
              <div className="dx-line" key={p.id}>
                <div className="dx-thumb"><ProductImage product={p} category={cat} size={26} /></div>
                <div>
                  <h3>{p.name}</h3>
                  <small>{cat.label} · {money(p.price)} each</small>
                </div>
                <div className="dx-line-end">
                  <div className="dx-qty" role="group" aria-label={`Quantity for ${p.name}`}>
                    <button onClick={() => setQty(p.id, p.qty - 1)} aria-label="Decrease quantity">−</button>
                    <span>{p.qty}</span>
                    <button onClick={() => setQty(p.id, p.qty + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <b className="dx-line-total">{money(p.price * p.qty)}</b>
                  <button className="dx-icon-btn dx-rm" onClick={() => setQty(p.id, 0)} aria-label={`Remove ${p.name}`}><Icon name="trash" size={18} /></button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="dx-panel dx-sum">
          <h2>Order summary</h2>
          <div className="dx-row"><span>Items</span><b>{cartCount}</b></div>
          <div className="dx-row"><span>Subtotal</span><b>{money(cartTotal)}</b></div>
          <div className="dx-row"><span>Fees</span><b>{money(0)}</b></div>
          <div className="dx-row total"><span>Total</span><b>{money(cartTotal)}</b></div>
          <div className="dx-row"><span>Your balance</span><b>{money(state.balance)}</b></div>
          <button className="dx-btn primary dx-wide" onClick={onCheckout}>Go to checkout</button>
        </aside>
      </div>
    </section>
  );
}
