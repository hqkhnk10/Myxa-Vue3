<script setup>
import store from './store';
import NotificationView from './NotificationView.vue';
</script>

<template>
  <div class="notification" >
    <div class="max-w-sm w-full">
      <TransitionGroup
        appear
        tag="div"
        :enter-active-class="store.getters.getNotificationsCount() > 1 ? 'transform ease-out delay-300 duration-300 transition' : 'transform ease-out duration-300 transition'"
        enter-from-class="translate-x-4 opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        move-class="transition ease-in-out duration-500"
      >
        <NotificationView
          :key="notification.id"
          :notification="notification"
          :class="idx > 0 ? 'mt-4' : ''"
          v-for="(notification, idx) in store.getters.getNotifications()"
        />
      </TransitionGroup>
    </div>
  </div>
  <slot></slot>
</template>

<style scoped>
.delay-300 {
  transition-delay: 100ms;
}
</style>
