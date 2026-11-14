import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MatrixBackground from "./components/MatrixBackground.jsx";
import DriftingIcons from "./components/DriftingIcons.jsx";
import LoginCard from "./components/LoginCard.jsx";
import Shell from "./components/Shell.jsx";
import HomePage from "./components/HomePage.jsx";
import NotFound from "./components/NotFound.jsx";
import { CartRoute, CheckoutRoute, OrdersRoute, AccountRoute, PayRoute } from "./components/pages.jsx";
import { StoreProvider } from "./store.jsx";

const KEY = "darksauce:user";
const read = () => {
  try { const v = sessionStorage.getItem(KEY); return v && v.includes("@") ? v : null; } catch { return null; }
};

export default function App() {
  const [email, setEmail] = useState(read);

  const login = (value) => {
    const v = value.trim().toLowerCase();
    try { sessionStorage.setItem(KEY, v); } catch {}
    setEmail(v);
  };

  const logout = () => {
    try { sessionStorage.removeItem(KEY); } catch {}
    setEmail(null);
  };

  if (email) {
    return (
      <StoreProvider email={email}>
        <Routes>
          <Route element={<Shell onLogout={logout} />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<HomePage />} />
            <Route path="category/:id" element={<HomePage />} />
            <Route path="cart" element={<CartRoute />} />
            <Route path="checkout" element={<CheckoutRoute />} />
            <Route path="orders" element={<OrdersRoute />} />
            <Route path="account" element={<AccountRoute />} />
            <Route path="pay" element={<PayRoute />} />
            <Route path="login" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </StoreProvider>
    );
  }

  // Not signed in: show the login page. After signing in you land on the page you asked for.
  return (
    <main className="stage">
      <MatrixBackground />
      <div className="coin" aria-hidden="true">₿</div>
      <DriftingIcons />
      <div className="vignette" aria-hidden="true" />
      <LoginCard onLogin={login} />
    </main>
  );
}
