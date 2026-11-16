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
  { symbol: "BTC",  name: "Bitcoin",  coingeckoId: "bitcoin",  logo: coinImg("btc.png"),  accepted: true },
  { symbol: "ETH",  name: "Ethereum", coingeckoId: "ethereum", logo: coinImg("ethere.png"),  accepted: false },
  { symbol: "LTC",  name: "Litecoin", coingeckoId: "litecoin", logo: coinImg("lol.png"),  accepted: true },
  { symbol: "SOL",  name: "Solana",   coingeckoId: "solana",   logo: coinImg("solana.png"),  accepted: true },
  { symbol: "USDT", name: "Tether",   coingeckoId: "tether",   logo: coinImg("tet.png"), accepted: true },
  { symbol: "XMR",  name: "Monero",   coingeckoId: "monero",   logo: coinImg("monero.png"),  accepted: true },
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
      id: "USA BANK LOGS", label: "USA BANK LOGS", icon: "layers", image: categoryImg("usaFlag.png"),
  subcategories: [
    { id: "CITI BANK", label: "CITI BANK", icon: "layers" },
      { id: "WELLS FARGO BANK", label: "WELLS FARGO BANK", icon: "shield" },
      { id: "CHIME",            label: "CHIME", icon: "refresh" },
      { id: "CHASE",         label: "CHASE",         icon: "bolt" },
      { id: "BANK OF AMERICA",         label: "BANK OF AMERICA",         icon: "bolt" },
       { id: "HUNTINGTON BANK",         label: " HUNTINGTON BANK",         icon: "bolt" },
        { id: "PNC BANK",         label: " PNC BANK",         icon: "bolt" },
         { id: "USAA BANK",         label: "USAA BANK",         icon: "bolt" },
    ],
  },
   {
      id: "UK BANK LOGS", label: "UK BANK LOGS", icon: "layers", image: categoryImg("ukflag.png"),
  subcategories: [
      { id: "HSBC BANK", label: "HSBC BANK", icon: "layers" },
      { id: "BARCLAYS BANK", label: "BARCLAYS BANK", icon: "shield" },
      { id: "LLOYDS BANK",            label: "LLOYDS BANK", icon: "refresh" },
      { id: "NATWEST BANK",         label: "NATWEST BANK",         icon: "bolt" },
      { id: "SANTANDER UK",         label: "SANTANDER UK",         icon: "bolt" },
      { id: "NATIONWIDE",         label: " NATIONWIDE",         icon: "bolt" },
    ],
  },
   {
      id: "CANADIAN LOGS", label: "CANADIAN LOGS", icon: "layers", image: categoryImg("can.png"),
  subcategories: [
      { id: "CANADIAN IMPERIAL BANK OF COMMERCE", label: "CANADIAN IMPERIAL BANK OF COMMERCE", icon: "layers" },
      { id: "RBC (ROYAL BANK OF CANADA)", label: "RBC (ROYAL BANK OF CANADA)", icon: "shield" },
      { id: "TD BANK (TORONTO-DOMINION)",            label: "TD BANK (TORONTO-DOMINION)", icon: "refresh" },
      { id: "SCOTIABANK (BANK OF NOVA SCOTIA)",         label: "SCOTIABANK (BANK OF NOVA SCOTIA)",         icon: "bolt" },
      { id: "BMO (BANK OF MONTREAL)",         label: "BMO (BANK OF MONTREAL)",         icon: "bolt" },
      { id: "NATIONAL BANK OF CANADA",         label: "NATIONAL BANK OF CANADA",         icon: "bolt" },
    ],
  },

    {
      id: "PAYPAL_CASHAPP", label: "PAYPAL_CASHAPP", icon: "layers", image: categoryImg("paypal.png"),
  subcategories: [
      { id: "PAYPAL LOGS", label: "PAYPAL LOGS", icon: "layers" },
      { id: "CASHAPP LOGS", label: "CASHAPP LOGS", icon: "shield" },
      { id: "CASHAPP AGED ACCOUNTS",  label: "CASHAPP AGED ACCOUNTS", icon: "refresh" },
      { id: "VERIFIED PAYPAL ACCOUNTS",         label: "VERIFIED PAYPAL ACCOUNTS",         icon: "bolt" },
    ],
  },

    {
      id: "EGIFT CARDS", label: "EGIFT CARDS", icon: "layers", image: categoryImg("gift.png"),
  subcategories: [
      { id: "EGIFT CARDS", label: "EGIFT CARDS", icon: "layers" },
    ],
  },
  {
    id: "NETWORK & PRIVACY TOOLS", label: "NETWORK & PRIVACY TOOLS", icon: "book", image: categoryImg("PRIVA.png"),
    subcategories: [
      { id: "PROXY SERVICES",  label: "PROXY SERVICES", icon: "shield" },
      { id: "PREMIUM VPNS",  label: "PREMIUM VPNS",          icon: "lock" },
    ],
  },
  {
    id: "CLONE CARDS", label: "CLONE CARDS", icon: "chip", image: categoryImg("MASTER.png"),
    subcategories: [
      { id: " USA CLONE CARDS", label: "USA Clone Cards", icon: "lock" },
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
  P(1,  "CITI BANK",         "USA BANK LOGS", "CITI BANK", 29,  { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...", badge: "Popular",balance: 1500 }),
  P(13, "CITI BANK",     "USA BANK LOGS", "CITI BANK", 59, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 1900 }),
  P(14, "CITI BANK", "USA BANK LOGS", "CITI BANK", 119, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 2500 }),
  P(10,  "CITI BANK",         "USA BANK LOGS", "CITI BANK", 29,  { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...", badge: "Popular",balance: 2200 }),
  P(15, "CITI BANK",     "USA BANK LOGS", "CITI BANK", 59, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 5000 }),
  P(16, "CITI BANK", "USA BANK LOGS", "CITI BANK", 119, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 3500 }),
    P(17,  "CITI BANK",         "USA BANK LOGS", "CITI BANK", 29,  { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...", badge: "Popular",balance: 7000 }),
  P(20, "CITI BANK",     "USA BANK LOGS", "CITI BANK", 59, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 4200 }),
  P(19, "CITI BANK", "USA BANK LOGS", "CITI BANK", 119, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 3700 }),
    P(18,  "CITI BANK",         "USA BANK LOGS", "CITI BANK", 29,  { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...", badge: "Popular",balance: 4900 }),
  P(21, "CITI BANK",     "USA BANK LOGS", "CITI BANK", 59, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 4100 }),
  P(6, "CITI BANK", "USA BANK LOGS", "CITI BANK", 119, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 1500 }),
  // ---- Software / VPN ----
  P(111, "WELLS FARGO BANK",        "USA BANK LOGS", "WELLS FARGO BANK", 7,  {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 1500 }),
  P(102,  "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 49, { image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 1500 }),
  P(160, "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 79, {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...", badge: "Best value",balance: 1500 }),
  P(100, "WELLS FARGO BANK",        "USA BANK LOGS", "WELLS FARGO BANK", 7,  {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 1500 }),
  P(103,  "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 49, { image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 1500 }),
  P(161, "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 79, {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...", badge: "Best value",balance: 1500 }),
  P(107, "WELLS FARGO BANK",        "USA BANK LOGS", "WELLS FARGO BANK", 7,  {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 1500 }),
  P(198,  "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 49, { image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 1500 }),
  P(145, "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 79, {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...", badge: "Best value",balance: 1500 }),


  P(1111, "CHIME",        "USA BANK LOGS", "CHIME", 7,  {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 1500 }),
  P(1021,  "CHIME",      "USA BANK LOGS", "CHIME", 49, { image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 1500 }),
  P(1601, "CHIME",      "USA BANK LOGS", "CHIME", 79, {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...", badge: "Best value",balance: 1500 }),
  P(1001, "CHIME",        "USA BANK LOGS", "CHIME", 7,  {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 1500 }),
  P(1031,  "CHIME",      "USA BANK LOGS", "CHIME", 49, { image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 1500 }),
  P(1611, "CHIME",      "USA BANK LOGS", "CHIME", 79, {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...", badge: "Best value",balance: 1500 }),
  P(1071, "CHIME",        "USA BANK LOGS", "CHIME", 7,  {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 1500 }),
  P(1981,  "CHIME",      "USA BANK LOGS", "CHIME", 49, { image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 1500 }),
  P(145, "CHIME",      "USA BANK LOGS", "CHIME", 79, {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...", badge: "Best value",balance: 1500 }),

  P(11111, "CHASE",        "USA BANK LOGS", "CHASE", 7,  {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(10211,  "CHASE",      "USA BANK LOGS", "CHASE", 49, { image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(16011, "CHASE",      "USA BANK LOGS", "CHASE", 79, {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),
  P(10011, "CHASE",        "USA BANK LOGS", "CHASE", 7,  {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(10311,  "CHASE",      "USA BANK LOGS", "CHASE", 49, { image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(16111, "CHASE",      "USA BANK LOGS", "CHASE", 79, {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),
  P(10711, "CHASE",        "USA BANK LOGS", "CHASE", 7,  {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(19811,  "CHASE",      "USA BANK LOGS", "CHASE", 49, { image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(1451, "CHASE",      "USA BANK LOGS", "CHASE", 79, {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),

  P(11112, "BANK OF AMERICA",        "USA BANK LOGS", "BANK OF AMERICA", 7,  {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(10212,  "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 49, { image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(16012, "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 79, {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),
  P(10012, "BANK OF AMERICA",        "USA BANK LOGS", "BANK OF AMERICA", 7,  {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(10312,  "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 49, { image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(16112, "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 79, {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),
  P(10712, "BANK OF AMERICA",        "USA BANK LOGS", "BANK OF AMERICA", 7,  {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(19812,  "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 49, { image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(14512, "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 79, {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),

  P(11113, "HUNTINGTON BANK",        "USA BANK LOGS", "HUNTINGTON BANK", 7,  {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(10213,  "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 49, { image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(16013, "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 79, {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),
  P(10013, "HUNTINGTON BANK",        "USA BANK LOGS", "HUNTINGTON BANK", 7,  {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(10313,  "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 49, { image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(16113, "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 79, {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),
  P(10713, "HUNTINGTON BANK",        "USA BANK LOGS", "HUNTINGTON BANK", 7,  {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(19813,  "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 49, { image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(14513, "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 79, {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),


  P(11116, "PNC BANK",        "USA BANK LOGS", "PNC BANK", 7,  {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(10218,  "PNC BANK",      "USA BANK LOGS", "PNC BANK", 49, { image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(16016, "PNC BANK",      "USA BANK LOGS", "PNC BANK", 79, {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(10016, "PNC BANK",        "USA BANK LOGS", "PNC BANK", 7,  {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(10316,  "PNC BANK",      "USA BANK LOGS", "PNC BANK", 49, { image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(16116, "PNC BANK",      "USA BANK LOGS", "PNC BANK", 79, {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(10716, "PNC BANK",        "USA BANK LOGS", "PNC BANK", 7,  {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(19816,  "PNC BANK",      "USA BANK LOGS", "PNC BANK", 49, { image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(14516, "PNC BANK",      "USA BANK LOGS", "PNC BANK", 79, {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),


  P(11117, "USAA BANK",        "USA BANK LOGS", "USAA BANK", 7,  {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 1500 }),
  P(10217,  "USAA BANK",      "USA BANK LOGS", "USAA BANK", 49, { image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 1500 }),
  P(16017, "USAA BANK",      "USA BANK LOGS", "USAA BANK", 79, {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle", badge: "Best value",balance: 1500 }),
  P(10017, "USAA BANK",        "USA BANK LOGS", "USAA BANK", 7,  {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 1500 }),
  P(10317,  "USAA BANK",      "USA BANK LOGS", "USAA BANK", 49, { image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 1500 }),
  P(16117, "USAA BANK",      "USA BANK LOGS", "USAA BANK", 79, {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle", badge: "Best value",balance: 1500 }),
  P(10717, "USAA BANK",        "USA BANK LOGS", "USAA BANK", 7,  {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 1500 }),
  P(19817,  "USAA BANK",      "USA BANK LOGS", "USAA BANK", 49, { image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 1500 }),
  P(14517, "USAA BANK",      "USA BANK LOGS", "USAA BANK", 79, {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle", badge: "Best value",balance: 1500 }),




  P(11100, "NATIONWIDE",        "UK BANK LOGS", "NATIONWIDE", 7,  {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(10200,  "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 49, { image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(16000, "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 79, {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 1500 }),
  P(10000, "NATIONWIDE",        "UK BANK LOGS", "NATIONWIDE", 7,  {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(10300,  "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 49, { image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(16100, "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 79, {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 1500 }),

  P(10700, "NATIONWIDE",        "UK BANK LOGS", "NATIONWIDE", 7,  {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(19800,  "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 49, { image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(14500, "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 79, {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 1500 }),


  P(111100, "HSBC BANK",        "UK BANK LOGS", "HSBC BANK", 7,  {image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(102100,  "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 49, { image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(160100, "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 79, {image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 1500 }),
  P(100100, "HSBC BANK",        "UK BANK LOGS", "HSBC BANK", 7,  {image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(103100,  "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 49, { image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(161100, "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 79, {image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 1500 }),
  P(107100, "HSBC BANK",        "UK BANK LOGS", "HSBC BANK", 7,  {image: productImg("hsbc.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 1500 }),
  P(198100,  "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 49, { image: productImg("hsbc.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 1500 }),
  P(145000, "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 79, {image: productImg("hsbc.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...", badge: "Best value",balance: 1500 }),

  P(1111100, "BARCLAYS BANK",        "UK BANK LOGS", "BARCLAYS BANK", 7,  {image: productImg("barclays.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(1021100,  "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 49, { image: productImg("barclays.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(1601100, "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 79, {image: productImg("barclays.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),
  P(1001100, "BARCLAYS BANK",        "UK BANK LOGS", "BARCLAYS BANK", 7,  {image: productImg("barclays.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(1031100,  "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 49, { image: productImg("barclays.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(1611100, "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 79, {image: productImg("barclays.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),
  P(1071100, "BARCLAYS BANK",        "UK BANK LOGS", "BARCLAYS BANK", 7,  {image: productImg("barclays.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(1981100,  "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 49, { image: productImg("barclays.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(1451000, "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 79, {image: productImg("barclays.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),

  P(1111200, "LLOYDS BANK",        "UK BANK LOGS", "LLOYDS BANK", 7,  {image: productImg("lloyd.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(1021200,  "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 49, { image: productImg("lloyd.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(1601200, "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 79, {image: productImg("lloyd.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),
  P(1001200, "LLOYDS BANK",        "UK BANK LOGS", "LLOYDS BANK", 7,  {image: productImg("lloyd.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(1031200,  "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 49, { image: productImg("lloyd.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(1611200, "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 79, {image: productImg("lloyd.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),
  P(1071200, "LLOYDS BANK",        "UK BANK LOGS", "LLOYDS BANK", 7,  {image: productImg("lloyd.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(1981200,  "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 49, { image: productImg("lloyd.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(1451200, "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 79, {image: productImg("lloyd.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),

  P(1111300, "NATWEST BANK",        "UK BANK LOGS", "NATWEST BANK", 7,  {image: productImg("natwest.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(1021300,  "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 49, { image: productImg("natwest.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(1601300, "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 79, {image: productImg("natwest.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),
  P(1001300, "NATWEST BANK",        "UK BANK LOGS", "NATWEST BANK", 7,  {image: productImg("natwest.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(1031300,  "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 49, { image: productImg("natwest.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(1611300, "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 79, {image: productImg("natwest.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),
  P(1071300, "NATWEST BANK",        "UK BANK LOGS", "NATWEST BANK", 7,  {image: productImg("natwest.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(1981300,  "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 49, { image: productImg("natwest.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(1451300, "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 79, {image: productImg("natwest.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),


  P(1111600, "SANTANDER UK",        "UK BANK LOGS", "SANTANDER UK", 7,  {image: productImg("san.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1021800,  "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 49, { image: productImg("san.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(16016002, "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 79, {image: productImg("san.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(10016004, "SANTANDER UK",        "UK BANK LOGS", "SANTANDER UK", 7,  {image: productImg("san.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(10316005,  "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 49, { image: productImg("san.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1611600, "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 79, {image: productImg("san.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(1071600, "SANTANDER UK",        "UK BANK LOGS", "SANTANDER UK", 7,  {image: productImg("san.png"), description: "SANTANDER UK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1981600,  "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 49, { image: productImg("san.png"), description: "SANTANDER UK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1451600, "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 79, {image: productImg("san.png"), description: "SANTANDER UK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),


   P(111007, "CANADIAN IMPERIAL BANK OF COMMERCE",        "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 7,  {image: productImg("cibc.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(102007,  "CANADIAN IMPERIAL BANK OF COMMERCE",    "CANADIAN LOGS",  "CANADIAN IMPERIAL BANK OF COMMERCE", 49, { image: productImg("cibc.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(160007, "CANADIAN IMPERIAL BANK OF COMMERCE",      "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 79, {image: productImg("cibc.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 1500 }),
  P(100007, "CANADIAN IMPERIAL BANK OF COMMERCE",        "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 7,  {image: productImg("cibc.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(103007,  "CANADIAN IMPERIAL BANK OF COMMERCE",      "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 49, { image: productImg("cibc.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(161007, "CANADIAN IMPERIAL BANK OF COMMERCE",      "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 79, {image: productImg("cibc.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 1500 }),

  P(107007, "CANADIAN IMPERIAL BANK OF COMMERCE",        "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 7,  {image: productImg("cibc.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(198007,  "CANADIAN IMPERIAL BANK OF COMMERCE",      "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 49, { image: productImg("cibc.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(145007, "CANADIAN IMPERIAL BANK OF COMMERCE",      "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 79, {image: productImg("cibc.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 1500 }),


  P(1111008, "RBC (ROYAL BANK OF CANADA)",        "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 7,  {image: productImg("rbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(1021008,  "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 49, { image: productImg("rbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(1601008, "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 79, {image: productImg("rbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 1500 }),
  P(1001008, "RBC (ROYAL BANK OF CANADA)",        "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 7,  {image: productImg("rbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(1031008,  "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 49, { image: productImg("rbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1500 }),
  P(1611008, "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 79, {image: productImg("rbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 1500 }),
  P(1071008, "RBC (ROYAL BANK OF CANADA)",        "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 7,  {image: productImg("rbc.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 1500 }),
  P(1981008,  "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 49, { image: productImg("rbc.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 1500 }),
  P(1450008, "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 79, {image: productImg("rbc.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...", badge: "Best value",balance: 1500 }),

  P(11111009, "TD BANK (TORONTO-DOMINION)",        "CANADIAN LOGS", "BARCLAYS BANKTD BANK (TORONTO-DOMINION)", 7,  {image: productImg("td.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(10211009,  "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 49, { image: productImg("td.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(16011009, "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 79, {image: productImg("td.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),
  P(10011009, "TD BANK (TORONTO-DOMINION)",        "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 7,  {image: productImg("td.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(10311009,  "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 49, { image: productImg("td.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(16111009, "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 79, {image: productImg("td.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),
  P(10711009, "TD BANK (TORONTO-DOMINION)",        "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 7,  {image: productImg("td.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(19811009,  "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 49, { image: productImg("td.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(14510009, "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 79, {image: productImg("td.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),

  P(11112006, "SCOTIABANK (BANK OF NOVA SCOTIA)",        "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 7,  {image: productImg("scotia.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(10212006,  "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 49, { image: productImg("scotia.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(16012006, "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 79, {image: productImg("scotia.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),
  P(10012006, "SCOTIABANK (BANK OF NOVA SCOTIA)",        "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 7,  {image: productImg("scotia.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(10312006,  "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 49, { image: productImg("scotia.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(16112006, "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 79, {image: productImg("scotia.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),
  P(10712006, "SCOTIABANK (BANK OF NOVA SCOTIA)",        "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 7,  {image: productImg("scotia.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(19812006,  "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 49, { image: productImg("scotia.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(14512006, "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 79, {image: productImg("scotia.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),

  P(11113003, "BMO (BANK OF MONTREAL)",        "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 7,  {image: productImg("bmo.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(10213003,  "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 49, { image: productImg("bmo.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(16013003, "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 79, {image: productImg("bmo.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),
  P(10013003, "BMO (BANK OF MONTREAL)",        "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 7,  {image: productImg("bmo.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(10313003,  "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 49, { image: productImg("bmo.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(16113003, "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 79, {image: productImg("bmo.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),
  P(10713003, "BMO (BANK OF MONTREAL)",        "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 7,  {image: productImg("bmo.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(19813003,  "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 49, { image: productImg("bmo.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(14513003, "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 79, {image: productImg("bmo.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),


  P(111160011, "NATIONAL BANK OF CANADA",        "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 7,  {image: productImg("nb.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(102180011,  "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 49, { image: productImg("nb.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1601600211, "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 79, {image: productImg("nb.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(1001600411, "NATIONAL BANK OF CANADA",        "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 7,  {image: productImg("nb.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1031600511,  "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 49, { image: productImg("nb.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(161160011, "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 79, {image: productImg("nb.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(107160011, "NATIONAL BANK OF CANADA",        "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 7,  {image: productImg("nb.png"), description: "NATIONAL BANK OF CANADA | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(198160011,  "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 49, { image: productImg("nb.png"), description: "NATIONAL BANK OF CANADA | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(145160011, "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 79, {image: productImg("nb.png"), description: "NATIONAL BANK OF CANADA | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),




  P(111110093, "PAYPAL LOGS",        "PAYPAL_CASHAPP", "PAYPAL LOGS", 7,  {image: productImg("paypal.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(102110093,  "PAYPAL LOGS",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 49, { image: productImg("paypal.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(160110093, "PAYPAL LOGS",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 79, {image: productImg("paypal.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),
  P(100110093, "PAYPAL LOGS",        "PAYPAL_CASHAPP", "PAYPAL LOGS", 7,  {image: productImg("paypal.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(103110093,  "PAYPAL LOGS",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 49, { image: productImg("paypal.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(161110093, "PAYPAL LOGS",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 79, {image: productImg("paypal.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),
  P(107110093, "PAYPAL LOGS",        "PAYPAL_CASHAPP", "PAYPAL LOGS", 7,  {image: productImg("paypal.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(198110093,  "PAYPAL LOGS",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 49, { image: productImg("paypal.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 1500 }),
  P(145100093, "PAYPAL LOGS",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 79, {image: productImg("paypal.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 1500 }),

  P(11112006, "CASHAPP LOGS",        "PAYPAL_CASHAPP", "CASHAPP LOGS", 7,  {image: productImg("cashapp.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(10212006,  "CASHAPP LOGS",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 49, { image: productImg("cashapp.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(16012006, "CASHAPP LOGS",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 79, {image: productImg("cashapp.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),
  P(10012006, "CASHAPP LOGS",        "PAYPAL_CASHAPP", "CASHAPP LOGS", 7,  {image: productImg("cashapp.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(10312006,  "CASHAPP LOGS",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 49, { image: productImg("cashapp.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(16112006, "CASHAPP LOGS",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 79, {image: productImg("cashapp.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),
  P(10712006, "CASHAPP LOGS",        "PAYPAL_CASHAPP", "CASHAPP LOGS", 7,  {image: productImg("cashapp.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(19812006,  "CASHAPP LOGS",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 49, { image: productImg("cashapp.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1500 }),
  P(14512006, "CASHAPP LOGS",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 79, {image: productImg("cashapp.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 1500 }),

  P(111130037, "CASHAPP AGED ACCOUNTS",        "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 7,  {image: productImg("cashapp.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(102130037,  "CASHAPP AGED ACCOUNTS",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 49, { image: productImg("cashapp.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(160130037, "CASHAPP AGED ACCOUNTS",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 79, {image: productImg("cashapp.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),
  P(100130037, "CASHAPP AGED ACCOUNTS",        "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 7,  {image: productImg("cashapp.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(103130037,  "CASHAPP AGED ACCOUNTS",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 49, { image: productImg("cashapp.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(161130037, "CASHAPP AGED ACCOUNTS",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 79, {image: productImg("cashapp.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),
  P(107130037, "CASHAPP AGED ACCOUNTS",        "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 7,  {image: productImg("cashapp.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(198130037,  "CASHAPP AGED ACCOUNTS",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 49, { image: productImg("cashapp.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 1500 }),
  P(145130037, "CASHAPP AGED ACCOUNTS",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 79, {image: productImg("cashapp.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 1500 }),


  P(1111600119, "VERIFIED PAYPAL ACCOUNTS",        "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 7,  {image: productImg("paypal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1021800119,  "VERIFIED PAYPAL ACCOUNTS",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 49, { image: productImg("paypal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(16016002119, "VERIFIED PAYPAL ACCOUNTS",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 79, {image: productImg("paypal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(10016004119, "VERIFIED PAYPAL ACCOUNTS",        "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 7,  {image: productImg("paypal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(10316005119,  "VERIFIED PAYPAL ACCOUNTS",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 49, { image: productImg("paypal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1611600119, "VERIFIED PAYPAL ACCOUNTS",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 79, {image: productImg("paypal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(1071600119, "VERIFIED PAYPAL ACCOUNTS",        "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 7,  {image: productImg("paypal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1981600119,  "VERIFIED PAYPAL ACCOUNTS",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 49, { image: productImg("paypal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1451600119, "VERIFIED PAYPAL ACCOUNTS",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 79, {image: productImg("paypal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),



    P(11116001192, "Visa eGift",        "EGIFT CARDS", "EGIFT CARDS", 7,  {image: productImg("visa.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(10218001192,  "Amazon eGift Card",      "EGIFT CARDS", "EGIFT CARDS", 49, { image: productImg("amazon.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(160160021192, "Walmart eGift",      "EGIFT CARDS", "EGIFT CARDS", 79, {image: productImg("wal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(100160041192, "Apple eGift",        "EGIFT CARDS", "EGIFT CARDS", 7,  {image: productImg("apple.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(103160051192,  "Visa eGift",      "EGIFT CARDS", "EGIFT CARDS", 49, { image: productImg("visa.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(16116001192, "Walmart eGift",      "EGIFT CARDS", "EGIFT CARDS", 79, {image: productImg("wal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(10716001192, "Amazon eGift",        "EGIFT CARDS", "EGIFT CARDS", 7,  {image: productImg("amazon.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(19816001192,  "Visa eGift",      "EGIFT CARDS", "EGIFT CARDS", 49, { image: productImg("visa.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  




    P(111160011926, "Residential Proxies",        "NETWORK & PRIVACY TOOLS", "PROXY SERVICES", 7,  {image: productImg("RESIDE.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(102180011926,  "Local proxy",      "NETWORK & PRIVACY TOOLS", "PROXY SERVICES", 49, { image: productImg("RESIDE.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1601600211926, "Mobile Proxies (4G/5G)",      "NETWORK & PRIVACY TOOLS", "PROXY SERVICES", 79, {image: productImg("RESIDE.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(1001600411926, "Datacenter Proxies",        "NETWORK & PRIVACY TOOLS", "PROXY SERVICES", 7,  {image: productImg("RESIDE.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  
  
  P(111160011927, "Surshark",        "NETWORK & PRIVACY TOOLS", "PREMIUM VPNS", 7,  {image: productImg("SUF.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(102180011927,  "CyberGhost",      "NETWORK & PRIVACY TOOLS", "PREMIUM VPNS", 49, { image: productImg("CYBER.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1601600211927, "Proton VPN",      "NETWORK & PRIVACY TOOLS", "PREMIUM VPNS", 79, {image: productImg("PROTON.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1500 }),
  P(1001600411927, "NordVPN",        "NETWORK & PRIVACY TOOLS", "PREMIUM VPNS", 7,  {image: productImg("NORD.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  P(1001600411927, "ExpressVPN",        "NETWORK & PRIVACY TOOLS", "PREMIUM VPNS", 7,  {image: productImg("EXPRESS.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1500 }),
  
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