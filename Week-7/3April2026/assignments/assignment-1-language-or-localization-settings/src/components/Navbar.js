import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { t, lang, switchLanguage, languages } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🌍</span>
        <span className="brand-name">GlobalApp</span>
      </div>

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {Object.values(t.nav).map((item, i) => (
          <li key={i}><a href="#!" onClick={() => setMenuOpen(false)}>{item}</a></li>
        ))}
      </ul>

      <div className="navbar-actions">
        <div className="lang-dropdown">
          <button className="lang-btn" onClick={() => setDropOpen(!dropOpen)}>
            <span>{languages[lang].flag}</span>
            <span>{languages[lang].name}</span>
            <span className={`chevron ${dropOpen ? "up" : ""}`}>▾</span>
          </button>
          {dropOpen && (
            <div className="lang-menu">
              {Object.entries(languages).map(([code, info]) => (
                <button
                  key={code}
                  className={`lang-option ${lang === code ? "active" : ""}`}
                  onClick={() => { switchLanguage(code); setDropOpen(false); }}
                >
                  <span>{info.flag}</span>
                  <span>{info.name}</span>
                  {lang === code && <span className="check">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
