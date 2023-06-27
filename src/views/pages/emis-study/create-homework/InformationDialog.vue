<!-- eslint-disable vue/no-mutating-props -->
<template>
  <misa-dialog
    :modelValue="dialogVisible"
    @close="closeDialog"
    :title="t('emis.addInformation')"
    width="800px"
  >
    <div class="dialog-content">
      <div class="dialog-image">
        <img :src="getSubjectImgFromId(form.subjectId)" alt="img" />
      </div>
      <div class="dialog-form">
        <form class="form" id="form-add-title" ref="misaForm">
          <div class="form-item">
            <label class="form-item__label"
              >{{ t("emis.exerciseName")
              }}<span class="required" v-if="validate.exerciseName.required"
                >*</span
              ></label
            >
            <div class="form-item__content">
              <misa-input
                ref="firstInput"
                :reset="true"
                v-model="form.exerciseName"
                :isValid="validate.exerciseName.valid"
                :placeholder="t('emis.enteremis')"
                @change="validateForm"
                @blur="validateForm"
              ></misa-input>
              <div class="error active" v-if="!validate.exerciseName.valid">
                {{ validate.exerciseName.message }}
              </div>
            </div>
          </div>
          <div class="form-item-flex">
            <div class="form-item form-subject">
              <label class="form-item__label flex"
                >{{ t("emis.subject") }}<span class="required">*</span></label
              >
              <div class="form-item__content">
                <misa-combobox
                  v-model="form.subjectId"
                  :options="subjects"
                  v-model:valid="validate.subjectId.valid"
                  :message="t('emis.subject')"
                ></misa-combobox>
              </div>
            </div>
            <div class="form-item form-grade">
              <label class="form-item__label flex"
                >{{ t("emis.grade") }}<span class="required">*</span></label
              >
              <div class="form-item__content">
                <misa-combobox
                  v-model="form.gradeId"
                  :options="grades"
                  v-model:valid="validate.gradeId.valid"
                  :message="t('emis.grade')"
                ></misa-combobox>
              </div>
            </div>
          </div>
          <div class="form-item">
            <label class="form-item__label flex">{{ t("emis.topic") }}</label>
            <div class="form-item__content">
              <misa-combobox
                v-model="form.topicId"
                :options="topics"
                v-model:valid="validate.topicId.valid"
                :message="t('emis.topic')"
              ></misa-combobox>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="dialog-footer">
      <misa-button type="default" @click="closeDialog">{{
        t("reuse.close")
      }}</misa-button>
      <misa-button @click="saveForm">{{ t("reuse.save") }}</misa-button>
    </div>
  </misa-dialog>
</template>
<script setup>
import { getTopics } from "@/api/topic";
import { ref, watch, computed, defineExpose } from "vue";
import { useSubjectStore } from "@/store/subject";
import { useGradeStore } from "@/store/grade";
import { useExerciseStore } from "@/store/exercise";
import { getSubjectImgFromId } from "@/js/img/getSubjectImg";

const dialogVisible = ref(false);
defineExpose({
  dialogVisible,
});
const exerciseStore = useExerciseStore();
const gradeStore = useGradeStore();
const subjectStore = useSubjectStore();
const grades = computed(() => {
  return gradeStore.grade;
});
const subjects = computed(() => {
  return subjectStore.subject;
});
const form = ref({
  exerciseName: "",
  subjectImage: "toan.png",
  subjectId: 1,
  gradeId: 1,
  topicId: null,
  questions: []
});
watch(
  () => dialogVisible.value,
  (newValue) => {
    if (!newValue) return;
    form.value = { ...exerciseStore.detailExercise };
  }
);
const validate = ref({
  exerciseName: {
    required: true,
    valid: true,
    message: "",
  },
  subjectId: {
    required: true,
    valid: true,
    message: "",
  },
  gradeId: {
    required: true,
    valid: true,
    message: "",
  },
  topicId: {
    valid: true,
    message: "",
  },
});
const closeDialog = () => {
  dialogVisible.value = false;
};
const topics = ref([]);
/**
 * Thay đổi topic theo dữ liệu môn và khối
 * Created By: NQTruong (20/06/2023)
 */
watch(
  () => form.value.subjectId,
  () => {
    getTopics({
      subjectId: form.value.subjectId,
      gradeId: form.value.gradeId,
    }).then((res) => {
      topics.value = res.data.map((e) => ({
        value: e.topicId,
        label: e.topicName,
      }));
    });
  },
  { immediate: true }
);
/**
 * Xác thực form
 * Created By: NQTruong (20/06/2023)
 */
const validateForm = () => {
  return true;
};
/**
 * Lưu form
 * Created By: NQTruong (20/06/2023)
 */
const saveForm = () => {
  const valid = validateForm();
  if (valid) {
    exerciseStore.updateExercise(form.value);
    closeDialog();
  }
};
</script>
<style scoped>
.dialog-content {
  display: flex;
  gap: 36px;
}
.dialog-form {
  flex: 1;
}
.form-subject {
  flex-basis: 60%;
}
.form-grade {
  flex-basis: 40%;
}
.dialog-footer {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 12px;
}
</style>
