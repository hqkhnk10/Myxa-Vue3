import { getSubjects } from "@/api/subject";
import { defineStore } from "pinia";

export const useSubjectStore = defineStore("subjectStore", {
  state: () => ({
    subject: [],
  }),
  getters: {
    subjects(state){
        return state.subject
    }
  },
  actions: {
    getAllSubjects() {
      getSubjects().then((res) => {
        this.subject = res.data.map((e) => ({
          value: e.subjectId,
          label: e.subjectName,
          img: e.subjectImage,
        }));
      });
    },
  },
});
