import { Navigate, Route, Routes } from "react-router-dom";
import MatrixBackground from "./components/MatrixBackground.jsx";
import DriftingIcons from "./components/DriftingIcons.jsx";
import LoginCard from "./components/LoginCard.jsx";
import Shell from "./components/Shell.jsx";
import HomePage from "./components/HomePage.jsx";
import NotFound from "./components/NotFound.jsx";
import { CartRoute, CheckoutRoute, OrdersRoute, AccountRoute, PayRoute } from "./components/pages.jsx";
import { StoreProvider } from "./store.jsx";
import { useAuth } from "./auth.jsx";

export default function App() {
  const { status, user, login, register, logout } = useAuth();

  // Checking whether an existing session can be resumed
  if (status === "loading") {
    return (
      <main className="stage">
        <span className="spinner" role="status" aria-label="Loading" />
      </main>
    );
  }

  if (user) {
    return (
      <StoreProvider user={user}>
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

  // Not signed in: every URL shows the login page. After signing in you land on the page you asked for.
  return (
    <main className="stage">
      <MatrixBackground />
      <div className="coin" aria-hidden="true">₿</div>
      <DriftingIcons />
      <div className="vignette" aria-hidden="true" />
      <LoginCard onLogin={login} onRegister={register} />
    </main>
  );
}
