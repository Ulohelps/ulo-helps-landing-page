import Image from "next/image";
import User1 from "@/public/images/francis-odeyemi-i7BZFBAh-dQ-unsplash.svg";
import User2 from "@/public/images/francis-odeyemi-ezF3j_00bXE-unsplash.svg";
import User3 from "@/public/images/francis-odeyemi-GUvIyE-_KK0-unsplash.svg";
import BgImage from "@/public/images/image 6.svg";

export function HeroSection() {
  return (
    <section
      className="py-32 bg-gradient-to-br from-[#f9fcff] to-[#fff4ee]"
      style={{
        backgroundImage: `url(${BgImage.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1136px] mx-auto text-center px-4">
        <div className="max-w-[750px] mx-auto">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#06212C] mb-4 leading-tight">
            Raising the standard of domestic work with trust at the heart
          </h1>
          <p className="text-base sm:text-lg text-[#344054] font-normal mb-6">
            At ULO, we believe care is more than a service—it's the soul of
            every strong home and community. That’s why we’re building a world
            where domestic work is trusted, verified, and deeply respected.
          </p>
        </div>

        <div className="flex items-center overflow-x-scroll scrollbar-hide gap-4 sm:gap-5 mt-12">
          <Image
            src={User1}
            alt="user"
            height={1000}
            width={1000}
            className="w-full sm:w-[300px] md:w-[340px] lg:w-[388px] rounded-[24px] object-cover"
          />
          <Image
            src={User2}
            alt="user"
            height={1000}
            width={1000}
            className="w-full sm:w-[300px] md:w-[340px] lg:w-[388px] rounded-[24px] object-cover"
          />
          <Image
            src={User3}
            alt="user"
            height={1000}
            width={1000}
            className="w-full sm:w-[300px] md:w-[340px] lg:w-[388px] rounded-[24px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
