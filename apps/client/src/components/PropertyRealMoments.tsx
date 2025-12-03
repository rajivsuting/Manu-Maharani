"use client";

import Image from 'next/image';
import { useState } from 'react';

interface RealMoment {
  id: string;
  image: string;
  alt: string;
}

interface PropertyRealMomentsProps {
  moments: RealMoment[];
}

export function PropertyRealMoments({ moments }: PropertyRealMomentsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 2; // Number of images visible at a time

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(moments.length - visibleCount, prevIndex + 1)
    );
  };

  return (
    <section className="mb-10" id="real-moments">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-8 w-1 rounded bg-[#c9a96d]" />
        <h2 className="text-2xl font-serif font-bold">Real Moments</h2>
      </div>

      <div className="relative flex items-center">
        {/* Left Arrow */}
        {currentIndex > 0 && (
          <button
            className="absolute left-0 z-10 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition hover:bg-white"
            onClick={goToPrevious}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {currentIndex < moments.length - visibleCount && (
          <button
            className="absolute right-0 z-10 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition hover:bg-white"
            onClick={goToNext}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Images Grid */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount + 16 / (100 / visibleCount))}%)`,
            }}
          >
            {moments.map((moment) => (
              <div
                className="relative aspect-[4/3] w-[calc(50%-8px)] flex-shrink-0 overflow-hidden rounded-xl"
                key={moment.id}
              >
                <Image
                  alt={moment.alt}
                  className="object-cover"
                  fill
                  src={moment.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
