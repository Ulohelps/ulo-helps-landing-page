import EmptyStateIcon from "@/components/icons/EmptyStateICon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CaregiverEmpty() {
  const router = useRouter();
  return (
    <div className="w-full text-center py-12 flex flex-col items-center justify-center col-span-full">
      <EmptyStateIcon />
      <h3 className="text-lg font-semibold text-gray-900">No matches found</h3>
      <p className="text-sm text-gray-500 max-w-md">
        We didn’t find any caregiver profiles that match your search or filter
        parameters. Please try a different search term or click the button below
        to request a caregiver and we’ll send you our best matches.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => router.push("/request-caregiver")}
        >
          Request a caregiver
        </Button>
      </div>
    </div>
  );
}
