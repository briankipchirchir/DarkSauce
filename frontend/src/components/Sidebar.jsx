import Icon from "./Icon.jsx";
import { CategoryIcon } from "./Media.jsx";
import { CATEGORIES } from "../data.js";

export default function Sidebar({ category, counts, total, open, onSelect, onHome, onClose }) {
  return (
    <>
      <div className={`dx-scrim ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`dx-side ${open ? "open" : ""}`} aria-label="Categories">
        <button className="dx-icon-btn dx-side-close" onClick={onClose} aria-label="Close categories">
          <Icon name="close" />
        </button>

        <nav>
          <button className={`dx-nav ${category === "all" ? "active" : ""}`} onClick={onHome}>
            <Icon name="grid" /><span>Dashboard</span>
          </button>

          <hr />
          <p className="dx-nav-label">Categories</p>

          <button className={`dx-nav ${category === "all-products" ? "active" : ""}`} onClick={() => onSelect("all-products")}>
            <Icon name="layers" /><span>All products</span><em>{total}</em>
          </button>

          {CATEGORIES.map((c) => (
            <button key={c.id} className={`dx-nav ${category === c.id ? "active" : ""}`} onClick={() => onSelect(c.id)}>
              <CategoryIcon category={c} size={20} /><span>{c.label}</span><em>{counts[c.id] ?? 0}</em>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
