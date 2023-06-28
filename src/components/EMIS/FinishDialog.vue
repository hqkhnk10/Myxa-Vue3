<template>
  <misa-dialog width="600px" :modelValue="modelValue" @close="closeDialog">
    <div class="finish-container">
      <div class="thumbnail">
        <img
          src="https://sisapapp.misacdn.net/lms/img/compose-success.15aea56e.png"
        />
      </div>
      <div class="popup-title h3 mb-3">Soạn bài thành công</div>
      <div class="hint mb-3">
        Thầy/cô vừa hoàn thành soạn và lưu bài tập vào kho học liệu cá nhân
        <br />
        Thầy/cô có muốn chia sẻ đến các thầy/cô trong cộng đồng?
      </div>
      <div class="isShare mb-3">
        <misa-checkbox class="middle">
          <span>Chia sẻ lên Cộng đồng giáo viên</span>
        </misa-checkbox>
      </div>
      <div class="toolbar mt-3">
        <misa-button class="ms-button mb-3" @click="goToHomepage">
          Giao bài</misa-button
        ><misa-button type="default" class="ms-button" @click="goToHomepage">
          Đi tới kho
        </misa-button>
      </div>
    </div>
  </misa-dialog>
</template>

<script setup>
import MisaEnum from "@/js/base/enum";
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
const closeDialog = () => {
  emit("update:modelValue", false);
};
const { push } = useRouter();
const goToHomepage = () => {
  push(MisaEnum.Router.StudyPage);
};
</script>

<style scoped>
.finish-container {
  padding: 0 24px 40px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.thumbnail {
  margin-bottom: 1.75rem;
}
.popup-title {
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 0.75rem;
}
.hint,
.isShare,
.toolbar {
  margin-bottom: 0.75rem;
}
.ms-button {
  width: 300px;
}
.mb-3 {
  margin-bottom: 12px;
}
.middle {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
