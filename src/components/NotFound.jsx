import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function NotFound() {
  return (
    <section className="dx-page">
      <div className="dx-panel dx-center">
        <div className="dx-ico"><Icon name="alert" /></div>
        <h2>Page not found</h2>
        <p className="dx-muted">That page doesn't exist or has moved.</p>
        <Link className="dx-btn primary" to="/">Back to dashboard</Link>
      </div>
    </section>
  );
}
