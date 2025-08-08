"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CareseekerScreen from "@/public/images/How it works image 1.svg";
import Img1 from "@/public/home-page/how-it-works-01.png";
import Img2 from "@/public/home-page/how-it-works-02.png";
import Img3 from "@/public/home-page/how-it-works-03.png";
import Img4 from "@/public/home-page/how-it-works-04.png";

const steps = [
  {
    label: "Step 1",
    description: "Take your first step towards finding your next caregiver.",
    title: "Create a free account",
  },
  {
    label: "Step 2",
    description:
      "Tell us what type of caregiver you’re looking to find and we’ll handle the rest.",
    title: "Complete your profile",
  },
  {
    label: "Step 3",
    description:
      "We’ll show you a selection of caregivers based on your request. You can filter the list to find the exact match for you! ",
    title: "Search for services",
  },
  {
    label: "Step 4",
    description:
      "If you find your perfect match, you can subscribe to ULO, connect with your caregiver and reach out to hire them!",
    title: "Get matched and start",
  },
];

const imgs = [Img1, Img2, Img3, Img4];

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
      }, 200);
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
            <div
              key={step.label}
              className={` ${
                index === activeStep && "bg-[#FCE3BE4D]"
              } rounded-t-[24px]`}
              onClick={() => setActiveStep(index)}
            >
              <div className="p-4">
                <p className="text-xs text-[#009987] font-semibold">
                  {step.label}
                </p>
                <p className="text-base text-[#344054] font-semibold mt-2">
                  {step.title}
                </p>
                {index === activeStep && (
                  <p className="text-sm text-[#475367]">{step.description}</p>
                )}
              </div>

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

        <Image
          src={imgs[activeStep]}
          className="w-[789px]"
          alt="Careseeker screenshot"
        />
      </div>
    </div>
  );
};

export default HowItWorks;
