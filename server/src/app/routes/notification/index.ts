import GetNotificationsRoute from "@/app/routes/notification/get-notifications-route.js";
import MarkAllReadRoute from "@/app/routes/notification/mark-all-read-route.js";
import MarkNotificationReadRoute from "@/app/routes/notification/mark-notification-read-route.js";

const PATH = "/notifications";

const GetNotifications = new GetNotificationsRoute(PATH);
const MarkAllRead = new MarkAllReadRoute(PATH);
const MarkNotificationRead = new MarkNotificationReadRoute(PATH);

const NotificationRoutes = { GetNotifications, MarkAllRead, MarkNotificationRead };

export default NotificationRoutes;
