import { Rose } from "lucide-react";

import "./CheckoutPage.css";

export default function CheckoutPage() {
  return (
    <div className="page">
      {/* Navbar */}
      <nav className="navbar">
        <a href="/" className="navbar__logo">
          <span className="navbar__logo-icon">
            <Rose />
          </span>
          F.LOVER
        </a>
      </nav>
    </div>
  );
}
