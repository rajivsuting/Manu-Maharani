"use client";
import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
];

export default function HomeInstaImageSection() {
  return (
    <section className="w-full py-24">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-sm text-muted-foreground">
            Follow Us
          </p>
          <h2 className="text-3xl md:text-4xl font-thin tracking-widest text-center mb-12 uppercase">
            In Touch With Manu Maharani
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Intro card */}
          <div className="bg-[#4a4a4a] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px]">
            <div>
              <h3 className="text-xl sm:text-2xl tracking-wide">
                MANU MAHARANI RESORTS
              </h3>
              <p className="mt-4 text-sm sm:text-base opacity-90">
                Share your memories with
              </p>
              <p className="mt-2 text-base sm:text-lg flex items-center gap-2">
                <span className="text-xl">📷</span>
                @manumaharani_resorts
              </p>
            </div>
            <div className="mt-10">
              <span className="inline-block text-sm tracking-wider">
                SEE MORE
              </span>
              <div className="h-px w-40 bg-white mt-1" />
            </div>
          </div>

          {images.map((src, i) => (
            <div
              className="group relative aspect-square overflow-hidden"
              key={`insta-${i}`}
            >
              <Image
                alt={`Gallery ${i + 1}`}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                src={src}
              />
              <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 flex items-end p-4">
                <div className="text-white w-full translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs opacity-90">Share your memories with</p>
                  <p className="text-sm font-medium">@manu_maharani</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
