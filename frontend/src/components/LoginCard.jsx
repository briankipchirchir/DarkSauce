import { useState } from "react";
import Logo from "./Logo.jsx";

const icons = {
  user: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  eyeOff: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18" /><path d="M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.5 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.4 4.5-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>
  ),
  signIn: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-3" /><path d="M10 17l5-5-5-5M15 12H3" /></svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
};

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);

export default function LoginCard({ onLogin, onRegister }) {
  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({ email: "", displayName: "", password: "", remember: false });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const isReg = mode === "register";

  const set = (k) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const switchMode = () => {
    setMode(isReg ? "login" : "register");
    setErrors({});
    setFormError("");
    setForm((f) => ({ ...f, password: "" }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!emailOk(form.email)) next.email = "Enter a valid email address.";
    if (isReg) {
      const n = form.displayName.trim();
      if (n.length < 2 || n.length > 24) next.displayName = "Use 2 to 24 characters.";
    }
    if (form.password.length < 8) next.password = "Password must be at least 8 characters.";
    else if (form.password.length > 72) next.password = "Password can be at most 72 characters.";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      if (isReg) {
        await onRegister({ email: form.email.trim(), password: form.password, displayName: form.displayName.trim() });
      } else {
        await onLogin({ email: form.email.trim(), password: form.password, remember: form.remember });
      }
    } catch (err) {
      setFormError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card" aria-labelledby="brand">
      <header className="brand">
        <Logo />
        <h1 id="brand">DARKSAUCE</h1>
        <span className="rule" aria-hidden="true" />
        <p>{isReg ? "Create your account" : "Secure client login"}</p>
      </header>

      <form onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <div className={`control ${errors.email ? "invalid" : ""}`}>
            <span className="ico">{icons.user}</span>
            <input
              id="email" type="email" autoComplete="email" inputMode="email"
              placeholder="you@darksauce.store"
              value={form.email} onChange={set("email")}
              aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined}
            />
          </div>
          {errors.email && <p className="err" id="email-err" role="alert">{errors.email}</p>}
        </div>

        {isReg && (
          <div className="field">
            <label htmlFor="displayName">Display name</label>
            <div className={`control ${errors.displayName ? "invalid" : ""}`}>
              <span className="ico">{icons.user}</span>
              <input
                id="displayName" type="text" autoComplete="nickname" maxLength={24}
                placeholder="How should we call you?"
                value={form.displayName} onChange={set("displayName")}
                aria-invalid={!!errors.displayName} aria-describedby={errors.displayName ? "dn-err" : undefined}
              />
            </div>
            {errors.displayName && <p className="err" id="dn-err" role="alert">{errors.displayName}</p>}
          </div>
        )}

        <div className="field">
          <label htmlFor="password">Password</label>
          <div className={`control ${errors.password ? "invalid" : ""}`}>
            <span className="ico">{icons.lock}</span>
            <input
              id="password" type={show ? "text" : "password"} autoComplete={isReg ? "new-password" : "current-password"}
              placeholder="••••••••"
              value={form.password} onChange={set("password")}
              aria-invalid={!!errors.password} aria-describedby={errors.password ? "pw-err" : undefined}
            />
            <button type="button" className="toggle" onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"} aria-pressed={show}>
              {show ? icons.eyeOff : icons.eye}
            </button>
          </div>
          {errors.password && <p className="err" id="pw-err" role="alert">{errors.password}</p>}
          {isReg && !errors.password && <p className="auth-hint">8 to 72 characters.</p>}
        </div>

        {formError && <p className="auth-err" role="alert">{formError}</p>}

        {!isReg && (
          <div className="row">
            <label className="check">
              <input type="checkbox" checked={form.remember} onChange={set("remember")} />
              <span className="box" aria-hidden="true" />
              Remember me
            </label>
            <a href="#forgot" className="muted-link">Forgot password?</a>
          </div>
        )}

        <button className="primary" type="submit" disabled={loading}>
          {loading ? <span className="spinner" aria-hidden="true" /> : icons.signIn}
          <span>{loading ? (isReg ? "Creating account" : "Signing in") : (isReg ? "Create account" : "Sign in")}</span>
        </button>
      </form>

      <footer className="foot">
        <span>{isReg ? "Already have an account?" : "Don't have an account?"}</span>
        <button type="button" className="accent-link as-btn" onClick={switchMode}>
          {isReg ? "Sign in" : "Create account"} {icons.arrow}
        </button>
      </footer>
    </section>
  );
}
