import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import SettingsModal from "./SettingsModal";
import ChangePassword from "./modal-content/ChangePassword";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SecuritySettings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [openmodal, setOpenModal] = useState(false);

  const router = useRouter();

  const { changePassword, error } = useCareseekersStore();

  const { toast } = useToast();

  const handleChangePassword = async () => {
    setIsLoading(true);
    const payload = { oldPassword, newPassword };

    const res = await changePassword(payload);
    if (res.success) {
      setIsLoading(false);
      toast({
        title: "Change password",
        description: "Password changed successfully",
        variant: "success",
      });
    } else {
      setOpenModal(false);
      toast({
        title: "Failed",
        description: `${error}||"failed to change password"`,
        variant: "error",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-[749px]">
      <SettingsModal
        open={openmodal}
        onClose={() => setOpenModal(false)}
        title="Change password"
        btnText2="Save changes"
        btnText1="Cancel"
        onConfirm={handleChangePassword}
        loading={isloading}
        children={
          <ChangePassword
            newPassword={newPassword}
            oldPassword={oldPassword}
            setNewPassword={setNewPassword}
            setOldPassword={setOldPassword}
          />
        }
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4  border-b border-[#E4E7EC] py-6">
        <div>
          <p className="text-sm text-[#475367] font-normal">Change password</p>
          <p className="text-base text-[#344054] font-normal">
            Set a strong password for accessing your account.
          </p>
        </div>

        <Button
          variant="outline"
          className="text-base font-semibold"
          onClick={() => setOpenModal(true)}
        >
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

        <Button
          variant="destructive"
          className="text-base font-semibold"
          onClick={() => router.push("/account-settings/delete-account")}
        >
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
