"use client";

import { useAuthStore } from "@/lib/stores/auth-store";
import { useState, useEffect } from "react";
import EmailVerification from "./component/EmailVerification";
import Verify from "./component/Verify";
import UserDetailsForm from "./component/UserDetailsForm";
import Slideshow from "@/components/slide-show";

export default function Register() {
  const [email, setEmail] = useState("");
  const { step } = useAuthStore();

  return (
    <div className="flex items-center flex-col md:flex-row justify-between gap-4 max-w-[1124px] px-3 mx-auto md:px-10 py-4 md:py-10 md:my-10">
      <Slideshow />
      {step === 1 && <EmailVerification email={email} setEmail={setEmail} />}
      {step === 2 && <Verify email={email} />}
      {step === 3 && <UserDetailsForm email={email} />}
    </div>
  );
}
