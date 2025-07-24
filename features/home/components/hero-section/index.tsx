import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroImage from "@/public/images/hero-pic.png";
import BgImage from "@/public/images/bg-hero.png";

export function HeroSection() {
  return (
    <section
      className="bg-gradient-to-br from-[#f9fcff] to-[#fff4ee] pt-24 pb-12 md:pt-28 md:pb-16"
      style={{
        backgroundImage: `url(${BgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1136px] mx-auto px-4 text-center">
        <div className="max-w-[942px] mx-auto">
          <h1 className="text-balance text-4xl md:text-5xl font-bold text-[#06212C] mb-4 leading-tight">
            Find trusted, verified help — fast, safe and stress‑free
          </h1>
          <p className="text-lg text-[#475367] mb-6 max-w-2xl mx-auto">
            Connect with experienced caregivers verified by experts, all online.
          </p>
          <Button size="lg" className="px-8">
            Get started
          </Button>
        </div>

        <Image
          src={HeroImage}
          alt="Happy family smiling on a couch"
          className="mt-10 w-full rounded-[24px] shadow-xl"
          priority
        />
      </div>
    </section>
  );
}
