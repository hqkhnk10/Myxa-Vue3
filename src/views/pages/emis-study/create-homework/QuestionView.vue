<template>
  <div class="question" :class="formatBgBaseOnQuestionType">
    <div
      class="question-decore"
      :class="formatBgBaseOnQuestionType(question?.questionType)"
    ></div>
    <div class="question-container">
      <div class="question-content">
        <div class="question-index">{{ index + 1 }}.</div>
        <div v-html="question.questionContent"></div>
      </div>
      <div class="answer-container">
        <div
          v-for="(answer, index) in question.answers"
          :key="index"
          class="answer-content"
        >
          <div class="answer__index" :class="{ true: answer.answerStatus }">
            {{ formatIndexToAlphabet(index) }}
          </div>
          <div v-html="answer.answerContent"></div>
        </div>
      </div>
      <div class="question-button">
        <div>
          <misa-button type="default" @click="openDialog">{{
            t("emis.edit")
          }}</misa-button>
        </div>
        <div>
          <misa-button type="default" class="icon">
            <img :src="duplicate" alt="duplicate" />
          </misa-button>
        </div>
        <div>
          <misa-button type="default" class="icon">
            <img :src="deleteIcon" alt="icon" />
          </misa-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import {
  formatIndexToAlphabet,
  formatBgBaseOnQuestionType,
} from "@/js/format/format";
import { duplicate, deleteIcon } from "@/js/img/getImg";
import { emitter } from "@/main";
import MisaEnum from "@/js/base/enum";

/**
 * Mở dialog sửa
 * Created By: NQTruong (20/06/2023)
 */
const openDialog = () => {
  emitter.emit("homework-dialog-visible", {
    isShow: true,
    formType: MisaEnum.FormActions.Edit,
    questionTypes: props.question?.questionType,
    index: props.index,
  });
};
const props = defineProps({
  question: {
    type: Object,
    default: () => {},
  },
  index: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.question {
  background: white;
  margin: 24px 0px;
  border-radius: 10px;
}
.answer-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid #eaebf5;
}
.answer-content {
  margin-bottom: 16px;
}
.answer-content,
.question-content {
  display: flex;
  gap: 8px;
  align-items: center;
}
.answer__index {
  color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  background-color: #b6b9ce;
}
.answer__index.true {
  background-color: #00c542;
}
.question-button {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.question-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.question-index {
  font-weight: 700;
}
.question-decore {
  height: 8px;
  border-radius: 6px 6px 0 0;
}
.question-decore.blue {
  background-color: rgb(0, 169, 236);
}
.question-decore.pink {
  background-color: rgb(255, 88, 140);
}
</style>
