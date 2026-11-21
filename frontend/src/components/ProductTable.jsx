import { useEffect, useMemo, useState } from "react";
import Icon from "./Icon.jsx";
import { ProductImage } from "./Media.jsx";
import { CATEGORIES } from "../data.js";

const PAGE_SIZES = [10, 25, 50];

/* Table of products with search, filters, sorting and pagination.
   Props:
     products - already limited to the categories you want (e.g. vegetables + non-electronic)
     flash    - id of the product that was just added (for the "Added" state)
     onAdd    - (productId) => void
*/
export default function ProductTable({ products, flash, onAdd }) {
  const [q, setQ] = useState("");
  const [catId, setCatId] = useState("all");
  const [subId, setSubId] = useState("all");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState({ key: "name", dir: "asc" });
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // categories present in this table
  const cats = useMemo(
    () => CATEGORIES.filter((c) => products.some((p) => p.category === c.id)),
    [products]
  );

  // subcategories for the selected category (or all of them)
  const subs = useMemo(() => {
    const list = [];
    cats
      .filter((c) => catId === "all" || c.id === catId)
      .forEach((c) =>
        (c.subcategories || []).forEach((s) => {
          if (products.some((p) => p.category === c.id && p.sub === s.id)) list.push(s);
        })
      );
    return list;
  }, [cats, catId, products]);

  const catLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label || id;

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const lo = minP === "" ? -Infinity : Number(minP);
    const hi = maxP === "" ? Infinity : Number(maxP);
    const out = products.filter(
      (p) =>
        (catId === "all" || p.category === catId) &&
        (subId === "all" || p.sub === subId) &&
        (!inStock || p.stock !== 0) &&
        p.price >= lo &&
        p.price <= hi &&
        (!term || p.name.toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term))
    );
    const val = (p) => (sort.key === "category" ? catLabel(p.category) : p[sort.key] ?? "");
    out.sort((a, b) => {
      const x = val(a), y = val(b);
      const r = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return sort.dir === "asc" ? r : -r;
    });
    return out;
  }, [products, q, catId, subId, minP, maxP, inStock, sort]);

  // any filter change goes back to page 1
  useEffect(() => setPage(1), [q, catId, subId, minP, maxP, inStock, sort, pageSize]);
  // changing category resets the subcategory
  useEffect(() => setSubId("all"), [catId]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const cur = Math.min(page, pages);
  const start = (cur - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  const toggleSort = (key) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  const arrow = (key) => (sort.key === key ? (sort.dir === "asc" ? " ▲" : " ▼") : "");

  const clear = () => {
    setQ(""); setCatId("all"); setSubId("all"); setMinP(""); setMaxP(""); setInStock(false);
  };
  const dirty = q || catId !== "all" || subId !== "all" || minP !== "" || maxP !== "" || inStock;

  // compact page list: 1 … 4 5 6 … 12
  const pageNums = useMemo(() => {
    const set = new Set([1, pages, cur - 1, cur, cur + 1]);
    const nums = [...set].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
    const out = [];
    nums.forEach((n, i) => {
      if (i && n - nums[i - 1] > 1) out.push("gap" + n);
      out.push(n);
    });
    return out;
  }, [cur, pages]);

  return (
    <div className="dx-tbl">
      {/* ---------- filters ---------- */}
      <div className="dx-tbl-filters">
        <input
          className="dx-input"
          type="search"
          placeholder="Search products…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search products"
        />
        {cats.length > 1 && (
          <select className="dx-input" value={catId} onChange={(e) => setCatId(e.target.value)} aria-label="Category">
            <option value="all">All categories</option>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        )}
        {subs.length > 0 && (
          <select className="dx-input" value={subId} onChange={(e) => setSubId(e.target.value)} aria-label="Type">
            <option value="all">All types</option>
            {subs.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        )}
        <input className="dx-input dx-num" type="number" min="0" placeholder="Min $" value={minP} onChange={(e) => setMinP(e.target.value)} aria-label="Minimum price" />
        <input className="dx-input dx-num" type="number" min="0" placeholder="Max $" value={maxP} onChange={(e) => setMaxP(e.target.value)} aria-label="Maximum price" />
        <label className="dx-check">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
          In stock only
        </label>
        {dirty && <button type="button" className="dx-btn" onClick={clear}>Clear</button>}
      </div>

      {/* ---------- table ---------- */}
      <div className="dx-table-wrap">
        <table className="dx-table dx-ptable">
          <thead>
            <tr>
              <th aria-label="Picture" />
              <th><button type="button" className="dx-th" onClick={() => toggleSort("name")}>Product{arrow("name")}</button></th>
              <th><button type="button" className="dx-th" onClick={() => toggleSort("category")}>Category{arrow("category")}</button></th>
              <th><button type="button" className="dx-th" onClick={() => toggleSort("stock")}>Stock{arrow("stock")}</button></th>
              <th><button type="button" className="dx-th" onClick={() => toggleSort("price")}>Price{arrow("price")}</button></th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={6} className="dx-tbl-empty">No products match your filters.</td></tr>
            ) : rows.map((p) => {
              const pc = CATEGORIES.find((c) => c.id === p.category);
              const soldOut = p.stock === 0;
              return (
                <tr key={p.id}>
                  <td className="dx-tbl-pic"><div className="dx-thumb"><ProductImage product={p} category={pc} size={20} /></div></td>
                  <td className="dx-tbl-name">
                    <b>{p.name}</b>
                    {p.description && <small>{p.description}</small>}
                  </td>
                  <td>{pc?.label}</td>
                  <td>{soldOut ? <span className="dx-out">Sold out</span> : p.stock ?? "—"}</td>
                  <td><b>${Number(p.price).toFixed(2)}</b></td>
                  <td>
                    <button
                      type="button"
                      className={"dx-tbl-add" + (flash === p.id ? " ok" : "")}
                      disabled={soldOut}
                      onClick={() => onAdd(p.id)}
                    >
                      {flash === p.id ? <><Icon name="check" size={16} />Added</> : <><Icon name="cart" size={16} />Add</>}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ---------- pagination ---------- */}
      <div className="dx-pager">
        <span className="dx-pager-info">
          {filtered.length === 0 ? "0 results" : `${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length}`}
        </span>
        <label className="dx-pager-size">
          Rows
          <select className="dx-input" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <nav className="dx-pager-nav" aria-label="Pagination">
          <button type="button" disabled={cur === 1} onClick={() => setPage(cur - 1)} aria-label="Previous page">
            <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}><Icon name="arrow" size={16} /></span>
          </button>
          {pageNums.map((n) =>
            typeof n === "string" ? (
              <span key={n} className="dx-pager-gap">…</span>
            ) : (
              <button key={n} type="button" className={n === cur ? "on" : ""} aria-current={n === cur ? "page" : undefined} onClick={() => setPage(n)}>
                {n}
              </button>
            )
          )}
          <button type="button" disabled={cur === pages} onClick={() => setPage(cur + 1)} aria-label="Next page">
            <Icon name="arrow" size={16} />
          </button>
        </nav>
      </div>
    </div>
  );
}