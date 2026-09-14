import api from "@/lib/api";

// ======================================================
// TYPES
// ======================================================

export interface Notification {
  id: string;

  title: string;

  message: string;

  notification_type:
    | "ENROLLMENT"
    | "LESSON"
    | "EXAM"
    | "CERTIFICATE"
    | "ANNOUNCEMENT";

  is_read: boolean;

  read_at: string | null;

  created_at: string;
}

// ======================================================
// PAGINATED RESPONSE
// ======================================================

interface NotificationListResponse {
  count: number;

  next: string | null;

  previous: string | null;

  results: Notification[];
}

// ======================================================
// GET NOTIFICATIONS
// ======================================================

/**
 * Get all notifications belonging
 * to the currently authenticated user.
 *
 * Django REST Framework returns a
 * paginated response, so we return
 * only the results array to the UI.
 */
export async function getNotifications(): Promise<
  Notification[]
> {
  const response =
    await api.get<NotificationListResponse>(
      "/notifications/",
    );

  return response.data.results;
}

// ======================================================
// MARK NOTIFICATION AS READ
// ======================================================

/**
 * Mark one notification as read.
 */
export async function markNotificationAsRead(
  notificationId: string,
): Promise<{
  message: string;
  is_read: boolean;
}> {
  const response =
    await api.patch<{
      message: string;
      is_read: boolean;
    }>(
      `/notifications/${notificationId}/read/`,
    );

  return response.data;
}