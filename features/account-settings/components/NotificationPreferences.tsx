"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";

const NotificationPreferences = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="max-w-[749px]">
      <div className="flex items-center justify-between  border-b border-[#E4E7EC] py-6">
        <div>
          <p className="text-base text-[#344054] font-semibold">
            New caregiver matches
          </p>
          <p className="text-sm text-[#475367] font-normal mt-1">
            Receive notification emails when you connect with new caregivers.
          </p>
        </div>

        <Switch
          id="subscription-toggle"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
      </div>
      <div className="flex items-center justify-between  border-b border-[#E4E7EC] py-6">
        <div>
          <p className="text-base text-[#344054] font-semibold">
            Subscription/payment reminders
          </p>
          <p className="text-sm text-[#475367] font-normal mt-1">
            Receive reminders when your subscription is about to expire.
          </p>
        </div>

        <Switch
          id="subscription-toggle"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
      </div>
      <div className="flex items-center justify-between  border-b border-[#E4E7EC] py-6">
        <div>
          <p className="text-base text-[#344054] font-semibold">
            System announcements
          </p>
          <p className="text-sm text-[#475367] font-normal mt-1">
            Receive general system status announcements.
          </p>
        </div>

        <Switch
          id="subscription-toggle"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
      </div>
    </div>
  );
};

export default NotificationPreferences;
