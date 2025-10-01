"use client";
import { LocationICon, PhoneICon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import React, { useState } from "react";
import BgImage from "@/public/images/image 6.svg";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const ContactUS = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    subject: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[\d\s+()-]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.length < 5) {
      newErrors.subject = "Subject must be at least 5 characters long";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.ulohelps.com/api/v1/contact/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const res = await response.json();

      toast({
        title: "Success",
        description: `${res.data.message}`,
        variant: "success",
      });

      // Reset form
      setFormData({
        email: "",
        fullName: "",
        phoneNumber: "",
        subject: "",
        description: "",
      });
    } catch (error) {
      console.error("Submission failed:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send your message. Please try again later.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        style={{
          backgroundImage: `url("/bg-gradient.png")`,
          backgroundSize: "cover",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className="max-w-[1136px] mx-auto">
          <div className="max-w-[556px] py-32">
            <h2 className="text-2xl md:text-[32px] text-[#344054] font-semibold mb-4">
              Get in touch with our team
            </h2>
            <p className="text-base md:text-lg text-[#344054] font-normal">
              We're here to answer your questions about our services. Don't
              hesitate to reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-10 py-12 md:py-[96px] max-w-[1136px] mx-auto">
        {/* Contact Details */}
        <div className="w-full md:w-1/2 space-y-10">
          {[
            {
              icon: <Mail fill="#D4E8DB" width={26} />,
              text: "contact@ulohelps.com",
            },
            {
              icon: <PhoneICon color="#D4E8DB" />,
              text: "+234 813 145 1337",
            },
            {
              icon: <Phone fill="#D4E8DB" color="#D4E8DB" />,
              text: "+234 813 145 1337",
            },
            {
              icon: <LocationICon color="#D4E8DB" />,
              text: "927/928 Bishop Ayobade Cole St, Victoria Island, 3rd Floor, Mansard Place, Lagos, 106104",
            },
          ].map(({ icon, text }, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 border-b pb-10 border-[#D0D5DD]"
            >
              <div className="flex items-center justify-center p-3 w-14 h-14 rounded-full border border-[#B4E1F3] bg-[#17403A] shrink-0">
                {icon}
              </div>
              <p className="text-base text-[#0A3749] underline font-normal max-w-sm">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-white custom-shadow rounded-[16px]">
          <h3 className="text-xl md:text-[28px] text-[#06212C] font-semibold">
            Send us a message directly
          </h3>
          <form className="mt-8 md:mt-10 space-y-6" onSubmit={handleSubmit}>
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
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] py-3"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
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
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] py-3"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
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
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] py-3"
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phoneNumber}
                  </p>
                )}
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
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] py-3"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
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
                value={formData.description}
                onChange={handleChange}
                className="mt-1 rounded-[12px] bg-white border-[#D0D5DD] text-sm text-[#344054] py-3"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto"
              >
                {isLoading ? "Sending..." : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUS;
