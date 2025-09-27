import Link from "next/link";
import React from "react";
import UloLogo from "@/public/new-logo.png";
import Image from "next/image";
import {
  InstagramICon,
  FacebookICon,
  TiktokICon,
  XICon,
  LocationICon,
  PhoneICon,
  MailICon,
} from "../icons";

const Footer = () => {
  return (
    <footer className="bg-[#17403A] py-12 ">
      <div className="mx-auto max-w-[1136px] px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Socials */}
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
            <FacebookICon />
            <XICon />
            <TiktokICon />
            <InstagramICon />
          </nav>
        </div>

        {/* Company Links */}
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
              <Link href="#" className="text-base text-white font-semibold">
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/for-caregivers"
                className="text-base text-white font-semibold"
              >
                For caregivers
              </Link>
            </li>
            <li>
              <Link
                href="/#faqs"
                className="text-base text-white font-semibold"
              >
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
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

        {/* Contact */}
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
            <p className="text-base text-white font-semibold">
              +234 813 145 1337
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <LocationICon className="w-5 h-5 text-[#D4E8DB] mt-1" />
            <p className="text-base text-white font-semibold break-words w-[80%]">
              927/928 Bishop Ayobade Cole St, Victoria Island, 3rd Floor,
              Mansard Place, Lagos, 106104
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
