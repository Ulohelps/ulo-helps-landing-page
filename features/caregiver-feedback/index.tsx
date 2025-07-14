"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Loader, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import HeaderWrapper from "@/components/header-wrap";
import CustomModal from "@/components/custom-modal";
import { careseekersService } from "@/lib/services/careseekersService";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function CaregiverFeedbackForm() {
  const [hired, setHired] = useState<"yes" | "no" | "">("yes");
  const [open, setOpen] = useState(false);
  const [hireDate, setHireDate] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [reasons, setReasons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const connectId = searchParams.get("connectId");
  const name = searchParams.get("name");

  const { toast } = useToast();

  const { back } = useRouter();

  const reasonOptions = [
    "I didn’t like his voice",
    "He didn’t sound up to the task",
    "He was rude on the initial call",
    "He had body odour during the physical interview",
    "I didn’t see a future with him because I’m Igbo and pronouncing his name was a continuous hassle for me",
    "My wife, sadly, didn’t like him (or liked him too much)",
    "I did hire him. He oversalted my eggs on his first day",
    "Some other egregious reason",
  ];

  const toggleReason = (reason: string) => {
    setReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      hired: true,
      hireDate,
      rating,
      comments: feedback,
    };
    const Payload = {
      hired: true,
      comments: feedback,
      reasonsNotHired: reasons,
    };

    try {
      await careseekersService.sendFeedback(
        hired === "yes" ? data : Payload,
        connectId as string
      );

      setOpen(true);
      setHired("");
      setHireDate("");
      setRating(0);
      setReasons([]);
      setFeedback("");
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
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
              className="w-[103px] bg-white"
              onClick={() => setOpen(false)}
            >
              cancel
            </Button>
            <Button
              className="w-[186px] bg-[#F6AA3D] hover:bg-[#e19a32] text-[#1D2739] font-semibold"
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
            Post-connection feedback form
          </h1>
          <p className="text-sm text-[#475367] font-normal text-center mt-2">
            Tell us how this connection experience with ULO went. We greatly
            value your feedback.
          </p>
        </div>
      </HeaderWrapper>
      <form
        onSubmit={handleSubmit}
        className="max-w-[750px] mx-auto bg-white border border-[#E4E7EC] shadow-md overflow-hidden rounded-[20px] space-y-6 mt-8"
      >
        <div className=" px-8 mt-8">
          <Label className="mb-2 block text-sm text-[#344054] font-medium">
            Did you hire {name}?
          </Label>
          <RadioGroup
            value={hired}
            onValueChange={(value) => {
              setHired(value as "yes" | "no");
              setReasons([]);
            }}
            className="flex flex-col gap-6 mt-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label
                htmlFor="yes"
                className="text-base text-[#344054] font-normal"
              >
                Yes
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="no" />
              <Label
                htmlFor="no"
                className="text-base text-[#344054] font-normal"
              >
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        {hired === "yes" && (
          <>
            <div className="px-8">
              <Label className="mb-2 block text-sm text-[#344054] font-medium">
                When did you hire {name}?
              </Label>
              <div className="relative">
                <Input
                  type="date"
                  value={hireDate}
                  className="px-4 py-3 border border-[#D0D5DD] rounded-[12px] text-sm text-[#98A2B3] font-normal"
                  onChange={(e) => setHireDate(e.target.value)}
                />
                <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-[#344054] pointer-events-none" />
              </div>
            </div>

            <div className="px-8">
              <Label className="mb-2 block text-sm text-[#344054] font-medium">
                How would you rate your hiring and working experience with{" "}
                {name}?
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
                    ★
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {hired === "no" && (
          <div className="px-8">
            <Label className="mb-2 block text-sm text-[#344054] font-medium">
              Why didn’t you hire {name}?
            </Label>
            <div className="space-y-3">
              {reasonOptions.map((reason) => (
                <div key={reason} className="flex items-start gap-3">
                  <Checkbox
                    id={reason}
                    checked={reasons.includes(reason)}
                    className="border border-[#667185] w-[18px] h-[18px] rounded"
                    onCheckedChange={() => toggleReason(reason)}
                  />
                  <Label
                    htmlFor={reason}
                    className="text-base text-[#333333] font-normal leading-snug"
                  >
                    {reason}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-8">
          <Label className="mb-2 block text-sm text-[#344054] font-medium">
            Do you have any other feedback for us? Your opinion as a care seeker
            on ULO is highly valued.
          </Label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="border border-[#D0D5DD] rounded-[12px] text-sm text-[#98A2B3] font-normal"
            placeholder="Write your feedback here..."
          />
        </div>
        <div className="bg-[#F7F9FC] py-6 border-t border-[#D0D5DD] px-8 flex justify-center">
          <Button type="submit" className="text-[#1D2739] font-semibold">
            <Send />
            {loading ? <Loader className="animate-spin" /> : "Submit feedback"}
          </Button>
        </div>
      </form>
    </div>
  );
}
