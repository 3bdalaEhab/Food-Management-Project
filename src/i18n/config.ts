import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { ar } from "./locales/ar";

const resources = {
    en,
    ar
};

const getInitialLanguage = () => {
    try {
        const savedStorage = localStorage.getItem("app-storage");
        if (savedStorage) {
            const parsed = JSON.parse(savedStorage);
            return parsed.state?.language || "ar";
        }
    } catch (e) {
        console.error("Failed to parse language from storage", e);
    }
    return "ar";
};

i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
