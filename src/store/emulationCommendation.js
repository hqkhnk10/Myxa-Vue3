import { defineStore } from "pinia";
import request from "@/axios";

const url = "EmulationCommendation";
export const useEmulationCommendationStore = defineStore("useEmulationCommendationStore", {
  state: () => ({
    options: [],
    parameters: {},
  }),
  getters: {
    data(state) {
      return state.options;
    },
  },
  actions: {
    /**
     * Get data from backend
     * @param {*} params (optional) to filter or pagination
     */
    async getEmulationCommendation(params) {
      Object.assign(this.parameters, params); //keep the original parameters
      return await request.get({ url: url, params: this.parameters })
    }
  },
});
