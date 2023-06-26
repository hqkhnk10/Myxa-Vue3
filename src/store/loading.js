import { defineStore } from "pinia";
/**
 * Store to change the loading globally
 * CreatedBy: NQTruong(15/05/2023)
 */
export const useLoadingStore = defineStore("loading", {
  state: () => {
    return { isLoading: false };
  },
  getters: {
    getLoading: (state) => state.isLoading,
  },
  actions: {
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
  },
});
