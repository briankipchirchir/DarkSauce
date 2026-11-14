import { useEffect, useState } from "react";

import { COINS } from "../data.js";
import { CoinLogo } from "./Media.jsx";

const IDS = Object.fromEntries(COINS.map((c) => [c.coingeckoId, c.symbol]));
const LOGO = Object.fromEntries(COINS.map((c) => [c.symbol, c.logo]));

// Shown until live prices load, or if the price service can't be reached
const SAMPLE = [
  { sym: "BTC", price: 67420.18, ch: 1.24 },
  { sym: "ETH", price: 3480.52, ch: -0.62 },
  { sym: "LTC", price: 84.12, ch: 0.9 },
  { sym: "SOL", price: 172.4, ch: 2.31 },
  { sym: "USDT", price: 0.9991, ch: 0.01 },
  { sym: "XMR", price: 168.35, ch: -1.1 },
];

const fmt = (n) => {
  const d = n < 10 ? 4 : 2;
  return n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
};

export default function Ticker() {
  const [rows, setRows] = useState(SAMPLE);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let dead = false;
    const pull = async () => {
      try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${Object.keys(IDS).join(",")}&vs_currencies=usd&include_24hr_change=true`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("bad response");
        const d = await res.json();
        const next = Object.entries(IDS)
          .filter(([id]) => d[id]?.usd != null)
          .map(([id, sym]) => ({ sym, price: d[id].usd, ch: d[id].usd_24h_change ?? 0 }));
        if (!dead && next.length) { setRows(next); setLive(true); }
      } catch {
        /* keep whatever is showing */
      }
    };
    pull();
    const t = setInterval(pull, 90000);
    return () => { dead = true; clearInterval(t); };
  }, []);

  const set = rows.map((r) => (
    <span className="dx-tick" key={r.sym}>
      <CoinLogo src={LOGO[r.sym]} size={18} /><b>{r.sym}</b>
      <span className="px">${fmt(r.price)}</span>
      <span className={`dx-chg ${r.ch >= 0 ? "up" : "dn"}`}>
        {r.ch >= 0 ? "▲" : "▼"} {Math.abs(r.ch).toFixed(2)}%
      </span>
    </span>
  ));

  return (
    <div className="dx-ticker" role="region" aria-label="Crypto prices">
      <div className={`dx-ticker-tag ${live ? "" : "sample"}`}>
        <i aria-hidden="true" />{live ? "Live" : "Sample"}
      </div>
      <div className="dx-ticker-view">
        <div className="dx-ticker-track">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <div className="dx-tick-set" key={n} aria-hidden={n > 0}>{set}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
