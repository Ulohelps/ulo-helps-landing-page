"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VerifyEmailModalProps {
  currentEmail: string;
  onSendCode: (email: string) => void;
  onVerify: (code: string) => void;
  step: "input" | "verify";
}

const EditEmailModal = ({
  currentEmail,
  onSendCode,
  onVerify,
  step,
}: VerifyEmailModalProps) => {
  const [email, setEmail] = useState(currentEmail);
  const [code, setCode] = useState("");

  if (step === "input") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="text-sm text-[#344054] font-light"
          >
            Email Address
          </Label>
          <Input
            type="email"
            className="mt-1 h-11 rounded-xl border-gray-300"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-base text-[#344054] font-normal">
        We sent a verification code to{" "}
        <span className="font-semibold">{email}</span>. Enter it below to verify
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

export default EditEmailModal;
