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
import { useState } from "react";
import OnboardingContent from "./OnboardingContent";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ open, onClose }: CustomModalProps) => {
  const { profile, fetchProfile } = useCareseekersStore();
  const [service, setService] = useState(profile?.primaryService || "");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!service) {
      toast({
        title: "error",
        description: "select a service",
        variant: "error",
      });
      return;
    }

    setLoading(true);

    try {
      await careseekersService.prefferedServiceType({
        primaryService: service,
      });
      toast({
        title: "success",
        description: "Primary service selected successfully",
        variant: "success",
      });
      fetchProfile();
      setLoading(false);
      onClose();
    } catch (err) {
      toast({
        title: "failed",
        description: "failed to update primary service",
        variant: "error",
      });
      setLoading(false);
    }
  };

  if (profile && !profile.primaryService) {
    return null;
  }
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
            Change service selection
          </DialogTitle>
        </DialogHeader>
        <OnboardingContent service={service} setService={setService} />

        <DialogFooter
          className="px-4 md:px-8 py-6 bg-[#F7F9FC] border-t border-[#E4E7EC] gap-3"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="outline" onClick={onClose}>
            cancel
          </Button>
          <Button onClick={handleSubmit}>
            {loading ? <Loader className="animate-spin" /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
