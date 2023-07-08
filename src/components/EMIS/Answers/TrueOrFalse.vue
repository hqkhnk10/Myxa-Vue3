<template>
  <div class="exercise-answer">
    <div class="answer-card hidden"></div>
    <div
      v-for="(answer, index) in answers"
      :key="index"
      class="answer-card"
      :class="getAnswerBg(index)"
    >
      <div class="answer-header">
        <div>{{ formatIndexToAlphabet(index) }}</div>
        <div class="answer-icon">
          <div
            class="checkbox-icon toolbar-icon bg-default"
            :class="{ 'tick-status': answer.answerStatus }"
            @click="exerciseStore.changeStatus(index)"
          >
            <img
              src="https://sisapapp.misacdn.net/lms/img/ic_uncheck.ceabec80.svg"
              width="14"
              alt="icon"
            />
          </div>
        </div>
      </div>
      <div class="answer-body">
        <div class="answer-content">
          <input v-model="answer.answerContent" class="trans-input" />
        </div>
      </div>
    </div>
    <div class="answer-card hidden"></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { formatIndexToAlphabet, getAnswerBg } from "@/js/format/format";
import { useExerciseStore } from "@/store/exercise";
defineProps(["answers"]);

const exerciseStore = useExerciseStore();
</script>
<style scoped>
.answer-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.trans-input {
  text-align: center;
  border: none;
  background: transparent;
}
.exercise-answer {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}
</style>
