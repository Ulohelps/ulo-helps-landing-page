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
      <DialogContent className="max-h-[min(88dvh,640px)] w-[calc(100%-1.5rem)] max-w-[90%] gap-2 overflow-y-auto rounded-2xl border border-[#EAECF0] bg-white p-4 pt-5 sm:max-w-2xl sm:gap-4 sm:rounded-3xl sm:p-6">
        <DialogHeader className="space-y-0 pr-10 text-left sm:pr-12">
          <DialogTitle className="text-base text-[#101828] sm:text-lg">
            Start now
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 items-stretch gap-2 py-1 sm:gap-4 sm:py-4">
          <Link
            href={CARESEEKER_REGISTER_URL}
            onClick={() => setOpen(false)}
            className="group flex h-full flex-col rounded-2xl border border-[#EAECF0] bg-white p-2 shadow-sm transition hover:border-[#1B5E37]/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 sm:rounded-3xl sm:p-4"
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-[#F9FAFB] sm:aspect-[4/3] sm:rounded-2xl">
              <Image
                src="/modal-image/employer.png"
                alt="Employer"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 42vw, 520px"
                priority
              />
            </div>
            <div className="mt-2 flex flex-1 flex-col gap-2 sm:mt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
              <div className="min-w-0 sm:pb-0.5">
                <div className="text-sm font-semibold text-[#101828] sm:text-base">
                  Employer
                </div>
                <div className="text-[11px] leading-snug text-[#475467] sm:text-sm">
                  Find a verified worker
                </div>
              </div>
              <span className="mt-auto inline-flex h-10 min-h-10 w-full shrink-0 items-center justify-center rounded-xl border-2 border-transparent bg-[#1B5E37] px-3 text-sm font-semibold text-white sm:mt-0 sm:w-auto sm:px-4">
                Continue
              </span>
            </div>
          </Link>

          <Link
            href={DOMESTIC_WORKER_CTA_URL}
            onClick={() => setOpen(false)}
            className="group flex h-full flex-col rounded-2xl border border-[#EAECF0] bg-white p-2 shadow-sm transition hover:border-[#1B5E37]/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 sm:rounded-3xl sm:p-4"
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-[#F9FAFB] sm:aspect-[4/3] sm:rounded-2xl">
              <Image
                src="/modal-image/worker.png"
                alt="Worker"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 42vw, 520px"
              />
            </div>
            <div className="mt-2 flex flex-1 flex-col gap-2 sm:mt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
              <div className="min-w-0 sm:pb-0.5">
                <div className="text-sm font-semibold text-[#101828] sm:text-base">
                  Worker
                </div>
                <div className="line-clamp-2 text-[11px] leading-snug text-[#475467] sm:text-sm sm:line-clamp-none">
                  Register as a domestic worker
                </div>
              </div>
              <span className="mt-auto inline-flex h-10 min-h-10 w-full shrink-0 items-center justify-center rounded-xl border-2 border-[#1B5E37]/40 bg-white px-3 text-sm font-semibold text-[#1B5E37] sm:mt-0 sm:w-auto sm:px-4">
                Continue
              </span>
            </div>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

