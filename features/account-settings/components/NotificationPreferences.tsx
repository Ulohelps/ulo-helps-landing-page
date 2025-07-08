"use client";

import { Switch } from "@/components/ui/switch";
import React, { useState, useEffect } from "react";
import { notificationService } from "@/lib/services/notificationService";
import { useToast } from "@/hooks/use-toast";

interface NotificationPreference {
  newCaregiverMatchesNotifications: boolean;
  subscriptionRemindersNotifications: boolean;
  systemAnnouncementsNotifications: boolean;
}

const NotificationPreferences = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreference>({
    newCaregiverMatchesNotifications: true,
    subscriptionRemindersNotifications: true,
    systemAnnouncementsNotifications: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  const { updateNotificationPreferences, getNotificationPreferences } =
    notificationService;

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setIsLoading(true);
        const response = await getNotificationPreferences();
        const data = response.data;
        setPreferences({
          newCaregiverMatchesNotifications:
            data.newCaregiverMatchesNotifications ?? true,
          subscriptionRemindersNotifications:
            data.subscriptionRemindersNotifications ?? true,
          systemAnnouncementsNotifications:
            data.systemAnnouncementsNotifications ?? true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load notification preferences",
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const handlePreferenceChange = async (
    key: keyof NotificationPreference,
    value: boolean
  ) => {
    try {
      setPreferences((prev) => ({ ...prev, [key]: value }));

      await updateNotificationPreferences({ [key]: value });

      toast({
        title: "Success",
        description: "Notification preferences updated",
        variant: "success",
      });
    } catch (error) {
      setPreferences((prev) => ({ ...prev, [key]: !value }));

      toast({
        title: "Error",
        description: "Failed to update notification preferences",
        variant: "error",
      });
    }
  };

  const skeletonBlock = () => (
    <div className="flex items-center justify-between border-b border-[#E4E7EC] py-6 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-4 w-48 bg-gray-300 rounded"></div>
        <div className="h-3 w-72 bg-gray-200 rounded"></div>
      </div>
      <div className="h-6 w-12 bg-gray-300 rounded-full" />
    </div>
  );

  return (
    <div className="max-w-[749px]">
      {isLoading ? (
        <>
          {skeletonBlock()}
          {skeletonBlock()}
          {skeletonBlock()}
        </>
      ) : (
        <>
          <div className="flex items-center justify-between border-b border-[#E4E7EC] py-6">
            <div>
              <p className="text-base text-[#344054] font-semibold">
                New caregiver matches
              </p>
              <p className="text-sm text-[#475367] font-normal mt-1">
                Receive notification emails when you connect with new
                caregivers.
              </p>
            </div>
            <Switch
              id="new-caregiver-matches"
              checked={preferences.newCaregiverMatchesNotifications}
              onCheckedChange={(checked) =>
                handlePreferenceChange(
                  "newCaregiverMatchesNotifications",
                  checked
                )
              }
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between border-b border-[#E4E7EC] py-6">
            <div>
              <p className="text-base text-[#344054] font-semibold">
                Subscription/payment reminders
              </p>
              <p className="text-sm text-[#475367] font-normal mt-1">
                Receive reminders when your subscription is about to expire.
              </p>
            </div>
            <Switch
              id="subscription-reminders"
              checked={preferences.subscriptionRemindersNotifications}
              onCheckedChange={(checked) =>
                handlePreferenceChange(
                  "subscriptionRemindersNotifications",
                  checked
                )
              }
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between border-b border-[#E4E7EC] py-6">
            <div>
              <p className="text-base text-[#344054] font-semibold">
                System announcements
              </p>
              <p className="text-sm text-[#475367] font-normal mt-1">
                Receive general system status announcements.
              </p>
            </div>
            <Switch
              id="system-announcements"
              checked={preferences.systemAnnouncementsNotifications}
              onCheckedChange={(checked) =>
                handlePreferenceChange(
                  "systemAnnouncementsNotifications",
                  checked
                )
              }
              disabled={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPreferences;
