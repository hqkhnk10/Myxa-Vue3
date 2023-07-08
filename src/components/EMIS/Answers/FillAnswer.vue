<template>
  <div class="exercise-container">
    <div v-for="(answer, index) in answers" :key="index" class="fill-container">
      <div class="fill-title">Ô trống {{ index + 1 }}</div>
      <div class="fill-tag">
        <misa-tag
          v-model="answer.answerContent"
          closeable
          @click-close="clickClose(index)"
        ></misa-tag>
      </div>
    </div>
    <div class="fill-button" @click="addAnswer">
      <div class="fill-title"></div>
      <div class="add-answer title w-full">
        <img
          alt="add"
          src="https://sisapapp.misacdn.net/lms/img/ic_add-answer.9486a95a.svg"
          width="12"
        />
        <span class="button-title"> Thêm đáp án </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useExerciseStore } from "@/store/exercise";
defineProps(["answers"]);
const exerciseStore = useExerciseStore();

const addAnswer = () => {
  exerciseStore.addAnswer();
};
const clickClose = (index) => {
  exerciseStore.deleteAnswer(index);
};
</script>

<style lang="scss" scoped>
.fill-container {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .fill-tag {
    flex: 1;
  }
}
.fill-button {
  margin-top: 12px;
  display: flex;
  .add-answer {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #b6b9ce;
    border-radius: 10px;
    background-color: #f1f2f7;
    cursor: pointer;
    color: rgba(78, 91, 106, 0.7);
    .button-title {
      margin-left: 12px;
    }
  }
}
.fill-title {
  min-width: 5rem;
  max-width: 5rem;
  margin-right: 4px;
}
.exercise-container {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
}
</style>
