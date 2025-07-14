"use client";

import { Button } from "@/components/ui/button";
import { User2, Edit } from "lucide-react";
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import UploadPhotoModal from "./modal-content/UploadPhotoModal";
import EditNameModal from "./modal-content/EditNameModal";
import VerifyPhoneModal from "./modal-content/EditPhoneModal";
import Image from "next/image";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import { useToast } from "@/hooks/use-toast";

type ModalKeys = "uploadPhoto" | "editName" | "changePhone" | "deletePhoto";

const ProfileSetting = () => {
  const {
    profile,
    uploadProfilePicture,
    updateProfile,
    fetchProfile,
    deleteProfilePicture,
  } = useCareseekersStore();

  const [photo, setPhoto] = useState<File | null>(null);
  const [firstName, setFirstName] = useState(profile?.firstName || "");
  const [lastName, setLastName] = useState(profile?.lastName || "");
  const [phone, setPhone] = useState(profile?.user.phone || "--");

  const [openModals, setOpenModals] = useState<Record<ModalKeys, boolean>>({
    uploadPhoto: false,
    editName: false,
    changePhone: false,
    deletePhoto: false,
  });

  const { toast } = useToast();

  const modalTitles: Record<ModalKeys, string> = {
    uploadPhoto: "Change profile photo",
    editName: "Edit your name",
    changePhone: "Change phone number",
    deletePhoto: "Remove profile photo",
  };
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (key: ModalKeys) => {
    setOpenModals((prev) => ({ ...prev, [key]: true }));
  };

  const handleClose = () => {
    setOpenModals({
      uploadPhoto: false,
      editName: false,
      changePhone: false,
      deletePhoto: false,
    });
    setIsLoading(false);
  };

  const handlePhotoUpload = async () => {
    setIsLoading(true);
    try {
      if (photo) {
        await uploadProfilePicture(photo);
        await fetchProfile();
        setIsLoading(false);
        toast({
          title: "Photo upload",
          description: "Photo uploaded successfully",
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed upload",
        description: "Error uploading photo",
        variant: "error",
      });
    }
  };

  const handleDeletePhoto = async () => {
    setIsLoading(true);
    try {
      await deleteProfilePicture();
      await fetchProfile();
      setIsLoading(false);
      toast({
        title: "Photo deleted",
        description: "Profile photo deleted successfully",
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed delete",
        description: "Error deleting profile photo",
        variant: "error",
      });
    }
  };

  const handleNameChange = async () => {
    setIsLoading(true);
    const payload = { firstName, lastName };
    try {
      await updateProfile(payload);
      await fetchProfile();
      setIsLoading(false);
      toast({
        title: "profile update",
        description: "updated your name successfully",
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed update profile",
        description: "Error updating profile",
        variant: "error",
      });
    }
  };
  const handlePhoneChange = async () => {
    setIsLoading(true);
    const payload = { phone };
    try {
      await updateProfile(payload);
      await fetchProfile();
      setIsLoading(false);
      toast({
        title: "profile update",
        description: "updated your phone number successfully",
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed update profile",
        description: "Error updating profile",
        variant: "error",
      });
    }
  };

  const handleConfirm = (modalKey: ModalKeys) => {
    if (modalKey === "changePhone") {
      handlePhoneChange();
      handleClose();
    } else if (modalKey === "uploadPhoto") {
      handlePhotoUpload();
      handleClose();
    } else if (modalKey === "editName") {
      handleNameChange();
      handleClose();
    } else if (modalKey === "deletePhoto") {
      handleDeletePhoto();
      handleClose();
    }
  };

  const getModalContent = (key: ModalKeys) => {
    switch (key) {
      case "uploadPhoto":
        return <UploadPhotoModal onFileChange={setPhoto} photo={photo} />;
      case "editName":
        return (
          <EditNameModal
            firstName={firstName}
            lastName={lastName}
            setFirstName={setFirstName}
            setLastName={setLastName}
          />
        );
      case "changePhone":
        return <VerifyPhoneModal currentPhone={phone} onChange={setPhone} />;
      case "deletePhoto":
        return (
          <p className="text-base text-[#344054] font-normal">
            You’re about to delete your profile photo. Are you sure you want to
            proceed?
          </p>
        );
      default:
        return null;
    }
  };

  const getButtonText = (key: ModalKeys) => {
    if (key === "changePhone") {
      return " Save changes";
    }
    if (key === "deletePhoto") {
      return "Yes, remove profile photo";
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
          children={getModalContent(modalKey)}
        />
      ))}

      {/* Profile sections */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E4E7EC] py-6">
        <div className="flex flex-col items-start">
          <p className="text-sm text-[#475367] font-normal">Profile photo</p>
          {profile?.profileImageUrl ? (
            <Image
              src={profile?.profileImageUrl}
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
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <Button
            variant="outline"
            className="text-base font-semibold"
            onClick={() => openModal("deletePhoto")}
          >
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

      <div className="flex items-center gap-4 justify-between border-b border-[#E4E7EC] py-6">
        <div className="flex flex-col justify-between gap-2 w-full">
          <p className="text-sm text-[#475367] font-normal">Name</p>
          <p className="text-base text-[#344054] font-normal capitalize">
            {firstName} {lastName}
          </p>
        </div>
        <Button
          variant="outline"
          className="hidden md:block text-base font-semibold"
          onClick={() => openModal("editName")}
        >
          Edit name
        </Button>
        <Button
          variant="outline"
          className=" md:hidden text-base font-semibold rounded-full h-12 w-12"
          onClick={() => openModal("editName")}
        >
          <Edit />
        </Button>
      </div>

      <div className="flex  items-center  gap-4 justify-between border-b border-[#E4E7EC] py-6">
        <div className="flex flex-col justify-between gap-2 w-full">
          <p className="text-sm text-[#475367] font-normal">Phone number</p>
          <p className="text-base text-[#344054] font-normal">
            {profile?.user.phone}
          </p>
        </div>
        <Button
          variant="outline"
          className="hidden md:block text-base font-semibold"
          onClick={() => openModal("changePhone")}
        >
          Edit phone number
        </Button>
        <Button
          variant="outline"
          className=" md:hidden text-base font-semibold rounded-full h-12 w-12"
          onClick={() => openModal("changePhone")}
        >
          <Edit />
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetting;
