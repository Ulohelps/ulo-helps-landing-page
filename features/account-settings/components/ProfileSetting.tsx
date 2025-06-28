import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import React from "react";

const ProfileSetting = () => {
  return (
    <div className="max-w-[749px]">
      <div className="flex flex-col items-center md:flex-row md:items-end justify-between gap-4 border-b border-[#E4E7EC] py-6">
        <div className="flex flex-col">
          <p className="text-sm text-[#475367] font-normal">Profile photo</p>
          <div className="flex items-center justify-center h-20 w-20 rounded-full border-2 border-[#344054] p-6 mt-2">
            <User2 stroke="#344054" strokeWidth={1.5} size={80} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row  items-center gap-2">
          <Button variant="outline" className="text-base font-semibold">
            Remove profile photo
          </Button>
          <Button variant="outline" className="text-base font-semibold">
            Change profile photo
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center md:flex-row md:items-center gap-4 justify-between  border-b border-[#E4E7EC] py-6">
        <div className="flex md:flex-col items-center justify-center md:items-start md:justify-between gap-4 md:gap-2 w-full">
          <p className="text-sm text-[#475367] font-normal">Name</p>
          <p className="text-base text-[#344054] font-normal">
            Nkechi Williams
          </p>
        </div>

        <Button variant="outline" className="text-base font-semibold">
          Edit name
        </Button>
      </div>
      <div className="flex flex-col items-center md:flex-row md:items-end gap-4 justify-between  border-b border-[#E4E7EC] py-6">
        <div className="flex md:flex-col items-center justify-center md:items-start md:justify-between gap-4 md:gap-2 w-full">
          <p className="text-sm text-[#475367] font-normal">Phone number</p>
          <p className="text-base text-[#344054] font-normal">
            +234 812 345 6789
          </p>
        </div>

        <Button variant="outline" className="text-base font-semibold">
          Edit phone number
        </Button>
      </div>
      <div className="flex flex-col items-center md:flex-row md:items-end gap-4 justify-between  border-b border-[#E4E7EC] py-6">
        <div className="flex md:flex-col items-center justify-center md:items-start md:justify-between gap-4 md:gap-2 w-full">
          <p className="text-sm text-[#475367] font-normal">Email</p>
          <p className="text-base text-[#344054] font-normal">
            nkechi@example.com
          </p>
        </div>

        <Button variant="outline" className="text-base font-semibold">
          Edit Email
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetting;
