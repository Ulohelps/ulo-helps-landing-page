import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroImage from "@/public/Images wrapper.svg";
import BgImage from "@/public/images/image 6.svg";

export function HeroSection() {
  return (
    <section
      className="py-32"
      style={{
        backgroundImage: `url(${BgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1136px] mx-auto px-4 text-center">
        <div className="max-w-[942px]">
          <h1 className="text-4xl md:text-5xl text-left font-bold text-[#06212C] mb-4 ">
            Take control of your work
          </h1>
          <p className="text-lg text-left text-[#475367] mb-6 max-w-2xl">
            At ULO we have no middlemen, no extortion. Just honest, dignified
            work. If this sounds like something you’re interested in, join our
            pool of caregivers and gain access to care employers across Lagos.
          </p>
          <Button className="shadow-md">Join as a caregiver</Button>
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
