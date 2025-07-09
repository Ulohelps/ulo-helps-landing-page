"use client";

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
import Slideshow from "@/components/slide-show";

export default function Login() {
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
          variant: "success",
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (error.message.includes("email not verified")) {
        await sendOtp(email);
        toast({
          title: "Email verification required",
          description: "We've sent you a verification code",
          variant: "success",
        });
      } else {
        toast({
          title: "Login failed",
          description: error.message || "Please check your credentials",
          variant: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    try {
      // Redirect to backend OAuth endpoint
      window.location.href = `https://ulo-v1-stagging-be-b9a3d3832785.herokuapp.com/api/v1/auth/google`;
    } catch (error) {
      toast({
        title: "Google sign-in failed",
        description: "Please try again",
        variant: "error",
      });
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col md:flex-row justify-between gap-6 px-3 max-w-[1240px] mx-auto md:px-10 py-4 md:py-10 md:my-20">
      <Slideshow />
      <div className="flex flex-col w-full md:w-2/5 px-4">
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

        <form className="w-full mt-6" onSubmit={handleLogin}>
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
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin" /> : "Log in"}
            </Button>
          </div>
        </form>
        <div className="mt-5">
          <div className="text-center">
            <span className="text-sm text-[#344054]">
              Don't have an account?{" "}
            </span>
            <Link
              href="/auth/register"
              className="text-sm font-medium text-[#1DA5DB] hover:text-blue-300"
            >
              Sign up
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
            className="text-base text-[#06212C] w-full bg-white border border-[#D0D5DD] font-semibold p-6 rounded-[80px] cursor-pointer hover:bg-gray-50"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Image src={GoogleIcon} width={20} height={20} alt="Google" />
                Sign in with Google
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
