import Logo from "@/public/FINAL ULO Logo_approved_main.svg";
import GoogleIcon from "@/public/googleIcon.svg";
import Image from "next/image";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { toast } from "@/hooks/use-toast";
import { set } from "date-fns";

const EmailVerification = ({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (mail: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { sendEmailVerification, setStep } = useAuthStore();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setStep(2);
    try {
      await sendEmailVerification(email);
      toast({
        title: "OTP sent",
        description: "A new verification code has been sent to your email",
      });
    } catch (error: any) {
      toast({
        title: "Failed to resend OTP",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col  w-full md:w-1/2 md:px-4">
      <div className="flex flex-col w-full gap-3 ">
        <Image src={Logo} alt="" />
        <p className="text-2xl text-[#344054] font-bold">Welcome to ULO</p>
        <p className="text-base text-[#344054] ">
          Sign up by entering your email address in the field below. We’ll send
          a code to verify your email address.
        </p>
      </div>

      <div className="w-full mt-3">
        <div className="py-8">
          <form className="w-full space-y-4" onSubmit={handleSendOtp}>
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
                className="mt-1 bg-white rounded-[10px] border-[#D0D5DD] text-sm text-[#344054] font-normal"
              />
            </div>

            <div className="flex justify-center mt-6 w-full">
              <Button
                type="submit"
                className="text-base text-[#06212C] w-full hover:bg-[#F6AA3D]/50 font-semibold py-4 px-6 rounded-[80px] cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Continue with Email"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-4">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
              </span>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-[#1DA5DB] hover:text-blue-300"
              >
                log in
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-[1px] w-[48%] bg-[#D0D5DD]" />
            <span className="text-sm text-[#98A2B3] font-semibold">OR</span>
            <div className="h-[1px] w-[48%] bg-[#D0D5DD]" />
          </div>
        </div>
        <div className="flex justify-center  w-full">
          <Button
            type="button"
            className="text-base text-[#06212C] w-full bg-white border border-[#D0D5DD] font-semibold py-4 px-6 rounded-[80px] cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
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
};

export default EmailVerification;
