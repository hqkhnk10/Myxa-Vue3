<template>
  <div class="page">
    <nav class="header-container" id="nav" style="">
      <div class="header-navigation-left header-navigation">
        <div class="navigation">
          <a class="menu-item"
            ><img :src="chart" alt="chart" />
            <div class="item-text">Tổng quan</div></a
          ><a class="menu-item"
            ><img :src="home" alt="home" />
            <div class="item-text">Lớp học</div></a
          ><a class="router-link-active menu-item router-link-active"
            ><img :src="multi" alt="multi" />
            <div class="item-text">Học liệu</div></a
          ><a class="menu-item"
            ><img :src="multi" alt="multi" />
            <div class="item-text">Đào tạo MISA EMIS</div></a
          >
        </div>
      </div>
      <div class="header-right">
        <div class="ms-combo-box">
          <misa-combobox :options="yearOptions" v-model="year"></misa-combobox>
        </div>
        <div class="help-container">
          <img class="help" :src="grid" alt="help" width="24" height="24" />
        </div>
        <div class="help-container" data-v-1a2138f9="">
          <div class="flex justify-center items-center">
            <img
              class="help outline-none"
              :src="setting"
              alt="help"
              width="24"
              height="24"
              tabindex="0"
            />
          </div>
        </div>
        <div class="help-container" data-v-c6574156="">
          <img
            class="help outline-none"
            :src="question"
            alt="help"
            width="24"
            height="24"
            tabindex="0"
          />
        </div>

        <div class="notify-container">
          <img
            class="icon outline-none"
            :src="notification"
            alt="help"
            width="24"
            height="24"
            tabindex="0"
          />
        </div>
        <div class="user-container header-user">
          <div class="header-avatar">
            <div class="popover-container">
              <div class="hello-message">
                <span class="hello">Xin chào, </span
                ><span class="full-name">Anh</span>
              </div>
              <img class="image" :src="avatar" alt="ava" />
            </div>
          </div>
        </div>
      </div>
    </nav>
    <main class="main-emis">
      <div class="main-container">
        <div class="main-content">
          <div class="tab-container">
            <div class="tab-flex">
              <div
                class="main-tab"
                :class="{ 'tab-selected': tabSelected == 1 }"
                @click="clickTabButton(1)"
              >
                {{ t("emis.personal") }}
              </div>
              <div
                class="main-tab"
                :class="{ 'tab-selected': tabSelected == 2 }"
                @click="clickTabButton(2)"
              >
                {{ t("emis.school") }}
              </div>
              <div
                class="main-tab"
                :class="{ 'tab-selected': tabSelected == 3 }"
                @click="clickTabButton(3)"
              >
                {{ t("emis.community") }}
              </div>
            </div>
            <div class="header-button">
              <misa-button type="default">{{ t("emis.share") }}</misa-button>
              <misa-button>{{ t("emis.createGame") }}</misa-button>
              <misa-button @click="clickPrepareButton()">{{
                t("emis.prepareHW")
              }}</misa-button>
            </div>
          </div>
          <div class="background-banner w-full">
            <div class="w-full h-full">
              <div class="w-full relative h-full">
                <img
                  class="w-full h-full"
                  :src="background"
                  width="998"
                  style="opacity: 0.7"
                  alt="bg"
                />
                <div class="banner-title">
                  <div class="title-teacher mt-10 mb-4">GIÁO VIÊN TÍCH CỰC</div>
                  <img :src="bglayer" alt="layer" />
                </div>
                <div class="absolute total-exercise">
                  <div class="flex items-center">
                    <div class="item mr-12">
                      <div>
                        <img class="icRepeatGrid_1" :src="bgarrow" alt="grid" />
                      </div>
                      <div
                        class="absolute top-0"
                        style="
                          text-align: center;
                          padding-left: 36px;
                          padding-top: 36px;
                        "
                      >
                        <div class="text-count">141</div>
                        <label class="text-content">Học liệu đã soạn</label>
                      </div>
                    </div>
                    <div class="item mr-12">
                      <div>
                        <img
                          class="icRepeatGrid_1"
                          :src="bgarrow"
                          alt="bgarrow"
                        />
                      </div>
                      <div
                        class="absolute top-0"
                        style="
                          text-align: center;
                          padding-left: 30px;
                          padding-top: 36px;
                        "
                      >
                        <div class="text-count">13</div>
                        <label class="text-content">Học liệu đã chia sẻ</label>
                      </div>
                    </div>
                    <div class="item">
                      <div>
                        <img
                          class="icRepeatGrid_1"
                          :src="bgarrow"
                          alt="bgarrow"
                        />
                      </div>
                      <div
                        class="absolute top-0"
                        style="
                          text-align: center;
                          padding-left: 12px;
                          padding-top: 36px;
                        "
                      >
                        <div class="text-count">568</div>
                        <label class="text-content"
                          >Người sử dụng học liệu</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="absolute text-share-exercise text-center"
                  style="color: rgb(69, 139, 220)"
                >
                  <div>
                    <span style="font-size: 20px"
                      >Chia sẻ thêm <b style="font-size: 20px">18</b> học liệu
                      nữa thăng hạng lên
                      <b style="font-size: 20px">GIÁO VIÊN SÁNG TẠO</b></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import MisaEnum from "@/js/base/enum";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  chart,
  home,
  multi,
  question,
  setting,
  grid,
  notification,
  background,
  bglayer,
  bgarrow,
  avatar,
} from "@/js/img/getImg";
import { useExerciseStore } from "@/store/exercise";

const tabSelected = ref(1);
const { push } = useRouter();
const exerciseStore = useExerciseStore();
/**
 * Đổi tab
 * Created By: NQTruong (20/06/2023)
 */
const clickTabButton = (tab) => {
  tabSelected.value = tab;
};
/**
 * Chuyển đến trang soạn bài
 * Created By: NQTruong (20/06/2023)
 */
const clickPrepareButton = () => {
  push(MisaEnum.Router.PreparePage);
};
/**
 * Reset dữ liệu trong store
 * Created By: NQTruong (20/06/2023)
 */
onMounted(() => {
  exerciseStore.resetValue();
});
const year = ref(2);
const yearOptions = ref([
  { value: 1, label: "Năm học 2021-2022" },
  { value: 2, label: "Năm học 2022-2023" },
]);
</script>

<style>
.header-container {
  height: 100%;
  display: flex;
  align-items: center;
  height: 64px;
  min-height: 64px;
  box-shadow: 0 3px 20px rgba(90, 125, 141, 0.16);
  z-index: 999;
  position: sticky;
  top: 0;
  justify-content: space-between;
  scrollbar-width: thin;
  width: 100%;
  background: white;
  overflow: visible;
}
.header-navigation-left,
.navigation {
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
}
.header-navigation-left,
.navigation {
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
}
.menu-item {
  height: 100%;
  padding: 0 12px;
  margin: 0 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #4e5b6a;
  text-decoration: none;
}
.menu-item img {
  margin-right: 8px;
  filter: invert(32%) sepia(26%) saturate(344%) hue-rotate(171deg)
    brightness(100%) contrast(91%);
}
.menu-item .item-text {
  min-width: -webkit-fit-content;
  min-width: -moz-fit-content;
  min-width: fit-content;
  font-size: 16px;
}
.menu-item.router-link-active {
  border-bottom: 2px solid #8a6bf6;
  font-weight: 700;
  color: #8a6bf6;
}
.menu-item.router-link-active img {
  filter: invert(69%) sepia(72%) saturate(6261%) hue-rotate(227deg)
    brightness(99%) contrast(94%);
}
.header-container .header-right {
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
}
.help-container {
  height: 40px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.notify-container {
  position: sticky;
  right: 79px;
  width: auto;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0 8px;
  cursor: pointer;
}
.user-container {
  display: flex;
  height: 100%;
  align-items: center;
  color: #4e5b6a;
}
.header-avatar {
  top: 0;
  right: 0;
  height: 100%;
  width: auto;
  padding-right: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.header-avatar .popover-container {
  display: flex;
}
.header-avatar .popover-container .hello-message {
  margin: auto 16px auto 8px;
}
.header-avatar .popover-container .hello-message .full-name {
  font-weight: 700;
}
.header-avatar .popover-container .image {
  height: 47px;
  width: 47px;
  background-size: 100%;
  background-repeat: none;
  background-color: #f1f2f7;
  border: 1px solid #f1f2f7;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
}
.main-emis {
  display: flex;
  justify-content: center;
  height: calc(100vh - 64px);
}
.main-container {
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.main-content {
  width: 1024px;
}
.main-tab {
  height: 40px;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
}
.tab-container {
  padding: 16px 0 ;
  display: flex;
  justify-content: space-between;
  z-index: 20;
  background: white;
  top: 0;
  position: sticky;
}
.tab-selected {
  overflow: hidden;
  background-color: #ece7fe;
  color: #8a6bf6;
}
.tab-flex {
  display: flex;
}
.header-button {
  display: flex;
  gap: 12px;
}
.background-banner {
  margin-bottom: 1rem;
  position: relative;
}
.banner-title {
  position: absolute;
  top: 0;
  left: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9;
  width: 174px;
  height: 300px;
  background-image: url("https://sisapapp.misacdn.net/lms/img/Subtraction_Big.96f1c8cf.png");
}
.title-teacher {
  color: rgb(89, 164, 239);
  font-size: 20px;
  text-align: center;
  width: 136px;
  margin: 2.5rem 1rem 1rem 1rem;
}
.leading-7 {
  line-height: 1.75rem;
}
.absolute {
  position: absolute;
}
.top-0 {
  top: 0;
}
.total-exercise {
  color: rgb(69, 139, 220);
  left: 272px;
  top: 0;
}
.mr-12 {
  margin-right: 3rem;
}
.text-count {
  font-size: 39px;
}
.text-share-exercise {
  left: 100px;
  top: 210px;
  width: 100%;
  text-align: center;
}
.page {
  overflow: hidden;
  height: 100vh;
  background: white;
}
.ms-combo-box {
  width: 185px;
  margin-right: 12px;
}
</style>
