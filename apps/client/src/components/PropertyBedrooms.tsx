"use client";

import Image from "next/image";
import { useState } from "react";

interface Bedroom {
  id: number;
  image: string;
  name: string;
}

interface PropertyBedroomsProps {
  bedrooms: Bedroom[];
}

export function PropertyBedrooms({ bedrooms }: PropertyBedroomsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  const canGoNext = currentIndex < bedrooms.length - visibleCount;
  const canGoPrev = currentIndex > 0;

  const goToNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-8 w-1 rounded bg-[#c9a96d]" />
        <h2 className="text-2xl font-serif font-bold">Bedrooms</h2>
      </div>

      {/* Desktop: Scrollable carousel */}
      <div className="relative">
        {/* Navigation Buttons */}
        {canGoPrev && (
          <button
            aria-label="Previous bedrooms"
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-50"
            onClick={goToPrev}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {canGoNext && (
          <button
            aria-label="Next bedrooms"
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-50"
            onClick={goToNext}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Bedrooms Grid */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount + 16 / (100 / visibleCount))}%)`,
            }}
          >
            {bedrooms.map((bedroom) => (
              <div
                className="relative aspect-[4/3] w-[calc(33.333%-11px)] flex-shrink-0 overflow-hidden rounded-xl"
                key={bedroom.id}
              >
                <Image
                  alt={bedroom.name}
                  className="object-cover"
                  fill
                  src={bedroom.image}
                />
                <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                  {bedroom.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
