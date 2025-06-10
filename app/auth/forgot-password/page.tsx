"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/public/FINAL ULO Logo_approved_main.svg";
import Image from "next/image";

import { Loader } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement forgot password API call
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Reset code sent",
          description: "We've sent a password reset code to your email",
        });

        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast({
        title: "Failed to send reset code",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col bg-white border border-[#E4E7EC] rounded-[20px] px-6 py-10 my-10 mx-auto max-w-[556px]">
      <div className="flex flex-col items-center w-full gap-3 border-b pb-5 border-[#D0D5DD]">
        <Image src={Logo} alt="" />
        <p className="text-2xl text-[#344054] font-bold">
          {" "}
          Forgot your password?
        </p>
        <p className="text-base text-[#344054] ">
          Enter your email address below. If an account exists, we’ll send a
          reset code to the email address.
        </p>
      </div>

      <form className="w-full mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label className="text-sm text-[#344054] font-normal" htmlFor="email">
            Email Address
          </Label>
          <Input
            id="email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 rounded-[10px] bg-white border-[#D0D5DD] text-sm text-[#344054] font-normal"
          />
        </div>

        <div className="flex justify-center mt-6 w-full">
          <Button
            type="submit"
            className="text-base text-[#06212C] hover:bg-[#F6AA3D]/50 font-semibold py-3 px-6 rounded-[80px] cursor-pointer w-full"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Get reset code"}
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-[#1DA5DB] hover:text-blue-400"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
