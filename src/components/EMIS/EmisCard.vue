<script setup>
import { defineProps } from "vue";
const props = defineProps(["value"]);
</script>
<template>
  <div class="card-container">
    <div class="card-image">
      <div class="card-subject">
        {{ props.value.gradeName }} - {{ props.value.subjectName }}
      </div>
      <img
        class="card-image"
        alt="subject"
        :src="`../../assets/emis/subjects-avatar/${props.value.img}`"
      />
    </div>
    <div class="card-description">
      <div class="card-header">
        <div class="card-title">{{ props.value.exerciseName }}</div>
        <div class="card-button">
          <img src="../../assets/emis/icon/three_dots.svg" alt="more" />
        </div>
      </div>
      <div class="card-extend">
        <div class="card-icon">
          <img src="../../assets/emis/icon/stack.svg" alt="stack" />
        </div>
        <div class="card-number">{{ props.value.question }}</div>
        <div class="card-status">
          <div class="card-status-content">
            {{ props.value.exerciseStatus }}
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
  overflow: hidden;
  display: block;
  cursor: pointer;
}
.card-image {
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
}
.card-status-content {
  padding: 4px;
  font-size: 10px;
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
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: white;
  position: absolute;
  padding: 6px 8px;
  width: 154px;
  height: 36px;
  background: greenyellow;
  border-bottom-right-radius: 10px;
}
.card-owner {
  gap: 12px;
}
.card-username {
  color: rgba(78, 91, 106, var(--tw-text-opacity));
}
</style>
