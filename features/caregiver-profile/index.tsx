"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import User from "@/public/images/Image.png"
import GuardIcon from "@/public/icons/gaurd.svg"
import whatsappIcon from "@/public/icons/Brands.svg"
import CautionIcon from "@/public/icons/caution.svg"
import { Mail, Phone, } from "lucide-react"

interface CaregiverProfileProps {
  connected?: boolean
}

export default function CaregiverProfile({ connected=true }: CaregiverProfileProps) {
  return (
    <div>
        <div className="bg-[#E9F6FC] w-full px-4 md:px-8 lg:px-12 py-8">
         <div className="flex items-center gap-6 max-w-[1136px] mx-auto relative">
          <div className="w-[266px] min-h-[288px] relative overflow-hidden border border-gray-300">
            <Image
              src={User}
              alt="Caregiver name"
              width={120}
              height={120}
              className="object-cover w-full h-full "
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-[#1D2739]">Oluwatosin Johnson</h2>
              <Image src={GuardIcon} alt="guard icon"/>
            </div>
            <p className="text-[#475367] text-base mb-2">Housekeeper</p>
            <p className="max-w-[446px] text-[#667085] text-base leading-relaxed">
              I’ve worked as a housekeeper for over 7 years, supporting busy families and elderly clients with
              cleaning, cooking, and errands. I’m known for being dependable, friendly, and quick to notice what
              needs to be done without being asked...
            </p>
          </div>
        {/* RIGHT: Contact Card */}
        <Card className="w-full max-w-[347px] shadow-md absolute top-0 right-0 bg-white rounded-[20px] border border-[#E4E7EC]">
          <CardContent className="space-y-6 py-6">
            <h4 className="font-semibold text-base text-[#667185] border-b pb-4 border-[#E4E7EC]">Connect with Oluwatosin</h4>

            <div
              className="space-y-4 transition-all duration-300"
            >
              <div className="px-3 py-2 border border-[#B4E1F3] rounded-[12px] bg-[#E9F6FC]">
                  <div className="flex items-center gap-2 mb-3"> 
                    <Mail className="h-[14px] w-4 text-[#00ABA5]" />
                    <span className="text-sm text-[#667185]">connect via mail</span>
                  </div>
                  <p className={`text-lg text-[#344054] ${!connected && "filter blur-sm pointer-events-none select-none"}`}>user@ulohelps.com</p>
              </div>
              <div className="px-3 py-2 border border-[#B4E1F3] rounded-[12px] bg-[#E9F6FC]">
                  <div className="flex items-center gap-2 mb-3"> 
                    <Phone className="h-[14px] w-4 text-[#AB5BA6]" />
                    <span className="text-sm text-[#667185]">connect via phone</span>
                  </div>
                  <p className={`text-lg text-[#344054] ${!connected && "filter blur-sm pointer-events-none select-none"}`}>+234 801 234 5678</p>
              </div>
              <div className="px-3 py-2 border border-[#B4E1F3] rounded-[12px] bg-[#E9F6FC]">
                  <div className="flex items-center gap-2 mb-3"> 
                    <Image src={whatsappIcon} alt="whatsapp icon"width={16} height={14} />
                    <span className="text-sm text-[#667185]">connect via whatsapp</span>
                  </div>
                  <p className={`text-lg text-[#344054] ${!connected && "filter blur-sm pointer-events-none select-none"}`}>+234 801 234 5678</p>
              </div>
            </div>

            {/* Connect / Save */}
            {!connected && (
              <div className="space-y-3 pt-3">
                <Button className="w-full font-semibold text-base">Connect</Button>
                <Button variant="outline" className="w-full text-base text-[#344054] font-semibold">
                  Save profile
                </Button>
              </div>
              )}
              {connected && (
                <div className="space-y-3 pt-3">
                  <div className="bg-[#00ABA5] flex items-center gap-3 p-2 rounded-[12px]">
                    <Image src={CautionIcon} alt="caution icon" />
                    <p className="text-sm text-white font-normal">You connected with Oluwatosin on the 19th of June, 2025.</p>
                  </div>
                  <Button variant="outline" className="w-full text-base text-[#344054] font-semibold">
                    View safety guidelines
                  </Button>
                </div>
              )}
          </CardContent>
        </Card>
        </div>
      </div>
      </div>
  )
}
