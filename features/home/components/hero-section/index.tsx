import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroImage from "@/public/images/Dashboard header.svg";
import BgImage from "@/public/images/image 6.svg";

export function HeroSection() {
  return (
    <section
      className="py-32"
      style={{
        backgroundImage: `url("/images/image 6.svg")`,
        backgroundSize: "auto",
        backgroundPosition: "top right",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-[1136px] mx-auto px-4 text-center">
        <div className="max-w-[942px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#06212C] mb-4 leading-tight">
            Find trusted, verified help — fast, safe and stress‑free
          </h1>
          <p className="text-lg text-[#475367] mb-6 max-w-2xl mx-auto">
            Connect with caregivers verified by experts, all online.
          </p>
          <Button>Join as a care seeker</Button>
        </div>

        <Image
          src={HeroImage}
          alt="Happy family smiling on a couch"
          className="mt-10 w-full rounded-[24px] shadow-xl"
          quality={100}
          priority
        />
      </div>
    </section>
  );
}
