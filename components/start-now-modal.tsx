"use client";

import Link from "next/link";
import { useState } from "react";
import type React from "react";

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
      <DialogContent className="bg-white border border-[#EAECF0] sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#101828]">Start now</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          <Button
            asChild
            className="h-11 rounded-xl bg-[#1B5E37] text-white hover:bg-[#154a2d] hover:text-white"
            onClick={() => setOpen(false)}
          >
            <Link href={CARESEEKER_REGISTER_URL}>Employer</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-11 rounded-xl border-[#1B5E37]/40 text-[#1B5E37] hover:bg-[#1B5E37]/8"
            onClick={() => setOpen(false)}
          >
            <Link href={DOMESTIC_WORKER_CTA_URL}>Worker</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

