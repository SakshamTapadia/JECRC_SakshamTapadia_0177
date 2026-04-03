import { useLanguage } from "../context/LanguageContext";

export default function Features() {
  const { t } = useLanguage();
  const { features } = t;

  return (
    <section className="features">
      <h2 className="section-heading">{features.heading}</h2>
      <div className="features-grid">
        {features.items.map((item, i) => (
          <div className="feature-card" key={i}>
            <span className="feature-icon">{item.icon}</span>
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
