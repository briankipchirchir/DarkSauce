-- Seed data taken from src/data.js

INSERT INTO categories (id, label, icon, image, sort_order) VALUES
 ('software',   'Software',   'code', '/images/categories/software.svg',   1),
 ('gift-cards', 'Gift cards', 'gift', '/images/categories/gift-cards.svg', 2),
 ('guides',     'Guides',     'book', '/images/categories/guides.svg',     3),
 ('hardware',   'Hardware',   'chip', '/images/categories/hardware.svg',   4),
 ('services',   'Services',   'tool', '/images/categories/services.svg',   5);

INSERT INTO products (id, category_id, name, description, price, image, image_fit, stock, badge) VALUES
 (1,  'software',   'Password manager, 1 year',     'Store and autofill your logins on all your devices.', 29.00,  '/images/products/password-manager.jpg', 'cover', 50,  'Popular'),
 (2,  'software',   'VPN subscription, 12 months',  'Encrypted connection for up to five devices.',        49.00,  '/images/products/vpn.jpg',              'cover', 50,  NULL),
 (3,  'software',   'Encrypted backup tool',        'Automatic backups that only you can open.',           39.00,  '/images/products/backup-tool.jpg',      'cover', 30,  'New'),
 (4,  'gift-cards', 'Gift card $25',                'Delivered instantly after payment.',                  25.00,  '/images/products/gift-25.png',          'cover', 100, NULL),
 (5,  'gift-cards', 'Gift card $50',                'Delivered instantly after payment.',                  50.00,  '/images/products/gift-50.png',          'cover', 100, NULL),
 (6,  'gift-cards', 'Gift card $100',               'Delivered instantly after payment.',                  100.00, '/images/products/gift-100.png',         'cover', 100, NULL),
 (7,  'guides',     'Home network security guide',  'Step-by-step guide to locking down your network.',    12.00,  '/images/products/network-guide.jpg',    'cover', 999, NULL),
 (8,  'guides',     'Privacy basics handbook',      'Plain-language guide to staying private online.',     9.00,   '/images/products/privacy-handbook.jpg', 'cover', 999, NULL),
 (9,  'hardware',   'Hardware security key',        'USB security key for two-factor sign-in.',            45.00,  '/images/products/security-key.jpg',     'cover', 20,  NULL),
 (10, 'hardware',   'Encrypted USB drive 64GB',     'Hardware-encrypted storage with PIN pad.',            35.00,  '/images/products/usb-drive.jpg',        'cover', 15,  NULL),
 (11, 'services',   'Setup and onboarding session', 'One-to-one session to get you set up.',               60.00,  '/images/products/onboarding.jpg',       'cover', 10,  NULL),
 (12, 'services',   'Account security review',      'We check your accounts and send a written report.',   80.00,  '/images/products/security-review.jpg',  'cover', 10,  NULL);

-- Keep the identity sequence ahead of the explicit ids above.
SELECT setval(pg_get_serial_sequence('products', 'id'), (SELECT max(id) FROM products));

-- Payment methods: ids match PAY_OPTIONS in src/payments.js.
-- wallet_address is NULL until an admin sets it (phase 5); deposits can't be created for a method without one.
INSERT INTO payment_methods
 (id, symbol, name, network, coingecko_id, confirmations, stable, explorer_tx_url, requires_tx_key, sort_order) VALUES
 ('BTC',        'BTC',  'Bitcoin',  'Bitcoin Network',           'bitcoin',  3,  false, 'https://mempool.space/tx/{tx}',           false, 1),
 ('LTC',        'LTC',  'Litecoin', 'Litecoin Network',          'litecoin', 6,  false, 'https://litecoinspace.org/tx/{tx}',       false, 2),
 ('SOL',        'SOL',  'Solana',   'Solana Network',            'solana',   1,  false, 'https://solscan.io/tx/{tx}',              false, 3),
 ('USDT_ERC20', 'USDT', 'Tether',   'Ethereum Network (ERC-20)', 'tether',   12, true,  'https://etherscan.io/tx/{tx}',            false, 4),
 ('USDT_TRC20', 'USDT', 'Tether',   'Tron Network (TRC-20)',     'tether',   12, true,  'https://tronscan.org/#/transaction/{tx}', false, 5),
 ('XMR',        'XMR',  'Monero',   'Monero Network',            'monero',   10, false, NULL,                                      true,  6);
