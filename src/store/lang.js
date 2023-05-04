import { defineStore } from "pinia";

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
