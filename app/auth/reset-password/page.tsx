"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/public/FINAL ULO Logo_approved_main.svg";
import Image from "next/image";
import { Loader } from "lucide-react";
import { PasswordInput } from "@/components/password-input";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(30);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const { sendOtp } = useAuthStore();

  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.push("/auth/forgot-password");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "error",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement reset password API call
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp, newPassword: password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Password reset successful",
          description: "Your password has been updated",
          variant: "success",
        });

        router.push("/auth/login");
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast({
        title: "Password reset failed",
        description: error.message || "Please try again",
        variant: "error",
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
        variant: "error",
      });
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <div className="flex items-center flex-col bg-white border border-[#E4E7EC] rounded-[20px] px-6 py-10 my-10 mx-auto max-w-[556px]">
      <div className="w-full">
        <Image src={Logo} alt="" width={67} height={32} />
        <p className="text-2xl text-[#344054] font-bold mt-2">
          Check your email
        </p>
        <p className="text-base text-[#344054] mt-2">
          We sent a reset code to {email}. Enter the code below to reset your
          password.
        </p>
      </div>
      <div className="w-full mt-6">
        <div className="bg-white">
          <form className="w-full  space-y-8" onSubmit={handleSubmit}>
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
                className="border border-[#D0D5DD] rounded-[12px] text-sm text-[#344054] font-normal px-3 focus:outline-none"
              />
            </div>
            <div>
              <div className="grid gap-4 w-full">
                <div className="grid gap-2">
                  <Label
                    htmlFor="password"
                    className="text-sm text-[#344054] font-normal"
                  >
                    Password
                  </Label>
                  <PasswordInput
                    id="password"
                    placeholder="Enter your password"
                    className="mt-[2px] border border-[#D0D5DD] rounded-[12px] text-sm text-[#344054] font-normal px-3 focus:outline-none"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-1">
                {[
                  {
                    label: "Minimum of 6 characterss",
                    passed: password.length >= 6,
                  },
                  {
                    label: "One UPPERCASE and LOWERCASE character",
                    passed: /[A-Z]/.test(password) && /[a-z]/.test(password),
                  },

                  {
                    label:
                      "At least one digit and special character from @#$%^&*",
                    passed:
                      /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password),
                  },
                ].map((check, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div
                      className={`w-4 h-4 flex items-center justify-center rounded-full border ${
                        check.passed
                          ? "bg-[#099137] border-[#099137] text-white"
                          : "border-[#98A2B3] bg-[#98A2B3]"
                      }`}
                    >
                      {check.passed ? "✓" : ""}
                    </div>
                    <span
                      className={`${
                        check.passed ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-sm text-[#344054] font-normal"
              >
                Confirm Password
              </Label>
              <PasswordInput
                id="confirmPassword"
                placeholder="Enter your password"
                className="border border-[#D0D5DD] rounded-[10px] text-sm text-[#344054] font-normal h-10 px-3 focus:outline-none"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center mt-6 w-full">
              <Button
                type="submit"
                className="text-base text-[#06212C] w-full hover:bg-[#F6AA3D]/50 font-semibold p-6 rounded-[80px] cursor-pointer shadow-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Reset password"
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
