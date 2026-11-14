import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import { useStore, money } from "../store.jsx";
import { ACCEPTED_COINS } from "../data.js";
import { CoinLogo } from "./Media.jsx";

const COINS = ACCEPTED_COINS.map((c) => c.symbol);
const LOGOS = Object.fromEntries(ACCEPTED_COINS.map((c) => [c.symbol, c.logo]));
const PRESETS = [25, 50, 100, 250];

export default function TopUpModal({ onClose }) {
  const { state, deposit } = useStore();
  const [step, setStep] = useState(1);
  const [coin, setCoin] = useState("BTC");
  const [amount, setAmount] = useState("50");
  const [err, setErr] = useState("");
  const num = Number(amount);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const next = () => {
    if (!(num >= 5 && num <= 10000)) return setErr("Enter an amount between $5 and $10,000.");
    setErr("");
    setStep(2);
  };

  const confirm = () => {
    // TODO: replace with a real payment provider. Credit the balance only after the payment is confirmed.
    deposit(num, coin);
    setStep(3);
  };

  return (
    <div className="dx-modal-wrap" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dx-modal" role="dialog" aria-modal="true" aria-labelledby="topup-title">
        <div className="dx-modal-head">
          <h2 id="topup-title">{step === 3 ? "Balance updated" : "Top up balance"}</h2>
          <button className="dx-icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={18} /></button>
        </div>

        {step === 1 && (
          <div className="dx-stack">
            <div className="dx-field">
              <label>Pay with</label>
              <div className="dx-coins">
                {COINS.map((c) => (
                  <button key={c} type="button" className={`dx-coin ${coin === c ? "on" : ""}`} onClick={() => setCoin(c)}><CoinLogo src={LOGOS[c]} size={20} />{c}</button>
                ))}
              </div>
            </div>
            <div className="dx-field">
              <label htmlFor="amt">Amount in USD</label>
              <div className="dx-coins">
                {PRESETS.map((p) => (
                  <button key={p} type="button" className={`dx-coin ${num === p ? "on" : ""}`} onClick={() => setAmount(String(p))}>${p}</button>
                ))}
              </div>
              <input id="amt" className="dx-input" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))} style={{ marginTop: 10 }} />
              {err && <p className="dx-msg bad" role="alert">{err}</p>}
            </div>
            <button className="dx-btn primary" onClick={next}>Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="dx-stack">
            <p className="dx-muted">Send <b>{money(num)}</b> worth of <b>{coin}</b> to this address:</p>
            <div className="dx-addr">DEMO-ADDRESS-NOT-A-REAL-WALLET</div>
            <p className="dx-warn">
              Demo mode: no real payment is taken. Pressing the button below credits your balance so you can test checkout.
              Connect a payment provider before going live.
            </p>
            <div className="dx-actions">
              <button className="dx-btn ghost" onClick={() => setStep(1)}>Back</button>
              <button className="dx-btn primary" onClick={confirm}>I have sent it</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="dx-stack">
            <div className="dx-done"><Icon name="check" size={30} /></div>
            <p className="dx-muted" style={{ textAlign: "center" }}>
              {money(num)} added. Your balance is now <b>{money(state.balance)}</b>.
            </p>
            <button className="dx-btn primary" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
