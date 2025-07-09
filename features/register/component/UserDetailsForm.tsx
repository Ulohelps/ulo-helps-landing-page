"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/stores/auth-store";
import Logo from "@/public/FINAL ULO Logo_approved_main.svg";
import GoogleIcon from "@/public/googleIcon.svg";
import Image from "next/image";
import { PhoneInputField } from "@/components/Phone-input-field";
import { PasswordInput } from "@/components/password-input";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface PersonalDetailsForm {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export default function UserDetailsForm({ email }: { email: string }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  //const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const router = useRouter();
  const { toast } = useToast();
  const { register } = useAuthStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password strength check

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
      const result = await register(
        email,
        formData.firstName,
        formData.lastName,
        password,
        formData.phone
      );

      if (result.success) {
        toast({
          title: "Registration successful",
          description: "Please verify your phone number to continue",
          variant: "success",
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof PersonalDetailsForm,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col  w-full md:w-2/5 px-4">
      <div className="w-full gap-2 ">
        <Image src={Logo} alt="" width={67} height={32} />
        <p className="text-2xl text-[#344054] font-bold mt-2">
          One last step...
        </p>
        <p className="text-base text-[#344054] font-normal mt-2">
          Tell us about yourself. Fill the fields below to provide basic
          information for your ULO profile.
        </p>
      </div>

      <div className="w-full mt-8">
        <div className="">
          <form className="w-full space-y-6" onSubmit={handleRegister}>
            <div>
              <Label
                className="text-sm text-[#344054] font-normal"
                htmlFor="firstName"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="mt-1 bg-white rounded-[12px] py-3 border-[#D0D5DD] text-sm text-[#344054] font-normal"
              />
            </div>
            <div>
              <Label
                className="text-sm text-[#344054] font-normal"
                htmlFor="lastName"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                required
                value={formData.lastName || ""}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="mt-1 bg-white rounded-[12px] py-3 border-[#D0D5DD] text-sm text-[#344054] font-normal"
              />
            </div>
            <PhoneInputField
              value={phone}
              onChange={(value: string) => handleInputChange("phone", value)}
            />
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
                    className="border border-[#D0D5DD] rounded-[12px] py-3 text-sm text-[#344054] font-normal h-10 px-3 focus:outline-none"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
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
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm w-full"
                  >
                    <div
                      className={`w-4 h-4 text-xs flex items-center justify-center rounded-full ${
                        check.passed
                          ? "bg-[#099137] text-white"
                          : "bg-[#98A2B3]"
                      }`}
                    >
                      {check.passed ? "✓" : ""}
                    </div>
                    <span className="text-sm text-[#667185] font-normal">
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/*  <div className="grid gap-4 w-full">
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
                    className="border border-[#D0D5DD] rounded-[12px] py-3 text-sm text-[#344054] font-normal h-10 px-3 focus:outline-none"
                    name="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div> */}
            <div className="flex space-x-2">
              <Checkbox
                id="agree"
                checked={agree}
                onCheckedChange={(checked) => setAgree(!!checked)}
                className="border-[#667185] rounded-md h-5 w-5"
              />
              <Label
                htmlFor="backgroundConsent"
                className="text-sm md:text-base font-normal text-[#344054]"
              >
                I have read and agree to ULO’s{" "}
                <Link href="" className="text-[#1DA5DB] font-semibold">
                  Terms of Service and Privacy Policy.
                </Link>
              </Label>
            </div>
            <div className="flex justify-center mt-6 w-full">
              <Button
                type="submit"
                className="text-base text-[#06212C] w-full hover:bg-[#F6AA3D]/50 font-semibold p-6 rounded-[80px] cursor-pointer"
                disabled={
                  isLoading ||
                  !agree ||
                  password.length >= 6 ||
                  /[a-z]/.test(password) ||
                  (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password))
                }
              >
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Create account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
