const translations = {
  en: {
    name: "English", flag: "🇬🇧", dir: "ltr",
    nav: { home: "Home", about: "About", services: "Services", contact: "Contact" },
    hero: {
      badge: "Welcome",
      title: "Build Global Products",
      subtitle: "Reach millions of users worldwide with seamless internationalization powered by React Context API.",
      cta: "Get Started", secondary: "Learn More"
    },
    features: {
      heading: "Why Choose Us",
      items: [
        { icon: "🌐", title: "Multi-Language", desc: "Support 6+ languages with instant switching and zero page reload." },
        { icon: "⚡", title: "Blazing Fast", desc: "Optimized context architecture for maximum performance." },
        { icon: "🎨", title: "RTL Support", desc: "Automatic right-to-left layout for Arabic and similar languages." },
        { icon: "🔒", title: "Type Safe", desc: "Fully structured translations with consistent key mapping." },
        { icon: "📱", title: "Responsive", desc: "Beautiful experience across all screen sizes and devices." },
        { icon: "🚀", title: "Production Ready", desc: "Enterprise-grade localization for real-world applications." }
      ]
    },
    stats: { users: "10K+ Users", languages: "6 Languages", uptime: "99.9% Uptime", support: "24/7 Support" },
    footer: { rights: "All rights reserved.", tagline: "Made with ❤️ for a global audience." }
  },
  es: {
    name: "Español", flag: "🇪🇸", dir: "ltr",
    nav: { home: "Inicio", about: "Nosotros", services: "Servicios", contact: "Contacto" },
    hero: {
      badge: "Bienvenido",
      title: "Crea Productos Globales",
      subtitle: "Llega a millones de usuarios en todo el mundo con una internacionalización perfecta impulsada por React Context API.",
      cta: "Comenzar", secondary: "Saber Más"
    },
    features: {
      heading: "¿Por Qué Elegirnos?",
      items: [
        { icon: "🌐", title: "Multi-Idioma", desc: "Soporte para 6+ idiomas con cambio instantáneo y sin recarga de página." },
        { icon: "⚡", title: "Ultra Rápido", desc: "Arquitectura de contexto optimizada para máximo rendimiento." },
        { icon: "🎨", title: "Soporte RTL", desc: "Diseño derecha a izquierda automático para árabe y similares." },
        { icon: "🔒", title: "Tipo Seguro", desc: "Traducciones totalmente estructuradas con mapeo de claves consistente." },
        { icon: "📱", title: "Responsivo", desc: "Experiencia hermosa en todos los tamaños de pantalla y dispositivos." },
        { icon: "🚀", title: "Listo para Producción", desc: "Localización de nivel empresarial para aplicaciones reales." }
      ]
    },
    stats: { users: "10K+ Usuarios", languages: "6 Idiomas", uptime: "99.9% Disponibilidad", support: "Soporte 24/7" },
    footer: { rights: "Todos los derechos reservados.", tagline: "Hecho con ❤️ para una audiencia global." }
  },
  fr: {
    name: "Français", flag: "🇫🇷", dir: "ltr",
    nav: { home: "Accueil", about: "À Propos", services: "Services", contact: "Contact" },
    hero: {
      badge: "Bienvenue",
      title: "Créez des Produits Mondiaux",
      subtitle: "Atteignez des millions d'utilisateurs dans le monde entier grâce à une internationalisation transparente propulsée par React Context API.",
      cta: "Commencer", secondary: "En Savoir Plus"
    },
    features: {
      heading: "Pourquoi Nous Choisir",
      items: [
        { icon: "🌐", title: "Multi-Langue", desc: "Prise en charge de 6+ langues avec changement instantané sans rechargement de page." },
        { icon: "⚡", title: "Ultra Rapide", desc: "Architecture de contexte optimisée pour des performances maximales." },
        { icon: "🎨", title: "Support RTL", desc: "Mise en page droite à gauche automatique pour l'arabe et les langues similaires." },
        { icon: "🔒", title: "Type Sécurisé", desc: "Traductions entièrement structurées avec un mappage de clés cohérent." },
        { icon: "📱", title: "Responsive", desc: "Expérience magnifique sur toutes les tailles d'écran et appareils." },
        { icon: "🚀", title: "Prêt pour la Production", desc: "Localisation de niveau entreprise pour les applications du monde réel." }
      ]
    },
    stats: { users: "10K+ Utilisateurs", languages: "6 Langues", uptime: "99.9% Disponibilité", support: "Support 24/7" },
    footer: { rights: "Tous droits réservés.", tagline: "Fait avec ❤️ pour un public mondial." }
  },
  de: {
    name: "Deutsch", flag: "🇩🇪", dir: "ltr",
    nav: { home: "Startseite", about: "Über Uns", services: "Dienste", contact: "Kontakt" },
    hero: {
      badge: "Willkommen",
      title: "Globale Produkte Entwickeln",
      subtitle: "Erreichen Sie Millionen von Nutzern weltweit mit nahtloser Internationalisierung powered by React Context API.",
      cta: "Loslegen", secondary: "Mehr Erfahren"
    },
    features: {
      heading: "Warum Uns Wählen",
      items: [
        { icon: "🌐", title: "Mehrsprachig", desc: "Unterstützung für 6+ Sprachen mit sofortigem Wechsel ohne Seitenneuladen." },
        { icon: "⚡", title: "Blitzschnell", desc: "Optimierte Kontextarchitektur für maximale Leistung." },
        { icon: "🎨", title: "RTL-Unterstützung", desc: "Automatisches Rechts-nach-Links-Layout für Arabisch und ähnliche Sprachen." },
        { icon: "🔒", title: "Typsicher", desc: "Vollständig strukturierte Übersetzungen mit konsistenter Schlüsselzuordnung." },
        { icon: "📱", title: "Responsiv", desc: "Schöne Erfahrung auf allen Bildschirmgrößen und Geräten." },
        { icon: "🚀", title: "Produktionsbereit", desc: "Lokalisierung auf Unternehmensebene für reale Anwendungen." }
      ]
    },
    stats: { users: "10K+ Benutzer", languages: "6 Sprachen", uptime: "99.9% Verfügbarkeit", support: "24/7 Support" },
    footer: { rights: "Alle Rechte vorbehalten.", tagline: "Mit ❤️ für ein globales Publikum gemacht." }
  },
  ja: {
    name: "日本語", flag: "🇯🇵", dir: "ltr",
    nav: { home: "ホーム", about: "私たちについて", services: "サービス", contact: "お問い合わせ" },
    hero: {
      badge: "ようこそ",
      title: "グローバル製品を構築する",
      subtitle: "React Context APIを活用したシームレスな国際化で、世界中の何百万人ものユーザーにリーチしましょう。",
      cta: "始める", secondary: "詳細を見る"
    },
    features: {
      heading: "選ばれる理由",
      items: [
        { icon: "🌐", title: "多言語対応", desc: "ページリロードなしで6つ以上の言語を即座に切り替え。" },
        { icon: "⚡", title: "超高速", desc: "最大パフォーマンスのための最適化されたコンテキストアーキテクチャ。" },
        { icon: "🎨", title: "RTLサポート", desc: "アラビア語などの言語のための自動右から左レイアウト。" },
        { icon: "🔒", title: "型安全", desc: "一貫したキーマッピングで完全に構造化された翻訳。" },
        { icon: "📱", title: "レスポンシブ", desc: "すべての画面サイズとデバイスで美しい体験。" },
        { icon: "🚀", title: "本番対応", desc: "実際のアプリケーション向けのエンタープライズグレードのローカライゼーション。" }
      ]
    },
    stats: { users: "1万人以上のユーザー", languages: "6言語", uptime: "99.9%稼働時間", support: "24時間サポート" },
    footer: { rights: "全著作権所有。", tagline: "グローバルなオーディエンスのために❤️で作られました。" }
  },
  ar: {
    name: "العربية", flag: "🇸🇦", dir: "rtl",
    nav: { home: "الرئيسية", about: "من نحن", services: "الخدمات", contact: "اتصل بنا" },
    hero: {
      badge: "مرحباً",
      title: "بناء منتجات عالمية",
      subtitle: "تواصل مع ملايين المستخدمين حول العالم من خلال التدويل السلس المدعوم بـ React Context API.",
      cta: "ابدأ الآن", secondary: "اعرف أكثر"
    },
    features: {
      heading: "لماذا تختارنا",
      items: [
        { icon: "🌐", title: "متعدد اللغات", desc: "دعم 6+ لغات مع تبديل فوري دون إعادة تحميل الصفحة." },
        { icon: "⚡", title: "سريع للغاية", desc: "هندسة سياق محسّنة لأقصى أداء." },
        { icon: "🎨", title: "دعم RTL", desc: "تخطيط تلقائي من اليمين لليسار للعربية واللغات المشابهة." },
        { icon: "🔒", title: "آمن النوع", desc: "ترجمات منظمة بالكامل مع تعيين مفاتيح متسق." },
        { icon: "📱", title: "متجاوب", desc: "تجربة رائعة عبر جميع أحجام الشاشات والأجهزة." },
        { icon: "🚀", title: "جاهز للإنتاج", desc: "توطين على مستوى المؤسسات للتطبيقات الحقيقية." }
      ]
    },
    stats: { users: "+10K مستخدم", languages: "6 لغات", uptime: "99.9% وقت التشغيل", support: "دعم 24/7" },
    footer: { rights: "جميع الحقوق محفوظة.", tagline: "صُنع بـ ❤️ لجمهور عالمي." }
  }
};

export default translations;
