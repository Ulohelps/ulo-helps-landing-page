"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-accepted");
    if (!accepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-accepted", "true");
    setIsVisible(false);
  };

  const handleDeclineAndClose = () => {
    localStorage.setItem("cookie-accepted", "essential");
    setIsVisible(false);

    // Try to close the tab
    setTimeout(() => {
      window.close();
    }, 100);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-[10%] left-1/2 -translate-x-1/2 max-h-[130px] max-w-[1136px]  flex gap-6 items-center border border-[#17403A] rounded-[24px] p-6 w-full shadow-md bg-[#D4E8DB] z-50">
      <div className="flex-1">
        <h4 className="text-xl text-[#06212C] font-semibold">
          We’ve got cookies!
        </h4>
        <p className="text-base text-[#475367]">
          We use cookies on our website to aid our marketing efforts and improve
          your user experience. To learn more about our use of cookies, view our
          <Link
            href="/privacy-policy"
            className="text-[#F0EABA] underline font-semibold"
          >
            {" "}
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="secondary" onClick={handleAccept}>
          Accept
        </Button>
        <Button variant="outline" onClick={handleDeclineAndClose}>
          decline
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
