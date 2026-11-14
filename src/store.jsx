import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { PRODUCTS } from "./data.js";

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

export const money = (n) =>
  `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const fmtDate = (t) =>
  new Date(t).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

const makeId = (prefix) =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1296)
    .toString(36).toUpperCase().padStart(2, "0")}`;

const round2 = (n) => Math.round(n * 100) / 100;

const blank = (email) => ({
  profile: { email, username: email.split("@")[0] },
  balance: 0,
  cart: {},
  orders: [],
  deposits: [],
});

function load(email) {
  try {
    const raw = localStorage.getItem(`darksauce:data:${email}`);
    if (raw) return { ...blank(email), ...JSON.parse(raw) };
  } catch {}
  return blank(email);
}

const lines = (cart) =>
  Object.entries(cart)
    .map(([id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === Number(id));
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);

const sum = (items) => round2(items.reduce((t, i) => t + i.price * i.qty, 0));

function reducer(s, a) {
  switch (a.type) {
    case "add":
      return { ...s, cart: { ...s.cart, [a.id]: Math.min((s.cart[a.id] || 0) + 1, 99) } };
    case "setQty": {
      const cart = { ...s.cart };
      if (a.qty <= 0) delete cart[a.id];
      else cart[a.id] = Math.min(a.qty, 99);
      return { ...s, cart };
    }
    case "deposit":
      return {
        ...s,
        balance: round2(s.balance + a.amount),
        deposits: [{ id: a.id, coin: a.coin, amount: a.amount, date: a.date }, ...s.deposits],
      };
    case "checkout": {
      const items = lines(s.cart);
      const total = sum(items);
      if (!items.length || total > s.balance) return s;
      const order = {
        id: a.id,
        date: a.date,
        items: items.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
        total,
        status: "Completed",
      };
      return { ...s, balance: round2(s.balance - total), cart: {}, orders: [order, ...s.orders] };
    }
    case "rename":
      return { ...s, profile: { ...s.profile, username: a.username } };
    default:
      return s;
  }
}

export function StoreProvider({ email, children }) {
  const [state, dispatch] = useReducer(reducer, email, load);

  useEffect(() => {
    try { localStorage.setItem(`darksauce:data:${email}`, JSON.stringify(state)); } catch {}
  }, [state, email]);

  const value = useMemo(() => {
    const cartItems = lines(state.cart);
    const cartTotal = sum(cartItems);
    const cartCount = cartItems.reduce((n, i) => n + i.qty, 0);
    return {
      state, cartItems, cartTotal, cartCount,
      add: (id) => dispatch({ type: "add", id }),
      setQty: (id, qty) => dispatch({ type: "setQty", id, qty }),
      deposit: (amount, coin) =>
        dispatch({ type: "deposit", amount, coin, id: makeId("DEP"), date: Date.now() }),
      checkout: () => {
        if (!cartItems.length || cartTotal > state.balance) return null;
        const id = makeId("ORD");
        dispatch({ type: "checkout", id, date: Date.now() });
        return id;
      },
      rename: (username) => dispatch({ type: "rename", username }),
    };
  }, [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
