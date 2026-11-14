import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import Icon from "./Icon.jsx";
import { CoinLogo } from "./Media.jsx";
import { useStore, money } from "../store.jsx";
import { PAY_OPTIONS, usePrices, toCrypto, fmtCrypto, fmtRate } from "../payments.js";

const PRESETS = [25, 50, 100, 250];

// Placeholder address. Replace with an address from your payment provider.
const demoAddress = (opt) => `DEMO-${opt.id}-ADDRESS-NOT-A-REAL-WALLET`;

const copyText = async (text) => {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* try the fallback */ }
  try {
    const t = document.createElement("textarea");
    t.value = text; t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t); t.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(t);
    return ok;
  } catch { return false; }
};

export default function PaymentPage({ presetAmount, onBack, onAccount, onCheckout }) {
  const { state, cartItems, deposit } = useStore();
  const { prices, live } = usePrices();

  const [amount, setAmount] = useState(() =>
    String(presetAmount ? Math.min(10000, Math.max(5, Math.ceil(presetAmount))) : 50));
  const [optId, setOptId] = useState(PAY_OPTIONS[0]?.id);
  const [phase, setPhase] = useState("pay"); // pay | confirming | done
  const [conf, setConf] = useState(0);
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState("");
  const [orderNo] = useState(() => Math.floor(100 + Math.random() * 900));
  const timer = useRef(null);

  const opt = PAY_OPTIONS.find((o) => o.id === optId) || PAY_OPTIONS[0];
  const address = opt ? demoAddress(opt) : "";
  const num = Number(amount);
  const valid = num >= 5 && num <= 10000;
  const price = opt ? prices[opt.coingeckoId] : null;
  const crypto = valid && price ? fmtCrypto(toCrypto(num, price), opt) : "—";
  const locked = phase !== "pay";

  useEffect(() => () => clearInterval(timer.current), []);

  useEffect(() => {
    if (!address) return;
    let alive = true;
    QRCode.toDataURL(address, { margin: 1, width: 360, errorCorrectionLevel: "M" })
      .then((url) => { if (alive) setQr(url); })
      .catch(() => { if (alive) setQr(""); });
    return () => { alive = false; };
  }, [address]);

  if (!opt) {
    return (
      <section className="dx-page">
        <div className="dx-panel dx-center">
          <h2>No payment methods enabled</h2>
          <p className="dx-muted">Set <b>accepted: true</b> on at least one coin in src/data.js.</p>
        </div>
      </section>
    );
  }

  const copy = async () => {
    const ok = await copyText(address);
    setCopied(ok);
    if (ok) setTimeout(() => setCopied(false), 1500);
  };

  const start = () => {
    if (!valid) { setErr("Enter an amount between $5 and $10,000."); return; }
    setErr("");
    setPhase("confirming");
    setConf(0);
    const need = opt.confirmations;
    const coin = opt.id;
    const amt = num;
    let c = 0;
    timer.current = setInterval(() => {
      c += 1;
      setConf(c);
      if (c >= need) {
        clearInterval(timer.current);
        // TODO: replace this simulation with your payment provider's confirmation webhook
        deposit(amt, coin);
        setPhase("done");
      }
    }, Math.max(250, Math.round(3600 / need)));
  };

  const pct = phase === "done" ? 100 : (conf / opt.confirmations) * 100;
  const rate = price ? (opt.stable ? `1 ${opt.symbol} ≈ ${fmtRate(price)}` : `1 ${opt.symbol} = ${fmtRate(price)}`) : "";

  return (
    <section className="dx-page pay">
      <header className="pay-head">
        <span className="pay-tile"><Icon name="wallet" size={22} /></span>
        <div>
          <h1>Complete payment</h1>
          <p>Secure cryptocurrency deposit gateway</p>
        </div>
      </header>

      <p className="dx-warn pay-demo">
        Demo mode: the address below is a placeholder and no real payment is taken. The button at the bottom simulates
        the confirmations and credits your balance so you can test the full flow.
      </p>

      <div className="pay-grid">
        <div className="pay-col">
          <div className="pay-card">
            <p className="pay-label">Order summary</p>
            <div className="pay-row">
              <div>
                <div className="pay-money">{money(valid ? num : 0)}</div>
                <p className="pay-sub">Order #{orderNo}</p>
              </div>
              <span className="pay-badge">Top up</span>
            </div>

            <div className="pay-edit">
              {PRESETS.map((p) => (
                <button key={p} type="button" className={`pay-chip ${num === p ? "on" : ""}`} disabled={locked} onClick={() => setAmount(String(p))}>${p}</button>
              ))}
              <label className="pay-amt">
                <span>$</span>
                <input
                  inputMode="decimal"
                  aria-label="Custom amount in USD"
                  value={amount}
                  disabled={locked}
                  onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                />
              </label>
            </div>
            {presetAmount ? <p className="pay-note">Covers what is missing for your cart.</p> : null}
            {err && <p className="dx-msg bad" role="alert">{err}</p>}
          </div>

          <div className="pay-card">
            <p className="pay-label">Amount due</p>
            <div className="pay-row pay-end">
              <div className="pay-money">{money(valid ? num : 0)}</div>
              <div className="pay-eq">
                <span>≈ Crypto equiv.</span>
                <b>{crypto} {opt.symbol}</b>
                {rate && <small>{rate} · {live ? "live rate" : "sample rate"}</small>}
              </div>
            </div>
          </div>

          <div className="pay-card">
            <p className="pay-label">Select cryptocurrency ({PAY_OPTIONS.length} available)</p>
            <div className="pay-coins" role="radiogroup" aria-label="Cryptocurrency">
              {PAY_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={o.id === opt.id}
                  disabled={locked}
                  className={`pay-coin ${o.id === opt.id ? "on" : ""}`}
                  onClick={() => { setOptId(o.id); setCopied(false); }}
                >
                  <CoinLogo src={o.logo} size={24} fallback={<span className="dx-clogo dx-clogo-fb" style={{ width: 24, height: 24 }}>{o.symbol[0]}</span>} />
                  <span>{o.id}</span>
                  {o.showPrice && prices[o.coingeckoId] ? <small>{fmtRate(prices[o.coingeckoId])}</small> : null}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="pay-card pay-deposit">
          <div className="pay-coinhead">
            <span className="pay-logo">
              <CoinLogo src={opt.logo} size={28} fallback={<span className="dx-clogo dx-clogo-fb" style={{ width: 28, height: 28 }}>{opt.symbol[0]}</span>} />
            </span>
            <div>
              <b>{opt.symbol}</b>
              <small>{opt.network}</small>
            </div>
          </div>

          <div className="pay-qr">
            {qr ? <img src={qr} alt={`QR code for the ${opt.symbol} deposit address`} /> : <span className="pay-qr-wait">…</span>}
          </div>

          <p className="pay-label">Deposit address</p>
          <div className="pay-addr">
            <code title={address}>{address}</code>
            <button type="button" className="pay-copy" onClick={copy}>
              <Icon name={copied ? "check" : "copy"} size={16} />{copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="pay-camt">
            <b>{opt.symbol === "BTC" ? "₿" : opt.symbol} {crypto}</b>
            <small>= {money(valid ? num : 0)} USD</small>
          </div>

          <p className="pay-warn"><Icon name="alert" size={16} />Send exact amount only • {opt.confirmations} confirmations required</p>

          <div className="pay-steps">
            <div className={`pay-step ${phase === "pay" ? "on" : "done"}`}>
              <i><Icon name="wallet" size={18} /></i><b>Send</b><small>Send crypto</small>
            </div>
            <div className={`pay-step ${phase === "confirming" ? "on" : phase === "done" ? "done" : ""}`}>
              <i><Icon name="shield" size={18} /></i><b>Confirm</b>
              <small>{phase === "confirming" ? `${conf}/${opt.confirmations} blocks` : `${opt.confirmations} blocks`}</small>
            </div>
            <div className={`pay-step ${phase === "done" ? "done" : ""}`}>
              <i><Icon name="check" size={18} /></i><b>Credit</b><small>{phase === "done" ? "Added" : "Auto added"}</small>
            </div>
          </div>

          {phase === "pay" && (
            <button className="dx-btn primary dx-wide" onClick={start}>I have sent the payment</button>
          )}

          {phase === "confirming" && (
            <>
              <div className="pay-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}><i style={{ width: `${pct}%` }} /></div>
              <button className="dx-btn primary dx-wide" disabled>Waiting for confirmations… {conf}/{opt.confirmations}</button>
            </>
          )}

          {phase === "done" && (
            <div className="pay-done" role="status">
              <div className="dx-done"><Icon name="check" size={28} /></div>
              <p><b>Payment confirmed.</b> {money(num)} was added to your balance. New balance: <b>{money(state.balance)}</b></p>
              <div className="dx-actions" style={{ justifyContent: "center" }}>
                {cartItems.length > 0 && <button className="dx-btn primary" onClick={onCheckout}>Back to checkout</button>}
                <button className={`dx-btn ${cartItems.length ? "ghost" : "primary"}`} onClick={onBack}>Continue shopping</button>
                <button className="dx-btn ghost" onClick={onAccount}>My account</button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
