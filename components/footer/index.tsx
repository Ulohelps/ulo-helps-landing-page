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
    <footer className="bg-[#06212C]">
      <div className="mx-auto max-w-[1136px] px-4 py-12 flex flex-col md:flex-row flex-wrap justify-between gap-10">
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
              <Link href="#" className="text-base text-white font-semibold">
                About ULO
              </Link>
            </li>
            <li>
              <Link href="#" className="text-base text-white font-semibold">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-base text-white font-semibold">
                For caregivers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-base text-white font-semibold">
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
              <Link href="#" className="text-base text-white font-semibold">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-base text-white font-semibold">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <address className="not-italic space-y-4 w-full md:w-[242px]">
          <h4 className="text-sm text-[#FFFFFFB2] font-medium">Contact us</h4>

          <div className="flex gap-3 items-start">
            <Mail className="text-[#B4E1F3]" />
            <p className="text-base text-white font-semibold break-words">
              contact@ulohelps.com
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <PhoneICon />
            <p className="text-base text-white font-semibold">
              +234 813 145 1337
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <LocationICon />
            <p className="text-base text-white font-semibold w-[80%]">
              927/928 Bishop Ayobade Cole St, Victoria Island, 3rd Floor,
              Mansard Place, Lagos, 106104
            </p>
          </div>
        </address>
      </div>
    </footer>
  );
};

export default Footer;
