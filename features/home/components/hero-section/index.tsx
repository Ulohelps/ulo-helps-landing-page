import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroImage from "@/public/images/hero-pic.png";

export function HeroSection() {
  return (
    <section className="pt-28 pb-10 bg-gradient-to-br from-[#f9fcff] to-[#fff4ee]">
      <div className="max-w-[1136px] mx-auto text-center">
        <div className="max-w-[942px] mx-auto">
          <h1 className="text-5xl md:text-5xl font-bold text-[#06212C] mb-4">
            Find trusted, verified help — fast, safe and stress‑free
          </h1>
          <p className="text-lg text-[#475367] font-normal mb-6 ">
            Connect with experienced caregivers verified by experts, all online.
          </p>
          <Button>Get started</Button>
        </div>
        <Image
          src={HeroImage}
          alt="Smiling family on couch"
          className="mt-10 w-full rounded-[24px]  shadow-xl"
        />
      </div>
    </section>
  );
}
