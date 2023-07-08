<template>
  <div class="exercise-answer">
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
            class="delete-icon toolbar-icon"
            @click="exerciseStore.deleteAnswer(index)"
          >
            <img
              src="https://sisapapp.misacdn.net/lms/img/icon_delete.9097d258.svg"
              width="18"
              alt="icon"
            />
          </div>
          <div
            class="checkbox-icon toolbar-icon bg-default"
            id="checkbox-0"
            :class="{ 'tick-status': answer.answerStatus }"
            @click="exerciseStore.checkStatus(index)"
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
          <CKEditorAnswer v-model="answer.answerContent"></CKEditorAnswer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import CKEditorAnswer from "@/components/CKEditor/CKEditorAnswer.vue";
import { formatIndexToAlphabet, getAnswerBg } from "@/js/format/format";
import { useExerciseStore } from "@/store/exercise";
defineProps(["answers"]);

const exerciseStore = useExerciseStore();
</script>

<style>
.answer-card {
  width: 245px;
  height: 232px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
  gap: 8px;
  position: relative;
}
.answer-card .hidden {
  visibility: hidden;
}
.toolbar-icon {
  background-color: #fff;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 8px;
  outline: none;
}
.toolbar-icon:hover {
  transform: scale(1.2);
  transition: 0.3s;
}
.tick-status {
  background-color: #00c542;
}
.answer-content {
  height: 100%;
  max-height: 170px;
}
.answer-body {
  height: 200px;
}
.answer-content:has(.ck-focused) {
  border-radius: 10px;
  border: 3px solid;
  border-color: #f59ad4;
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-width: thin;
  transition: 0.2s;
}
.answer-header {
  display: flex;
  justify-content: space-between;
}
.answer-icon {
  display: flex;
}
.answer-bg-white {
  background-color: white;
}
.answer-bg-pink {
  background-color: rgb(255, 214, 240);
}
.answer-bg-green {
  background-color: rgb(172, 235, 241);
}
.answer-bg-orange {
  background-color: rgb(252, 208, 198);
}
.answer-bg-blue {
  background-color: rgb(196, 229, 255);
}
.exercise-answer {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}
</style>
