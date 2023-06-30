<template>
  <div class="question" :class="formatBgBaseOnQuestionType">
    <div
      class="question-decore"
      :class="formatBgBaseOnQuestionType(question?.questionType)"
    ></div>
    <div class="question-container">
      <div class="question-content">
        <div class="question-index">{{ index + 1 }}.</div>
        <div v-html="question.questionContent" class="html-content"></div>
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
          <div v-html="answer.answerContent" class="html-content answer"></div>
        </div>
      </div>
      <div class="note-container" v-if="question.questionNote">
        <div class="note-title">
          Lời giải:
        </div>
        <div v-html="question.questionNote" class="html-content"></div>
      </div>
      <div class="question-button">
        <div>
          <misa-button
            type="default"
            @click="openDialog(MisaEnum.FormActions.Edit)"
            >{{ t("emis.edit") }}</misa-button
          >
        </div>
        <div>
          <misa-button
            type="default"
            class="icon"
            @click="openDialog(MisaEnum.FormActions.Clone)"
          >
            <img :src="duplicate" alt="duplicate" />
          </misa-button>
        </div>
        <div>
          <misa-button type="default" class="icon" @click="openConfirmDialog">
            <img :src="deleteIcon" alt="icon" />
          </misa-button>
        </div>
      </div>
    </div>
  </div>
  <misa-confirm-dialog
    v-if="confirmDialog"
    v-model="confirmDialog"
    title="EMIS Ôn tập"
    @keydown.enter="removeRow"
  >
    <template #content>
      <div>Bạn có chắc chắn muốn xóa câu hỏi không?</div>
    </template>
    <template #button>
      <misa-button type="default" @click="closeConfirmDialog">{{
        t("reuse.cancel")
      }}</misa-button>
      <misa-button @click="removeRow">{{ t("reuse.remove") }}</misa-button>
    </template>
  </misa-confirm-dialog>
</template>

<script setup>
import { defineProps, ref } from "vue";
import {
  formatIndexToAlphabet,
  formatBgBaseOnQuestionType,
  decodeHtml,
} from "@/js/format/format";
import { duplicate, deleteIcon } from "@/js/img/getImg";
import { emitter } from "@/main";
import MisaEnum from "@/js/base/enum";
import { useExerciseStore } from "@/store/exercise";

/**
 * Mở dialog sửa
 * Created By: NQTruong (20/06/2023)
 */
const openDialog = (type) => {
  emitter.emit("homework-dialog-visible", {
    isShow: true,
    formType: type,
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
const exerciseStore = useExerciseStore();
const confirmDialog = ref(false);
/**
 * open confirm dialog before delete row
 * Created At: 10/05/2023
 * @author NQTruong
 */
const openConfirmDialog = () => {
  confirmDialog.value = true;
};
/**
 * close confirm dialog
 *Created At: 10/05/2023
 *@author NQTruong
 */
const closeConfirmDialog = () => {
  confirmDialog.value = false;
};
const removeRow = () => {
  exerciseStore.deleteQuestion(props.question.questionId);
  closeConfirmDialog();
};
</script>

<style scoped>
.question {
  background: white;
  margin: 0 0 24px 0px;
  box-shadow: 0 3px 20px rgba(90, 125, 141, 0.16);
  border-radius: 0 0 6px 6px;
}
.answer-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid #eaebf5;
}
.note-container{
  display: flex;
  gap: 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eaebf5;
}
.answer-content {
  margin-bottom: 16px;
}
.answer-content,
.question-content {
  display: flex;
  gap: 8px;
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
.html-content.answer {
  padding-top: 4px;
}
:deep(.html-content > *) {
  margin: 0;
  padding: 0;
}
.note-title{
  font-weight: 700;
}
</style>
