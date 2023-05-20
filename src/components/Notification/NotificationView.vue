<script setup>
import store from "./store";
import { defineProps } from "vue";
import { formatNotification } from "./index";
defineProps({
  notification: Object,
});

const closeNotification = (id) => {
  store.actions.removeNotification(id);
};

const formatColor = (type) => {
  switch (type) {
    case "success":
      return "var(--color-green)";
    case "warning":
      return "var(--color-orange)";

    case "error":
      return "var(--color-red)";

    case "infomation":
      return "var(--color-blue)";
    default:
      return "black";
  }
};
</script>

<template>
  <div class="notification-view">
    <div class="notification-container">
      <div class="notification-icon" v-if="notification.type">
        <div
          style="width: 100%; height: 100%; background: round"
          :style="{
            backgroundImage: `url(${require(`../../assets/icon/${notification.type}-icon.svg`)})`,
          }"
        ></div>
      </div>
      <div class="notification-title">
        <span
          class="notification-text"
          :style="{ color: formatColor(notification.type) }"
          v-if="notification.type"
        >
          {{ formatNotification(notification.type) }}!
        </span>
        <span>
          {{ notification.content }}
        </span>
      </div>
      <div class="notification-button">
        <button
          type="button"
          aria-label="Close"
          class="button__icon-default"
          @click="() => closeNotification(notification.id)"
        >
          <img
            src="../../assets/icon/x-icon.svg"
            alt="Exit"
            style="width: 12px"
          />
        </button>
      </div>
    </div>
  </div>
</template>
