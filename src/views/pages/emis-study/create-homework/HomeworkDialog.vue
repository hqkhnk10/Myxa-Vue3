<template>
  <div class="exercise-dialog">
    <div class="exercise-body">
      <div class="exercise-container">
        <CKEditor class="exercise-editor"></CKEditor>
        <div class="exercise-answer">
            <div v-for="(answer,index) in answers" :key="index" class="answer-card"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CKEditor from "@/components/CKEditor/CKEditor.vue";
import { ref } from "vue";

const answers = ref([{
    index: "A",
    answer: "Test",
    correct: false
}])
</script>

<style scoped>
.exercise-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}
.exercise-body {
  margin-top: 24px;
  width: 1016px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
  height: calc(100vh - 204px);
  margin-bottom: 0;
  background-color: #fff2ab;
  position: relative;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap:12px;
}
.exercise-container{
    padding: 16px;
    height: 100%;
}
.exercise-answer{
    display: grid;
    grid-template-columns: repeat(4,minmax(0,1fr));
    gap: 1rem;
}
.answer-card{
    width: 200px;
    height: 200px;
    background: white;
}
.exercise-editor{
}
</style>
