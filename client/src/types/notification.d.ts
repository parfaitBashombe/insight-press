export type { ApiResponse } from "./auth";

export type AppNotification = {
  notification_id: string;
  user_id: string;
  type: "NEW_ARTICLE";
  title: string;
  body: string;
  article_id: string | null;
  article_slug: string | null;
  read: boolean;
  createdAt: string;
};

export type NotificationsResponse = {
  notifications: AppNotification[];
  unreadCount: number;
};
