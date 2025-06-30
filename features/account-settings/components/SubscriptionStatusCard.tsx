import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SubscriptionStatusCard() {
  return (
    <Card className="w-full md:w-1/2 flex flex-col justify-between">
      <CardContent className="flex flex-col items-end gap-3">
        <Button className="bg-[#F6AA3D] hover:bg-[#e3992f] text-white">
          Start your subscription
        </Button>
        <div className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
          In-active
        </div>
      </CardContent>
    </Card>
  );
}
