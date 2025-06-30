import PaymentDetailsForm from "./components/PaymentDetailsForm";
import OrderSummaryCard from "./components/OrderSummaryCard";
import HeaderWrapper from "@/components/header-wrap";

export default function Subscription() {
  return (
    <div className="">
      <HeaderWrapper>
        <div className="max-w-[1136px] mx-auto py-8">
          <h1 className="text-2xl lg:text-[28px] text-[#06212C] font-semibold">
            Start your ULO subscription
          </h1>
          <p className="text-sm text-[#475367] font-normal mt-2">
            Find your next caregiver with unlimited ULO connections.
          </p>
        </div>
      </HeaderWrapper>

      <div className="flex flex-col lg:flex-row px-4 gap-8 items-start  max-w-[1136px] mx-auto my-12">
        <PaymentDetailsForm />
        <OrderSummaryCard />
      </div>
    </div>
  );
}
