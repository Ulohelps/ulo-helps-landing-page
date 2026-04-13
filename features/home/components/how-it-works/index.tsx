"use client";

const STEPS = [
  { n: 1, title: "Tell us what you need" },
  { n: 2, title: "Pay securely to confirm your request" },
  { n: 3, title: "Get matched with verified workers" },
  { n: 4, title: "Hire & get started" },
] as const;

const HowItWorks = () => {
  return (
    <section className="border-t border-white/[0.08] bg-[#17403A] py-16 md:py-24">
      <div className="mx-auto max-w-[1136px] px-4">
        <h2 className="mb-12 text-center font-serif text-3xl font-semibold tracking-tight text-[#FDFCF7] md:mb-16 md:text-[2rem]">
          How it works
        </h2>

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 md:gap-x-12 md:gap-y-12">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex min-w-0 flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9EAD3] text-lg font-bold text-[#17403A] shadow-md">
                {step.n}
              </div>
              <p className="mt-4 text-[15px] font-medium leading-snug text-[#E8F5EC]/95">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
