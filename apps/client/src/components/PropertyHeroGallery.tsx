"use client";

import Image from "next/image";
import { useState } from "react";

interface PropertyHeroGalleryProps {
  galleryImages: string[];
  heroImage: string;
}

export function PropertyHeroGallery({
  galleryImages,
  heroImage,
}: PropertyHeroGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = [heroImage, ...galleryImages];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        {/* Desktop: 1 large + 4 small grid */}
        <div className="relative hidden py-6 md:block">
          <div className="grid grid-cols-4 gap-3">
            {/* Large hero image - spans 2 rows */}
            <div className="relative row-span-2 col-span-2 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                alt="Property Hero"
                className="object-cover"
                fill
                priority
                src={heroImage}
              />
            </div>

            {/* 4 smaller images in 2x2 grid */}
            {galleryImages.slice(0, 4).map((img, idx) => (
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                key={idx}
              >
                <Image
                  alt={`Gallery ${idx + 1}`}
                  className="object-cover"
                  fill
                  src={img}
                />
              </div>
            ))}
          </div>

          {/* View All Photos Button - Absolute positioned */}
          <button className="absolute bottom-10 right-7 flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium shadow-lg transition hover:shadow-xl">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect height="18" rx="2" width="18" x="3" y="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            View All Photos
          </button>
        </div>

        {/* Mobile: Carousel slider */}
        <div className="relative py-6 md:hidden">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              alt={`Gallery ${currentIndex + 1}`}
              className="object-cover"
              fill
              priority
              src={allImages[currentIndex] || heroImage}
            />

            {/* Navigation Arrows */}
            <button
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition hover:bg-white"
              onClick={goToPrevious}
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

            <button
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition hover:bg-white"
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

            {/* View All Photos Button */}
            <button className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium shadow-lg">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <rect height="18" rx="2" width="18" x="3" y="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              View All Photos
            </button>
          </div>

          {/* Dots indicator */}
          <div className="mt-4 flex justify-center gap-2">
            {allImages.map((_, idx) => (
              <button
                aria-label={`Go to image ${idx + 1}`}
                className={`h-2 w-2 rounded-full transition ${
                  idx === currentIndex ? "bg-black" : "bg-gray-300"
                }`}
                key={idx}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
