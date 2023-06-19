<template>
  <div>
    <nav class="header-container" id="nav" style="">
      <div class="header-navigation-left header-navigation">
        <div class="navigation">
          <a href="/lms/teacher/dashboard" class="menu-item"
            ><img
              src="https://sisapapp.misacdn.net/lms/img/ic_chart.870683b6.svg"
              alt="chart"
            />
            <div class="item-text">Tổng quan</div></a
          ><a href="/lms/teacher/classroom" class="menu-item"
            ><img
              src="https://sisapapp.misacdn.net/lms/img/ic_home.47a0479b.svg"
              alt="home"
            />
            <div class="item-text">Lớp học</div></a
          ><a href="/lms/teacher/storage" class="router-link-active menu-item"
            ><img
              src="https://sisapapp.misacdn.net/lms/img/ic_multi.7d8b269c.svg"
              alt="multi"
            />
            <div class="item-text">Học liệu</div></a
          ><a href="/lms/teacher/training" class="menu-item"
            ><img
              src="https://sisapapp.misacdn.net/lms/img/ic_multi.7d8b269c.svg"
              alt="multi"
            />
            <div class="item-text">Đào tạo MISA EMIS</div></a
          >
        </div>
        <!---->
      </div>
      <div class="header-right">
        <div class="ms-combo-box validatable">
          <!---->
          <div class="el-select mr-3" readonly="" style="width: 185px">
            <div class="select-trigger" aria-describedby="el-popper-4882">
              <!---->
              <div class="el-input el-input--suffix" data-v-742cb8d3="">
                <!----><input
                  class="el-input__inner"
                  type="text"
                  readonly=""
                  autocomplete="off"
                  placeholder="Chọn"
                  data-v-742cb8d3=""
                /><!----><span class="el-input__suffix" data-v-742cb8d3=""
                  ><span class="el-input__suffix-inner" data-v-742cb8d3=""
                    ><i
                      class="el-select__caret el-input__icon el-icon-arrow-up"
                    ></i
                    ><!----><!----><!----><!----><!----></span
                  ><!----></span
                ><!----><!---->
              </div>
            </div>
          </div>
          <!---->
        </div>
        <div class="help-container">
          <img
            class="help"
            src="https://sisapapp.misacdn.net/lms/img/ic_Material.0dcea9c1.svg"
            alt="help"
            width="24"
            height="24"
          />
        </div>
        <div class="help-container" data-v-1a2138f9="">
          <div class="flex justify-center items-center">
            <img
              class="help outline-none"
              src="https://sisapapp.misacdn.net/lms/img/ic_Setting_24.425ce083.svg"
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
            src="https://sisapapp.misacdn.net/lms/img/ic_Help_20.fbed8b0e.svg"
            alt="help"
            width="24"
            height="24"
            tabindex="0"
          />
        </div>
        <!---->
        <div
          class="notify-container"
          ariadescribedby="el-popper-8769"
          data-v-a72120ca=""
        >
          <img
            class="icon outline-none"
            src="https://sisapapp.misacdn.net/lms/img/ic_Noti_24.9f8729e8.svg"
            alt="help"
            width="24"
            height="24"
            tabindex="0"
          /><!---->
        </div>
        <div class="user-container header-user">
          <div class="header-avatar">
            <div class="popover-container">
              <div class="hello-message">
                <span class="hello">Xin chào, </span
                ><span class="full-name">Anh</span>
              </div>
              <img
                class="image"
                src="../../../assets/emis/icon/avatar.png"
                alt="ava"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
    <main class="main-emis">
      <div class="main-container">
        <div class="tab-container">
          <div class="tab-flex">
            <div
              class="main-tab"
              :class="{ 'tab-selected': tabSelected == 1 }"
              @click="clickTabButton(1)"
            >
              1
            </div>
            <div
              class="main-tab"
              :class="{ 'tab-selected': tabSelected == 2 }"
              @click="clickTabButton(2)"
            >
              2
            </div>
            <div
              class="main-tab"
              :class="{ 'tab-selected': tabSelected == 3 }"
              @click="clickTabButton(3)"
            >
              3
            </div>
          </div>
          <div class="header-button">
            <misa-button type="default"></misa-button>
            <misa-button></misa-button>
            <misa-button></misa-button>
          </div>
        </div>
        <div class="background-banner w-full" data-v-45abc2fd="">
          <div class="w-full h-full" data-v-45abc2fd="">
            <!---->
            <div class="w-full relative h-full">
              <img
                class="w-full h-full"
                src="https://sisapapp.misacdn.net/lms/img/Backgroud_Positive.e10ee7f3.png"
                width="998"
                style="opacity: 0.7"
              />
              <div
                class="banner-title"
                style="
                  z-index: 9;
                  width: 174px;
                  height: 300px;
                  background-image: url('https://sisapapp.misacdn.net/lms/img/Subtraction_Big.96f1c8cf.png');
                "
              >
                <div
                  class="title-teacher mt-10 mb-4"
                  style="color: rgb(89, 164, 239)"
                >
                  GIÁO VIÊN TÍCH CỰC
                </div>
                <img
                  src="https://sisapapp.misacdn.net/lms/img/Layer_Category_3.e59f16ba.png"
                />
              </div>
              <div
                class="absolute total-exercise"
                style="color: rgb(69, 139, 220)"
              >
                <div class="flex items-center">
                  <div class="item mr-12">
                    <div>
                      <img
                        class="icRepeatGrid_1"
                        src="https://sisapapp.misacdn.net/lms/img/Subtraction_Arrow.89f2c584.png"
                      />
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
                        src="https://sisapapp.misacdn.net/lms/img/Subtraction_Arrow.89f2c584.png"
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
                        src="https://sisapapp.misacdn.net/lms/img/Subtraction_Arrow.89f2c584.png"
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
                      <label class="text-content">Người sử dụng học liệu</label>
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
                    >Chia sẻ thêm <b style="font-size: 20px">18</b> học liệu nữa thăng hạng lên
                    <b style="font-size: 20px">GIÁO VIÊN SÁNG TẠO</b></span
                  >
                </div>
                <!---->
              </div>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tabSelected = ref(1);
const clickTabButton = (tab) => {
  tabSelected.value = tab;
};
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
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-width: thin;
  width: 100%;
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
}
.main-container {
  width: 1024px;
  padding-top: 16px;
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
  display: flex;
  justify-content: space-between;
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
  margin: 0.5rem;
  position: relative;
}
.banner-title {
  position: absolute;
  top: 0;
  left: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-teacher {
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
</style>
