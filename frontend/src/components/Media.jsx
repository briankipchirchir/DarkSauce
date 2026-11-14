import { useState } from "react";
import Icon from "./Icon.jsx";

// Remember pictures that failed to load so we don't retry them for every card
const failed = new Set();

function useImage(src) {
  const [bad, setBad] = useState(() => failed.has(src));
  const onError = () => { failed.add(src); setBad(true); };
  return [Boolean(src) && !bad, onError];
}

/* Product picture; falls back to the category icon if there is no picture yet */
export function ProductImage({ product, category, size = 34 }) {
  const [show, onError] = useImage(product.image);
  if (show) {
    return (
      <img
        className="dx-pimg"
        src={product.image}
        alt=""
        loading="lazy"
        style={{ objectFit: product.imageFit || "cover" }}
        onError={onError}
      />
    );
  }
  return <Icon name={category?.icon || "layers"} size={size} />;
}

/* Category icon: real picture if set, otherwise a built-in icon */
export function CategoryIcon({ category, size = 20 }) {
  const [show, onError] = useImage(category.image);
  if (show) {
    return <img className="dx-cimg" src={category.image} alt="" width={size} height={size} onError={onError} />;
  }
  return <Icon name={category.icon || "layers"} size={size} />;
}

/* Coin logo: renders nothing if the logo file isn't there */
export function CoinLogo({ src, size = 18, fallback = null }) {
  const [show, onError] = useImage(src);
  if (!show) return fallback;
  return <img className="dx-clogo" src={src} alt="" width={size} height={size} onError={onError} />;
}
