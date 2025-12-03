"use client";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

import { HeaderWrapper } from "./HeaderWrapper";

export const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <HeaderWrapper>
      {/* Left: menu trigger and search */}
      <div className="flex items-center gap-6">
        <label
          className="flex items-center gap-2 cursor-pointer text-[#2b2b2b]"
          htmlFor="mobile-menu-toggle"
        >
          <Bars3Icon className="w-6 h-6" />
          <span className="hidden sm:inline text-sm">Menu</span>
        </label>
        {/* <MagnifyingGlassIcon className="w-5 h-5 text-[#2b2b2b]" /> */}
      </div>

      {/* Center: brand wordmark */}
      <div className="flex-1 flex justify-center">
        <Image
          alt="Manu Maharani"
          className={`transition-all duration-300 ${isScrolled ? "h-7 sm:h-8" : "h-10 sm:h-14"} w-auto`}
          height={40}
          src="/Logo-Manu-Maharani.png"
          width={180}
        />
      </div>

      {/* Right: language + reserve */}
      <div className="flex items-center gap-6">
        {/* <button className="text-[#2b2b2b] text-sm border-b border-[#2b2b2b] leading-none pb-0.5">
          English
        </button> */}
        <a
          className="bg-[#2b2b2b] text-[#f4efe8] px-5 py-2 text-sm tracking-wide"
          href="#reserve"
        >
          Reserve
        </a>
      </div>
    </HeaderWrapper>
  );
};
