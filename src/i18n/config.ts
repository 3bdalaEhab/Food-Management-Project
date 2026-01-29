import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { ar } from "./locales/ar";

const resources = {
    en,
    ar
};

i18n.use(initReactI18next).init({
    resources,
    lng: "ar",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
