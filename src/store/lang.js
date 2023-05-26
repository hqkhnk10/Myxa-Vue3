import { defineStore } from "pinia";
/**
 * Store to change the language globally
 * CreatedBy: QTNgo(15/05/2023)
 */
export const useLangStore = defineStore("lang", {
  state: () => {
    return { locale: "vi"};
  },
  getters: {
    getLocale: (state) => state.locale,
  },
  actions: {
    changeLanguage(lang) {
      this.locale = lang;
    },
  },
});
