import { useEffect, useState } from "react";
import { COINS } from "./data.js";

// Extra payment details per coin. You can also set `network`, `variants`,
// `confirmations` or `stable` directly on a coin in data.js to override these.
const NETWORKS = {
  BTC: "Bitcoin Network",
  LTC: "Litecoin Network",
  SOL: "Solana Network",
  XMR: "Monero Network",
  ETH: "Ethereum Network",
};
const VARIANTS = {
  USDT: [
    { key: "ERC20", network: "Ethereum Network (ERC-20)" },
    { key: "TRC20", network: "Tron Network (TRC-20)" },
  ],
};
// Placeholder numbers. Set these to match your payment provider.
const CONFIRMATIONS = { BTC: 3, LTC: 6, SOL: 1, USDT: 12, XMR: 10 };

export const PAY_OPTIONS = COINS.filter((c) => c.accepted).flatMap((c) => {
  const variants = c.variants ?? VARIANTS[c.symbol];
  const stable = c.stable ?? c.symbol === "USDT";
  const base = {
    symbol: c.symbol,
    name: c.name,
    coingeckoId: c.coingeckoId,
    logo: c.logo,
    stable,
    confirmations: c.confirmations ?? CONFIRMATIONS[c.symbol] ?? 3,
  };
  if (variants?.length) {
    return variants.map((v) => ({ ...base, id: `${c.symbol}_${v.key}`, network: v.network, showPrice: false }));
  }
  return [{ ...base, id: c.symbol, network: c.network ?? NETWORKS[c.symbol] ?? `${c.name} Network`, showPrice: !stable }];
});

// Used only when live prices can't be loaded
export const SAMPLE_PRICES = {
  bitcoin: 67420.18, ethereum: 3480.52, litecoin: 84.12, solana: 172.4, tether: 1, monero: 168.35,
};

export function usePrices() {
  const [prices, setPrices] = useState(SAMPLE_PRICES);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let dead = false;
    const ids = COINS.map((c) => c.coingeckoId).join(",");
    const pull = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
        if (!res.ok) throw new Error("bad response");
        const d = await res.json();
        const next = {};
        for (const c of COINS) if (d[c.coingeckoId]?.usd != null) next[c.coingeckoId] = d[c.coingeckoId].usd;
        if (!dead && Object.keys(next).length) { setPrices((p) => ({ ...p, ...next })); setLive(true); }
      } catch { /* keep sample prices */ }
    };
    pull();
    const t = setInterval(pull, 60000);
    return () => { dead = true; clearInterval(t); };
  }, []);

  return { prices, live };
}

export const toCrypto = (usd, price) => usd / price;

export const fmtCrypto = (n, opt) => {
  const d = opt.stable ? 2 : n >= 100 ? 4 : n >= 1 ? 6 : 8;
  return n.toFixed(d);
};

export const fmtRate = (price) =>
  "$" + (price >= 1000 ? Math.round(price).toLocaleString("en-US") : price.toFixed(2));
