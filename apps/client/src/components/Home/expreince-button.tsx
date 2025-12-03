"use client";
import React from "react";

import { cn } from "@/lib/utils";

export default function ExperienceButton() {
  const [isChooserOpen, setIsChooserOpen] = React.useState(false);
  const categories = [
    "Family & Friends",
    "Wilderness Traveller",
    "Social or Corporate",
    "Couple Traveller",
  ];

  return (
    <>
      <button
        className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black/80 text-white tracking-wide text-base shadow-lg hover:bg-black transition-colors"
        onClick={() => setIsChooserOpen(true)}
        type="button"
      >
        Choose Your Experience
      </button>

      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Overlay fades */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300 ease-out",
            isChooserOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
          )}
          onClick={() => setIsChooserOpen(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
        </div>

        {/* Panel slides */}
        <aside
          className={cn(
            "absolute left-0 top-0 h-full w-full max-w-[620px] p-6 sm:p-14 text-foreground flex items-center",
            "transition-transform duration-300 ease-out transform-gpu pointer-events-auto",
            isChooserOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <ul className="group space-y-6 sm:space-y-8">
            {categories.map((cat) => (
              <li key={cat}>
                <a
                  className="block text-xl font-light sm:text-3xl md:text-6xl leading-none
                   text-foreground font-serif transition-colors duration-200
                   group-hover:text-foreground/60 group-focus-within:text-foreground/60
                   hover:text-foreground focus-visible:text-foreground"
                  href="#"
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
