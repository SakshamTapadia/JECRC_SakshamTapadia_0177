import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-brand">
        <span>🌍</span> GlobalApp
      </div>
      <p className="footer-tagline">{t.footer.tagline}</p>
      <p className="footer-rights">© {new Date().getFullYear()} GlobalApp. {t.footer.rights}</p>
    </footer>
  );
}
