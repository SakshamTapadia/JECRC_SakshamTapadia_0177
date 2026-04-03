import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const { hero } = t;

  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">{hero.badge}</span>
        <h1 className="hero-title">{hero.title}</h1>
        <p className="hero-subtitle">{hero.subtitle}</p>
        <div className="hero-btns">
          <button className="btn-primary">{hero.cta}</button>
          <button className="btn-secondary">{hero.secondary}</button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="globe-ring">
          <span className="globe">🌍</span>
        </div>
      </div>
    </section>
  );
}
