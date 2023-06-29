<template>
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
        <CKEditorAnswer v-model="answer.answerContent"></CKEditorAnswer>
      </div>
    </div>
  </div>
  <div class="answer-card hidden"></div>
</template>

<script setup>
import { defineProps } from "vue";
import CKEditorAnswer from "@/components/CKEditor/CKEditorAnswer.vue";
import { formatIndexToAlphabet, getAnswerBg } from "@/js/format/format";
import { useExerciseStore } from "@/store/exercise";
defineProps(["answers"]);

const exerciseStore = useExerciseStore();
</script>
