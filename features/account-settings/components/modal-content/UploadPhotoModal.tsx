"use client";

import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";
import Image from "next/image";

interface UploadPhotoModalProps {
  onFileChange: (file: File | null) => void;
  photo: File | null;
}

const UploadPhotoModal = ({ onFileChange, photo }: UploadPhotoModalProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between cursor-pointer"
      onClick={() => document.getElementById("profilePhoto")?.click()}
    >
      <div className="flex items-center gap-4">
        {photo ? (
          <Image
            src={URL.createObjectURL(photo)}
            alt="user profile picture"
            width={80}
            height={80}
            className="h-12 w-12 rounded-full object-cover mt-2"
          />
        ) : (
          ""
        )}

        <div className="flex flex-col gap-2">
          <span className="text-base text-[#344054] font-medium">
            Upload your image
          </span>
          <div className="text-xs text-[#98A2B3] font-normal">
            PDF format <span className="font-semibold">• Max. 5MB</span>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="profilePhoto"
      />
      <Button
        type="button"
        variant="outline"
        className="text-sm text-[#06212C] border-gray-300 bg-[#F0F2F5] hover:bg-gray-50 px-6 py-2 rounded-xl font-semibold mt-2"
      >
        Select file
      </Button>
    </div>
  );
};
export default UploadPhotoModal;
