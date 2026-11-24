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
    id: "DUMPS", label: "DUMPS", icon: "chip", image: categoryImg(""),
    subcategories: [
      { id: "DUMPS", label: "DUMPS", icon: "lock" },
    ],
  },
   {
    id: "NON VBv CCs", label: "NON VBv CCs", icon: "chip", image: categoryImg(""),
    subcategories: [
      { id: "NON VBv CCs", label: "NON VBv CCs", icon: "lock" },
    ],
  },
  {
    id: "CLONE CARDS", label: "CLONE CARDS", icon: "chip", image: categoryImg("MASTER.png"),
    subcategories: [
      { id: "USA CLONE CARDS", label: "USA CLONE CARDS", icon: "lock" },
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
  P(1,  "CITI BANK",         "USA BANK LOGS", "CITI BANK", 75,  { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...", badge: "Popular",balance: 1309 }),
  P(13, "CITI BANK",     "USA BANK LOGS", "CITI BANK", 100, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 2309 }),
  P(14, "CITI BANK", "USA BANK LOGS", "CITI BANK", 150, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 3250 }),
  P(10,  "CITI BANK",         "USA BANK LOGS", "CITI BANK", 180,  { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...", badge: "Popular",balance: 4200 }),
  P(15, "CITI BANK",     "USA BANK LOGS", "CITI BANK", 200, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 5000 }),
  P(16, "CITI BANK", "USA BANK LOGS", "CITI BANK", 220, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 5500 }),
    P(17,  "CITI BANK",         "USA BANK LOGS", "CITI BANK", 240,  { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...", badge: "Popular",balance: 6200 }),
  P(20, "CITI BANK",     "USA BANK LOGS", "CITI BANK", 280, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 7000 }),
  P(19, "CITI BANK", "USA BANK LOGS", "CITI BANK", 740, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 12900 }),
    P(18,  "CITI BANK",         "USA BANK LOGS", "CITI BANK", 800,  { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...", badge: "Popular",balance: 22390 }),
  P(21, "CITI BANK",     "USA BANK LOGS", "CITI BANK", 920, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 23910 }),
  P(6, "CITI BANK", "USA BANK LOGS", "CITI BANK", 1100, { image: productImg("cit.png"),  description: "Citi Login Info ✅ Email access ✅ IDentity : Driver's license ✅ Additional Info : [ATM-Pin - Accou...",balance: 25000 }),
  // ---- Software / VPN ----
  P(111, "WELLS FARGO BANK",        "USA BANK LOGS", "WELLS FARGO BANK", 70,  {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 1250 }),
  P(102,  "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 80, { image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 1875 }),
  P(160, "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 120, {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...", badge: "Best value",balance: 2370 }),
  P(100, "WELLS FARGO BANK",        "USA BANK LOGS", "WELLS FARGO BANK", 150,  {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 3023 }),
  P(103,  "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 200, { image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 3500 }),
  P(161, "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 400, {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...", badge: "Best value",balance: 5906 }),
  P(107, "WELLS FARGO BANK",        "USA BANK LOGS", "WELLS FARGO BANK", 500,  {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 8650 }),
  P(198,  "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 720, { image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...",balance: 9505 }),
  P(145, "WELLS FARGO BANK",      "USA BANK LOGS", "WELLS FARGO BANK", 800, {image: productImg("wells.png"), description: "Wells Fargo Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies...", badge: "Best value",balance: 11006 }),


  P(1111, "CHIME",        "USA BANK LOGS", "CHIME", 85,  {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 2905 }),
  P(1021,  "CHIME",      "USA BANK LOGS", "CHIME", 150, { image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 3265 }),
  P(1601, "CHIME",      "USA BANK LOGS", "CHIME", 180, {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...", badge: "Best value",balance: 3437 }),
  P(1001, "CHIME",        "USA BANK LOGS", "CHIME", 230,  {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 5652 }),
  P(1031,  "CHIME",      "USA BANK LOGS", "CHIME", 300, { image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 10290 }),
  P(1611, "CHIME",      "USA BANK LOGS", "CHIME", 400, {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...", badge: "Best value",balance: 15870 }),
  P(1071, "CHIME",        "USA BANK LOGS", "CHIME", 560,  {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 16890 }),
  P(1981,  "CHIME",      "USA BANK LOGS", "CHIME", 900, { image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 33549 }),
  P(145, "CHIME",      "USA BANK LOGS", "CHIME", 1035, {image: productImg("chime.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...", badge: "Best value",balance: 35900 }),

  P(11111, "CHASE",        "USA BANK LOGS", "CHASE", 100,  {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 3538 }),
  P(10211,  "CHASE",      "USA BANK LOGS", "CHASE", 150, { image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 5535 }),
  P(16011, "CHASE",      "USA BANK LOGS", "CHASE", 250, {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 6723 }),
  P(10011, "CHASE",        "USA BANK LOGS", "CHASE", 300,  {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 7972 }),
  P(10311,  "CHASE",      "USA BANK LOGS", "CHASE", 750, { image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 12600 }),
  P(16111, "CHASE",      "USA BANK LOGS", "CHASE", 950, {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 25546 }),
  P(10711, "CHASE",        "USA BANK LOGS", "CHASE", 990,  {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 26700 }),
  P(19811,  "CHASE",      "USA BANK LOGS", "CHASE", 1050, { image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED",balance: 27701 }),
  P(1451, "CHASE",      "USA BANK LOGS", "CHASE", 1100, {image: productImg("chase.png"), description: "Chase online hacked logs All balances comes with full ROUTING+ACCOUNT numbers. ZELLE ENABLED", badge: "Best value",balance: 30100 }),

  P(11112, "BANK OF AMERICA",        "USA BANK LOGS", "BANK OF AMERICA", 75,  {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 1870 }),
  P(10212,  "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 95, { image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 2280 }),
  P(16012, "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 125, {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 3234 }),
  P(10012, "BANK OF AMERICA",        "USA BANK LOGS", "BANK OF AMERICA", 245,  {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 7170 }),
  P(10312,  "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 250, { image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 4230 }),
  P(16112, "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 400, {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 13548 }),
  P(10712, "BANK OF AMERICA",        "USA BANK LOGS", "BANK OF AMERICA", 454,  {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 23280 }),
  P(19812,  "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 740, { image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...",balance: 36080 }),
  P(14512, "BANK OF AMERICA",      "USA BANK LOGS", "BANK OF AMERICA", 1050, {image: productImg("america.png"), description: "BOA Bank Log ✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅ Cookies ✅Zelle...", badge: "Best value",balance: 40090 }),

  P(11113, "HUNTINGTON BANK",        "USA BANK LOGS", "HUNTINGTON BANK", 85,  {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 2996 }),
  P(10213,  "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 100, { image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 2308 }),
  P(16013, "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 100, {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 2400 }),
  P(10013, "HUNTINGTON BANK",        "USA BANK LOGS", "HUNTINGTON BANK", 150,  {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 5525 }),
  P(10313,  "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 300, { image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 9440 }),
  P(16113, "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 450, {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 6008 }),
  P(10713, "HUNTINGTON BANK",        "USA BANK LOGS", "HUNTINGTON BANK", 550,  {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 12050 }),
  P(19813,  "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 900, { image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...",balance: 15562 }),
  P(14513, "HUNTINGTON BANK",      "USA BANK LOGS", "HUNTINGTON BANK", 1000, {image: productImg("huni.png"), description: "Huntington, User + Online Email Access + Owner's Cookies User ID : Yes Password: Yes E-mail: Yes Sta...", badge: "Best value",balance: 26625 }),


  P(11116, "PNC BANK",        "USA BANK LOGS", "PNC BANK", 65,  {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1250 }),
  P(10218,  "PNC BANK",      "USA BANK LOGS", "PNC BANK", 85, { image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 2050 }),
  P(16016, "PNC BANK",      "USA BANK LOGS", "PNC BANK", 100, {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 3200 }),
  P(10016, "PNC BANK",        "USA BANK LOGS", "PNC BANK", 150,  {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 5203 }),
  P(10316,  "PNC BANK",      "USA BANK LOGS", "PNC BANK", 250, { image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 6124 }),
  P(16116, "PNC BANK",      "USA BANK LOGS", "PNC BANK", 300, {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 10606 }),
  P(10716, "PNC BANK",        "USA BANK LOGS", "PNC BANK", 470,  {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 8650 }),
  P(19816,  "PNC BANK",      "USA BANK LOGS", "PNC BANK", 530, { image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 9500 }),
  P(14516, "PNC BANK",      "USA BANK LOGS", "PNC BANK", 600, {image: productImg("pnc.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 11200 }),


  P(11117, "USAA BANK",        "USA BANK LOGS", "USAA BANK", 85,  {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 1634 }),
  P(10217,  "USAA BANK",      "USA BANK LOGS", "USAA BANK", 105, { image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 3085 }),
  P(16017, "USAA BANK",      "USA BANK LOGS", "USAA BANK", 180, {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle", badge: "Best value",balance: 4007 }),
  P(10017, "USAA BANK",        "USA BANK LOGS", "USAA BANK", 290,  {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 6439 }),
  P(10317,  "USAA BANK",      "USA BANK LOGS", "USAA BANK", 470, { image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 8900 }),
  P(16117, "USAA BANK",      "USA BANK LOGS", "USAA BANK", 750, {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle", badge: "Best value",balance: 18430 }),
  P(10717, "USAA BANK",        "USA BANK LOGS", "USAA BANK", 835,  {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 27230 }),
  P(19817,  "USAA BANK",      "USA BANK LOGS", "USAA BANK", 900, { image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle",balance: 27800 }),
  P(14517, "USAA BANK",      "USA BANK LOGS", "USAA BANK", 940, {image: productImg("usa.png"), description: "USAA✅Online access (Log details) ✅Card details (Debit) ✅Email Access ✅Cookies ✅Zelle", badge: "Best value",balance: 28104 }),




  P(11100, "NATIONWIDE",        "UK BANK LOGS", "NATIONWIDE", 65,  {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 980 }),
  P(10200,  "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 150, { image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 3205 }),
  P(16000, "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 250, {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 5010 }),
  P(10000, "NATIONWIDE",        "UK BANK LOGS", "NATIONWIDE", 420,  {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 7870 }),
  P(10300,  "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 600, { image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 12340 }),
  P(16100, "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 650, {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 12846}),

  P(10700, "NATIONWIDE",        "UK BANK LOGS", "NATIONWIDE", 700,  {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 13001 }),
  P(19800,  "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 820, { image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 13250 }),
  P(14500, "NATIONWIDE",      "UK BANK LOGS", "NATIONWIDE", 900, {image: productImg("nationwide.png"), description: "NATIONWIDE | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 13800 }),


  P(111100, "HSBC BANK",        "UK BANK LOGS", "HSBC BANK", 85,  {image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1100 }),
  P(102100,  "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 120, { image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 1265 }),
  P(160100, "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 250, {image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 1345 }),
  P(100100, "HSBC BANK",        "UK BANK LOGS", "HSBC BANK", 520,  {image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 2500 }),
  P(103100,  "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 760, { image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...",balance: 6348}),
  P(161100, "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 790, {image: productImg("hsbc.png"), description: "HSBC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cookies...", badge: "Best value",balance: 10345 }),
  P(107100, "HSBC BANK",        "UK BANK LOGS", "HSBC BANK", 810,  {image: productImg("hsbc.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 14450 }),
  P(198100,  "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 860, { image: productImg("hsbc.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...",balance: 15001 }),
  P(145000, "HSBC BANK",      "UK BANK LOGS", "HSBC BANK", 940, {image: productImg("hsbc.png"), description: "Chime | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP, Cooki...", badge: "Best value",balance: 15600 }),

  P(1111100, "BARCLAYS BANK",        "UK BANK LOGS", "BARCLAYS BANK", 55,  {image: productImg("barclays.png"), description: "Barclays — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅",balance: 900 }),
  P(1021100,  "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 60, { image: productImg("barclays.png"), description: "Barclays — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅",balance: 1106 }),
  P(1601100, "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 79, {image: productImg("barclays.png"), description: "Barclays — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅", badge: "Best value",balance: 1300 }),
  P(1001100, "BARCLAYS BANK",        "UK BANK LOGS", "BARCLAYS BANK", 85,  {image: productImg("barclays.png"), description: "Barclays — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅",balance: 1400 }),
  P(1031100,  "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 100, { image: productImg("barclays.png"), description: "Barclays — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅",balance: 1800 }),
  P(1611100, "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 120, {image: productImg("barclays.png"), description: "Barclays — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅", badge: "Best value",balance: 2309 }),
  P(1071100, "BARCLAYS BANK",        "UK BANK LOGS", "BARCLAYS BANK", 150,  {image: productImg("barclays.png"), description: "Barclays — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅",balance: 3250 }),
  P(1981100,  "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 170, { image: productImg("barclays.png"), description: "Barclays — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅",balance: 4007 }),
  P(1451000, "BARCLAYS BANK",      "UK BANK LOGS", "BARCLAYS BANK", 200, {image: productImg("barclays.png"), description: "Barclays — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅", badge: "Best value",balance: 5500 }),

  P(1111200, "LLOYDS BANK",        "UK BANK LOGS", "LLOYDS BANK", 85,  {image: productImg("lloyd.png"), description: "Lloyds Bank — ✅ Online access (web & app) ✅ Debit card (contactless) ✅ Budgeting tools ✅ Mobile...",balance: 1510 }),
  P(1021200,  "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 95, { image: productImg("lloyd.png"), description: "Lloyds Bank — ✅ Online access (web & app) ✅ Debit card (contactless) ✅ Budgeting tools ✅ Mobile...",balance: 1785 }),
  P(1601200, "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 100, {image: productImg("lloyd.png"), description: "Lloyds Bank — ✅ Online access (web & app) ✅ Debit card (contactless) ✅ Budgeting tools ✅ Mobile...", badge: "Best value",balance: 2430 }),
  P(1001200, "LLOYDS BANK",        "UK BANK LOGS", "LLOYDS BANK", 120,  {image: productImg("lloyd.png"), description: "Lloyds Bank — ✅ Online access (web & app) ✅ Debit card (contactless) ✅ Budgeting tools ✅ Mobile...",balance: 3540}),
  P(1031200,  "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 150, { image: productImg("lloyd.png"), description: "Lloyds Bank — ✅ Online access (web & app) ✅ Debit card (contactless) ✅ Budgeting tools ✅ Mobile...",balance: 7320 }),
  P(1611200, "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 250, {image: productImg("lloyd.png"), description: "Lloyds Bank — ✅ Online access (web & app) ✅ Debit card (contactless) ✅ Budgeting tools ✅ Mobile...", badge: "Best value",balance: 9439 }),
  P(1071200, "LLOYDS BANK",        "UK BANK LOGS", "LLOYDS BANK", 310,  {image: productImg("lloyd.png"), description: "Lloyds Bank — ✅ Online access (web & app) ✅ Debit card (contactless) ✅ Budgeting tools ✅ Mobile...",balance: 15340 }),
  P(1981200,  "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 520, { image: productImg("lloyd.png"), description: "Lloyds Bank — ✅ Online access (web & app) ✅ Debit card (contactless) ✅ Budgeting tools ✅ Mobile...",balance: 15620 }),
  P(1451200, "LLOYDS BANK",      "UK BANK LOGS", "LLOYDS BANK", 780, {image: productImg("lloyd.png"), description: "Lloyds Bank — ✅ Online access (web & app) ✅ Debit card (contactless) ✅ Budgeting tools ✅ Mobile...", badge: "Best value",balance: 16001 }),

  P(1111300, "NATWEST BANK",        "UK BANK LOGS", "NATWEST BANK", 65,  {image: productImg("natwest.png"), description: "NatWest — ✅ Online access (web & app) ✅ Debit card ✅ Faster Payments (instant UK transfers) ✅",balance: 1040 }),
  P(1021300,  "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 85, { image: productImg("natwest.png"), description: "NatWest — ✅ Online access (web & app) ✅ Debit card ✅ Faster Payments (instant UK transfers) ✅",balance: 1150 }),
  P(1601300, "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 95, {image: productImg("natwest.png"), description: "NatWest — ✅ Online access (web & app) ✅ Debit card ✅ Faster Payments (instant UK transfers) ✅", badge: "Best value",balance: 1875 }),
  P(1001300, "NATWEST BANK",        "UK BANK LOGS", "NATWEST BANK", 180,  {image: productImg("natwest.png"), description: "NatWest — ✅ Online access (web & app) ✅ Debit card ✅ Faster Payments (instant UK transfers) ✅",balance: 3765 }),
  P(1031300,  "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 250, { image: productImg("natwest.png"), description: "NatWest — ✅ Online access (web & app) ✅ Debit card ✅ Faster Payments (instant UK transfers) ✅",balance: 5430 }),
  P(1611300, "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 400, {image: productImg("natwest.png"), description: "NatWest — ✅ Online access (web & app) ✅ Debit card ✅ Faster Payments (instant UK transfers) ✅", badge: "Best value",balance: 7170 }),
  P(1071300, "NATWEST BANK",        "UK BANK LOGS", "NATWEST BANK", 570,  {image: productImg("natwest.png"), description: "NatWest — ✅ Online access (web & app) ✅ Debit card ✅ Faster Payments (instant UK transfers) ✅",balance: 10658 }),
  P(1981300,  "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 760, { image: productImg("natwest.png"), description: "NatWest — ✅ Online access (web & app) ✅ Debit card ✅ Faster Payments (instant UK transfers) ✅",balance: 22548 }),
  P(1451300, "NATWEST BANK",      "UK BANK LOGS", "NATWEST BANK", 810, {image: productImg("natwest.png"), description: "NatWest — ✅ Online access (web & app) ✅ Debit card ✅ Faster Payments (instant UK transfers) ✅", badge: "Best value",balance: 22941 }),


  P(1111600, "SANTANDER UK",        "UK BANK LOGS", "SANTANDER UK", 65,  {image: productImg("san.png"), description: "Santander UK — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments",balance: 1150 }),
  P(1021800,  "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 85, { image: productImg("san.png"), description: "Santander UK — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments",balance: 1368 }),
  P(16016002, "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 90, {image: productImg("san.png"), description: "Santander UK — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments", badge: "Best value",balance: 1459 }),
  P(10016004, "SANTANDER UK",        "UK BANK LOGS", "SANTANDER UK", 100,  {image: productImg("san.png"), description: "Santander UK — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments",balance: 1600 }),
  P(10316005,  "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 150, { image: productImg("san.png"), description: "Santander UK — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments",balance: 3235 }),
  P(1611600, "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 250, {image: productImg("san.png"), description: "Santander UK — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments", badge: "Best value",balance: 6380 }),
  P(1071600, "SANTANDER UK",        "UK BANK LOGS", "SANTANDER UK", 300,  {image: productImg("san.png"), description: "Santander UK — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments",balance: 7108 }),
  P(1981600,  "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 365, { image: productImg("san.png"), description: "Santander UK — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments",balance: 8650 }),
  P(1451600, "SANTANDER UK",      "UK BANK LOGS", "SANTANDER UK", 400, {image: productImg("san.png"), description: "Santander UK — ✅ Online access (web & app) ✅ Debit card ✅ Mobile payments", badge: "Best value",balance: 9000 }),


   P(111007, "CANADIAN IMPERIAL BANK OF COMMERCE",        "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 75,  {image: productImg("cibc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 1140 }),
  P(102007,  "CANADIAN IMPERIAL BANK OF COMMERCE",    "CANADIAN LOGS",  "CANADIAN IMPERIAL BANK OF COMMERCE", 100, { image: productImg("cibc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 1650 }),
  P(160007, "CANADIAN IMPERIAL BANK OF COMMERCE",      "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 150, {image: productImg("cibc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 5320 }),
  P(100007, "CANADIAN IMPERIAL BANK OF COMMERCE",        "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 300,  {image: productImg("cibc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 7230 }),
  P(103007,  "CANADIAN IMPERIAL BANK OF COMMERCE",      "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 450, { image: productImg("cibc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 8340 }),
  P(161007, "CANADIAN IMPERIAL BANK OF COMMERCE",      "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 570, {image: productImg("cibc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 12340 }),

  P(107007, "CANADIAN IMPERIAL BANK OF COMMERCE",        "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 600,  {image: productImg("cibc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 12890 }),
  P(198007,  "CANADIAN IMPERIAL BANK OF COMMERCE",      "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 680, { image: productImg("cibc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 13104 }),
  P(145007, "CANADIAN IMPERIAL BANK OF COMMERCE",      "CANADIAN LOGS", "CANADIAN IMPERIAL BANK OF COMMERCE", 790, {image: productImg("cibc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 13700 }),


  P(1111008, "RBC (ROYAL BANK OF CANADA)",        "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 70,  {image: productImg("rbc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments (Apple/Google Pay) ✅ e-Transfer (Int...",balance: 980 }),
  P(1021008,  "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 85, { image: productImg("rbc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments (Apple/Google Pay) ✅ e-Transfer (Int...",balance: 1260}),
  P(1601008, "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 90, {image: productImg("rbc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments (Apple/Google Pay) ✅ e-Transfer (Int...", badge: "Best value",balance: 1406 }),
  P(1001008, "RBC (ROYAL BANK OF CANADA)",        "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 100,  {image: productImg("rbc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments (Apple/Google Pay) ✅ e-Transfer (Int...",balance: 1540 }),
  P(1031008,  "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 150, { image: productImg("rbc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments (Apple/Google Pay) ✅ e-Transfer (Int...",balance: 2450 }),
  P(1611008, "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 250, {image: productImg("rbc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments (Apple/Google Pay) ✅ e-Transfer (Int...", badge: "Best value",balance: 3650 }),
  P(1071008, "RBC (ROYAL BANK OF CANADA)",        "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 300,  {image: productImg("rbc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments (Apple/Google Pay) ✅ e-Transfer (Int...",balance: 4455 }),
  P(1981008,  "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 550, { image: productImg("rbc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments (Apple/Google Pay) ✅ e-Transfer (Int...",balance: 8560 }),
  P(1450008, "RBC (ROYAL BANK OF CANADA)",      "CANADIAN LOGS", "RBC (ROYAL BANK OF CANADA)", 650, {image: productImg("rbc.png"), description: "✅ Online access (web & app) ✅ Debit card ✅ Mobile payments (Apple/Google Pay) ✅ e-Transfer (Int...", badge: "Best value",balance: 15340 }),

  P(11111009, "TD BANK (TORONTO-DOMINION)",        "CANADIAN LOGS", "BARCLAYS BANKTD BANK (TORONTO-DOMINION)", 70,  {image: productImg("td.png"), description: "Td-✅ Online access (web & app) ✅ Debit card✅ Mobile payments ✅ Interac e-Transfer",balance: 1150 }),
  P(10211009,  "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 85, { image: productImg("td.png"), description: "Td-✅ Online access (web & app) ✅ Debit card✅ Mobile payments ✅ Interac e-Transfer",balance: 1350 }),
  P(16011009, "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 100, {image: productImg("td.png"), description: "Td-✅ Online access (web & app) ✅ Debit card✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 1540 }),
  P(10011009, "TD BANK (TORONTO-DOMINION)",        "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 150,  {image: productImg("td.png"), description: "Td-✅ Online access (web & app) ✅ Debit card✅ Mobile payments ✅ Interac e-Transfer",balance: 2450 }),
  P(10311009,  "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 250, { image: productImg("td.png"), description: "Td-✅ Online access (web & app) ✅ Debit card✅ Mobile payments ✅ Interac e-Transfer",balance: 3650 }),
  P(16111009, "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 300, {image: productImg("td.png"), description: "Td-✅ Online access (web & app) ✅ Debit card✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 4455 }),
  P(10711009, "TD BANK (TORONTO-DOMINION)",        "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 550,  {image: productImg("td.png"), description: "Td-✅ Online access (web & app) ✅ Debit card✅ Mobile payments ✅ Interac e-Transfer",balance: 8560 }),
  P(19811009,  "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 650, { image: productImg("td.png"), description: "Td-✅ Online access (web & app) ✅ Debit card✅ Mobile payments ✅ Interac e-Transfer",balance: 15340 }),
  P(14510009, "TD BANK (TORONTO-DOMINION)",      "CANADIAN LOGS", "TD BANK (TORONTO-DOMINION)", 750, {image: productImg("td.png"), description: "Td-✅ Online access (web & app) ✅ Debit card✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 15900 }),

  P(11112006, "SCOTIABANK (BANK OF NOVA SCOTIA)",        "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 65,  {image: productImg("scotia.png"), description: "Scotiabank-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 860 }),
  P(10212006,  "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 75, { image: productImg("scotia.png"), description: "Scotiabank-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 1260 }),
  P(16012006, "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 85, {image: productImg("scotia.png"), description: "Scotiabank-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 1320 }),
  P(10012006, "SCOTIABANK (BANK OF NOVA SCOTIA)",        "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 120,  {image: productImg("scotia.png"), description: "Scotiabank-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 3210 }),
  P(10312006,  "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 190, { image: productImg("scotia.png"), description: "Scotiabank-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 4327 }),
  P(16112006, "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 260, {image: productImg("scotia.png"), description: "Scotiabank-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 5390 }),
  P(10712006, "SCOTIABANK (BANK OF NOVA SCOTIA)",        "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 380,  {image: productImg("scotia.png"), description: "Scotiabank-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 7650 }),
  P(19812006,  "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 510, { image: productImg("scotia.png"), description: "Scotiabank-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 13548 }),
  P(14512006, "SCOTIABANK (BANK OF NOVA SCOTIA)",      "CANADIAN LOGS", "SCOTIABANK (BANK OF NOVA SCOTIA)", 680, {image: productImg("scotia.png"), description: "Scotiabank-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 14058 }),

  P(11113003, "BMO (BANK OF MONTREAL)",        "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 46,  {image: productImg("bmo.png"), description: "BMO-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 650 }),
  P(10213003,  "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 55, { image: productImg("bmo.png"), description: "BMO-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 780 }),
  P(16013003, "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 68, {image: productImg("bmo.png"), description: "BMO-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 950 }),
  P(10013003, "BMO (BANK OF MONTREAL)",        "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 100,  {image: productImg("bmo.png"), description: "BMO-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 2340 }),
  P(10313003,  "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 150, { image: productImg("bmo.png"), description: "BMO-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 3054 }),
  P(16113003, "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 250, {image: productImg("bmo.png"), description: "BMO-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 5380 }),
  P(10713003, "BMO (BANK OF MONTREAL)",        "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 405,  {image: productImg("bmo.png"), description: "BMO-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 8345 }),
  P(19813003,  "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 600, { image: productImg("bmo.png"), description: "BMO-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer",balance: 12340 }),
  P(14513003, "BMO (BANK OF MONTREAL)",      "CANADIAN LOGS", "BMO (BANK OF MONTREAL)", 720, {image: productImg("bmo.png"), description: "BMO-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer", badge: "Best value",balance: 12850 }),


  P(111160011, "NATIONAL BANK OF CANADA",        "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 65,  {image: productImg("nb.png"), description: "NBC-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer ✅ Strong lo...",balance: 720 }),
  P(102180011,  "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 70, { image: productImg("nb.png"), description: "NBC-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer ✅ Strong lo...",balance: 860 }),
  P(1601600211, "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 85, {image: productImg("nb.png"), description: "NBC-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer ✅ Strong lo...", badge: "Best value",balance: 1080 }),
  P(1001600411, "NATIONAL BANK OF CANADA",        "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 170,  {image: productImg("nb.png"), description: "NBC-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer ✅ Strong lo...",balance: 2890 }),
  P(1031600511,  "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 240, { image: productImg("nb.png"), description: "NBC-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer ✅ Strong lo...",balance: 4004 }),
  P(161160011, "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 305, {image: productImg("nb.png"), description: "NBC-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer ✅ Strong lo...", badge: "Best value",balance: 6320 }),
  P(107160011, "NATIONAL BANK OF CANADA",        "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 590,  {image: productImg("nb.png"), description: "NBC-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer ✅ Strong lo...",balance: 12815 }),
  P(198160011,  "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 750, { image: productImg("nb.png"), description: "NBC-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer ✅ Strong lo...",balance: 20340 }),
  P(145160011, "NATIONAL BANK OF CANADA",      "CANADIAN LOGS", "NATIONAL BANK OF CANADA", 800, {image: productImg("nb.png"), description: "NBC-✅ Online access (web & app) ✅ Debit card ✅ Mobile payments ✅ Interac e-Transfer ✅ Strong lo...", badge: "Best value",balance: 20800 }),




  P(111110093, "USA Paypal ( 5 Years ) [PERSONAL]",        "PAYPAL_CASHAPP", "PAYPAL LOGS", 55,  {image: productImg("paypal.png"), description: "USA Paypal ( 5 Years ) [PERSONAL] ✅ Login Credentials ✅ 2FA (Disabled) ✅ Email Access ❌",balance: 1620 }),
  P(102110093,  "USA Paypal ( 2 Years ) [PERSONAL]",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 65, { image: productImg("paypal.png"), description: "USA Paypal ( 5 Years ) [PERSONAL] ✅ Login Credentials ✅ 2FA (Disabled) ✅ Email Access ❌",balance: 1810 }),
  P(160110093, "USA Paypal",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 75, {image: productImg("paypal.png"), description: "USA Paypal ( 2 Years ) [PERSONAL] ✅ Login Credentials ✅ 2FA (Disabled) ✅ Email Access ❌", badge: "Best value",balance: 2457 }),
  P(100110093, "USA Paypal ( 3 Years ) [PERSONAL]",        "PAYPAL_CASHAPP", "PAYPAL LOGS", 80,  {image: productImg("paypal.png"), description: "USA Paypal ( 5 Years ) [PERSONAL] ✅ Login Credentials ✅ 2FA (Disabled) ✅ Email Access ❌",balance: 1257 }),
  P(103110093,  "Debit Card Linked Paypal DL-Verified",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 150, { image: productImg("paypal.png"), description: "Bal $3,500 Debit Card Linked Paypal(us) Full Verified [VCC +SSN +Mail +Number] +VCC Info + Crypto (B...",balance: 6540 }),
  P(161110093, "Personal Paypal Verified [G- Male] Crypto",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 250, {image: productImg("paypal.png"), description: "USA Paypal ( 4 Years ) [PERSONAL] ✅ Login Credentials ✅ 2FA (Disabled) ✅ Email Access ❌", badge: "Best value",balance: 15300 }),
  P(107110093, "USA Paypal ( 2 Years ) [PERSONAL]",        "PAYPAL_CASHAPP", "PAYPAL LOGS", 300,  {image: productImg("paypal.png"), description: "USA Paypal ( 2 Years ) [PERSONAL] ✅ Login Credentials ✅ 2FA (Disabled) ✅ Email Access ❌",balance: 7324 }),
  P(198110093,  "USA Paypal ( 5 Years ) [BUSINESS]",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 320, { image: productImg("paypal.png"), description: "USA Paypal ( 5 Years ) [BUSINESS] ✅ Login Credentials ✅ 2FA (Disabled) ✅ Email Access ❌",balance: 10320 }),
  P(145100093, "USA Paypal ( 3 Years ) [PERSONAL]",      "PAYPAL_CASHAPP", "PAYPAL LOGS", 350, {image: productImg("paypal.png"), description: "USA Paypal ( 3 Years ) [PERSONAL] ✅ Login Credentials ✅ 2FA (Disabled) ✅ Email Access ❌", badge: "Best value",balance: 13450 }),

  P(11112006, "SELF REG CASH APP",        "PAYPAL_CASHAPP", "CASHAPP LOGS", 60,  {image: productImg("cashapp.png"), description: "Cashapp BTC + AN/RN Limit: 4 k$/weekly BTC enabled fully verified COMES WITH FULLS DOB SSN",balance: 1840 }),
  P(10212006,  "SELF REG CASH APP",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 75, { image: productImg("cashapp.png"), description: "Cashapp BTC + AN/RN Limit: 4 k$/weekly BTC enabled fully verified COMES WITH FULLS DOB SSN",balance: 1970 }),
  P(16012006, "Cashapp Log",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 85, {image: productImg("cashapp.png"), description: "Cashapp BTC + AN/RN Limit: 6k$/weekly BTC enabled fully verified COMES WITH FULLz DOB SSN", badge: "Best value",balance: 2780 }),
  P(10012006, "Cashapp Log",        "PAYPAL_CASHAPP", "CASHAPP LOGS", 150,  {image: productImg("cashapp.png"), description: "Cashapp BTC + AN/RN Limit: 6k$/weekly BTC enabled fully verified COMES WITH FULLz DOB SSN",balance: 6340 }),
  P(10312006,  "Cashapp Log",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 170, { image: productImg("cashapp.png"), description: "CashApp Aged Verified+VCC+BTC Enabled+AN:RN ✨Cash App Profile Verified✨BTC Enabled✨Direct",balance: 7230 }),
  P(16112006, "Cashapp",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 300, {image: productImg("cashapp.png"), description: "CashApp Aged Verified+VCC+BTC Enabled+AN:RN ✨Cash App Profile Verified✨BTC Enabled✨Direct", badge: "Best value",balance: 12875 }),
  P(10712006, "CASHAPP LOGS",        "PAYPAL_CASHAPP", "CASHAPP LOGS", 450,  {image: productImg("cashapp.png"), description: "CashApp Aged Verified+VCC+BTC Enabled+AN:RN ✨Cash App Profile Verified✨BTC Enabled✨Direct",balance: 15534 }),
  P(19812006,  "CASHAPP LOGS",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 750, { image: productImg("cashapp.png"), description: "CashApp Aged Verified+VCC+BTC Enabled+AN:RN ✨Cash App Profile Verified✨BTC Enabled✨Direct",balance: 24340 }),
  P(14512006, "CASHAPP LOGS",      "PAYPAL_CASHAPP", "CASHAPP LOGS", 800, {image: productImg("cashapp.png"), description: "CashApp Aged Verified+VCC+BTC Enabled+AN:RN ✨Cash App Profile Verified✨BTC Enabled✨Direct", badge: "Best value",balance: 26240 }),

  P(111130037, "Cashapp + VCC + BTC enabled + AN/RN",        "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 55,  {image: productImg("cashapp.png"), description: "✅ Cashapp + VCC + BTC enabled + AN/RN ✅ 💳Cashapp BTC + AN/RN💳 💸Limit: 4 k$/weekly💸 BTC enabled...",balance: 1540 }),
  P(102130037,  "Cash App Profile Verified",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 70, { image: productImg("cashapp.png"), description: "CashApp Aged Verified+VCC+BTC Enabled+AN:RN ✨Cash App Profile Verified✨BTC Enabled✨Direct Deposit...",balance: 1820 }),
  P(160130037, "NO CHARGEBACK CASHAPP AUTO ADD BINS",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 85, {image: productImg("cashapp.png"), description: "✅ Cashapp + VCC + BTC enabled + AN/RN ✅ 💳Cashapp BTC + AN/RN💳 💸Limit: 4 k$/weekly💸 BTC", badge: "Best value",balance: 2500 }),
  P(100130037, "Cashapp (AN+RN+VCC) Cash Card Active",        "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 105,  {image: productImg("cashapp.png"), description: "4k Limit Per Week + Direct Deposit + Login [ID+Pin] + Mail Access + LDplayer Backup Log [Apps+Web]",balance: 3600 }),
  P(103130037,  "Cash App Profile Verified",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 120, { image: productImg("cashapp.png"), description: "CashApp Aged Verified+VCC+BTC Enabled+AN:RN ✨Cash App Profile Verified✨BTC Enabled✨Direct Deposit...",balance: 4800 }),
  P(161130037, "Cash App Profile Verified",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 170, {image: productImg("cashapp.png"), description: "CashApp Aged Verified+VCC+BTC Enabled+AN:RN ✨Cash App Profile Verified✨BTC Enabled✨Direct Deposit...", badge: "Best value",balance: 6600 }),
  P(107130037, "Cash App Profile Verified",        "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 200,  {image: productImg("cashapp.png"), description: "CashApp Aged Verified+VCC+BTC Enabled+AN:RN ✨Cash App Profile Verified✨BTC Enabled✨Direct Deposit...",balance: 7380 }),
  P(198130037,  "Cash App Profile Verified",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 300, { image: productImg("cashapp.png"), description: "CashApp Aged Verified+VCC+BTC Enabled+AN:RN ✨Cash App Profile Verified✨BTC Enabled✨Direct Deposit...",balance: 8650 }),
  P(145130037, "Cash App Profile Verified",      "PAYPAL_CASHAPP", "CASHAPP AGED ACCOUNTS", 450, {image: productImg("cashapp.png"), description: "CashApp Aged Verified+VCC+BTC Enabled+AN:RN ✨Cash App Profile Verified✨BTC Enabled✨Direct Deposit...", badge: "Best value",balance: 11500 }),


  P(1111600119, "PayPal (Self-registered accounts)",        "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 60,  {image: productImg("paypal.png"), description: "[PAYPAL BANK + VCC Verify] FullzInfo + Email + Personal Paypal + Cookie +(Email+SSN+Number+Bank+VCC+...",balance: 1620 }),
  P(1021800119,  "PayPal (Self-registered accounts)",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 80, { image: productImg("paypal.png"), description: "[PAYPAL BANK + VCC Verify] FullzInfo + Email + Personal Paypal + Cookie +(Email+SSN+Number+Bank+VCC+...",balance: 1900 }),
  P(16016002119, "PayPal (Self-registered accounts)",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 100, {image: productImg("paypal.png"), description: "[PAYPAL BANK + VCC Verify] FullzInfo + Email + Personal Paypal + Cookie +(Email+SSN+Number+Bank+VCC+...", badge: "Best value",balance: 2250 }),
  P(10016004119, "PayPal + VCC+AN_RN+Access to phone number",        "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 120,  {image: productImg("paypal.png"), description: "Full Info+Access to phone number+Crypto(Buy/Sell)+PayPal Debit",balance: 3810 }),
  P(10316005119,  "PayPal + VCC+AN_RN+Access to phone number",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 150, { image: productImg("paypal.png"), description: "Full Info+Access to phone number+Crypto(Buy/Sell)+PayPal Debit",balance: 4370 }),
  P(1611600119, "PayPal + VCC+AN_RN+Access to phone number",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 170, {image: productImg("paypal.png"), description: "Full Info+Access to phone number+Crypto(Buy/Sell)+PayPal Debit", badge: "Best value",balance: 5650 }),
  P(1071600119, "PayPal (Self-registered accounts)",        "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 230,  {image: productImg("paypal.png"), description: "[PAYPAL BANK + VCC Verify] FullzInfo + Email + Personal Paypal + Cookie +(Email+SSN+Number+Bank+VCC+...",balance: 6900 }),
  P(1981600119,  "PayPal (Self-registered accounts)",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 270, { image: productImg("paypal.png"), description: "[PAYPAL BANK + VCC Verify] FullzInfo + Email + Personal Paypal + Cookie +(Email+SSN+Number+Bank+VCC+...",balance: 7700 }),
  P(1451600119, "PayPal (Self-registered accounts)",      "PAYPAL_CASHAPP", "VERIFIED PAYPAL ACCOUNTS", 350, {image: productImg("paypal.png"), description: "[PAYPAL BANK + VCC Verify] FullzInfo + Email + Personal Paypal + Cookie +(Email+SSN+Number+Bank+VCC+...", badge: "Best value",balance: 8900 }),



    P(11116001192, "Visa eGift",        "EGIFT CARDS", "EGIFT CARDS", 65,  {image: productImg("visa.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1000 }),
  P(10218001192,  "Amazon eGift Card",      "EGIFT CARDS", "EGIFT CARDS", 49, { image: productImg("amazon.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 500 }),
  P(160160021192, "Walmart eGift",      "EGIFT CARDS", "EGIFT CARDS", 50, {image: productImg("wal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 500 }),
  P(100160041192, "Apple eGift",        "EGIFT CARDS", "EGIFT CARDS", 55,  {image: productImg("apple.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 600 }),
  P(103160051192,  "Visa eGift",      "EGIFT CARDS", "EGIFT CARDS", 65, { image: productImg("visa.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1000 }),
  P(16116001192, "Walmart eGift",      "EGIFT CARDS", "EGIFT CARDS", 70, {image: productImg("wal.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 1000 }),
  P(10716001192, "Amazon eGift",        "EGIFT CARDS", "EGIFT CARDS", 75,  {image: productImg("amazon.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1000 }),
  P(19816001192,  "Visa eGift",      "EGIFT CARDS", "EGIFT CARDS", 75, { image: productImg("visa.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 1000 }),
  




    P(111160011926, "Residential Proxies",        "NETWORK & PRIVACY TOOLS", "PROXY SERVICES", 45,  {image: productImg("RESIDE.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 45 }),
  P(102180011926,  "Local proxy",      "NETWORK & PRIVACY TOOLS", "PROXY SERVICES", 45, { image: productImg("RESIDE.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 45 }),
  P(1601600211926, "Mobile Proxies (4G/5G)",      "NETWORK & PRIVACY TOOLS", "PROXY SERVICES", 55, {image: productImg("RESIDE.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 55 }),
  P(1001600411926, "Datacenter Proxies",        "NETWORK & PRIVACY TOOLS", "PROXY SERVICES", 55,  {image: productImg("RESIDE.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 55 }),
  
  
  P(111160011927, "Surshark",        "NETWORK & PRIVACY TOOLS", "PREMIUM VPNS", 45,  {image: productImg("SUF.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 45 }),
  P(102180011927,  "CyberGhost",      "NETWORK & PRIVACY TOOLS", "PREMIUM VPNS", 45, { image: productImg("CYBER.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 45 }),
  P(1601600211927, "Proton VPN",      "NETWORK & PRIVACY TOOLS", "PREMIUM VPNS", 49, {image: productImg("PROTON.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,", badge: "Best value",balance: 149 }),
  P(1001600411927, "NordVPN",        "NETWORK & PRIVACY TOOLS", "PREMIUM VPNS", 55,  {image: productImg("NORD.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 55 }),
  P(1001600411927, "ExpressVPN",        "NETWORK & PRIVACY TOOLS", "PREMIUM VPNS", 65,  {image: productImg("EXPRESS.png"), description: "PNC BANK | Fullz: Email + Pass, DOB, Address, Account No, Routing, Debit Card No + Exp + CVV, IP,",balance: 65 }),
  



   P(2344, "DUMPS",             "DUMPS", "DUMPS", 150,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 5000 }),
  P(2444, "DUMPS",             "DUMPS", "DUMPS", 82,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 5021 }),
  P(44, "DUMPS",            "DUMPS", "DUMPS", 156, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 6744 }),  
 P(2344, "DUMPS",             "DUMPS", "DUMPS", 35,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 10551 }),
  P(2444, "DUMPS",             "DUMPS", "DUMPS", 40,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 11729 }),
  P(2544, "DUMPS",            "DUMPS", "DUMPS", 202, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 4431 }),  

   P(2300, "DUMPS",             "DUMPS", "DUMPS", 190,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 1955 }),
  P(2400, "DUMPS",             "DUMPS", "DUMPS", 210,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 8494}),
  P(2500, "DUMPS",            "DUMPS", "DUMPS", 215, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 5391 }),  

   P(2311, "DUMPS",             "DUMPS", "DUMPS", 125,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 11052 }),
  P(2411, "DUMPS",             "DUMPS", "DUMPS", 52,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 10358 }),
  P(2511, "DUMPS",            "DUMPS", "DUMPS", 89, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 6476 }),  

   P(2377, "DUMPS",             "DUMPS", "DUMPS", 89,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 6476 }),
  P(2477, "DUMPS",             "DUMPS", "DUMPS", 152,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 9492 }),
  P(2577, "DUMPS",            "DUMPS", "DUMPS", 182, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 13667 }),  

   P(2388, "DUMPS",             "DUMPS", "DUMPS", 146,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 7106 }),
  P(2488, "DUMPS",             "DUMPS", "DUMPS", 75,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 6252 }),
  P(2588, "DUMPS",            "DUMPS", "DUMPS", 236, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 7186 }),  

   P(2399, "DUMPS",             "DUMPS", "DUMPS", 40,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 12661 }),
  P(2499, "DUMPS",             "DUMPS", "DUMPS", 68,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 12211 }),
  P(2599, "DUMPS",            "DUMPS", "DUMPS", 197, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 9733 }),  

   P(2366, "DUMPS",             "DUMPS", "DUMPS", 166,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 2179 }),
  P(2466, "DUMPS",             "DUMPS", "DUMPS", 198,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 2476 }),
  P(2566, "DUMPS",            "DUMPS", "DUMPS", 244, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 4319 }),  





   P(23441, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 65,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 4143 }),
  P(24441, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 35,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 2127 }),
  P(4411, "NON VBv CCs",            "NON VBv CCs", "NON VBv CCs", 47, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 2952 }),  
 P(23441, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 27,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 1697 }),
  P(24441, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 28,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 1785 }),
  P(25441, "NON VBv CCs",            "NON VBv CCs", "NON VBv CCs", 34, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 2168 }),  

   P(23001, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 17,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 1057 }),
  P(24001, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 67,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 4225 }),
  P(25001, "NON VBv CCs",            "NON VBv CCs", "NON VBv CCs", 44, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 2763 }),  

   P(23111, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 32,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 1985 }),
  P(24111, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 30,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 1871 }),
  P(25111, "NON VBv CCs",            "NON VBv CCs", "NON VBv CCs", 25, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 1546 }),  

   P(23771, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 17,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 1060 }),
  P(24771, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 19,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 1199 }),
  P(257711, "NON VBv CCs",            "NON VBv CCs", "NON VBv CCs", 28, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 1776 }),  

   P(23881, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 48,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 3049 }),
  P(24881, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 25,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 1586 }),
  P(25881, "NON VBv CCs",            "NON VBv CCs", "NON VBv CCs", 23, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 1430 }),  

   P(23991, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 17,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 1058 }),
  P(24991, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 38,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 2389 }),
  P(25991, "NON VBv CCs",            "NON VBv CCs", "NON VBv CCs", 38, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 3115 }),  

   P(23661, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 67,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 4225 }),
  P(24661, "NON VBv CCs",             "NON VBv CCs", "NON VBv CCs", 44,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 2763 }),
  P(25661, "NON VBv CCs",            "NON VBv CCs", "NON VBv CCs", 70, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 4681 }),  

  // ---- Gift cards / Gaming ----
  P(23, "USA CLONE CARDS",             "CLONE CARDS", "USA CLONE CARDS", 1500,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 11, balance: 10726 }),
  P(24, "USA CLONE CARDS",             "CLONE CARDS", "USA CLONE CARDS", 2200,  { image: productImg("MASTER.png"),  description: "Credit for games and add-ons.", stock: 1, balance: 11699 }),
  P(25, "USA CLONE CARDS",            "CLONE CARDS", "USA CLONE CARDS", 3549, { image: productImg("MASTER.png"), description: "Credit for games and add-ons.", stock: 2, balance: 12990 }),  



];