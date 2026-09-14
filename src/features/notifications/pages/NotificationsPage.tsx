import { Bell, Check, Loader2 } from "lucide-react";

import {
  useMarkNotificationAsRead,
  useNotifications,
} from "../hooks/useNotifications";

export default function NotificationsPage() {
  const {
    data: notifications,
    isLoading,
    isError,
  } = useNotifications();

  const markAsRead = useMarkNotificationAsRead();

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2
            size={18}
            className="animate-spin"
          />
          Loading notifications...
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-600">
          Failed to load notifications.
        </div>
      </div>
    );
  }

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (!notifications || notifications.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Notifications
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Stay updated with your learning activities.
            </p>
          </div>

          <div className="rounded-2xl border bg-white px-6 py-16 text-center shadow-sm">
            <Bell
              size={40}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              No notifications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              You don't have any notifications yet.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Stay updated with your learning activities.
          </p>
        </div>

        {/* Notification list */}

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                notification.is_read
                  ? "border-gray-200"
                  : "border-blue-200 bg-blue-50/40"
              }`}
            >
              <div className="flex items-start gap-4">

                {/* Icon */}

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    notification.is_read
                      ? "bg-gray-100 text-gray-500"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Bell size={20} />
                </div>

                {/* Content */}

                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {notification.title}
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {notification.message}
                      </p>
                    </div>

                    {!notification.is_read && (
                      <span className="shrink-0 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-medium text-white">
                        New
                      </span>
                    )}
                  </div>

                  {/* Footer */}

                  <div className="mt-4 flex items-center justify-between">

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>
                        {notification.notification_type}
                      </span>

                      <span>•</span>

                      <span>
                        {new Date(
                          notification.created_at,
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Mark as read */}

                    {!notification.is_read && (
                      <button
                        type="button"
                        onClick={() =>
                          markAsRead.mutate(
                            notification.id,
                          )
                        }
                        disabled={markAsRead.isPending}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {markAsRead.isPending ? (
                          <Loader2
                            size={15}
                            className="animate-spin"
                          />
                        ) : (
                          <Check size={15} />
                        )}

                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}