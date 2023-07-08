<template>
  <div class="tag-input">
    <div class="tag-container">
      <span class="tag-input-placeholder" v-if="!isHidePlaceholder">{{
        placeholder
      }}</span>
      <span class="tag-value" v-for="(value, index) in tags" :key="index">
        {{ value }}
        <span @click="removeTag(index)"
          ><img
            alt="close"
            src="https://sisapapp.misacdn.net/lms/img/ic_remove.2d9e09d5.svg"
            width="12"
            class="close-custom" /></span
      ></span>
      <span
        contenteditable="true"
        class="new-tag"
        @keydown.enter.prevent="addTag"
        @input="inputChange"
        @blur="addTag"
      ></span>
    </div>
    <div v-if="closeable" class="close-end" @click="clickCloseButton">
      <img
        alt="close"
        src="https://sisapapp.misacdn.net/lms/img/ic_remove.2d9e09d5.svg"
        width="15"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, computed } from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Nhập đáp án rồi nhấn Enter...",
  },
  closeable: {
    type: Boolean,
    default: false,
  },
  spiltExp: {
    type: String,
    default: "||",
  },
});
const emit = defineEmits(["update:modelValue", "click-close"]);
const newTag = ref("");
const tags = ref([]);
watch(
  () => props.modelValue,
  () => {
    tags.value = props.modelValue ? props.modelValue.split(props.spiltExp) : [];
  },
  { immediate: true }
);
const inputChange = (e) => {
  newTag.value = e.target.innerText;
};
const isHidePlaceholder = computed(() => {
  return tags.value.length > 0 || newTag.value != "";
});
const updateModelValue = () => {
//   const uniqueArray = tags.value.filter(function(item, pos) {
//     return tags.value.indexOf(item) == pos;
// })
  emit("update:modelValue", tags.value.join(props.spiltExp));
};
const addTag = (e) => {
  const text = e.target.innerText.trim();
  if (text && tags.value.find((t) => t == text) == undefined) {
    tags.value.push(text);
  }
  e.target.innerText = "";
  newTag.value = "";
  updateModelValue();
};
const removeTag = (index) => {
  tags.value.splice(index, 1);
  updateModelValue();
};
const clickCloseButton = () => {
  emit("click-close");
};
</script>
