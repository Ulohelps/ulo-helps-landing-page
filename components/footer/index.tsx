import Link from "next/link";
import React from "react";
import UloLogo from "@/public/FINAL ULO Logo_approved_main.svg";
import Image from "next/image";
import {
  InstagramICon,
  FacebookICon,
  TiktokICon,
  XICon,
  LocationICon,
  PhoneICon,
} from "../icons";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-[#06212C]">
      <div className="mx-auto max-w-[1136px] py-12 flex flex-1 justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={UloLogo}
              alt="Ulo logo"
              width={83}
              height={40}
              className="w-[59px] h-[29px] md:w-[83px] md:h-[40px]"
              priority
            />
          </Link>
          <div className="flex items-center gap-6 mt-5">
            <FacebookICon /> <XICon /> <TiktokICon />
            <InstagramICon />
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm text-[#FFFFFFB2] font-medium">Company</h4>
          <p className="text-base text-white font-semibold">About ULO</p>
          <p className="text-base text-white font-semibold">Pricing</p>
          <p className="text-base text-white font-semibold">For caregivers</p>
          <p className="text-base text-white font-semibold">FAQs</p>
        </div>
        <div className="space-y-6">
          <h4 className="text-sm text-[#FFFFFFB2] font-medium">Legal</h4>
          <p className="text-base text-white font-semibold">Privacy policy</p>
          <p className="text-base text-white font-semibold">
            Terms & Conditions
          </p>
        </div>

        <div className="space-y-6 w-[242px]">
          <h4 className="text-sm text-[#FFFFFFB2] font-medium">Contact us</h4>
          <div className="flex gap-3">
            <Mail className="text-[#B4E1F3]" />
            <p className="text-base text-white font-semibold">
              contact@ulohelps.com
            </p>
          </div>
          <div className="flex gap-3">
            <PhoneICon />
            <p className="text-base text-white font-semibold">
              +234 813 145 1337
            </p>
          </div>
          <div className="flex gap-3">
            <LocationICon />
            <p className="text-base text-white font-semibold w-[80%]">
              927/928 Bishop Ayobade Cole St, Victoria Island, 3rd Floor,
              Mansard Place, Lagos, 106104
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
