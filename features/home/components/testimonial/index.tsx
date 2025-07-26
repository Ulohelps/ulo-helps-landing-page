"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { QouteICon } from "../../../../components/icons";

const testimonials = [
  {
    id: 0,
    quote:
      "ULO Helps made finding care for my father easy and stress-free. Highly recommended!",
    name: "Samuel A.",
    title: "Elderly Care Client",
  },
  {
    id: 1,
    quote:
      "The vetting process reassured me every step of the way. Their team really cares.",
    name: "Miriam O.",
    title: "Family Member",
  },
  {
    id: 2,
    quote:
      "Their platform is intuitive and their caregivers are amazing. A game changer.",
    name: "Adebayo K.",
    title: "Son & Care Coordinator",
  },
  {
    id: 3,
    quote:
      "This service allowed me to return to work knowing my mother is in good hands.",
    name: "Lilian N.",
    title: "Working Professional",
  },
];

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNavigation = (direction: "prev" | "next" | number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (direction === "prev") {
      setCurrentSlide(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
    } else if (direction === "next") {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    } else {
      setCurrentSlide(direction);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">
          Don't take our word for it
        </h2>

        {/* Card Slider */}
        <div className="relative mb-10 overflow-hidden">
          <div className="flex justify-center items-center gap-6 flex-wrap md:flex-nowrap">
            {/* Left card */}
            <div
              className={`hidden md:block flex-shrink-0 w-full max-w-md transition-all opacity-30 scale-95 duration-300`}
            >
              <TestimonialCard
                data={
                  testimonials[
                    (currentSlide - 1 + testimonials.length) %
                      testimonials.length
                  ]
                }
                muted
              />
            </div>

            {/* Active card */}
            <div className="flex-shrink-0 w-full max-w-md transition-all duration-300 transform scale-100 z-10">
              <TestimonialCard data={testimonials[currentSlide]} />
            </div>

            {/* Right card */}
            <div
              className={`hidden md:block flex-shrink-0 w-full max-w-md transition-all duration-300 opacity-30 scale-95 `}
            >
              <TestimonialCard
                data={testimonials[(currentSlide + 1) % testimonials.length]}
                muted
              />
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => handleNavigation("prev")}
            aria-label="Previous testimonial"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:shadow-lg transition active:scale-95"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentSlide
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>

          <button
            onClick={() => handleNavigation("next")}
            aria-label="Next testimonial"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:shadow-lg transition active:scale-95"
            disabled={isAnimating}
          >
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  data,
  muted = false,
}: {
  data: { quote: string; name: string; title: string };
  muted?: boolean;
}) => (
  <div
    className={`rounded-[24px] max-w-[524px] border border-[#FCE3BE] bg-[#FCE3BE4D] shadow-md p-8 transition-all ${
      muted ? "opacity-50" : ""
    }`}
  >
    <div className="w-[52px] h-[52px] bg-[#FCE3BE] rounded-[12px] mb-4 flex items-center justify-center">
      <QouteICon />
      <QouteICon />
    </div>
    <p className="text-[#344054] text-lg font-normal mb-4 leading-relaxed">
      {data.quote}
    </p>
    <div>
      <p className="font-semibold text-lg text-[#344054]">{data.name}</p>
      <p className="text-base text-[#475367]">{data.title}</p>
    </div>
  </div>
);

export default TestimonialSection;
