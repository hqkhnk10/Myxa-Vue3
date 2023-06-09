<script setup>
import EmisCard from "@/components/EMIS/EmisCard.vue";
import MisaEnum from "@/js/base/enum";
import { useExerciseStore } from "@/store/exercise";
import { useGradeStore } from "@/store/grade";
import { useSubjectStore } from "@/store/subject";
import { onBeforeMount, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";

/**
 * Lấy dữ liệu từ store
 * Created By: NQTruong (26/06/2023)
 */
const exerciseStore = useExerciseStore();
const gradeStore = useGradeStore();
const subjectStore = useSubjectStore();

const grades = computed(() => {
  return gradeStore.grade;
});
const subjects = computed(() => {
  return subjectStore.subject;
});
const exercises = computed(() => {
  return exerciseStore.exercises;
});
const paginationValue = computed(() => {
  return exerciseStore.paginationValue;
});
const loading = computed(() => {
  return exerciseStore.loading;
});
const exerciseStatus = exerciseStore.exerciseStatus;

const pageSize = 9;
const paginationParams = ref({
  pageSize: pageSize,
});
const exerciseParams = ref({
  gradeId: null,
  subjectId: null,
  exerciseStatus: null,
});
let timeout;
const { push } = useRouter();

/**
 * Lấy dữ liệu bài tập
 * Created By: NQTruong (20/06/2023)
 */
const getExerciseValue = () => {
  exerciseStore.paginationParams = paginationParams.value;
  exerciseStore.exerciseParams = exerciseParams.value;

  exerciseStore.getExercises();
};
/**
 * Reset dữ liệu phân trang
 * Created By: NQTruong (20/06/2023)
 */
const resetPaginationParams = () => {
  paginationParams.value.pageSize = pageSize;
  getExerciseValue();
};
/**
 * Reset dữ liệu phân trang khi thay đổi params lọc
 * Created By: NQTruong (20/06/2023)
 */
watch(
  () => exerciseParams.value,
  () => resetPaginationParams(),
  { deep: true, immediate: true }
);

/**
 * Lấy dữ liệu khối và môn
 * Created By: NQTruong (20/06/2023)
 */
onBeforeMount(() => {
  gradeStore.getAllGrades();
  subjectStore.getAllSubjects();
});
/**
 * Nút Xem thêm (Tăng pageSize)
 * Created By: NQTruong (20/06/2023)
 */
const clickMoreButton = () => {
  paginationParams.value.pageSize += pageSize;
  getExerciseValue();
};
/**
 * Keyword thay đổi, Tìm kiếm input debounce
 * @param {*} e
 * Created By: NQTruong (20/06/2023)
 */
const keyword = ref(null);
watch(
  () => keyword.value,
  (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // Trigger the event or perform desired action after 1000ms
      keyword.value = e;
      exerciseParams.value.keyword = keyword.value;
      resetPaginationParams();
    }, 1000);
  }
);
</script>
<template>
  <div>
    <misa-input
      v-model="keyword"
      search
      reset
      :placeholder="t('emis.findExercise')"
    ></misa-input>
  </div>
  <div class="study-combobox">
    <misa-combobox
      v-model="exerciseParams.exerciseStatus"
      reset
      :options="exerciseStatus"
      class="small-box"
      :placeholder="t('emis.allExercise')"
    ></misa-combobox>
    <misa-combobox
      v-model="exerciseParams.gradeId"
      reset
      :options="grades"
      class="small-box"
      :placeholder="t('emis.allGrade')"
    ></misa-combobox>
    <misa-combobox
      v-model="exerciseParams.subjectId"
      :options="subjects"
      class="small-box"
      reset
      :placeholder="t('emis.allSubject')"
    ></misa-combobox>
  </div>
  <div class="grid-card" v-if="paginationValue.count > 0">
    <misa-loading v-model="loading"></misa-loading>
    <EmisCard
      v-for="(card, index) in exercises"
      :key="index"
      :value="card"
    ></EmisCard>
  </div>
  <div v-else class="not-found-exercise">
    <img
      src="../../../assets/emis/icon/notFoundExercise.svg"
      alt="not found"
      width="128"
    />
    <div>{{ t("emis.cantFindExercise") }}</div>
  </div>
  <div class="more-button">
    <misa-button
      @click="clickMoreButton"
      v-if="paginationValue.count > paginationValue.pageSize"
      >Xem thêm</misa-button
    >
  </div>
</template>

<style scoped>
.grid-card {
  margin-top: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  display: grid;
  grid-gap: 24px;
  padding-bottom: 10px;
  position: relative;
}
.study-combobox {
  display: flex;
  margin-top: 12px;
  gap: 16px;
}
.small-box {
  width: 172px;
}
.more-button {
  display: flex;
  justify-content: center;
  padding-bottom: 12px;
}
.not-found-exercise {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
}
</style>
