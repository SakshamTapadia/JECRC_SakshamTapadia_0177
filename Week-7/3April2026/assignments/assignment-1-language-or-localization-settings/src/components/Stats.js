import { useLanguage } from "../context/LanguageContext";

export default function Stats() {
  const { t } = useLanguage();
  const { stats } = t;

  return (
    <section className="stats">
      {Object.values(stats).map((val, i) => (
        <div className="stat-item" key={i}>
          <span className="stat-value">{val}</span>
        </div>
      ))}
    </section>
  );
}
