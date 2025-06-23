"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import HeaderWrapper from "@/components/header-wrap";
import { BadgeInfo, House, MapPin, Send } from "lucide-react";
import { PhoneInputField } from "@/components/Phone-input-field";
import { Textarea } from "@/components/ui/textarea";
import SuccessMessage from "@/components/sucess-message";

interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}
interface CaregiverRequestFormProps {}

const CaregiverRequestForm = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: HandleSubmitEvent): void => {
    e.preventDefault();
    setSuccess(true);
  };
  return (
    <div className="relative">
      {success && (
        <div className="py-8">
          <SuccessMessage
            heading="Your request has been submitted"
            message={`Your request for a caregiver has been received. A matching agent will reach out to you in 6 - 12 hours with the best-matched caregivers for your needs.`}
            buttonLabel={
              <>
                <House />
                Go to Dashboard
              </>
            }
          />
        </div>
      )}
      {!success && (
        <div>
          <HeaderWrapper>
            <h1 className="text-2xl lg:text-[28px] text-[#06212C] font-semibold text-center">
              Request a caregiver
            </h1>
          </HeaderWrapper>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-[750px] mx-auto bg-white rounded-[10px] my-8"
          >
            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                Select the services you're looking for
              </Label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Childcare (Nanny)",
                  "Elder care",
                  "Cleaner",
                  "Laundry man",
                  "Cook",
                  "Driver",
                  "Housekeeper",
                  "Pet care",
                  "Postnatal care",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-sm text-[#344054] font-normal"
                  >
                    <Checkbox
                      className="border border-[#667185] rounded-[4px] h-[18px] w-[18px]"
                      id={item}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                How frequently would you like the caregiver to work?
              </Label>
              <Select>
                <SelectTrigger className="mt-1 rounded-[10px] border-[#D0D5DD] text-[#344054] font-normal">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className="bg-[#FFFFFF] rounded-[16px] border-none p-2 text-base text-[#344054] font-normal">
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                Will the caregiver stay with you or go home after work?
              </Label>
              <Select>
                <SelectTrigger className="mt-1 rounded-[10px] border-[#D0D5DD] text-[#344054] font-normal">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className="bg-[#FFFFFF] rounded-[16px] border-none p-2 text-base text-[#344054] font-normal">
                  <SelectItem value="stay">Stay with me</SelectItem>
                  <SelectItem value="goHome">Go Home</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                For how long will you need their help?
              </Label>
              <Select>
                <SelectTrigger className="mt-1 rounded-[10px] border-[#D0D5DD] text-[#344054] font-normal">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className="bg-[#FFFFFF] rounded-[16px] border-none p-2 text-base text-[#344054] font-normal">
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                Where are you located?
              </Label>
              <div className="flex items-center">
                <div className="inline-flex bg-[#F0F2F5] items-center h-10 px-3 border border-[#D0D5DD] border-r-0 rounded-l-[10px]  text-smfont-normal">
                  <MapPin width={16} color="#fff" fill="#344054" />
                </div>
                <Input
                  type="text"
                  placeholder=""
                  className="rounded-l-none flex-1 px-3 h-10 border-[#D0D5DD] rounded-r-[10px] bg-white focus:outline-none focus:border-0 text-sm text-[#344054] font-normal"
                />
              </div>
              <div className="flex items-center gap-1 text-sm text-[#667185] font-normal">
                <BadgeInfo width={14} />
                <p>You can enter a specific address or a general area</p>
              </div>
            </div>
            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                When would you like the caregiver to start?
              </Label>
              <Input
                type="date"
                placeholder=""
                className="mt-1 rounded-[10px] border-[#D0D5DD] text-sm text-[#344054] font-normal"
              />
            </div>
            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                Do you have a budget in mind?
              </Label>
              <div className="flex items-center">
                <div className="inline-flex bg-[#F0F2F5] items-center h-10 px-3 border border-[#D0D5DD] border-r-0 rounded-l-[10px] text-sm text-[#344054] font-normal">
                  NGN
                </div>
                <Input
                  type="text"
                  placeholder=""
                  className="rounded-l-none flex-1 px-3 h-10 border-[#D0D5DD] rounded-r-[10px] bg-white focus:outline-none focus:border-0 text-sm text-[#344054] font-normal"
                />
              </div>
            </div>

            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                Do you have a gender preference?
              </Label>
              <Select>
                <SelectTrigger className="mt-1 rounded-[10px] border-[#D0D5DD] text-sm text-[#344054] font-normal">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className="bg-[#FFFFFF] rounded-[16px] border-none p-2 text-base text-[#344054] font-normal">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="none">No preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                Do you have an age range in mind for the caregiver?
              </Label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["18-25", "26-35", "36-45", "46-55", "56+"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-sm text-[#344054] font-normal"
                  >
                    <Checkbox
                      className="border border-[#667185] rounded-[4px] h-[18px] w-[18px]"
                      id={item}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                Are there any tribe preferences we should consider?
              </Label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Yoruba",
                  "Igbo",
                  "Hausa",
                  "Tiv",
                  "Kanuri",
                  "Ijaw",
                  "Ibibio",
                  "Efik",
                  "Igala",
                  "Edo",
                  "No preference",
                ].map((tribe) => (
                  <label
                    key={tribe}
                    className="flex items-center gap-2 text-sm text-[#344054] font-normal"
                  >
                    <Checkbox
                      className="border border-[#667185] rounded-[4px]"
                      id={tribe}
                    />
                    <span>{tribe}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                What skills or experience should the caregiver have?
              </Label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "CPR / First Aid",
                  "Nursing experience",
                  "Experience with babies/toddlers",
                  "Elderly care",
                  "Ability to cook local/international dishes",
                  "Literate in English",
                  "Special needs experience",
                  "Ability to drive",
                ].map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 text-sm text-[#344054] font-normal"
                  >
                    <Checkbox
                      className="border border-[#667185] rounded-[4px] h-[18px] w-[18px]"
                      id={skill}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                Anything else we should know?
              </Label>
              <Textarea
                rows={4}
                className="mt-1 rounded-[10px] border-[#D0D5DD]"
              />
            </div>

            <div className="px-4 sm:px-6">
              <Label className="text-sm text-[#344054] font-normal">
                Email address
              </Label>
              <Input
                type="email"
                placeholder="e.g. you@example.com"
                className="mt-1 rounded-[10px] border-[#D0D5DD] text-[#344054] font-normal"
              />
            </div>
            <div className="px-4 sm:px-6">
              <PhoneInputField />
            </div>

            <div className="flex justify-center py-6 bg-[#F7F9FC] border border-[#D0D5DD] rounded-b-[10px]">
              <Button className="font-semibold py-3 px-6 rounded-[80px]">
                <Send />
                Submit request
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CaregiverRequestForm;
