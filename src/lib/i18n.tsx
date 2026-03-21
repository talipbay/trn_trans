"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Locale = "ru" | "kz" | "en";

const translations = {
  ru: {
    // Navbar
    "nav.about": "О компании",
    "nav.career": "Карьера",
    "nav.contacts": "Контакты",
    "nav.documents": "Документы",
    "nav.contact_us": "Связаться",
    "nav.docs.founding": "Учредительные документы",
    "nav.docs.social": "Социальная ответственность",
    "nav.docs.news": "Новости",
    "nav.docs.contracts": "Договоры и документы",

    // Hero
    "hero.next": "Далее",
    "hero.vertical_left": "TRN Trans — Logistics",
    "hero.vertical_right": "Надежный партнер вашего бизнеса",

    // About
    "about.label": "О компании",
    "about.title": "TRN Trans",
    "about.description": "Транспортно-логистическая компания, предоставляющая услуги по перевозке грузов железнодорожным и автотранспортом, ведет проектную логистику. Является частью холдинга Turan Asset Management.",
    "about.item1.title": "Опыт и экспертиза",
    "about.item1.text": "Команда профессионалов, зарекомендовавшая себя на рынке Евразии с опытом работы более 10 лет",
    "about.item2.title": "Перевозки «под ключ»",
    "about.item2.text": "Организация перевозок «под ключ» для вашего бизнеса",
    "about.item3.title": "Консультации",
    "about.item3.text": "Возможность оказания консультаций по технологическим ж/д процессам",

    // Contact form
    "form.label": "Обратная связь",
    "form.title": "Оставьте заявку",
    "form.description": "Заполните форму, и наши специалисты свяжутся с вами в ближайшее время для обсуждения деталей сотрудничества.",
    "form.name": "Ваше имя",
    "form.name_placeholder": "Введите имя",
    "form.email": "E-mail",
    "form.phone": "Телефон",
    "form.message": "Сообщение",
    "form.message_placeholder": "Опишите ваш запрос...",
    "form.submit": "Отправить заявку",

    // Footer
    "footer.contacts": "Контакты",
    "footer.contact_us": "Свяжитесь с нами",
    "footer.company": "Компания",
    "footer.company_name": "ТОО «TRN Trans»",
    "footer.holding": "холдинг Turan Asset Management",
    "footer.navigation": "Навигация",
    "footer.whatsapp": "WhatsApp / мобильный",
    "footer.rights": "Все права защищены.",
    "footer.tagline": "Транспортно-логистическая компания, часть холдинга Turan Asset Management.",

    // Career page
    "career.label": "Карьера",
    "career.title": "Работа в TRN Trans",
    "career.text": "Мы всегда в поиске талантливых специалистов, готовых развиваться вместе с нами. Присоединяйтесь к команде профессионалов в сфере транспортной логистики.",
    "career.placeholder": "Актуальные вакансии будут опубликованы здесь.",
    "career.apply": "Откликнуться",

    // Apply modal
    "apply.label": "Отклик на вакансию",
    "apply.title": "Отправить резюме",
    "apply.resume": "Резюме (PDF, DOC)",
    "apply.upload_placeholder": "Загрузить файл",
    "apply.submit": "Отправить",
    "apply.sending": "Отправка...",
    "apply.success": "Заявка отправлена",
    "apply.error": "Ошибка отправки. Попробуйте ещё раз.",

    // Social page
    "social.label": "Документы",
    "social.title": "Социальная ответственность",
    "social.text": "Компания является спонсором триатлонного клуба Nomad. В рамках клуба функционирует детский клуб Nomad Junior, который готовит 30 юных спортсменов к Олимпиадам 2036 и 2040 годов по дисциплине триатлон. Члены клуба участвуют в любительских и профессиональных стартах, официальных соревнованиях международного, республиканского и регионального значения.",
    "social.gallery": "Галерея",

    // Sphere labels
    "sphere.container": "Контейнерные\nперевозки",
    "sphere.covered": "Крытые\nвагоны",
    "sphere.gondola": "Полувагоны",
    "sphere.auto": "Автотранспорт",
    "sphere.general": "Генеральные\nгрузы",
    "sphere.oversized": "Негабаритные\nперевозки",
    "sphere.consulting": "Консультации\nв логистике",
    "sphere.project": "Проектная\nлогистика",

    // Train stations
    "station.almaty": "Алматы",
    "station.astana": "Астана",
    "station.aktau": "Актау",
    "station.tashkent": "Ташкент",
    "station.moscow": "Москва",
    "station.china": "Китай",

    // Docs pages
    "docs.label": "Документы",
    "docs.founding.title": "Учредительные документы",
    "docs.founding.placeholder": "Учредительные документы компании будут размещены здесь.",
    "docs.news.title": "Новости",
    "docs.news.placeholder": "Новости компании будут опубликованы здесь.",
    "docs.contracts.title": "Договоры и документы",
    "docs.contracts.placeholder": "Договоры и документы компании будут размещены здесь.",
  },

  kz: {
    "nav.about": "Компания туралы",
    "nav.career": "Мансап",
    "nav.contacts": "Байланыс",
    "nav.documents": "Құжаттар",
    "nav.contact_us": "Байланысу",
    "nav.docs.founding": "Құрылтай құжаттары",
    "nav.docs.social": "Әлеуметтік жауапкершілік",
    "nav.docs.news": "Жаңалықтар",
    "nav.docs.contracts": "Шарттар мен құжаттар",

    "hero.next": "Әрі қарай",
    "hero.vertical_left": "TRN Trans — Logistics",
    "hero.vertical_right": "Сіздің бизнесіңіздің сенімді серіктесі",

    "about.label": "Компания туралы",
    "about.title": "TRN Trans",
    "about.description": "Теміржол және автокөлікпен жүк тасымалдау қызметтерін ұсынатын, жобалық логистиканы жүргізетін көлік-логистикалық компания. Turan Asset Management холдингінің бөлігі.",
    "about.item1.title": "Тәжірибе және сараптама",
    "about.item1.text": "Еуразия нарығында 10 жылдан астам тәжірибесі бар кәсіпқойлар командасы",
    "about.item2.title": "«Кілт бере» тасымалдау",
    "about.item2.text": "Сіздің бизнесіңіз үшін «кілт бере» тасымалдауды ұйымдастыру",
    "about.item3.title": "Кеңес беру",
    "about.item3.text": "Технологиялық теміржол процестері бойынша кеңес беру мүмкіндігі",

    "form.label": "Кері байланыс",
    "form.title": "Өтінім қалдырыңыз",
    "form.description": "Форманы толтырыңыз, біздің мамандар ынтымақтастық мәселелерін талқылау үшін сізбен жақын арада байланысады.",
    "form.name": "Сіздің атыңыз",
    "form.name_placeholder": "Атыңызды енгізіңіз",
    "form.email": "E-mail",
    "form.phone": "Телефон",
    "form.message": "Хабарлама",
    "form.message_placeholder": "Сұранысыңызды сипаттаңыз...",
    "form.submit": "Өтінім жіберу",

    "footer.contacts": "Байланыс",
    "footer.contact_us": "Бізбен байланысыңыз",
    "footer.company": "Компания",
    "footer.company_name": "«TRN Trans» ЖШС",
    "footer.holding": "Turan Asset Management холдингі",
    "footer.navigation": "Навигация",
    "footer.whatsapp": "WhatsApp / ұялы",
    "footer.rights": "Барлық құқықтар қорғалған.",
    "footer.tagline": "Turan Asset Management холдингінің бөлігі, көлік-логистикалық компания.",

    "career.label": "Мансап",
    "career.title": "TRN Trans-та жұмыс",
    "career.text": "Біз бізбен бірге дамуға дайын талантты мамандарды іздейміз. Көлік логистикасы саласындағы кәсіпқойлар командасына қосылыңыз.",
    "career.placeholder": "Ағымдағы бос орындар осында жарияланады.",
    "career.apply": "Жауап беру",

    "apply.label": "Бос орынға жауап",
    "apply.title": "Түйіндеме жіберу",
    "apply.resume": "Түйіндеме (PDF, DOC)",
    "apply.upload_placeholder": "Файлды жүктеу",
    "apply.submit": "Жіберу",
    "apply.sending": "Жіберілуде...",
    "apply.success": "Өтінім жіберілді",
    "apply.error": "Жіберу қатесі. Қайталап көріңіз.",

    "social.label": "Құжаттар",
    "social.title": "Әлеуметтік жауапкершілік",
    "social.text": "Компания Nomad триатлон клубының демеушісі болып табылады. Клуб аясында Nomad Junior балалар клубы жұмыс істейді, ол 30 жас спортшыны триатлон бойынша 2036 және 2040 жылдардағы Олимпиадаларға дайындайды. Клуб мүшелері әуесқой және кәсіби жарыстарға, халықаралық, республикалық және аймақтық маңызы бар ресми жарыстарға қатысады.",
    "social.gallery": "Галерея",

    "sphere.container": "Контейнерлік\nтасымалдау",
    "sphere.covered": "Жабық\nвагондар",
    "sphere.gondola": "Жартылай вагондар",
    "sphere.auto": "Автокөлік",
    "sphere.general": "Бас\nжүктер",
    "sphere.oversized": "Габаритсіз\nтасымалдау",
    "sphere.consulting": "Логистика\nбойынша кеңес",
    "sphere.project": "Жобалық\nлогистика",

    "station.almaty": "Алматы",
    "station.astana": "Астана",
    "station.aktau": "Ақтау",
    "station.tashkent": "Ташкент",
    "station.moscow": "Мәскеу",
    "station.china": "Қытай",

    "docs.label": "Құжаттар",
    "docs.founding.title": "Құрылтай құжаттары",
    "docs.founding.placeholder": "Компанияның құрылтай құжаттары осында орналастырылады.",
    "docs.news.title": "Жаңалықтар",
    "docs.news.placeholder": "Компания жаңалықтары осында жарияланады.",
    "docs.contracts.title": "Шарттар мен құжаттар",
    "docs.contracts.placeholder": "Компанияның шарттары мен құжаттары осында орналастырылады.",
  },

  en: {
    "nav.about": "About",
    "nav.career": "Career",
    "nav.contacts": "Contacts",
    "nav.documents": "Documents",
    "nav.contact_us": "Contact Us",
    "nav.docs.founding": "Founding Documents",
    "nav.docs.social": "Social Responsibility",
    "nav.docs.news": "News",
    "nav.docs.contracts": "Contracts & Documents",

    "hero.next": "Next",
    "hero.vertical_left": "TRN Trans — Logistics",
    "hero.vertical_right": "Your Reliable Business Partner",

    "about.label": "About",
    "about.title": "TRN Trans",
    "about.description": "A transport and logistics company providing freight transportation services by rail and road, conducting project logistics. Part of the Turan Asset Management holding.",
    "about.item1.title": "Experience & Expertise",
    "about.item1.text": "A team of professionals with over 10 years of experience in the Eurasian market",
    "about.item2.title": "Turnkey Transportation",
    "about.item2.text": "Turnkey transportation solutions for your business",
    "about.item3.title": "Consulting",
    "about.item3.text": "Consulting services on technological railway processes",

    "form.label": "Feedback",
    "form.title": "Leave a Request",
    "form.description": "Fill out the form and our specialists will contact you shortly to discuss cooperation details.",
    "form.name": "Your Name",
    "form.name_placeholder": "Enter your name",
    "form.email": "E-mail",
    "form.phone": "Phone",
    "form.message": "Message",
    "form.message_placeholder": "Describe your request...",
    "form.submit": "Submit Request",

    "footer.contacts": "Contacts",
    "footer.contact_us": "Get in Touch",
    "footer.company": "Company",
    "footer.company_name": "TRN Trans LLP",
    "footer.holding": "Turan Asset Management holding",
    "footer.navigation": "Navigation",
    "footer.whatsapp": "WhatsApp / Mobile",
    "footer.rights": "All rights reserved.",
    "footer.tagline": "Transport and logistics company, part of Turan Asset Management holding.",

    "career.label": "Career",
    "career.title": "Work at TRN Trans",
    "career.text": "We are always looking for talented professionals ready to grow with us. Join our team of experts in transport logistics.",
    "career.placeholder": "Current vacancies will be published here.",
    "career.apply": "Apply",

    "apply.label": "Job Application",
    "apply.title": "Submit Your Resume",
    "apply.resume": "Resume (PDF, DOC)",
    "apply.upload_placeholder": "Upload file",
    "apply.submit": "Submit",
    "apply.sending": "Sending...",
    "apply.success": "Application submitted",
    "apply.error": "Failed to submit. Please try again.",

    "social.label": "Documents",
    "social.title": "Social Responsibility",
    "social.text": "The company sponsors the Nomad triathlon club. The club operates the Nomad Junior children's club, which prepares 30 young athletes for the 2036 and 2040 Olympics in triathlon. Club members participate in amateur and professional races, official competitions of international, national and regional significance.",
    "social.gallery": "Gallery",

    "sphere.container": "Container\nShipping",
    "sphere.covered": "Covered\nWagons",
    "sphere.gondola": "Gondola Cars",
    "sphere.auto": "Road Transport",
    "sphere.general": "General\nCargo",
    "sphere.oversized": "Oversized\nCargo",
    "sphere.consulting": "Logistics\nConsulting",
    "sphere.project": "Project\nLogistics",

    "station.almaty": "Almaty",
    "station.astana": "Astana",
    "station.aktau": "Aktau",
    "station.tashkent": "Tashkent",
    "station.moscow": "Moscow",
    "station.china": "China",

    "docs.label": "Documents",
    "docs.founding.title": "Founding Documents",
    "docs.founding.placeholder": "Company founding documents will be placed here.",
    "docs.news.title": "News",
    "docs.news.placeholder": "Company news will be published here.",
    "docs.contracts.title": "Contracts & Documents",
    "docs.contracts.placeholder": "Company contracts and documents will be placed here.",
  },
} as const;

type TranslationKey = keyof typeof translations.ru;

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}>({
  locale: "ru",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ru");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && (saved === "ru" || saved === "kz" || saved === "en")) {
      setLocale(saved);
    }
  }, []);

  const changeLocale = (l: Locale) => {
    setLocale(l);
    localStorage.setItem("locale", l);
  };

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || translations.ru[key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
