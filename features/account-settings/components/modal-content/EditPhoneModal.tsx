"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneInputField } from "@/components/Phone-input-field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface VerifyPhoneModalProps {
  currentPhone: string;
  onChange: (phone: string) => void;
}

const EditPhoneModal = ({
  currentPhone,
  onChange,
}: VerifyPhoneModalProps) => {
  return <PhoneInputField value={currentPhone} onChange={onChange} />;
};

export default EditPhoneModal;
