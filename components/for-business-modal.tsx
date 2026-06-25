"use client";

import type React from "react";
import { useState } from "react";
import { Building2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/lib/api";
import { cn } from "@/lib/utils";

type FormState = {
  businessName: string;
  contactEmail: string;
  contactPhone: string;
};

const initialForm: FormState = {
  businessName: "",
  contactEmail: "",
  contactPhone: "",
};

export function ForBusinessModal({
  triggerClassName,
  triggerVariant = "outline",
  triggerChildren = "For business",
}: {
  triggerClassName?: string;
  triggerVariant?: "default" | "outline" | "ghost" | "secondary";
  triggerChildren?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.businessName.trim()) {
      next.businessName = "Business name is required";
    }
    if (!form.contactEmail.trim()) {
      next.contactEmail = "Contact email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) {
      next.contactEmail = "Enter a valid email";
    }
    if (!form.contactPhone.trim()) {
      next.contactPhone = "Phone number is required";
    } else if (!/^[\d\s+()-]{7,}$/.test(form.contactPhone)) {
      next.contactPhone = "Enter a valid phone number";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/business-inquiries/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          payload?.message ||
            payload?.data?.message ||
            "Something went wrong. Please try again.",
        );
      }

      const message =
        payload?.data?.message ||
        payload?.message ||
        "Thank you! We will reach out shortly.";

      toast({
        title: "Inquiry received",
        description: message,
        variant: "success",
      });

      setForm(initialForm);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Could not submit",
        description:
          error instanceof Error ? error.message : "Please try again later.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} className={triggerClassName}>
          {triggerChildren}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[min(88dvh,640px)] w-[calc(100%-1.5rem)] max-w-lg gap-4 overflow-y-auto rounded-2xl border border-[#EAECF0] bg-white p-5 sm:rounded-3xl sm:p-6">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1B5E37]/10 text-[#1B5E37]">
            <Building2 className="h-5 w-5" />
          </div>
          <DialogTitle className="text-lg text-[#101828]">
            Ulo for Business
          </DialogTitle>
          <DialogDescription className="text-sm text-[#475467]">
            Tell us about your business and we will reach out to discuss
            verified staffing for your team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business name</Label>
            <Input
              id="businessName"
              value={form.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              placeholder="e.g. Acme Hospitality Ltd"
              className={cn(errors.businessName && "border-red-500")}
            />
            {errors.businessName && (
              <p className="text-xs text-red-600">{errors.businessName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              placeholder="you@company.com"
              className={cn(errors.contactEmail && "border-red-500")}
            />
            {errors.contactEmail && (
              <p className="text-xs text-red-600">{errors.contactEmail}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact phone</Label>
            <Input
              id="contactPhone"
              type="tel"
              value={form.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              placeholder="+234 801 234 5678"
              className={cn(errors.contactPhone && "border-red-500")}
            />
            {errors.contactPhone && (
              <p className="text-xs text-red-600">{errors.contactPhone}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-xl bg-[#1B5E37] text-white hover:bg-[#154a2d]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : (
              "Submit inquiry"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
