import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
}

const Guidelines: React.FC<CustomModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[750px] w-full rounded-[32px] p-0  border-none bg-white overflow-hidden"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          padding: "0px",
          borderRadius: "32px",
        }}
      >
        <DialogHeader className="px-8 py-6 border-b border-[#D0D5DD]">
          <DialogTitle className="text-xl text-[#475367]  font-semibold">
            ULO’s safety guidelines
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base text-[#344054] font-normal mt-2 px-8 space-y-5">
          <ul>
            <li className="font-semibold">
              1. Ask Direct Questions About Experience and Boundaries
            </li>
            <li>
              Even though caregivers are vetted, it’s important to ask your own
              questions. Clarify roles, comfort levels, and the kind of support
              you need. Be upfront and clear about your household routines and
              non-negotiables.
            </li>
          </ul>
          <ul>
            {" "}
            <li className="font-semibold">2. Conduct Your Own Health Checks</li>
            <li>
              Conduct Your Own Health Checks ULO doesn’t manage medical checks,
              so we encourage you to ask for recent health status or test
              results directly. If health is a priority, you can also request
              proof of vaccinations or a medical clearance.
            </li>
          </ul>
          <ul>
            <li className="font-semibold">
              3. Conduct Interviews (Virtually or In-Person)
            </li>
            <li>
              Before hiring, schedule an interview. Prepare questions about
              experience, values, routines, and emergency handling. Trust your
              instincts during the conversation.
            </li>
          </ul>
          <ul>
            <li className="font-semibold">4. Leave Honest Reviews</li>
            <li>
              After your experience, leave a review to help others make informed
              decisions and to keep the ULO community safe and transparent.
            </li>
          </ul>
        </DialogDescription>
        <DialogFooter
          className={` gap-4 mt-6 p-6 bg-[#F7F9FC] border-t border-[#F7F9FC] w-full`}
          style={{ display: "flex", justifyContent: "end" }}
        >
          <Button variant="outline" onClick={onClose}>
            I understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Guidelines;
