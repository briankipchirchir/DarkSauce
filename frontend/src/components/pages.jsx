import { useNavigate, useSearchParams } from "react-router-dom";
import CartPage from "./CartPage.jsx";
import CheckoutPage from "./CheckoutPage.jsx";
import OrdersPage from "./OrdersPage.jsx";
import AccountPage from "./AccountPage.jsx";
import PaymentPage from "./PaymentPage.jsx";

// Each wrapper connects a page to the router, so the pages themselves stay simple.
const payUrl = (amt) => (typeof amt === "number" && amt > 0 ? `/pay?amount=${Math.ceil(amt)}` : "/pay");

export function CartRoute() {
  const nav = useNavigate();
  return <CartPage onBrowse={() => nav("/products")} onCheckout={() => nav("/checkout")} />;
}

export function CheckoutRoute() {
  const nav = useNavigate();
  return (
    <CheckoutPage
      onBack={() => nav("/cart")}
      onTopUp={(amt) => nav(payUrl(amt))}
      onOrders={() => nav("/orders")}
      onBrowse={() => nav("/products")}
    />
  );
}

export function OrdersRoute() {
  const nav = useNavigate();
  return <OrdersPage onBrowse={() => nav("/products")} />;
}

export function AccountRoute() {
  const nav = useNavigate();
  return <AccountPage onTopUp={() => nav("/pay")} onOrders={() => nav("/orders")} />;
}

export function PayRoute() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const preset = Number(params.get("amount")) || null;
  return (
    <PaymentPage
      key={preset ?? "none"}
      presetAmount={preset}
      onBack={() => nav("/products")}
      onAccount={() => nav("/account")}
      onCheckout={() => nav("/checkout")}
    />
  );
}
