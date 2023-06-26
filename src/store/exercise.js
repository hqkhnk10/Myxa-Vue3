import { getDetailExercise } from "@/api/exercise";
import { defineStore } from "pinia";

export const useExerciseStore = defineStore("exerciseStore", {
  state: () => ({
    exercise: [],
    detailExercise: {
      exerciseName: "",
      subjectId: "",
      gradeId: "",
      subjectImage: "",
      topicId: null,
    },
  }),
  getters: {
    // automatically infers the return type as a number
    exercise(state) {
      return state.exercise;
    },
    getDetailExercise(state) {
      return state.detailExercise;
    },
  },
  actions: {
    getExercises() {},
    getExerciseById(id) {
      getDetailExercise(id).then((res) => {
        this.detailExercise = { ...res.data };
      });
    },
    resetValue() {
      this.detailExercise = {};
    },
  },
});
