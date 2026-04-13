import React from "react";

const values = [
  "Trust first",
  " Transparency",
  "Global Standards",
  "Dependable Excellence",
  " Human-centered technology ",
  " Speed and Simplicity over complexity",
];

const CoreValues = () => {
  return (
    <section className="border-t border-white/10 bg-[var(--ulo-dark-green)] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1136px]">
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[#FFFDF8] sm:text-[32px]">
            Core Values
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#FFFDF8]/90 sm:text-lg">
            when you are vulnerable trust is not negotiable
          </p>
        </header>
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {values.map((value) => (
            <li
              key={value}
              className="flex min-h-[96px] items-center justify-center rounded-2xl bg-[var(--ulo-light-green)] px-3 py-4 text-center text-sm font-semibold leading-snug text-[var(--ulo-dark-green)] shadow-sm sm:min-h-[120px] sm:px-5 sm:py-6 sm:text-lg sm:rounded-[28px] md:rounded-[32px]"
            >
              {value.trim()}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CoreValues;
