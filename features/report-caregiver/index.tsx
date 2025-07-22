"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Loader, Send, Star } from "lucide-react";
import HeaderWrapper from "@/components/header-wrap";
import CustomModal from "@/components/custom-modal";
import { careseekersService } from "@/lib/services/careseekersService";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ReportCaregiver() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [actionsTaken, setActionsTaken] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const connectId = searchParams.get("connectId");
  const name = searchParams.get("name");

  const { toast } = useToast();

  const { back } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const Payload = {
      rating,
      description,
      actionsTaken,
    };

    try {
      await careseekersService.reportCaregiver(Payload, connectId as string);

      setOpen(true);
      setRating(0);
      setDescription("");
      setActionsTaken("");
      toast({
        title: "Report submitted",
        description: "Thank you for your Report!",
        variant: "success",
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "error",
      });
    }
  };

  return (
    <div>
      <CustomModal
        open={open}
        success={true}
        onClose={() => setOpen(false)}
        title="Thank you for your feedback"
        description="We’ve received your feedback. Thank you for making ULO a better place for families everywhere."
        buttons={
          <>
            <Button
              variant="outline"
              className="w-full md:w-[103px] bg-white"
              onClick={() => setOpen(false)}
            >
              cancel
            </Button>
            <Button
              className="w-full md:w-[186px] bg-[#F6AA3D] hover:bg-[#e19a32] text-[#1D2739] font-semibold"
              onClick={() => back()}
            >
              Done
            </Button>
          </>
        }
      />
      <HeaderWrapper>
        <div className="max-w-[1136px] mx-auto py-8">
          <h1 className="text-2xl lg:text-[28px] text-[#06212C] text-center font-semibold">
            Report Caregiver
          </h1>
        </div>
      </HeaderWrapper>
      <form
        onSubmit={handleSubmit}
        className="max-w-[750px] mx-auto bg-white border border-[#E4E7EC] shadow-md overflow-hidden rounded-[20px] space-y-6 mt-8"
      >
        <div className="px-8 pt-8">
          <Label className="mb-2 block text-sm text-[#344054] font-medium">
            How would you rate your hiring and working experience with {name}?
          </Label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                className={`text-[32px] ${
                  i <= rating ? "text-yellow-500" : "text-[#98A2B3]"
                }`}
                onClick={() => setRating(i)}
              >
                <Star fill={i <= rating ? "#F6AA3D" : "#fff"} />
              </button>
            ))}
          </div>
        </div>

        <div className="px-8">
          <Label className="mb-2 block text-sm text-[#344054] font-medium">
            Describe the situation involving {name}.
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-[#D0D5DD] rounded-[12px] text-sm text-[#98A2B3] font-normal"
            placeholder="Write your description here..."
          />
        </div>
        <div className="px-8">
          <Label className="mb-2 block text-sm text-[#344054] font-medium">
            What actions have you taken since this ocurrence?
          </Label>
          <Textarea
            value={actionsTaken}
            onChange={(e) => setActionsTaken(e.target.value)}
            className="border border-[#D0D5DD] rounded-[12px] text-sm text-[#98A2B3] font-normal"
            placeholder="Write your here..."
          />
        </div>
        <div className="bg-[#F7F9FC] py-6 border-t border-[#D0D5DD] px-8 flex justify-center">
          <Button type="submit" className="text-[#1D2739] font-semibold">
            <Send />
            {loading ? <Loader className="animate-spin" /> : "Submit report"}
          </Button>
        </div>
      </form>
    </div>
  );
}
