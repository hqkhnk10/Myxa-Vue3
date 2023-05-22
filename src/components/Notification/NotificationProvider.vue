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
        :enter-active-class="store.getters.getNotificationsCount() > 1 ? 'enter-in' : 'enter-out'"
        enter-from-class="enter-from"
        enter-to-class="enter-to"
        leave-active-class="transition ease-in duration-100"
        leave-from-class=""
        leave-to-class="leave-to"
        move-class="move"
      >
        <NotificationView
          :key="notification.id"
          :notification="notification"
          :class="idx > 0 ? 'mt-12' : ''"
          v-for="(notification, idx) in store.getters.getNotifications()"
        />
      </TransitionGroup>
    </div>
  </div>
  <slot></slot>
</template>

<style scoped>
.move{
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform; 
transition-duration: 500ms; 
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); 

}
.leave-to{
  opacity: 0;
}
.leave-from{
  opacity: 1;
}
.leave-active{
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform; 
transition-duration: 100ms; 
transition-timing-function: cubic-bezier(0.4, 0, 1, 1); 
}
.enter-to{
  --transform-translate-x: 0; 
opacity: 1; 
}
.enter-from{
  --transform-translate-x: 1rem; 
opacity: 0; 
}
.enter-in{
  transition-delay: 300ms; 
transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform; 
transition-duration: 300ms; 
transition-timing-function: cubic-bezier(0, 0, 0.2, 1); 
}
.enter-out{
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform; 
transition-duration: 300ms; 
transition-timing-function: cubic-bezier(0, 0, 0.2, 1); 
}
.delay-300 {
  transition-delay: 100ms;
}
</style>
