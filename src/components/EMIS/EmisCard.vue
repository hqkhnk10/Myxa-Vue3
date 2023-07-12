<script setup>
import { defineProps, ref, computed } from "vue";
import { getSubjectImgFromId } from "@/js/img/getSubjectImg";
import {
  formatBgBaseOnSubjectId,
  formatStatusExercise,
} from "@/js/format/format";
import { useRouter } from "vue-router";
import MisaEnum from "@/js/base/enum";
import { deleteExercise } from "@/api/exercise";
import { dispatchNotification } from "../Notification";
import { useExerciseStore } from "@/store/exercise";
import { globals } from "@/main";
const props = defineProps(["value"]);

const dropdownVisible = ref(false);
const confirmDialog = ref(false);
const exerciseStore = useExerciseStore();
const { push } = useRouter();
const detail = () => {
  push(MisaEnum.Router.PreparePage + "/" + props.value.exerciseId);
};
/**
 * Chuyển sang trang xem chi tiết
 * Created By: NQTruong (20/06/2023)
 */
const detailExercise = () => {
  push(MisaEnum.Router.PreparePage + "/" + props.value.exerciseId);
};
const remove = () => {
  confirmDialog.value = true;
};
const closeConfirmDialog = () => {
  confirmDialog.value = false;
};
const removeRow = () => {
  deleteExercise(props.value.exerciseId).then(() => {
    dispatchNotification({
      content: globals.t("reuse.deleteSuccess"),
      type: "success",
    });
    exerciseStore.getExercises();
  });
  closeConfirmDialog()
};
const exerciseName = computed(() =>
  props.value.exerciseName
    ? props.value.exerciseName
    : `Bài nháp ${props.value.subjectName} - ${props.value.gradeName}`
);
</script>
<template>
  <div class="card-container" @click="detailExercise()">
    <div class="card-image">
      <div
        class="card-subject"
        :class="formatBgBaseOnSubjectId(props.value.subjectId)"
      >
        {{ props.value.gradeName }} - {{ props.value.subjectName }}
      </div>
      <img
        class="card-image"
        alt="subject"
        :src="getSubjectImgFromId(props.value.subjectId)"
      />
    </div>
    <div class="card-description">
      <div class="card-header">
        <div class="card-title">{{ exerciseName }}</div>
        <div
          class="card-button"
          @click.stop="dropdownVisible = !dropdownVisible"
        >
          <div class="card-dropdown" v-show="dropdownVisible">
            <div class="dropdown-item" @click="detail">Xem</div>
            <div class="dropdown-item" @click="remove">Xóa</div>
          </div>
          <img src="../../assets/emis/icon/three_dots.svg" alt="more" />
        </div>
      </div>
      <div class="card-extend">
        <div class="card-icon">
          <img src="../../assets/emis/icon/stack.svg" alt="stack" />
        </div>
        <div class="card-number">{{ props.value.question }} câu</div>
        <div class="card-status" v-if="props.value.exerciseStatus == 0">
          <div class="card-status-content">
            {{ formatStatusExercise(props.value.exerciseStatus) }}
          </div>
        </div>
      </div>
      <div class="card-owner">
        <div class="card-user-icon">
          <img src="../../assets/emis/icon/user.svg" alt="user" />
        </div>
        <div class="card-username">{{ props.value.createdBy }}</div>
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
<style scoped>
.card-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 20px rgba(90, 125, 141, 0.16);
  width: 308px;
  height: 100%;
  position: relative;
  display: block;
  cursor: pointer;
}
.card-image {
  border-radius: 10px 10px 0 0;
  width: 308px;
  height: 123px;
}
.card-description {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
  height: 100px;
  max-height: 100px;
}
.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #4e5b6a;
}
.card-icon {
  color: #4e5b6a;
  width: 16px;
  height: 16px;
}
.card-number {
  color: #4e5b6a;
}
.card-status {
  background-color: #e8e1fd;
  border-radius: 4px;
  width: fit-content;
  height: 21px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
}
.card-status-content {
  font-size: 12px;
  font-weight: 500;
  color: #8a6bf6;
}
.card-header,
.card-extend,
.card-owner {
  display: flex;
}
.card-header {
  justify-content: space-between;
}
.card-extend {
  align-items: center;
  gap: 12px;
}
.card-subject {
  border-radius: 10px 0 10px 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: white;
  position: absolute;
  padding: 6px 8px;
  width: fit-content;
  height: 36px;
}
.card-subject.purple {
  background: #8a6bf6;
}
.card-subject.blue {
  background: #00a9ec;
}
.card-subject.green {
  background: #00c542;
}
.card-subject.default {
  background: #00c542;
}
.card-owner {
  gap: 12px;
}
.card-username {
  color: rgba(78, 91, 106, var(--tw-text-opacity));
}
.card-button {
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  padding: 0 12px;
}
.card-dropdown {
  top: 0;
  right: calc(100% + 20px);
  position: absolute;
  background: #fff;
  min-width: 56px;
  width: 150px;
  border-radius: 10px;
  border: 1px solid #ebeef5;
  padding: 12px;
  z-index: 2000;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.dropdown-item {
  padding: 8px;
}
.dropdown-item:hover {
  color: #8a6bf6;
  font-weight: 700;
}
.card-extend,
.card-owner {
  padding: 0 12px;
}
.card-header {
  padding: 12px 0 0 12px;
}
</style>
