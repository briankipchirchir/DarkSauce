import { useMemo } from "react";

/* ---------- Coin logos (64x64, flat colors, no external files) ---------- */
const COINS = {
  btc: (
    <>
      <circle cx="32" cy="32" r="30" fill="#F7931A" stroke="none" />
      <g transform="rotate(14 32 32)" fill="#fff" stroke="none">
        <path
          fillRule="evenodd"
          d="M22 18H35C40 18 43 21 43 25C43 28 41.5 30 39 31C42.5 32 45 34.5 45 38.5C45 43.5 41 46 36 46H22Z
             M29 24H34C36 24 37 25 37 26.5C37 28 36 29 34 29H29Z
             M29 35H35C37.5 35 38.5 36.2 38.5 37.7C38.5 39.2 37.5 40.5 35 40.5H29Z"
        />
        <rect x="27" y="12.5" width="3" height="6" />
        <rect x="33" y="12.5" width="3" height="6" />
        <rect x="27" y="45.5" width="3" height="6" />
        <rect x="33" y="45.5" width="3" height="6" />
      </g>
    </>
  ),
  eth: (
    <>
      <circle cx="32" cy="32" r="30" fill="#627EEA" stroke="none" />
      <path d="M32 13L20 33L32 39.5L44 33Z" fill="#fff" stroke="none" />
      <path d="M32 42.5L20 35.8L32 51L44 35.8Z" fill="#fff" fillOpacity=".75" stroke="none" />
    </>
  ),
  usdt: (
    <>
      <circle cx="32" cy="32" r="30" fill="#26A17B" stroke="none" />
      <rect x="17" y="17" width="30" height="7" rx="1" fill="#fff" stroke="none" />
      <rect x="28.5" y="24" width="7" height="25" fill="#fff" stroke="none" />
      <ellipse cx="32" cy="31" rx="15" ry="4.2" fill="none" stroke="#26A17B" strokeWidth="3" />
      <ellipse cx="32" cy="31" rx="15" ry="4.2" fill="none" stroke="#fff" strokeWidth="1.4" />
    </>
  ),
  ltc: (
    <>
      <circle cx="32" cy="32" r="30" fill="#345D9D" stroke="none" />
      <g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M29 15L23.5 42H43" />
        <path d="M20.5 34L36 27.5" />
      </g>
    </>
  ),
  sol: (
    <>
      <defs>
        <linearGradient id="solg" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#9945FF" />
          <stop offset="1" stopColor="#14F195" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#14111C" stroke="none" />
      <g fill="url(#solg)" stroke="none">
        <path d="M20 18H47L43.5 24H16.5Z" />
        <path d="M16.5 28.5H43.5L47 34.5H20Z" />
        <path d="M20 39H47L43.5 45H16.5Z" />
      </g>
    </>
  ),
  xmr: (
    <>
      <circle cx="32" cy="32" r="30" fill="#FF6600" stroke="none" />
      <path d="M13 43H51A19 19 0 0 1 13 43Z" fill="#4C4C4C" stroke="none" />
      <path d="M19 41V23L32 36L45 23V41" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

/* ---------- Outline icons (24x24) ---------- */
const LINES = {
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3Z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M16 7l3 3M14 9l2 2" />
    </>
  ),
};

const GLOW = {
  btc: "rgba(247,147,26,.55)",
  eth: "rgba(98,126,234,.55)",
  usdt: "rgba(38,161,123,.55)",
  ltc: "rgba(52,93,157,.6)",
  sol: "rgba(153,69,255,.55)",
  xmr: "rgba(255,102,0,.55)",
  line: "rgba(74,222,128,.55)",
};

const ICON_ORDER = ["btc", "eth", "btc", "sol", "xmr", "btc", "usdt", "ltc", "btc", "shield", "eth", "btc", "xmr", "lock", "sol", "btc", "ltc", "key", "btc", "usdt"];

const WORDS = [
  "BTC/USD 67,420.18",
  "SHA-256",
  "0.00421 BTC",
  "BLOCKCHAIN",
  "Block #873,206",
  "bc1q…x4nz",
  "TRUSTLESS",
  "Hash rate 612 EH/s",
  "Confirmations 6/6",
  "Wallet encrypted",
  "Escrow secured",
  "Cold storage",
  "0x7f3a…c9e1",
  "Mempool",
  "256-bit",
  "P2P",
  "XMR ring size 16",
  "LTC 84.12",
  "SOL 172.40",
  "Zero-knowledge",
];

// seeded random: layout stays stable between renders
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function DriftingIcons({ icons = 22, words = 12 }) {
  const items = useMemo(() => {
    const r = rng(11);
    const out = [];

    for (let i = 0; i < icons; i++) {
      const depth = r();
      const dur = 46 - depth * 26 + r() * 8;
      out.push({
        key: `i${i}`,
        type: "icon",
        kind: ICON_ORDER[i % ICON_ORDER.length],
        size: 30 + depth * 80,
        y: 4 + ((i * 0.618) % 1) * 86,
        dur,
        delay: -r() * dur,
        bob: 5 + r() * 5,
        op: 0.55 + depth * 0.4,
        hideSm: i % 2 === 1,
      });
    }

    for (let i = 0; i < words; i++) {
      const depth = r();
      const dur = 52 - depth * 22 + r() * 10;
      const text = WORDS[(i * 5) % WORDS.length];
      out.push({
        key: `w${i}`,
        type: "word",
        text,
        amber: /BTC|bc1|Block/.test(text),
        size: 12 + depth * 9,
        y: 6 + (((i + 0.5) * 0.618) % 1) * 86,
        dur,
        delay: -r() * dur,
        op: 0.4 + depth * 0.45,
        hideSm: i % 2 === 0,
      });
    }
    return out;
  }, [icons, words]);

  return (
    <div className="drift" aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.key}
          className={[
            "drift-item",
            it.type === "word" ? "drift-word" : "drift-icon",
            it.amber ? "amber" : "",
            it.hideSm ? "hide-sm" : "",
          ].join(" ")}
          style={{
            "--y": `${it.y}vh`,
            "--size": `${it.size}px`,
            "--dur": `${it.dur}s`,
            "--delay": `${it.delay}s`,
            "--bob": `${it.bob ?? 6}s`,
            "--op": it.op,
            "--glow": it.type === "icon" ? (GLOW[it.kind] ?? GLOW.line) : undefined,
          }}
        >
          {it.type === "word" ? (
            it.text
          ) : COINS[it.kind] ? (
            <svg viewBox="0 0 64 64">{COINS[it.kind]}</svg>
          ) : (
            <svg viewBox="0 0 24 24" className="line">{LINES[it.kind]}</svg>
          )}
        </span>
      ))}
    </div>
  );
}
