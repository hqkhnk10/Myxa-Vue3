import { getGrades } from "@/api/grade";
import { defineStore } from "pinia";

export const useGradeStore = defineStore("gradeStore", {
  state: () => ({
    grade: [],
  }),
  getters: {},
  actions: {
    getAllGrades() {
      getGrades().then((res) => {
        this.grade = res.data.map((e) => ({
          value: e.gradeId,
          label: e.gradeName,
          img: e.gradeImage,
        }));
      });
    },
  },
});
