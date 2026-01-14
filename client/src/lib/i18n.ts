import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    saveMissing: true,
    backend: {
      loadPath: "/i18n/{{lng}}.json",
    },
    detection: {
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
      order: ["localStorage", "navigator"],
    },
  });
