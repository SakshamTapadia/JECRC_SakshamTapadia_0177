import { createContext, useContext, useState, useCallback } from "react";
import translations from "../translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const switchLanguage = useCallback((code) => {
    if (translations[code]) setLang(code);
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, switchLanguage, languages: translations }}>
      <div dir={t.dir} lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
