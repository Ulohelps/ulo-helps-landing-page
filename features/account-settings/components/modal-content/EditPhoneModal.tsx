"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneInputField } from "@/components/Phone-input-field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface VerifyPhoneModalProps {
  currentPhone: string;
  onSendCode: (phone: string) => void;
  onVerify: (code: string) => void;
  step: "input" | "verify";
}

const EditPhoneModal = ({
  currentPhone,
  onSendCode,
  onVerify,
  step,
}: VerifyPhoneModalProps) => {
  const [phone, setPhone] = useState(currentPhone);
  const [code, setCode] = useState("");

  if (step === "input") {
    return <PhoneInputField value={phone} onChange={setPhone} />;
  }

  return (
    <div className="space-y-4">
      <p className="text-base text-[#344054] font-normal">
        We sent a verification code to{" "}
        <span className="font-semibold">{phone}</span>. Enter it below to verify
        your phone number.
      </p>
      <div className="space-y-2">
        <Label
          htmlFor="verifcationCode"
          className="text-sm text-[#344054] font-light"
        >
          Verification Code
        </Label>
        <Input
          type="text"
          id="verificationCode"
          className="mt-1 h-11 rounded-xl border-gray-300"
          placeholder="Enter verification code"
        />
      </div>
    </div>
  );
};

export default EditPhoneModal;
