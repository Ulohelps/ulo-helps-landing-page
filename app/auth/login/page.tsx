"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/public/FINAL ULO Logo_approved_main.svg";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/stores/auth-store";
import { PasswordInput } from "@/components/password-input";
import GoogleIcon from "@/public/googleIcon.svg";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const { login, sendOtp } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });

        router.push("/dashboard");
      }
    } catch (error: any) {
      if (error.message.includes("email not verified")) {
        await sendOtp(email);
        toast({
          title: "email verification required",
          description: "We've sent you a verification code",
        });
      } else {
        toast({
          title: "Login failed",
          description: error.message || "Please check your credentials",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col md:flex-row justify-between gap-6 px-3 max-w-[1124px] mx-auto md:px-10 py-4  md:py-10 md:my-20 ">
      <div className="bg-[#B4E1F3] hidden md:block h-[740px] w-full md:w-3/5 rounded-[24px]"></div>
      <div className="flex flex-col  w-full md:w-2/5  px-4">
        <div className="w-full gap-2">
          <Image src={Logo} alt="" width={67} height={32} />
          <p className="text-2xl text-[#344054] font-bold mt-2">
            Welcome back to Ulo
          </p>
          <p className="text-base text-[#344054] mt-2">
            Continue where you left off by logging in with your account
            credentials below.
          </p>
        </div>

        <form className="w-full mt-6 " onSubmit={handleLogin}>
          <div>
            <Label
              className="text-sm text-[#344054] font-normal"
              htmlFor="email"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-[2px] rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] font-normal py-3"
            />
          </div>
          <div className="grid gap-4 w-full mt-8">
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
                className="mt-[2px] rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] font-normal py-3"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Link
            href="/auth/forgot-password"
            className="text-base block text-[#1DA5DB] font-semibold mt-4"
          >
            Forgot your password?
          </Link>
          <div className="flex justify-center w-full mt-8">
            <Button
              type="submit"
              className="text-base w-full hover:bg-[#F6AA3D]/50 text-[#06212C] font-semibold p-6 rounded-[80px] cursor-pointer shadow-md"
            >
              {isLoading ? <Loader className="animate-spin" /> : "Log in"}
            </Button>
          </div>
        </form>
        <div className="mt-5">
          <div className="text-center">
            <span className="text-sm text-[#344054] ">
              Already have an account?{" "}
            </span>
            <Link
              href="/auth/register"
              className="text-sm font-medium text-[#1DA5DB] hover:text-blue-300"
            >
              sign up
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="h-[1px] w-[48%] bg-[#E4E7EC]" />
          <span className="text-[10px] text-[#98A2B3] font-semibold">OR</span>
          <div className="h-[1px] w-[48%] bg-[#E4E7EC]" />
        </div>
        <div className="flex justify-center mt-4 w-full">
          <Button
            type="button"
            className="text-base text-[#06212C] w-full bg-white border border-[#D0D5DD] font-semibold p-6 rounded-[80px] cursor-pointer"
            disabled={googleLoading}
          >
            {googleLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <p className="flex items-center gap-2">
                <Image src={GoogleIcon} width={20} height={20} alt="" /> Sign up
                with Google
              </p>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
