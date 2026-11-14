create table payment_claims (
    id          uuid primary key,
    user_id     uuid          not null references users (id) on delete cascade,
    coin        varchar(10)   not null,
    amount_usd  numeric(12,2) not null check (amount_usd > 0),
    txid        varchar(64)   not null,
    status      varchar(10)   not null default 'PENDING'
                check (status in ('PENDING', 'APPROVED', 'REJECTED')),
    created_at  timestamptz   not null default now(),
    reviewed_at timestamptz,
    reviewed_by uuid references users (id)
);

-- One claim per blockchain transaction, so the same payment can never be credited twice.
create unique index payment_claims_txid_uq on payment_claims (txid);
create index payment_claims_user_idx on payment_claims (user_id, created_at desc);
create index payment_claims_status_idx on payment_claims (status, created_at);

-- Same approach as V2: the Data API is locked out; the backend's postgres role bypasses RLS.
alter table payment_claims enable row level security;
