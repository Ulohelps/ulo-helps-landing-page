import React from "react";
import { StarICon } from "@/components/icons";

const values = [
  {
    title: "Emotional Security:",
    description:
      " Eliminates the panic and helplessness and provides peace of mind that help is available when needed. This transforms anxiety into confidence",
  },
  {
    title: "Speed & Immediacy:",
    description:
      "Instant access to available Domestic workers. No long waiting periods. Fast matching based on your specific needs and location",
  },
  {
    title: " Quality Assurance:",
    description:
      "All Domestic workers are verified and background checked. Experience levels clearly displayed. Reviews and ratings from real families",
  },
  // {
  //   title: "Technological Ease:",
  //   description:
  //     "  Intuitive platform that works like other apps you already love. Simple booking and communication process. Mobile-first experience for on-the-go needs",
  // },
  {
    title: "Availability:",
    description:
      "Domestic workers ready when you need them (including evenings,weekends, emergencies). Multiple domestic worker options to choose from",
  },
  {
    title: "Dependability:",
    description:
      "Consistent service delivery every time. Backup solutions if plans change. Professional support when issues arise",
  },
  {
    title: "Transparency:",
    description:
      "Clear pricing with no hidden fees. Detailed domestic worker profiles and credentials. Open communication channel",
  },
];

const ValuesDerived = () => {
  return (
    <section className="border-t border-[#17403A]/10 bg-[#D4E8DB] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1136px]">
        <header className="mb-12 max-w-xl md:mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[#344054] sm:text-[32px]">
            Value points
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475367] sm:text-lg">
            We are driven by the core belief that care is the foundation of
            thriving communities.
          </p>
        </header>

        <ul className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {values.map((value) => (
            <li
              key={value.title}
              className="flex h-full flex-col rounded-2xl border border-[#17403A]/30 bg-[#FDFCF7]/90 p-5 shadow-sm sm:p-6 md:rounded-3xl"
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#F0EABA] bg-primary sm:h-12 sm:w-12">
                  <StarICon />
                </div>
                <p className="pt-0.5 text-lg font-semibold leading-snug text-[#1a2e24] sm:text-xl">
                  {value.title.trim()}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[#475367] sm:text-base">
                {value.description.trim()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ValuesDerived;
