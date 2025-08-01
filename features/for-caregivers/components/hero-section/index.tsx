"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroImage from "@/public/Image frame.svg";
import BgImage from "@/public/images/image 6.svg";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  return (
    <section
      className="py-32"
      style={{
        backgroundImage: `url('/images/image 6.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1136px] flex flex-col lg:flex-row items-center mx-auto px-4 text-center">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl md:text-5xl text-left font-bold text-[#06212C] mb-4 ">
            Take control of your work
          </h1>
          <p className="text-lg text-left text-[#475367] mb-6 lg:max-w-2xl w-full">
            At ULO we have no middlemen, no extortion. Just honest, dignified
            work. If this sounds like something you’re interested in, join our
            pool of caregivers and gain access to care employers across Lagos.
          </p>
          <div className="flex items-center justify-start">
            <Button
              className="shadow-md text-left"
              onClick={() =>
                router.push("https://caregivers.ulohelps.com/auth/login")
              }
            >
              Join as a caregiver
            </Button>
          </div>
        </div>

        <Image
          src={HeroImage}
          alt="Happy family smiling on a couch"
          className="lg:mt-10 w-full lg:w-1/2"
          priority
        />
      </div>
    </section>
  );
}
