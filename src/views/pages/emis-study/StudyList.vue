<script setup>
import EmisCard from "@/components/EMIS/EmisCard.vue";
import { ref } from "vue";

const cards = ref([
  {
    img: "",
    title: "Bài luyện tập hằng đẳng thức",
    questions: 0,
    status: 0,
    subject: 1,
    username: 'Trường'
  },{
    img: "",
    title: "Bài luyện tập hằng đẳng thức",
    questions: 0,
    status: 0,
    subject: 1,
    username: 'Trường'
  },{
    img: "",
    title: "Bài luyện tập hằng đẳng thức",
    questions: 0,
    status: 0,
    subject: 1,
    username: 'Trường'
  },{
    img: "",
    title: "Bài luyện tập hằng đẳng thức",
    questions: 0,
    status: 0,
    subject: 1,
    username: 'Trường'
  },
]);
</script>
<template>
    <div>
        <misa-input search reset></misa-input>
    </div>
    <div class="study-combobox">
        <misa-combobox class="small-box"></misa-combobox>
        <misa-combobox class="small-box"></misa-combobox>
        <misa-combobox class="small-box"></misa-combobox>
    </div>
  <div class="grid-card">
    <EmisCard
      v-for="(card, index) in cards"
      :key="index"
      :value="card"
    ></EmisCard>
  </div>
</template>

<style scoped>
.grid-card {
    margin-top: 20px;
    grid-template-columns: 1fr 1fr 1fr;
    display: grid;
    grid-gap: 24px;
    padding-bottom: 10px;
}
.study-combobox{
    display: flex;
    margin-top:12px;
    gap: 16px;
}
.small-box{
    width: 172px;
}
</style>
