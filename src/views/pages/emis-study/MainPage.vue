<template>
  <div>
    <nav class="header-container" id="nav" data-v-29eb4492="" style="">
      <div
        class="header-navigation-left header-navigation"
        data-v-2e782881=""
        data-v-29eb4492=""
      >
        <div class="navigation" data-v-2e782881="">
          <a
            href="/lms/teacher/dashboard"
            class="menu-item"
            data-v-bae8e492=""
            data-v-2e782881=""
            ><img
              src="https://sisapapp.misacdn.net/lms/img/ic_chart.870683b6.svg"
              data-v-bae8e492=""
            />
            <div class="item-text" data-v-bae8e492="">Tổng quan</div></a
          ><a
            href="/lms/teacher/classroom"
            class="menu-item"
            data-v-bae8e492=""
            data-v-2e782881=""
            ><img
              src="https://sisapapp.misacdn.net/lms/img/ic_home.47a0479b.svg"
              data-v-bae8e492=""
            />
            <div class="item-text" data-v-bae8e492="">Lớp học</div></a
          ><a
            href="/lms/teacher/storage"
            class="router-link-active menu-item"
            data-v-bae8e492=""
            data-v-2e782881=""
            ><img
              src="https://sisapapp.misacdn.net/lms/img/ic_multi.7d8b269c.svg"
              data-v-bae8e492=""
            />
            <div class="item-text" data-v-bae8e492="">Học liệu</div></a
          ><a
            href="/lms/teacher/training"
            class="menu-item"
            data-v-bae8e492=""
            data-v-2e782881=""
            ><img
              src="https://sisapapp.misacdn.net/lms/img/ic_multi.7d8b269c.svg"
              data-v-bae8e492=""
            />
            <div class="item-text" data-v-bae8e492="">Đào tạo MISA EMIS</div></a
          >
        </div>
        <!---->
      </div>
      <div class="header-right" data-v-29eb4492="">
        <div
          class="ms-combo-box validatable"
          data-v-7cb2f9ba=""
          data-v-49dfe5d9=""
          data-v-29eb4492=""
        >
          <!---->
          <div
            class="el-select mr-3"
            readonly=""
            data-v-7cb2f9ba=""
            style="width: 185px"
          >
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
        <div class="help-container" data-v-79986917="" data-v-29eb4492="">
          <img
            class="help"
            src="https://sisapapp.misacdn.net/lms/img/ic_Material.0dcea9c1.svg"
            width="24"
            height="24"
            ariadescribedby="el-popper-8480"
            data-v-79986917=""
          />
        </div>
        <div class="help-container" data-v-1a2138f9="" data-v-29eb4492="">
          <div
            class="flex justify-center items-center"
            ariadescribedby="el-popper-616"
            data-v-1a2138f9=""
          >
            <img
              class="help outline-none"
              src="https://sisapapp.misacdn.net/lms/img/ic_Setting_24.425ce083.svg"
              width="24"
              height="24"
              tabindex="0"
              aria-describedby="el-popper-5848"
              data-v-1a2138f9=""
            />
          </div>
        </div>
        <div class="help-container" data-v-c6574156="" data-v-29eb4492="">
          <img
            class="help outline-none"
            src="https://sisapapp.misacdn.net/lms/img/ic_Help_20.fbed8b0e.svg"
            width="24"
            height="24"
            tabindex="0"
            aria-describedby="el-popper-3704"
            data-v-c6574156=""
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
            width="24"
            height="24"
            tabindex="0"
            aria-describedby="el-popper-2078"
            data-v-a72120ca=""
          /><!---->
        </div>
        <div
          class="user-container header-user"
          data-v-3a2dc2ac=""
          data-v-29eb4492=""
        >
          <div class="header-avatar" data-v-6b4e4f8b="" data-v-3a2dc2ac="">
            <div
              class="popover-container"
              ariadescribedby="el-popper-5599"
              data-v-6b4e4f8b=""
            >
              <div class="hello-message" data-v-6b4e4f8b="">
                <span class="hello" data-v-6b4e4f8b="">Xin chào, </span
                ><span class="full-name" data-v-6b4e4f8b="">Anh</span>
              </div>
              <img
                class="image"
                src="https://id.misa.vn/image/getavatar?userId=d40a861b-4249-4d17-b546-0e62b7e0f059"
                data-v-6b4e4f8b=""
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <div>3 three button</div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup></script>

<style>
.header-container {
    height: 100%;
    display: flex;
    align-items: center;
    height: 64px;
    min-height: 64px;
    box-shadow: 0 3px 20px rgba(90,125,141,.16);
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
.header-navigation-left, .navigation {
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
    filter: invert(32%) sepia(26%) saturate(344%) hue-rotate(171deg) brightness(100%) contrast(91%);
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
</style>
