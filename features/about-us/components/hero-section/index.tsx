"use client";

// Hero images removed per request

export function HeroSection() {
  // Hero images removed per request (keep the copy-only hero).

  return (
    <section
      className="py-32 bg-gradient-to-br w-full from-[#f9fcff] to-[#fff4ee]"
      style={{
        backgroundImage: `url("/bg-gradient.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1136px] mx-auto text-center px-4">
        <div className="max-w-[750px] mx-auto">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#06212C] mb-4 leading-tight">
            Raising the standard of domestic work with trust at the heart
          </h1>
          <p className="text-base sm:text-lg text-[#344054] font-normal mb-6">
            At ULO, we believe care is more than a service, it's the soul of
            every strong home and community. That’s why we’re building a world
            where domestic work is trusted, verified, and deeply respected.
          </p>
        </div>

        {/* Hero images removed */}
      </div>
    </section>
  );
}
