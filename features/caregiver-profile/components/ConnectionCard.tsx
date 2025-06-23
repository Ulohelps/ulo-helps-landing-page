import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import whatsappIcon from "@/public/icons/Brands.svg";
import CautionIcon from "@/public/icons/caution.svg";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

interface ConnectionCardProps {
  connected: boolean;
  handleConnect: () => void;
}

const ConnectionCard = ({ connected, handleConnect }: ConnectionCardProps) => {
  return (
    <Card className="w-full max-w-[347px] shadow-md lg:absolute lg:w-[30%] top-0 right-0 bg-white rounded-[20px] border border-[#E4E7EC]">
      <CardContent className="space-y-6 py-6">
        <h4 className="font-semibold text-base text-[#667185] border-b pb-4 border-[#E4E7EC]">
          Connect with Oluwatosin
        </h4>

        <div className="space-y-4 transition-all duration-300">
          <div className="px-3 py-2 border border-[#B4E1F3] rounded-[12px] bg-[#E9F6FC]">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-[14px] w-4 text-[#00ABA5]" />
              <span className="text-sm text-[#667185]">connect via mail</span>
            </div>
            <p
              className={`text-lg text-[#344054] ${
                !connected && "filter blur-sm pointer-events-none select-none"
              }`}
            >
              user@ulohelps.com
            </p>
          </div>
          <div className="px-3 py-2 border border-[#B4E1F3] rounded-[12px] bg-[#E9F6FC]">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-[14px] w-4 text-[#AB5BA6]" />
              <span className="text-sm text-[#667185]">connect via phone</span>
            </div>
            <p
              className={`text-lg text-[#344054] ${
                !connected && "filter blur-sm pointer-events-none select-none"
              }`}
            >
              +234 801 234 5678
            </p>
          </div>
          <div className="px-3 py-2 border border-[#B4E1F3] rounded-[12px] bg-[#E9F6FC]">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src={whatsappIcon}
                alt="whatsapp icon"
                width={16}
                height={14}
              />
              <span className="text-sm text-[#667185]">
                connect via whatsapp
              </span>
            </div>
            <p
              className={`text-lg text-[#344054] ${
                !connected && "filter blur-sm pointer-events-none select-none"
              }`}
            >
              +234 801 234 5678
            </p>
          </div>
        </div>

        {/* Connect / Save */}
        {!connected && (
          <div className="space-y-3 pt-3">
            <Button
              className="w-full font-semibold text-base"
              onClick={handleConnect}
            >
              Connect
            </Button>
            <Button
              variant="outline"
              className="w-full text-base text-[#344054] font-semibold"
            >
              Save profile
            </Button>
          </div>
        )}
        {connected && (
          <div className="space-y-3 pt-3">
            <div className="bg-[#00ABA5] flex items-center gap-3 p-2 rounded-[12px]">
              <Image src={CautionIcon} alt="caution icon" />
              <p className="text-sm text-white font-normal">
                You connected with Oluwatosin on the 19th of June, 2025.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full text-base text-[#344054] font-semibold"
            >
              View safety guidelines
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
