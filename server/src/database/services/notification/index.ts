import GetNotificationsService from "@/database/services/notification/get-notifications-service.js";
import MarkNotificationReadService from "@/database/services/notification/mark-notification-read-service.js";
import MarkAllReadService from "@/database/services/notification/mark-all-read-service.js";

const GetNotifications = new GetNotificationsService();
const MarkNotificationRead = new MarkNotificationReadService();
const MarkAllRead = new MarkAllReadService();

const NotificationServices = { GetNotifications, MarkNotificationRead, MarkAllRead };

export default NotificationServices;
