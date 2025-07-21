import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { careseekersService } from "@/lib/services/careseekersService";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  connectId: string;
}

const ReportModal = ({ open, onClose, name, connectId }: CustomModalProps) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    setLoading(true);
    router.push(`/report-caregiver?connectId=${connectId}&name=${name}`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[750px] w-full max-w-full sm:rounded-[32px] p-0 rounded-none border-none sm:p-8 bg-white overflow-hidden"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          padding: "0px",
        }}
      >
        <DialogHeader className="px-4 md:px-8 py-3 md:py-6 border-b border-[#E4E7EC]">
          <DialogTitle className="text-xl text-[#475367] text-left font-semibold">
            Report situation
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="p-6 text-base text-[#344054] font-normal">
          For data privacy reasons, we only reveal caregivers’ guarantor
          information in the event of criminal offenses or similar occurrences
          involving the caregiver while they’re in your employ. If a situation
          like this has taken place, kindly describe it below so that our team
          can support you through the next process and take necessary actions.
        </DialogDescription>
        <DialogFooter
          className="px-4 md:px-8 py-6 bg-[#F7F9FC] border-t border-[#E4E7EC] gap-3"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="outline" onClick={onClose}>
            cancel
          </Button>
          <Button onClick={handleSubmit}>
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              "Accept & continue"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
