// ============================================================================
//  DARKSAUCE catalogue
//  Everything the shop shows (coins, categories, subcategories, products)
//  lives in this file.
//
//  Pictures: put the files in  public/images/...  and use the path below.
//    public/images/products/    product photos      (jpg, png, webp, svg)
//    public/images/categories/  category icons      (svg or png)
//    public/images/coins/       coin logos          (svg or png)
//  If a picture is missing, the shop shows a built-in icon instead, so you
//  can add pictures a few at a time.
//
//  EVERY product gets its own picture automatically: just save it as
//    public/images/products/<product id>.jpg      (1.jpg, 2.jpg ... 50.jpg)
//  A product with its own  image: ...  keeps using that file instead.
// ============================================================================

const productImg = (file) => `/images/products/${file}`;
const categoryImg = (file) => `/images/categories/${file}`;
const coinImg = (file) => `/images/coins/${file}`;

// ---------------------------------------------------------------------------
//  COINS
//   symbol      shown in the ticker, top-up and notes
//   coingeckoId used to fetch the live price
//   logo        picture path (optional)
//   accepted    true = can be used to top up the balance
// ---------------------------------------------------------------------------
export const COINS = [
  { symbol: "BTC",  name: "Bitcoin",  coingeckoId: "bitcoin",  logo: coinImg("btc.svg"),  accepted: true },
  { symbol: "ETH",  name: "Ethereum", coingeckoId: "ethereum", logo: coinImg("eth.svg"),  accepted: false },
  { symbol: "LTC",  name: "Litecoin", coingeckoId: "litecoin", logo: coinImg("ltc.svg"),  accepted: true },
  { symbol: "SOL",  name: "Solana",   coingeckoId: "solana",   logo: coinImg("sol.svg"),  accepted: true },
  { symbol: "USDT", name: "Tether",   coingeckoId: "tether",   logo: coinImg("usdt.svg"), accepted: true },
  { symbol: "XMR",  name: "Monero",   coingeckoId: "monero",   logo: coinImg("xmr.svg"),  accepted: true },
];

export const ACCEPTED_COINS = COINS.filter((c) => c.accepted);

// ---------------------------------------------------------------------------
//  CATEGORIES (each has subcategories that customers pick before the products)
//   id             used by products below (category: "software")
//   label          shown to customers
//   image          picture path (optional)
//   icon           built-in fallback: code, gift, book, chip, tool, layers,
//                  shield, lock, bolt, trophy, refresh, orders, wallet, coin, dollar
//   subcategories  [{ id, label, icon }]  products point at these with  sub: "id"
//                  (a category with no subcategories goes straight to products)
// ---------------------------------------------------------------------------
export const CATEGORIES = [
  {
    id: "software", label: "Software", icon: "code", image: categoryImg("software.svg"),
    subcategories: [
      { id: "password-managers", label: "Password managers", icon: "lock" },
      { id: "vpn",               label: "VPN",               icon: "shield" },
      { id: "backup",            label: "Backup and storage", icon: "refresh" },
      { id: "antivirus",         label: "Antivirus",         icon: "bolt" },
    ],
  },
  {
    id: "gift-cards", label: "Gift cards", icon: "gift", image: categoryImg("gift-cards.svg"),
    subcategories: [
      { id: "shopping",  label: "Shopping",  icon: "orders" },
      { id: "gaming",    label: "Gaming",    icon: "bolt" },
      { id: "streaming", label: "Streaming", icon: "trophy" },
    ],
  },
  {
    id: "guides", label: "Guides", icon: "book", image: categoryImg("guides.svg"),
    subcategories: [
      { id: "network",  label: "Network security", icon: "shield" },
      { id: "privacy",  label: "Privacy",          icon: "lock" },
      { id: "accounts", label: "Account safety",   icon: "book" },
    ],
  },
  {
    id: "hardware", label: "Hardware", icon: "chip", image: categoryImg("hardware.svg"),
    subcategories: [
      { id: "security-keys", label: "Security keys", icon: "lock" },
      { id: "storage",       label: "Encrypted storage", icon: "chip" },
      { id: "network-gear",  label: "Network gear", icon: "layers" },
      { id: "accessories",   label: "Accessories", icon: "tool" },
    ],
  },
  {
    id: "services", label: "Services", icon: "tool", image: categoryImg("services.svg"),
    subcategories: [
      { id: "setup",   label: "Setup and onboarding", icon: "tool" },
      { id: "audits",  label: "Security audits",      icon: "shield" },
      { id: "support", label: "Support plans",        icon: "refresh" },
    ],
  },
];

// ---------------------------------------------------------------------------
//  PRODUCTS
//   P(id, name, category, sub, price, { ...optional fields })
//
//   id           unique number
//   name         shown on the card, cart and orders
//   category     one of the category ids above
//   sub          one of that category's subcategory ids
//   price        in USD
//   image        picture path. Default: public/images/products/<id>.jpg
//   imageFit     "cover" fills the frame (photos), "contain" shows the whole
//                picture (logos / transparent images). Default: "cover"
//   description  one or two lines under the name (optional)
//   stock        number in stock; 0 shows "Sold out" (default 50)
//   badge        small label on the picture, e.g. "New" (optional)
//   balance      optional. If set, the card shows BOTH "Balance $X" and
//                "Price $Y" (for prepaid items like gift cards).
//                If left out, the card shows only the price.
//                Example:  balance: 100   (price 90, balance 100)
// ---------------------------------------------------------------------------
const P = (id, name, category, sub, price, extra = {}) => ({
  id, name, category, sub, price,
  image: productImg(`${id}.jpg`),
  imageFit: "cover", stock: 50, ...extra,
});

export const PRODUCTS = [
  // ---- Software / Password managers ----
  P(1,  "Password manager, 1 year",         "software", "password-managers", 29,  { image: productImg("password-manager.jpg"), description: "Store and autofill your logins on all your devices.", badge: "Popular" }),
  P(13, "Password manager family plan",     "software", "password-managers", 59,  { description: "Six separate vaults with shared folders, for one year." }),
  P(14, "Password manager business, 5 seats", "software", "password-managers", 119, { description: "Team sharing, admin controls and activity logs." }),

  // ---- Software / VPN ----
  P(15, "VPN subscription, 1 month",        "software", "vpn", 7,  { description: "Try it for a month. Up to five devices." }),
  P(2,  "VPN subscription, 12 months",      "software", "vpn", 49, { image: productImg("vpn.jpg"), description: "Encrypted connection for up to five devices." }),
  P(16, "VPN subscription, 24 months",      "software", "vpn", 79, { description: "Our lowest monthly price.", badge: "Best value" }),

  // ---- Software / Backup and storage ----
  P(3,  "Encrypted backup tool",            "software", "backup", 39,  { image: productImg("backup-tool.jpg"), description: "Automatic backups that only you can open.", stock: 30, badge: "New" }),
  P(18, "Cloud backup 1TB, 1 year",         "software", "backup", 69,  { description: "Encrypted cloud storage with version history." }),
  P(19, "Cloud backup 5TB, 1 year",         "software", "backup", 149, { description: "Room for whole libraries, with file recovery." }),

  // ---- Software / Antivirus ----
  P(20, "Antivirus, 1 device, 1 year",      "software", "antivirus", 19, { description: "Real-time protection for one computer." }),
  P(21, "Antivirus, 5 devices, 1 year",     "software", "antivirus", 39, { description: "Covers computers and phones.", badge: "Popular" }),
  P(22, "Antivirus, 10 devices, 1 year",    "software", "antivirus", 59, { description: "Protection for the whole household." }),

  // ---- Gift cards / Shopping (these have a balance, so they show Balance + Price) ----
  P(4,  "Shopping gift card $25",           "gift-cards", "shopping", 25,  { image: productImg("gift-25.png"),  description: "Delivered instantly after payment.", stock: 100, balance: 25 }),
  P(5,  "Shopping gift card $50",           "gift-cards", "shopping", 50,  { image: productImg("gift-50.png"),  description: "Delivered instantly after payment.", stock: 100, balance: 50 }),
  P(6,  "Shopping gift card $100",          "gift-cards", "shopping", 100, { image: productImg("gift-100.png"), description: "Delivered instantly after payment.", stock: 100, balance: 100 }),

  // ---- Gift cards / Gaming ----
  P(23, "Gaming gift card $25",             "gift-cards", "gaming", 25,  { image: productImg("gaming-25.png"),  description: "Credit for games and add-ons.", stock: 100, balance: 25 }),
  P(24, "Gaming gift card $50",             "gift-cards", "gaming", 50,  { image: productImg("gaming-50.png"),  description: "Credit for games and add-ons.", stock: 100, balance: 50 }),
  P(25, "Gaming gift card $100",            "gift-cards", "gaming", 100, { image: productImg("gaming-100.png"), description: "Credit for games and add-ons.", stock: 100, balance: 100 }),

  // ---- Gift cards / Streaming ----
  P(26, "Streaming gift card $15",          "gift-cards", "streaming", 15, { image: productImg("streaming-15.png"), description: "About one month of streaming.", stock: 100, balance: 15 }),
  P(27, "Streaming gift card $30",          "gift-cards", "streaming", 30, { image: productImg("streaming-30.png"), description: "About two months of streaming.", stock: 100, balance: 30 }),
  P(28, "Streaming gift card $60",          "gift-cards", "streaming", 60, { image: productImg("streaming-60.png"), description: "About four months of streaming.", stock: 100, balance: 60 }),

  // ---- Guides / Network security ----
  P(7,  "Home network security guide",      "guides", "network", 12, { image: productImg("network-guide.jpg"), description: "Step-by-step guide to locking down your network.", stock: 999 }),
  P(29, "Router hardening checklist",       "guides", "network", 6,  { description: "A one-page checklist you can finish in an evening.", stock: 999 }),
  P(30, "Wi-Fi security for small offices", "guides", "network", 14, { description: "Guest networks, passwords and device rules.", stock: 999 }),

  // ---- Guides / Privacy ----
  P(8,  "Privacy basics handbook",          "guides", "privacy", 9, { image: productImg("privacy-handbook.jpg"), description: "Plain-language guide to staying private online.", stock: 999 }),
  P(31, "Browser privacy settings guide",   "guides", "privacy", 7, { description: "The settings worth changing in every major browser.", stock: 999 }),
  P(32, "Messaging and email privacy guide", "guides", "privacy", 8, { description: "Choosing and configuring private communication.", stock: 999 }),

  // ---- Guides / Account safety ----
  P(33, "Two-factor authentication guide",  "guides", "accounts", 6, { description: "Set up 2FA on your important accounts.", stock: 999 }),
  P(34, "Account recovery planning guide",  "guides", "accounts", 7, { description: "Make sure you never get locked out for good.", stock: 999 }),
  P(35, "Spotting phishing: a practical guide", "guides", "accounts", 9, { description: "Real examples and what to check before you click.", stock: 999 }),

  // ---- Hardware / Security keys ----
  P(9,  "Hardware security key",            "hardware", "security-keys", 45, { image: productImg("security-key.jpg"), description: "USB security key for two-factor sign-in.", stock: 20 }),
  P(36, "Security key, USB-C and NFC",      "hardware", "security-keys", 59, { description: "Works with computers and phones.", stock: 20, badge: "New" }),
  P(37, "Security key 2-pack",              "hardware", "security-keys", 79, { description: "One to use, one safely stored as backup.", stock: 20 }),

  // ---- Hardware / Encrypted storage ----
  P(10, "Encrypted USB drive 64GB",         "hardware", "storage", 35,  { image: productImg("usb-drive.jpg"), description: "Hardware-encrypted storage with PIN pad.", stock: 15 }),
  P(38, "Encrypted USB drive 128GB",        "hardware", "storage", 55,  { description: "More room, same PIN-pad protection.", stock: 15 }),
  P(39, "Encrypted portable SSD 1TB",       "hardware", "storage", 119, { description: "Fast external drive with hardware encryption.", stock: 10 }),

  // ---- Hardware / Network gear ----
  P(40, "Secure Wi-Fi router, WPA3",        "hardware", "network-gear", 89,  { description: "Modern encryption and automatic updates.", stock: 12 }),
  P(41, "Hardware firewall appliance",      "hardware", "network-gear", 149, { description: "Small-office firewall with a simple dashboard.", stock: 8 }),

  // ---- Hardware / Accessories ----
  P(42, "Webcam cover, 3-pack",             "hardware", "accessories", 8,  { description: "Slide covers that fit laptops and monitors.", stock: 200 }),
  P(43, "Privacy screen filter, 15 inch",   "hardware", "accessories", 25, { description: "Keeps your screen readable only from the front.", stock: 40 }),

  // ---- Services / Setup and onboarding ----
  P(11, "Setup and onboarding session",     "services", "setup", 60, { image: productImg("onboarding.jpg"), description: "One-to-one session to get you set up.", stock: 10 }),
  P(44, "Password manager migration help",  "services", "setup", 40, { description: "We move your logins across and clean up duplicates.", stock: 10 }),
  P(45, "Device hardening session",         "services", "setup", 75, { description: "We secure one computer or phone with you, live.", stock: 10 }),

  // ---- Services / Security audits ----
  P(12, "Account security review",          "services", "audits", 80,  { image: productImg("security-review.jpg"), description: "We check your accounts and send a written report.", stock: 10 }),
  P(46, "Home network audit",               "services", "audits", 120, { description: "We review your router, devices and settings.", stock: 8 }),
  P(47, "Small business security audit",    "services", "audits", 250, { description: "A full review with a prioritised action plan.", stock: 5 }),

  // ---- Services / Support plans ----
  P(48, "Monthly support plan",             "services", "support", 30, { description: "Email support for security questions, one month.", stock: 25 }),
  P(49, "Priority support, 3 months",       "services", "support", 90, { description: "Faster replies and one video call per month.", stock: 15 }),
  P(50, "Account recovery assistance",      "services", "support", 55, { description: "Help working through locked-out account recovery.", stock: 10 }),
];