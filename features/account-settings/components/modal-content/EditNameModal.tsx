"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormDataProps {
  firstName: string;
  lastName: string;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
}

const EditNameModal = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
}: FormDataProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="firstName" className="text-sm text-[#344054] font-light">
        First Name
      </Label>
      <Input
        id="firstName"
        type="text"
        required
        placeholder="Enter first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="mt-1 h-11 rounded-xl border-gray-300"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="lastName" className="text-sm text-[#344054] font-light">
        Last Name
      </Label>
      <Input
        type="text"
        placeholder="Enter last name"
        defaultValue={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="mt-1 h-11 rounded-xl border-gray-300"
      />
    </div>
  </div>
);
export default EditNameModal;
