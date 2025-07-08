import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import whatsappIcon from "@/public/icons/Brands.svg";
import CautionIcon from "@/public/icons/caution.svg";
import { Loader, Mail, Phone } from "lucide-react";
import Image from "next/image";

interface ConnectionCardProps {
  connected: boolean;
  hired: boolean;
  handleConnect: () => void;
  email: string;
  lastName: string;
  firstName: string;
  phone: string;
  loading: boolean;
  connectDate: string;
  hiredDate?: string;
  setOpenGuidelines: (val: boolean) => void;
}

const ConnectionCard = ({
  connected,
  handleConnect,
  email,
  phone,
  firstName,
  lastName,
  hired,
  loading,
  connectDate,
  hiredDate,
  setOpenGuidelines,
}: ConnectionCardProps) => {
  function formatCustomDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}.`;
  }
  return (
    <Card className="w-full max-w-[347px] shadow-md lg:absolute lg:w-[30%] top-0 right-0 bg-white rounded-[20px] border border-[#E4E7EC]">
      <CardContent className="space-y-6 py-6">
        <h4 className="font-semibold text-base text-[#667185] border-b pb-4 border-[#E4E7EC]">
          Connect with {lastName} {firstName}
        </h4>

        <div className="space-y-4">
          <ContactItem
            icon={<Mail className="h-[14px] w-4 text-[#00ABA5]" />}
            label="connect via mail"
            value={email}
            connected={connected}
          />
          <ContactItem
            icon={<Phone className="h-[14px] w-4 text-[#AB5BA6]" />}
            label="connect via phone"
            value={phone}
            connected={connected}
          />
          <ContactItem
            icon={
              <Image
                src={whatsappIcon}
                alt="whatsapp icon"
                width={16}
                height={14}
              />
            }
            label="connect via whatsapp"
            value={phone}
            connected={connected}
          />
        </div>

        {/* Connection Buttons */}
        {!connected && (
          <div className="space-y-3 pt-3">
            <Button
              className="w-full font-semibold text-base flex items-center justify-center"
              onClick={handleConnect}
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin w-4 h-4" />
              ) : (
                "Connect"
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full text-base text-[#344054] font-semibold"
            >
              Save profile
            </Button>
          </div>
        )}

        {/* Connected & Hired States */}
        {(connected || hired) && (
          <div className="space-y-3 pt-3">
            <div
              className={`flex items-center gap-3 p-2 rounded-[12px] ${
                hired ? "bg-[#1DA5DB]" : "bg-[#00ABA5]"
              }`}
            >
              <Image src={CautionIcon} alt="caution icon" />
              <p className="text-sm text-white font-normal">
                {hired
                  ? `You hired ${firstName} on the ${
                      hiredDate ? formatCustomDate(hiredDate) : "--"
                    }.`
                  : `You connected with ${firstName} on ${
                      connectDate ? formatCustomDate(connectDate) : "--"
                    }.`}
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full text-base text-[#344054] font-semibold"
              onClick={() => setOpenGuidelines(true)}
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

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  connected: boolean;
}

const ContactItem = ({ icon, label, value, connected }: ContactItemProps) => (
  <div className="px-3 py-2 border border-[#B4E1F3] rounded-[12px] bg-[#E9F6FC]">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <span className="text-sm text-[#667185]">{label}</span>
    </div>
    <p
      className={`text-lg text-[#344054] ${
        !connected ? "filter blur-sm pointer-events-none select-none" : ""
      }`}
    >
      {value}
    </p>
  </div>
);
