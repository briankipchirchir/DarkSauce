import { useState } from "react";
import { useStore, money, fmtDate } from "../store.jsx";
import { useAuth } from "../auth.jsx";

export default function AccountPage({ onTopUp, onOrders }) {
  const { state } = useStore();
  const { updateProfile, changePassword } = useAuth();
  const { profile, balance, orders, deposits } = state;
  const spent = orders.reduce((t, o) => t + o.total, 0);

  const [name, setName] = useState(profile.username);
  const [nameMsg, setNameMsg] = useState(null);
  const [pw, setPw] = useState({ current: "", next: "", again: "" });
  const [pwMsg, setPwMsg] = useState(null);

  const saveName = async (e) => {
    e.preventDefault();
    const v = name.trim();
    if (v.length < 2 || v.length > 24) return setNameMsg({ ok: false, text: "Use 2 to 24 characters." });
    try {
      await updateProfile(v);
      setName(v);
      setNameMsg({ ok: true, text: "Display name updated." });
    } catch (err) {
      setNameMsg({ ok: false, text: err.message });
    }
  };

  const savePw = async (e) => {
    e.preventDefault();
    if (!pw.current) return setPwMsg({ ok: false, text: "Enter your current password." });
    if (pw.next.length < 8) return setPwMsg({ ok: false, text: "New password must be at least 8 characters." });
    if (pw.next.length > 72) return setPwMsg({ ok: false, text: "New password can be at most 72 characters." });
    if (pw.next !== pw.again) return setPwMsg({ ok: false, text: "The new passwords don't match." });
    try {
      await changePassword(pw.current, pw.next);
      setPw({ current: "", next: "", again: "" });
      setPwMsg({ ok: true, text: "Password updated. Your other devices were signed out." });
    } catch (err) {
      setPwMsg({ ok: false, text: err.message });
    }
  };

  const setP = (k) => (e) => setPw((p) => ({ ...p, [k]: e.target.value }));

  return (
    <section className="dx-page">
      <div className="dx-page-head">
        <div className="dx-acct-head">
          <span className="dx-avatar big">{profile.username.charAt(0).toUpperCase()}</span>
          <div>
            <h1>{profile.username}</h1>
            <p className="dx-muted" style={{ margin: "4px 0 0" }}>{profile.email}</p>
          </div>
        </div>
        <button className="dx-btn primary" onClick={onTopUp}>Top up balance</button>
      </div>

      <div className="dx-stats">
        <div className="dx-stat"><span>Balance</span><b>{money(balance)}</b></div>
        <button className="dx-stat dx-stat-btn" onClick={onOrders}><span>Orders</span><b>{orders.length}</b></button>
        <div className="dx-stat"><span>Total spent</span><b>{money(spent)}</b></div>
      </div>

      <div className="dx-cols">
        <form className="dx-panel dx-form" onSubmit={saveName}>
          <h2>Profile</h2>
          <div className="dx-field">
            <label htmlFor="dn">Display name</label>
            <input id="dn" className="dx-input" value={name} onChange={(e) => setName(e.target.value)} maxLength={24} />
          </div>
          {nameMsg && <p className={`dx-msg ${nameMsg.ok ? "ok" : "bad"}`} role="status">{nameMsg.text}</p>}
          <button className="dx-btn primary" type="submit">Save changes</button>
        </form>

        <form className="dx-panel dx-form" onSubmit={savePw}>
          <h2>Password</h2>
          <div className="dx-field">
            <label htmlFor="pw0">Current password</label>
            <input id="pw0" type="password" autoComplete="current-password" className="dx-input" value={pw.current} onChange={setP("current")} />
          </div>
          <div className="dx-field">
            <label htmlFor="pw1">New password</label>
            <input id="pw1" type="password" autoComplete="new-password" className="dx-input" value={pw.next} onChange={setP("next")} />
          </div>
          <div className="dx-field">
            <label htmlFor="pw2">Repeat new password</label>
            <input id="pw2" type="password" autoComplete="new-password" className="dx-input" value={pw.again} onChange={setP("again")} />
          </div>
          {pwMsg && <p className={`dx-msg ${pwMsg.ok ? "ok" : "bad"}`} role="status">{pwMsg.text}</p>}
          <button className="dx-btn primary" type="submit">Update password</button>
        </form>
      </div>

      <div className="dx-panel">
        <h2>Top-up history</h2>
        {deposits.length === 0 ? (
          <p className="dx-muted">No top-ups yet.</p>
        ) : (
          <div className="dx-table-wrap">
            <table className="dx-table">
              <thead><tr><th>Date</th><th>Reference</th><th>Coin</th><th>Amount</th></tr></thead>
              <tbody>
                {deposits.map((d) => (
                  <tr key={d.id}><td>{fmtDate(d.date)}</td><td>{d.id}</td><td>{d.coin}</td><td>{money(d.amount)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
