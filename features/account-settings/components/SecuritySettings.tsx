import { Button } from "@/components/ui/button";
import React from "react";

const SecuritySettings = () => {
  return (
    <div className="max-w-[749px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4  border-b border-[#E4E7EC] py-6">
        <div>
          <p className="text-sm text-[#475367] font-normal">Change password</p>
          <p className="text-base text-[#344054] font-normal">
            Set a strong password for accessing your account.
          </p>
        </div>

        <Button variant="outline" className="text-base font-semibold">
          Change password
        </Button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4  border-b border-[#E4E7EC] py-6">
        <div>
          <p className="text-sm text-[#475367] font-normal">
            Delete your account
          </p>
          <p className="text-base text-[#344054] font-normal">
            Delete your account and all related information. This action is not
            reversible.
          </p>
        </div>

        <Button variant="destructive" className="text-base font-semibold">
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
