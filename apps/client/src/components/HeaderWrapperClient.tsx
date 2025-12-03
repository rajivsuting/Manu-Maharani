"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

interface HeaderWrapperProps {
  children: React.ReactNode;
}

export const HeaderWrapper = ({ children }: HeaderWrapperProps) => {
  const pathname = usePathname();
  const menuItems: Array<{
    children?: Array<{ href?: string; label: string }>;
    href?: string;
    label: string;
  }> = [
    { href: "#about", label: "About Us" },
    { href: "#dining", label: "Fine Dining" },
    {
      children: [
        { href: "#wedding-destination", label: "Destination Wedding" },
        { href: "#events", label: "Events/Off-Sites" },
      ],
      label: "Wedding/Mice",
    },
    {
      children: [
        { href: "#regal-experience", label: "Regal Experience" },
        { href: "#book-safari", label: "Book A Safari" },
      ],
      label: "Experiences",
    },
    {
      children: [
        { href: "#luxury-room", label: "Luxury Room" },
        { href: "#luxury-cottages", label: "Luxury Cottages" },
        { href: "#club-cottages", label: "Club Cottages" },
        { href: "#family-room", label: "Family Room" },
      ],
      label: "Accomodation",
    },
    { href: "#contact", label: "Contact Us" },
  ];

  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined
  );
  const [mobileSubmenuIndex, setMobileSubmenuIndex] = React.useState<
    null | number
  >(null);

  React.useEffect(() => {
    // Close mobile menu when resizing to desktop
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        const checkbox = document.getElementById(
          "mobile-menu-toggle"
        ) as HTMLInputElement;
        if (checkbox) checkbox.checked = false;
        setMobileSubmenuIndex(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("sds", activeIndex, pathname);

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Hidden checkbox for mobile menu toggle */}
      <input className="hidden peer" id="mobile-menu-toggle" type="checkbox" />

      {/* Top bar */}
      <div className="w-full bg-background backdrop-blur supports-[backdrop-filter]:bg-[#f4efe8]/80 border-b border-black/10">
        <div className="max-w-screen-xl mx-auto px-4 xl:px-0 py-4 transition-[height] duration-300 flex items-center justify-between gap-2 lg:gap-0">
          {children}
        </div>
      </div>

      {/* Full-screen menu overlay (slides in from the left) */}
      <div className="pointer-events-none fixed inset-y-0 left-0 bg-[#fff] opacity-0 -translate-x-full transform-gpu transition-[opacity,transform] duration-400 ease-in-out peer-checked:opacity-100 peer-checked:translate-x-0 peer-checked:pointer-events-auto w-full max-w-4xl">
        <div className="w-full p-6 px-10 sm:p-10 sm:px-20 flex flex-row items-center justify-between min-w-xl">
          <Image
            alt="Manu Maharani"
            className={`transition-all duration-300 h-10 sm:h-12 w-auto`}
            height={40}
            src="/Logo-Manu-Maharani.png"
            width={180}
          />
          {/* Close button */}
          <label
            className="text-[#2b2b2b] cursor-pointer text-xl"
            htmlFor="mobile-menu-toggle"
          >
            ×
          </label>
        </div>
        <div className="h-full flex">
          {/* Left navigation list */}
          <aside className="w-full sm:w-80 p-6 pl-10 sm:p-10 sm:pl-20 border-r border-black/10 flex-shrink-0 overflow-y-auto">
            <nav className="space-y-6 w-full text-foreground">
              {menuItems.map((item, idx) => {
                const hasChildren = !!item.children?.length;
                return (
                  <div
                    className="group flex items-center justify-between gap-4"
                    key={item.label}
                  >
                    <a
                      className={cn(
                        "block text-xl hover:opacity-70 font-thin cursor-pointer",
                        activeIndex !== undefined
                          ? pathname !== item.href &&
                              activeIndex !== idx &&
                              "opacity-50"
                          : null
                      )}
                      href={item.href || "#"}
                      onClick={(e) => {
                        if (!hasChildren) return;
                        e.preventDefault();
                        if (window.innerWidth < 640) {
                          setMobileSubmenuIndex(idx);
                        } else {
                          setActiveIndex((prev) =>
                            prev === idx ? undefined : idx
                          );
                        }
                      }}
                    >
                      {item.label}
                    </a>
                    {hasChildren && (
                      <span className="text-[#2b2b2b] opacity-60 group-hover:opacity-100">
                        ›
                      </span>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Right content area - shows submenu on desktop */}
          {activeIndex !== undefined && menuItems[activeIndex]?.children ? (
            <div className="hidden sm:block sm:w-80 p-10 overflow-y-auto">
              <div className="max-w-xl">
                <div className="space-y-4">
                  {menuItems[activeIndex].children!.map((child) => (
                    <a
                      className={cn(
                        "flex items-center justify-between text-md text-foreground font-thin hover:opacity-70"
                        // pathname !== child.href && "opacity-50"
                      )}
                      href={child.href || "#"}
                      key={child.label}
                    >
                      {child.label}
                      <span className="opacity-60 text-[#2b2b2b]">›</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {/* Mobile nested submenu panel */}
          <div
            className={`sm:hidden absolute inset-0 bg-[#fff] transform-gpu transition-transform duration-300 ease-in-out ${mobileSubmenuIndex === null ? "translate-x-full pointer-events-none" : "-translate-x-px"}`}
          >
            <div className="flex relative items-center justify-between px-4 py-4 border-b border-black/10">
              <button
                className="inline-flex items-center gap-1.5 text-sm text-[#2b2b2b] whitespace-nowrap"
                onClick={() => {
                  console.log("back");
                  setMobileSubmenuIndex(null);
                }}
              >
                <ChevronLeftIcon
                  aria-hidden="true"
                  className="w-[1em] h-[1em]"
                />
                Back
              </button>
              <div className="absolute inset-0 flex items-center justify-center text-center text-[#2b2b2b] pointer-events-none">
                {mobileSubmenuIndex !== null
                  ? (menuItems[mobileSubmenuIndex!]?.label ?? "")
                  : ""}
              </div>
              <span />
            </div>
            <div className="p-4 space-y-4">
              {mobileSubmenuIndex !== null &&
                menuItems[mobileSubmenuIndex]?.children?.map((child) => (
                  <a
                    className={cn(
                      "flex items-center justify-between text-md text-foreground font-thin hover:opacity-70",
                      pathname !== child.href && "opacity-50"
                    )}
                    href={child.href || "#"}
                    key={child.label}
                  >
                    {child.label}
                    <span className="opacity-60 text-[#2b2b2b]">›</span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
