// ============================================================================
//  DARKSAUCE catalogue
//  Everything the shop shows (coins, categories, products) lives in this file.
//
//  Pictures: put the files in  public/images/...  and use the path below.
//    public/images/products/    product photos      (jpg, png, webp, svg)
//    public/images/categories/  category icons      (svg or png)
//    public/images/coins/       coin logos          (svg or png)
//  If a picture is missing, the shop shows a built-in icon instead, so you
//  can add pictures a few at a time.
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
//  CATEGORIES
//   id     used by products below (category: "software")
//   label  shown to customers
//   image  picture path (optional)
//   icon   built-in fallback: code, gift, book, chip, tool, layers, shield,
//          lock, bolt, trophy, refresh, orders, wallet, coin, dollar
// ---------------------------------------------------------------------------
export const CATEGORIES = [
  { id: "software",   label: "Software",   icon: "code", image: categoryImg("software.svg") },
  { id: "gift-cards", label: "Gift cards", icon: "gift", image: categoryImg("gift-cards.svg") },
  { id: "guides",     label: "Guides",     icon: "book", image: categoryImg("guides.svg") },
  { id: "hardware",   label: "Hardware",   icon: "chip", image: categoryImg("hardware.svg") },
  { id: "services",   label: "Services",   icon: "tool", image: categoryImg("services.svg") },
];

// ---------------------------------------------------------------------------
//  PRODUCTS
//   id           unique number
//   name         shown on the card, cart and orders
//   category     one of the category ids above
//   price        in USD
//   image        picture path (optional)
//   imageFit     "cover" fills the frame (photos), "contain" shows the whole
//                picture (logos / transparent images). Default: "cover"
//   description  one or two lines under the name (optional)
//   stock        number in stock; 0 shows "Sold out" (optional)
//   badge        small label on the picture, e.g. "New" (optional)
// ---------------------------------------------------------------------------
export const PRODUCTS = [
  { id: 1,  name: "Password manager, 1 year",      category: "software",   price: 29,  image: productImg("password-manager.jpg"), imageFit: "cover", description: "Store and autofill your logins on all your devices.", stock: 50, badge: "Popular" },
  { id: 2,  name: "VPN subscription, 12 months",   category: "software",   price: 49,  image: productImg("vpn.jpg"),              imageFit: "cover", description: "Encrypted connection for up to five devices.",       stock: 50 },
  { id: 3,  name: "Encrypted backup tool",         category: "software",   price: 39,  image: productImg("backup-tool.jpg"),      imageFit: "cover", description: "Automatic backups that only you can open.",          stock: 30, badge: "New" },
  { id: 4,  name: "Gift card $25",                 category: "gift-cards", price: 25,  image: productImg("gift-25.png"),          imageFit: "cover", description: "Delivered instantly after payment.",                 stock: 100 },
  { id: 5,  name: "Gift card $50",                 category: "gift-cards", price: 50,  image: productImg("gift-50.png"),          imageFit: "cover", description: "Delivered instantly after payment.",                 stock: 100 },
  { id: 6,  name: "Gift card $100",                category: "gift-cards", price: 100, image: productImg("gift-100.png"),         imageFit: "cover", description: "Delivered instantly after payment.",                 stock: 100 },
  { id: 7,  name: "Home network security guide",   category: "guides",     price: 12,  image: productImg("network-guide.jpg"),    imageFit: "cover", description: "Step-by-step guide to locking down your network.",   stock: 999 },
  { id: 8,  name: "Privacy basics handbook",       category: "guides",     price: 9,   image: productImg("privacy-handbook.jpg"), imageFit: "cover", description: "Plain-language guide to staying private online.",    stock: 999 },
  { id: 9,  name: "Hardware security key",         category: "hardware",   price: 45,  image: productImg("security-key.jpg"),     imageFit: "cover", description: "USB security key for two-factor sign-in.",           stock: 20 },
  { id: 10, name: "Encrypted USB drive 64GB",      category: "hardware",   price: 35,  image: productImg("usb-drive.jpg"),        imageFit: "cover", description: "Hardware-encrypted storage with PIN pad.",           stock: 15 },
  { id: 11, name: "Setup and onboarding session",  category: "services",   price: 60,  image: productImg("onboarding.jpg"),       imageFit: "cover", description: "One-to-one session to get you set up.",              stock: 10 },
  { id: 12, name: "Account security review",       category: "services",   price: 80,  image: productImg("security-review.jpg"),  imageFit: "cover", description: "We check your accounts and send a written report.",  stock: 10 },
];
