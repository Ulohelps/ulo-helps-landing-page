"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckIcon } from "lucide-react";
import React from "react";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttons: React.ReactNode;
  onConfirm?: () => void;
  success?: boolean;
  loading?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  description,
  buttons,
  success = true,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[560px] w-full max-w-full sm:rounded-[32px] p-0 rounded-none border-none sm:p-8 bg-white"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          padding: "0px",
        }}
      >
        <DialogHeader className="text-center px-8 py-6">
          <div
            className={`w-20 h-20 mx-auto ${
              success ? "bg-[#E7F6EC]" : "bg-[#FEE4E2]"
            }  rounded-full flex items-center justify-center mb-3`}
          >
            {!success ? (
              <AlertCircle className="text-[#F1473C] w-9 h-9" />
            ) : (
              <CheckIcon className="w-9 h-9 text-white bg-[#099137] rounded-full p-2" />
            )}
          </div>
          <DialogTitle className="text-xl text-[#475367] text-center font-semibold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-base text-[#667185] text-center font-normal mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter
          className={` gap-4 mt-6 p-6 rounded-b-[32px] w-full ${
            success ? "bg-[#E7F6EC]" : "bg-[#FEE4E2]"
          }`}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {buttons}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
