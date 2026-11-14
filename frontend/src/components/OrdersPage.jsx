import Icon from "./Icon.jsx";
import { useStore, money, fmtDate } from "../store.jsx";

export default function OrdersPage({ onBrowse }) {
  const { state } = useStore();
  const { orders } = state;

  return (
    <section className="dx-page">
      <div className="dx-page-head">
        <div><span className="dx-eyebrow">History</span><h1>My Orders</h1></div>
        <span className="dx-count">{orders.length} {orders.length === 1 ? "order" : "orders"}</span>
      </div>

      {orders.length === 0 ? (
        <div className="dx-panel dx-center">
          <div className="dx-ico"><Icon name="orders" /></div>
          <h2>No orders yet</h2>
          <p className="dx-muted">When you place an order, it will show up here.</p>
          <button className="dx-btn primary" onClick={onBrowse}>Browse products</button>
        </div>
      ) : (
        <div className="dx-stack">
          {orders.map((o) => (
            <details className="dx-order" key={o.id}>
              <summary>
                <div>
                  <b>{o.id}</b>
                  <small>{fmtDate(o.date)}</small>
                </div>
                <span className="dx-status">{o.status}</span>
                <b>{money(o.total)}</b>
              </summary>
              <div className="dx-order-body">
                {o.items.map((i) => (
                  <div className="dx-row" key={i.id}>
                    <span>{i.name} × {i.qty}</span><b>{money(i.price * i.qty)}</b>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
