import apiFetch from "@/lib/api/index";
import type { ApiResponse, NotificationsResponse } from "@/types/notification";

export const getNotifications = () =>
  apiFetch<ApiResponse<NotificationsResponse>>("/notifications");

export const markNotificationRead = (notificationId: string) =>
  apiFetch<ApiResponse<null>>(`/notifications/${notificationId}/read`, { method: "PATCH" });

export const markAllNotificationsRead = () =>
  apiFetch<ApiResponse<{ count: number }>>("/notifications/read-all", { method: "PATCH" });
