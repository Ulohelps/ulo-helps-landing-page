"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/stores/auth-store";
import Logo from "@/public/FINAL ULO Logo_approved_main.svg";
import Image from "next/image";
import { Loader } from "lucide-react";

export default function Verify({ email }: { email: string }) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(30);

  const router = useRouter();
  const { toast } = useToast();
  const { verifyEmail, sendOtp, setStep } = useAuthStore();

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await verifyEmail(email, otp);
      toast({
        title: "Email verified successfully",
        description: "Your email has been verified",
      });
      setIsLoading(false);
      setStep(3);
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message || "Invalid verification code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      await sendOtp(email);
      toast({
        title: "OTP sent",
        description: "A new verification code has been sent to your email",
      });
      setTimer(60); // Restart countdown
    } catch (error: any) {
      toast({
        title: "Failed to resend OTP",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col w-full md:w-2/5 md:px-6">
      <div className="w-full gap-3">
        <Image src={Logo} alt="Ulo logo" width={67} height={32} />
        <p className="text-2xl text-[#344054] font-bold mt-2">
          Check your email
        </p>
        <p className="text-base text-[#344054] text-justify font-normal mt-2">
          We sent a verification code to
          <span className="font-semibold"> {email}</span>. Please enter the code
          in the field below to continue.
        </p>
      </div>

      <div className="w-full mt-6">
        <div className="">
          <form className="space-y-8 w-full" onSubmit={handleVerify}>
            <div>
              <Label
                htmlFor="otp"
                className="text-sm text-[#344054] font-normal"
              >
                Verification code
              </Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength={6}
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="border bg-white border-[#D0D5DD] rounded-[12px] text-sm text-[#344054] font-normal  py-3 focus:outline-none"
              />
            </div>

            <div className="flex justify-center w-full">
              <Button
                type="submit"
                className="text-base w-full text-[#06212C] font-semibold hover:bg-[#F6AA3D]/50 p-6 rounded-[80px] cursor-pointer shadow-md"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Verify code"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-[#344054] font-normal">
            Didn’t get a code?{" "}
            {timer > 0 ? (
              <span>
                Resend code in <span className="font-medium">{timer}s</span>
              </span>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={isResending}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? (
                  <Loader className="animate-spin w-4 h-4 inline" />
                ) : (
                  "Resend code"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
