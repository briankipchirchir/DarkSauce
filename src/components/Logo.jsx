export default function Logo({ size = 76 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" role="img" aria-label="Darksauce logo">
      <defs>
        <linearGradient id="hood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fe3b4" />
          <stop offset="1" stopColor="#3fae78" />
        </linearGradient>
      </defs>
      <path d="M32 5c-10 0-17 7-17 17 0 4 1 7 3 10-6 3-10 9-10 17h48c0-8-4-14-10-17 2-3 3-6 3-10C49 12 42 5 32 5Z"
        fill="url(#hood)" stroke="#16a34a" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="32" cy="22" rx="9.5" ry="11" fill="#0a1a12" />
      <text x="32" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="#4ade80" fontFamily="Inter, sans-serif">?</text>
      <circle cx="32" cy="48" r="8" fill="#0a1a12" stroke="#4ade80" strokeWidth="2" />
      <text x="32" y="53" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4ade80" fontFamily="Inter, sans-serif">₿</text>
    </svg>
  );
}
