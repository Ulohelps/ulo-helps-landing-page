import React from "react";

const values = [
  "Trust first",
  " Transparency",
  "Global Standards",
  "Dependable Excellence",
  " Human-centered technology ",
  " Speed and Simplicityover complexity",
];

const CoreValues = () => {
  return (
    <div className="bg-[var(--ulo-dark-green)] py-24 px-4">
      <div className="max-w-[1136px] mx-auto">
        <div className="max-w-[556px] mx-auto mb-16">
          <h2 className="text-[32px] text-[#FFFDF8] text-center font-semibold mb-4">
            Core Values
          </h2>
          <p className="text-lg text-[#FFFDF8] text-center font-normal">
            when you are vulnerable trust is not negotiable
          </p>
        </div>
        <div className=" grid grid-cols-3 gap-y-16">
          {values.map((value) => (
            <div
              key={value}
              className="bg-[var(--ulo-light-green)] rounded-[32px] max-w-[320px] h-[120px] text-center text-lg font-semibold text-[var(--ulo-dark-green)] flex items-center justify-center"
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValues;
