import { api } from "../api/api";

interface NotificationPreference {
  newCaregiverMatchesNotifications?: boolean;
  subscriptionRemindersNotifications?: boolean;
  systemAnnouncementsNotifications?: boolean;
}

export const notificationService = {
  updateNotificationPreferences: async (payload: NotificationPreference) => {
    return api.put("/users/notification-preferences", payload);
  },

  getNotificationPreferences: async () => {
    return api.get("/users/notification-preferences");
  },

  getNotifications: async () => {
    return api.get("/notifications");
  },
};
