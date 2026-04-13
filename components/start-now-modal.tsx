"use client";

import Link from "next/link";
import { useState } from "react";
import type React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CARESEEKER_REGISTER_URL, DOMESTIC_WORKER_CTA_URL } from "@/lib/site";

export function StartNowModal({
  triggerClassName,
  triggerVariant,
  triggerChildren = "Start now",
}: {
  triggerClassName?: string;
  triggerVariant?: "default" | "outline" | "ghost" | "secondary";
  triggerChildren?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} className={triggerClassName}>
          {triggerChildren}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border border-[#EAECF0] sm:rounded-2xl max-w-[90%] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#101828]">Start now</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2 py-6">
          <Link
            href={CARESEEKER_REGISTER_URL}
            onClick={() => setOpen(false)}
            className="group rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-sm transition hover:border-[#1B5E37]/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F9FAFB]">
              <Image
                src="/modal-image/employer.png"
                alt="Employer"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 90vw, 520px"
                priority
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-[#101828]">
                  Employer
                </div>
                <div className="text-sm text-[#475467]">
                  Find a verified worker
                </div>
              </div>
              <span className="inline-flex h-10 items-center rounded-xl bg-[#1B5E37] px-4 text-sm font-semibold text-white">
                Continue
              </span>
            </div>
          </Link>

          <Link
            href={DOMESTIC_WORKER_CTA_URL}
            onClick={() => setOpen(false)}
            className="group rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-sm transition hover:border-[#1B5E37]/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F9FAFB]">
              <Image
                src="/modal-image/worker.png"
                alt="Worker"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 90vw, 520px"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-[#101828]">
                  Worker
                </div>
                <div className="text-sm text-[#475467]">
                  Register as a domestic worker
                </div>
              </div>
              <span className="inline-flex h-10 items-center rounded-xl border border-[#1B5E37]/40 bg-white px-4 text-sm font-semibold text-[#1B5E37]">
                Continue
              </span>
            </div>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

