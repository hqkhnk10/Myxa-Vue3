import NotificationProvider from "./NotificationProvider.vue";
import store from "./store";

function formatNotification(type) {
  switch (type) {
    case "success":
      return "Thành công";
    case "information":
      return "Thông tin";
    case "error":
      return "Lỗi";
    case "warning":
      return "Cảnh báo";
    default:
      return "";
  }
}
const { dispatchNotification } = store.actions;

export { NotificationProvider, dispatchNotification, formatNotification };
