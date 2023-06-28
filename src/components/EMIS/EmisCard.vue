<script setup>
import { defineProps, ref } from "vue";
import { getSubjectImg } from "@/js/img/getSubjectImg";
import {
  formatBgBaseOnSubjectId,
  formatStatusExercise,
} from "@/js/format/format";
import { useRouter } from "vue-router";
import MisaEnum from "@/js/base/enum";
const props = defineProps(["value"]);

const dropdownVisible = ref(false);
const confirmDialog = ref(false);

const { push } = useRouter();
const detail = () => {
  push(MisaEnum.Router.PreparePage + "/" + props.value.exerciseId);
};
const remove = () => {
  confirmDialog.value = true
};
</script>
<template>
  <div class="card-container">
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
        :src="getSubjectImg(props.value.subjectImage)"
      />
    </div>
    <div class="card-description">
      <div class="card-header">
        <div class="card-title">{{ props.value.exerciseName }}</div>
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
        <div class="card-status">
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
  padding: 12px;
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
  width: 60px;
  height: 21px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-status-content {
  padding: 5px;
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
  width: 20px;
  position: relative;
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
</style>
