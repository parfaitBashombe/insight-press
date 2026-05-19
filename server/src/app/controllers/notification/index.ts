import GetNotificationsController from "@/app/controllers/notification/get-notifications-controller.js";
import MarkNotificationReadController from "@/app/controllers/notification/mark-notification-read-controller.js";
import MarkAllReadController from "@/app/controllers/notification/mark-all-read-controller.js";

const GetNotifications = new GetNotificationsController();
const MarkNotificationRead = new MarkNotificationReadController();
const MarkAllRead = new MarkAllReadController();

const NotificationControllers = { GetNotifications, MarkNotificationRead, MarkAllRead };

export default NotificationControllers;
