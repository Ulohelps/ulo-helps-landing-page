import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  loading?: boolean;
  btnText2: string;
  btnText1: string;
}

const SettingsModal = ({
  open,
  onClose,
  onConfirm,
  title,
  btnText1,
  btnText2,
  children,
  loading,
}: CustomModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[560px] w-full max-w-full sm:rounded-[32px] p-0 rounded-none border-none sm:p-8 bg-white overflow-hidden"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          padding: "0px",
        }}
      >
        <DialogHeader className="px-4 md:px-8 py-3 md:py-6 border-b border-[#E4E7EC]">
          <DialogTitle className="text-xl text-[#475367] text-left font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base text-[#667185] font-normal mt-2 px-4 md:px-8 md:py-4">
          {children}
        </DialogDescription>

        <DialogFooter
          className="px-4 md:px-8 py-6 bg-[#F7F9FC] border-t border-[#E4E7EC] gap-3"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="outline" onClick={onClose}>
            {btnText1}
          </Button>
          <Button onClick={onConfirm}>{loading ? "loading" : btnText2}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
