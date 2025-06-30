"use client";

import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import UploadPhotoModal from "./modal-content/UploadPhotoModal";
import EditNameModal from "./modal-content/EditNameModal";
import VerifyPhoneModal from "./modal-content/EditPhoneModal";
import VerifyEmailModal from "./modal-content/EditEmailModal";
import Image from "next/image";

type ModalKeys = "uploadPhoto" | "editName" | "changePhone" | "changeEmail";

const ProfileSetting = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [openModals, setOpenModals] = useState<Record<ModalKeys, boolean>>({
    uploadPhoto: false,
    editName: false,
    changePhone: false,
    changeEmail: false,
  });

  const modalTitles: Record<ModalKeys, string> = {
    uploadPhoto: "Change profile photo",
    editName: "Edit your name",
    changePhone: "Change phone number",
    changeEmail: "Change email address",
  };
  const [verificationStep, setVerificationStep] = useState<{
    phone: "input" | "verify";
    email: "input" | "verify";
  }>({ phone: "input", email: "input" });
  const [formData, setFormData] = useState({
    phone: "+234 812 345 6789",
    email: "nkechi@example.com",
    verificationCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (key: ModalKeys) => {
    setOpenModals((prev) => ({ ...prev, [key]: true }));
    // Reset verification step when opening modal
    if (key === "changePhone")
      setVerificationStep((prev) => ({ ...prev, phone: "input" }));
    if (key === "changeEmail")
      setVerificationStep((prev) => ({ ...prev, email: "input" }));
  };

  const handleClose = () => {
    setOpenModals({
      uploadPhoto: false,
      editName: false,
      changePhone: false,
      changeEmail: false,
    });
    setIsLoading(false);
  };

  const handleSendCode = (type: "phone" | "email", value: string) => {
    setIsLoading(true);
    // Simulate API call to send code
    setTimeout(() => {
      setIsLoading(false);
      setVerificationStep((prev) => ({ ...prev, [type]: "verify" }));
      setFormData((prev) => ({ ...prev, [type]: value }));
    }, 1000);
  };

  const handleVerify = (type: "phone" | "email") => {
    setIsLoading(true);
    // Simulate API verification
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
      // Update the verified value in your state/API here
    }, 1000);
  };

  const handleConfirm = (modalKey: ModalKeys) => {
    if (modalKey === "changePhone") {
      if (verificationStep.phone === "input") {
        handleSendCode("phone", formData.phone);
      } else {
        handleVerify("phone");
      }
    } else if (modalKey === "changeEmail") {
      if (verificationStep.email === "input") {
        handleSendCode("email", formData.email);
      } else {
        handleVerify("email");
      }
    } else {
      // Handle other modals
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        handleClose();
      }, 1000);
    }
  };

  const getModalContent = (key: ModalKeys) => {
    switch (key) {
      case "uploadPhoto":
        return <UploadPhotoModal onFileChange={setPhoto} photo={photo} />;
      case "editName":
        return <EditNameModal />;
      case "changePhone":
        return (
          <VerifyPhoneModal
            currentPhone={formData.phone}
            step={verificationStep.phone}
            onSendCode={(phone) => setFormData((prev) => ({ ...prev, phone }))}
            onVerify={(code) =>
              setFormData((prev) => ({ ...prev, verificationCode: code }))
            }
          />
        );
      case "changeEmail":
        return (
          <VerifyEmailModal
            currentEmail={formData.email}
            step={verificationStep.email}
            onSendCode={(email) => setFormData((prev) => ({ ...prev, email }))}
            onVerify={(code) =>
              setFormData((prev) => ({ ...prev, verificationCode: code }))
            }
          />
        );
      default:
        return null;
    }
  };

  const getButtonText = (key: ModalKeys) => {
    if (key === "changePhone") {
      return verificationStep.phone === "input"
        ? "Send verification code"
        : "Verify & Save changes";
    }
    if (key === "changeEmail") {
      return verificationStep.email === "input"
        ? "Send verification code"
        : "Verify & Save changes";
    }
    return "Save changes";
  };

  return (
    <div className="max-w-[749px]">
      {/* Render all modals */}
      {(Object.keys(openModals) as ModalKeys[]).map((modalKey) => (
        <SettingsModal
          key={modalKey}
          open={openModals[modalKey]}
          onClose={handleClose}
          title={modalTitles[modalKey]}
          btnText2={getButtonText(modalKey)}
          btnText1="Cancel"
          onConfirm={() => handleConfirm(modalKey)}
          loading={isLoading}
        >
          {getModalContent(modalKey)}
        </SettingsModal>
      ))}

      {/* Profile sections */}
      <div className="flex flex-col items-center md:flex-row md:items-end justify-between gap-4 border-b border-[#E4E7EC] py-6">
        <div className="flex flex-col">
          <p className="text-sm text-[#475367] font-normal">Profile photo</p>
          {photo ? (
            <Image
              src={URL.createObjectURL(photo)}
              alt="user profile picture"
              width={80}
              height={80}
              className="h-20 w-20 rounded-full object-cover mt-2"
            />
          ) : (
            <div className="flex items-center justify-center h-20 w-20 rounded-full border-2 border-[#344054] p-6 mt-2">
              <User2 stroke="#344054" strokeWidth={1.5} size={80} />
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Button variant="outline" className="text-base font-semibold">
            Remove profile photo
          </Button>
          <Button
            variant="outline"
            onClick={() => openModal("uploadPhoto")}
            className="text-base font-semibold"
          >
            Change profile photo
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center md:flex-row md:items-center gap-4 justify-between border-b border-[#E4E7EC] py-6">
        <div className="flex md:flex-col items-center justify-center md:items-start md:justify-between gap-4 md:gap-2 w-full">
          <p className="text-sm text-[#475367] font-normal">Name</p>
          <p className="text-base text-[#344054] font-normal">
            Nkechi Williams
          </p>
        </div>
        <Button
          variant="outline"
          className="text-base font-semibold"
          onClick={() => openModal("editName")}
        >
          Edit name
        </Button>
      </div>

      <div className="flex flex-col items-center md:flex-row md:items-end gap-4 justify-between border-b border-[#E4E7EC] py-6">
        <div className="flex md:flex-col items-center justify-center md:items-start md:justify-between gap-4 md:gap-2 w-full">
          <p className="text-sm text-[#475367] font-normal">Phone number</p>
          <p className="text-base text-[#344054] font-normal">
            +234 812 345 6789
          </p>
        </div>
        <Button
          variant="outline"
          className="text-base font-semibold"
          onClick={() => openModal("changePhone")}
        >
          Edit phone number
        </Button>
      </div>

      <div className="flex flex-col items-center md:flex-row md:items-end gap-4 justify-between border-b border-[#E4E7EC] py-6">
        <div className="flex md:flex-col items-center justify-center md:items-start md:justify-between gap-4 md:gap-2 w-full">
          <p className="text-sm text-[#475367] font-normal">Email</p>
          <p className="text-base text-[#344054] font-normal">
            nkechi@example.com
          </p>
        </div>
        <Button
          variant="outline"
          className="text-base font-semibold"
          onClick={() => openModal("changeEmail")}
        >
          Edit Email
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetting;
