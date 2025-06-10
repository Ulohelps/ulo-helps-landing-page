"use client";
import { Check, CheckCircle } from "lucide-react";

interface OnboardingProgressProps {
  status: {
    personalDetailsComplete: boolean;
    workExperienceComplete: boolean;
    documentsComplete: boolean;
    safetyScreeningComplete: boolean;
    availabilityComplete: boolean;
  };
}

const steps = [
  { key: "personalDetailsComplete", label: "Personal details", step: 1 },
  { key: "workExperienceComplete", label: "Work experience", step: 2 },
  { key: "availabilityComplete", label: "Availability", step: 3 },
  { key: "documentsComplete", label: "Documents", step: 4 },
  { key: "safetyScreeningComplete", label: "Safety screening", step: 5 },
];

export function OnboardingProgress({ status }: OnboardingProgressProps) {
  // Calculate current step (first incomplete step)
  const currentStep =
    steps.findIndex((step) => !status[step.key as keyof typeof status]) + 1 ||
    steps.length;
  const progress = ((currentStep - 1) * 100) / steps.length;

  return (
    <div className="space-y-4">
      <div className="relative p-4 md:p-6 bg-slate-800 rounded-lg">
        {/* Background line */}
        <div className="absolute bottom-[-16%] md:bottom-[-14%] left-0 right-0 h-[6px] bg-[#B4E1F3] transform -translate-y-1/2" />

        {/* Progress line */}
        <div
          className="absolute bottom-[-14%] left-0 h-[6px] bg-[#1DA5DB] transform -translate-y-1/2 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />

        {/* Desktop steps */}
        <div className="hidden md:flex items-center justify-between relative">
          {steps.map((step, index) => {
            const isCompleted = status[step.key as keyof typeof status];
            const isCurrent =
              !isCompleted &&
              (index === 0 ||
                status[steps[index - 1]?.key as keyof typeof status]);

            return (
              <div
                key={step.key}
                className="flex flex-col items-center"
                style={{ flex: 1 }}
              >
                <span
                  className={`text-xs font-semibold mb-2 text-center transition-colors duration-300
                    ${
                      isCompleted || isCurrent
                        ? "text-[#F7F9FC]"
                        : "text-[#667185]"
                    }
                  `}
                >
                  {step.label}
                </span>
                <div
                  className={`absolute bottom-[-42px] h-6 w-6 rounded-full flex items-center justify-center transition-colors duration-300
                    ${isCompleted ? "bg-[#1DA5DB]" : ""}
                    ${isCurrent ? "border-2 border-[#1DA5DB] bg-[#1DA5DB]" : ""}
                    ${!isCompleted && !isCurrent ? "bg-[#B4E1F3]" : ""}
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : isCurrent ? (
                    <div className="h-3 w-3 rounded-full bg-white" />
                  ) : (
                    <p className="text-[#667185] text-[10px] font-semibold">
                      {index + 1}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile steps */}
        <div className="flex flex-col md:hidden">
          <span className="text-xs font-semibold mb-4 text-[#F7F9FC]">
            {steps[currentStep - 1]?.label}
          </span>

          <div className="absolute left-0 bottom-[-16px] flex justify-around w-full mt-2">
            {steps.map((step, index) => {
              const isCompleted = status[step.key as keyof typeof status];
              const isCurrent =
                !isCompleted &&
                (index === 0 ||
                  status[steps[index - 1]?.key as keyof typeof status]);

              return (
                <div key={step.key} className="flex flex-col items-center">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center
                      ${isCompleted ? "bg-[#1DA5DB]" : ""}
                      ${
                        isCurrent
                          ? "border-2 border-[#1DA5DB] bg-[#1DA5DB]"
                          : ""
                      }
                      ${!isCompleted && !isCurrent ? "bg-[#B4E1F3]" : ""}
                    `}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : isCurrent ? (
                      <div className="h-3 w-3 rounded-full bg-white" />
                    ) : (
                      <p className="text-[#667185] text-[10px] font-semibold">
                        {index + 1}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
