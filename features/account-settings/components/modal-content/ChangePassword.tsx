import { PasswordInput } from "@/components/password-input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

interface ChangePasswordProps {
  newPassword: string;
  oldPassword: string;
  setNewPassword: (val: string) => void;
  setOldPassword: (val: string) => void;
}

const ChangePassword = ({
  newPassword,
  oldPassword,
  setNewPassword,
  setOldPassword,
}: ChangePasswordProps) => {
  return (
    <div>
      <div className="grid gap-4 w-full">
        <div className="grid gap-2">
          <Label
            htmlFor="password"
            className="text-sm text-[#344054] font-normal"
          >
            Old Password
          </Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Enter your password"
            className="border border-[#D0D5DD] rounded-[12px] py-3 text-sm text-[#344054] font-normal h-10 px-3 focus:outline-none"
            name="confirmPassword"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="grid gap-4 w-full">
          <div className="grid gap-2">
            <Label
              htmlFor="password"
              className="text-sm text-[#344054] font-normal"
            >
              New Password
            </Label>
            <PasswordInput
              id="password"
              placeholder="Enter your password"
              className="border border-[#D0D5DD] rounded-[12px] py-3 text-sm text-[#344054] font-normal h-10 px-3 focus:outline-none"
              name="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {[
            {
              label: "Minimum of 6 characterss",
              passed: newPassword.length >= 6,
            },
            {
              label: "One UPPERCASE and LOWERCASE character",
              passed: /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword),
            },

            {
              label: "At least one digit and special character from @#$%^&*",
              passed:
                /[0-9]/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword),
            },
          ].map((check, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm w-full">
              <div
                className={`w-4 h-4 text-xs flex items-center justify-center rounded-full ${
                  check.passed ? "bg-[#099137] text-white" : "bg-[#98A2B3]"
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
    </div>
  );
};

export default ChangePassword;
