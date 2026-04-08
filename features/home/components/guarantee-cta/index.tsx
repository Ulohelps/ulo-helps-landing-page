"use client";

import { Button } from "@/components/ui/button";
import { CARESEEKER_REGISTER_URL } from "@/lib/site";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function GuaranteeCta() {
  const router = useRouter();

  return (
    <section className="border-t border-[#E8E6E0]/80 bg-transparent py-14 md:py-20">
      <div className="mx-auto max-w-[1136px] px-4 text-center">
        <motion.div
          className="mx-auto max-w-xl rounded-2xl border border-[#1B5E37]/25 bg-[#E8F5EC]/80 px-6 py-8 md:px-10 md:py-9 shadow-sm backdrop-blur-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-lg font-semibold text-[#1B5E37] md:text-xl">
              72 hours placement guarantee
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-[#475467]">
            We&apos;ll get you a domestic worker quickly without stress.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Button
            onClick={() => router.push(CARESEEKER_REGISTER_URL)}
            className="h-auto min-h-12 w-full shrink-0 rounded-xl bg-[#1B5E37] px-6 py-3 text-center text-base font-semibold leading-snug text-white shadow-[0_4px_14px_rgba(27,94,55,0.35)] hover:bg-[#154a2d] hover:text-white whitespace-normal sm:w-auto"
          >
            Find a verified worker
          </Button>
          <Button
            variant="outline"
            asChild
            className="h-auto min-h-12 w-full shrink-0 rounded-xl border-[#1B5E37]/40 bg-white px-6 py-3 text-center text-base font-semibold leading-snug text-[#1B5E37] shadow-sm hover:border-[#1B5E37]/55 hover:bg-[#F9FAFB] hover:text-[#154a2d] whitespace-normal sm:w-auto sm:max-w-none"
          >
            <Link
              href="/for-domestic-workers"
              className="inline-flex items-center justify-center text-center"
            >
              Register as a domestic worker
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
