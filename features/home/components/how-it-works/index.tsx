"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CareseekerScreen from "@/public/images/How it works image 1.svg";

const steps = [
  { label: "Step 1", description: "Create a free account" },
  { label: "Step 2", description: "Complete your profile" },
  { label: "Step 3", description: "Search for services" },
  { label: "Step 4", description: "Get matched and start" },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2;
      });
    }, 100); // 100ms * 50 = 5s

    if (progress >= 100) {
      setTimeout(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 100);
    }

    return () => clearInterval(progressInterval);
  }, [progress]);

  return (
    <div className="py-20">
      <div className="max-w-[1136px] mx-auto">
        <h2 className="text-[32px] font-bold text-center mb-6">How it works</h2>
      </div>

      <div className="max-w-[1136px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative">
        {/* Steps */}
        <div className="w-full lg:w-[323px] space-y-6 px-4">
          {steps.map((step, index) => (
            <div key={step.label}>
              <p className="text-xs text-[#009987] font-semibold">
                {step.label}
              </p>
              <p className="text-base text-[#344054] font-medium mt-2">
                {step.description}
              </p>

              <div className="w-full flex items-center mt-3 bg-[#FCE3BE] h-[4px] rounded-[4px] overflow-hidden">
                <div
                  className={`h-full transition-all duration-100`}
                  style={{
                    width:
                      index === activeStep
                        ? `${progress}%`
                        : index < activeStep
                        ? "100%"
                        : "0%",
                    backgroundColor: "#F6AA3D",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <Image src={CareseekerScreen} alt="Careseeker screenshot" />
      </div>
    </div>
  );
};

export default HowItWorks;
