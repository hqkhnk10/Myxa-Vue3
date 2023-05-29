import { reactive, readonly } from 'vue';

const state = reactive({
  notifications: [],
  id: 1,
});

const actions = {
  removeNotification(id) {
    state.notifications = state.notifications.filter(notification => notification.id !== id);
  },
  dispatchNotification({
    content,
    type,
    autoClose = false,
    duration = 2000,
  }) {
    const id = state.id++;
    const notifications = [{
      id,
      content,
      type,
    }, ...state.notifications];
    state.notifications = notifications;

    if (autoClose) {
      setTimeout(() => {
        actions.removeNotification(id);
      }, duration);
    }
  }
}

const getters = {
  getNotifications() {
    return [...state.notifications].slice(0,2);
  },
  getNotificationsCount() {
    return state.notifications.length;
  }
}

export default {
  state: readonly(state),
  actions,
  getters,
}