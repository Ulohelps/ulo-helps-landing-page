export default function CaregiverSkeleton() {
  return (
    <div className="animate-pulse border border-[#D0D5DD] rounded-[24px] p-4 shadow-sm w-full">
      <div className="w-full h-[200px] bg-gray-200 rounded-[12px]" />
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-full" />
      </div>
      <div className="mt-4 h-3 bg-gray-200 rounded w-1/4" />
    </div>
  );
}
