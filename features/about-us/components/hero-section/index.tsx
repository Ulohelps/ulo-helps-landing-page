import Image from "next/image";
import User1 from "@/public/images/contact-user1.png";
import User2 from "@/public/images/contact-user2.png";
import User3 from "@/public/images/contact-user3.png";

export function HeroSection() {
  return (
    <section className="py-[96px] bg-gradient-to-br from-[#f9fcff] to-[#fff4ee]">
      <div className="max-w-[1136px] mx-auto text-center">
        <div className="max-w-[750px] mx-auto">
          <h1 className="text-[40px] font-bold text-[#06212C] mb-4">
            Raising the standard of domestic work with trust at the heart
          </h1>
          <p className="text-lg text-[#344054] font-normal mb-6 ">
            At ULO, we believe care is more than a service it's the soul of
            every strong home and community. That’s why we’re building a world
            where domestic work is trusted, verified, and deeply respected.
          </p>
        </div>
        <div className="flex items-center gap-5 mt-6">
          <Image
            src={User1}
            alt="user"
            height={1000}
            width={1000}
            className="w-[388px] rounded-[24px]"
          />
          <Image
            src={User2}
            alt="user"
            height={1000}
            width={1000}
            className="w-[388px] rounded-[24px]"
          />
          <Image
            src={User3}
            alt="user"
            height={1000}
            width={1000}
            className="w-[388px] rounded-[24px]"
          />
        </div>
      </div>
    </section>
  );
}
