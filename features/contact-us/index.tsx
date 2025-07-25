"use client";
import { LocationICon, PhoneICon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import React, { useState } from "react";
import BgImage from "@/public/images/image 6.svg";

const ContactUS = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="px-4 mt-6">
      <div
        style={{
          backgroundImage: `url(${BgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1136px] mx-auto">
          <div className="max-w-[556px] py-32">
            <h2 className="text-2xl md:text-[32px] text-[#344054] font-semibold mb-4">
              Get in touch with our team
            </h2>
            <p className="text-base md:text-lg text-[#344054] font-normal">
              We’re here to answer your questions about our services. Don’t
              hesitate to reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 py-12 md:py-[96px] max-w-[1136px] mx-auto">
        {/* Contact Details */}
        <div className="w-full md:w-1/2 space-y-10">
          {[
            {
              icon: <Mail fill="#1DA5DB" stroke="#fff" width={26} />,
              text: "contact@ulohelps.com",
            },
            {
              icon: <PhoneICon color="#1DA5DB" />,
              text: "+234 813 145 1337",
            },
            {
              icon: <Phone fill="#1DA5DB" color="#1DA5DB" />,
              text: "+234 813 145 1337",
            },
            {
              icon: <LocationICon color="#1DA5DB" />,
              text: "927/928 Bishop Ayobade Cole St, Victoria Island, 3rd Floor, Mansard Place, Lagos, 106104",
            },
          ].map(({ icon, text }, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 border-b pb-10 border-[#D0D5DD]"
            >
              <div className="flex items-center justify-center p-3 w-14 h-14 rounded-full border border-[#B4E1F3] bg-[#E9F6FC] shrink-0">
                {icon}
              </div>
              <p className="text-base text-[#0A3749] underline font-normal max-w-sm">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 custom-shadow rounded-[16px]">
          <h3 className="text-xl md:text-[28px] text-[#06212C] font-semibold">
            Send us a message directly
          </h3>
          <form className="mt-8 md:mt-10 space-y-6">
            {/* Full Name */}
            <div>
              <Label
                htmlFor="fullName"
                className="text-sm text-[#344054] font-normal"
              >
                Full name
              </Label>
              <Input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] py-3"
              />
            </div>

            {/* Email + Phone */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <Label
                  htmlFor="email"
                  className="text-sm text-[#344054] font-normal"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] py-3"
                />
              </div>
              <div className="w-full">
                <Label
                  htmlFor="phoneNumber"
                  className="text-sm text-[#344054] font-normal"
                >
                  Phone number
                </Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] py-3"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <Label
                htmlFor="subject"
                className="text-sm text-[#344054] font-normal"
              >
                Subject
              </Label>
              <Input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] py-3"
              />
            </div>

            {/* Description */}
            <div>
              <Label
                htmlFor="description"
                className="text-sm text-[#344054] font-normal"
              >
                Description
              </Label>
              <Textarea
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] py-3"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUS;
