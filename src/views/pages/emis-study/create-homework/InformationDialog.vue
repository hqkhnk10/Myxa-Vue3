<!-- eslint-disable vue/no-mutating-props -->
<template>
  <misa-dialog
    :modelValue="modelValue"
    @close="closeDialog"
    :title="t('emis.addInformation')"
  >
    <div class="dialog-content">
      <div class="dialog-image">
        <img src="../../../../assets/emis/subjects-avatar/default.png" />
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
                :placeholder="t('amis.enteramis')"
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
                >{{ t("amis.subject") }}<span class="required">*</span></label
              >
              <div class="form-item__content">
                <misa-combobox
                  v-model="form.subjectId"
                  :options="subjects"
                  v-model:valid="validate.subjectId.valid"
                  :message="t('amis.subject')"
                ></misa-combobox>
              </div>
            </div>
            <div class="form-item form-grade">
              <label class="form-item__label flex"
                >{{ t("amis.grade") }}<span class="required">*</span></label
              >
              <div class="form-item__content">
                <misa-combobox
                  v-model="form.gradeId"
                  :options="grades"
                  v-model:valid="validate.gradeId.valid"
                  :message="t('amis.grade')"
                ></misa-combobox>
              </div>
            </div>
          </div>
          <div class="form-item">
            <label class="form-item__label flex"
              >{{ t("amis.topic") }}<span class="required">*</span></label
            >
            <div class="form-item__content">
              <misa-combobox
                v-model="form.topicId"
                :options="topics"
                v-model:valid="validate.topicId.valid"
                :message="t('amis.topic')"
              ></misa-combobox>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="dialog-footer">
      <misa-button type="default" @click="closeDialog">{{ t("amis.close") }}</misa-button>
      <misa-button @click="saveForm">{{ t("reuse.save") }}</misa-button>
    </div>
  </misa-dialog>
</template>
<script setup>
import { getGrades } from "@/api/grade";
import { getTopics } from "@/api/topic";
import { getSubjects } from "@/api/subject";
import { defineProps, defineEmits, ref, onBeforeMount, watch } from "vue";
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const grades = ref([]);
const subjects = ref([]);
onBeforeMount(() => {
  getGrades().then((res) => {
    grades.value = res.data.map((e) => ({
      value: e.gradeId,
      label: e.gradeName,
    }));
  }),
    getSubjects().then((res) => {
      subjects.value = res.data.map((e) => ({
        value: e.subjectId,
        label: e.subjectName,
      }));
    });
});
const form = ref({
  exerciseName: "",
  subjectId: 1,
  gradeId: 1,
  topicId: null,
});
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
    required: true,
    valid: true,
    message: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
const closeDialog = () => {
  emit("update:modelValue", false);
};
const topics = ref([]);
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
const validateForm = () => {};
const saveForm = () => {
    const valid = validateForm();
    if(valid){
        closeDialog()
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
.dialog-footer{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 12px;
}
</style>
