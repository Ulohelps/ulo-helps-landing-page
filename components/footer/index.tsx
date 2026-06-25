"use client";

import Link from "next/link";
import Image from "next/image";
import {
  InstagramICon,
  TiktokICon,
  LocationICon,
  PhoneICon,
  MailICon,
} from "../icons";
import UloLogo from "@/public/new-logo.png";
import { ForBusinessModal } from "@/components/for-business-modal";

const Footer = () => {
  return (
    <footer className="relative z-20 bg-[#17403A] py-12">
      <div className="mx-auto max-w-[1136px] px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
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

          <nav className="flex items-center gap-6 mt-5">
            <Link href='https://www.tiktok.com/search?q=ulohelps' target="_blank" rel="noopener noreferrer"><TiktokICon /></Link>
            <Link href='https://www.instagram.com/ulohelps_' target="_blank" rel="noopener noreferrer"><InstagramICon /></Link>
          </nav>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm text-[#FFFFFFB2] font-medium">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about-us"
                className="text-base text-white font-semibold"
              >
                About ULO
              </Link>
            </li>
            <li>
              <ForBusinessModal
                triggerVariant="ghost"
                triggerClassName="h-auto p-0 text-base font-semibold text-white hover:bg-transparent hover:text-[#D4E8DB]"
                triggerChildren="For business"
              />
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm text-[#FFFFFFB2] font-medium">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/privacy-policy"
                className="text-base text-white font-semibold"
              >
                Privacy policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-use"
                className="text-base text-white font-semibold"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/cookie-policy"
                className="text-base text-white font-semibold"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        <address className="not-italic space-y-4">
          <h4 className="text-sm text-[#FFFFFFB2] font-medium">Contact us</h4>

          <div className="flex gap-3 items-center">
            <MailICon className="w-5 h-5 text-[#D4E8DB]" />
            <p className="text-base text-white font-semibold">
              contact@ulohelps.com
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <PhoneICon className="w-5 h-5 text-[#D4E8DB]" />
            <a
              href="https://wa.me/2347049272828"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-white font-semibold hover:underline"
            >
              +234 704 927 2828
            </a>
          </div>

          <div className="flex gap-3 items-start">
            <LocationICon className="w-5 h-5 text-[#D4E8DB] mt-1" />
            <p className="text-base text-white font-semibold break-words w-[80%]">
            373, Agege Motor Road, by Challenge Bus Stop mushin, Lagos, Nigeria
            </p>
          </div>
        </address>
      </div>
      <div className="mx-auto max-w-[1136px] px-4 border-t border-[#FFFFFF26] mt-12 py-8">
        <p className="text-sm text-[#FFFFFFB2] font-normal text-center">
          Copyright © {new Date().getFullYear()} ULO Helps Limited. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
