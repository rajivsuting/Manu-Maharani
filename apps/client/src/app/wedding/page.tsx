"use client";
import Image from "next/image";
import React from "react";

import WeddingAiManuMaharani from "@/components/Home/wedding-ai-manu-maharani";
import WeddingFestivities from "@/components/WeddingFestivities";

export default function Page() {
  const destinations = [
    {
      blurb:
        "Grand architecture, regal traditions and timeless settings for your vows.",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
      title: "Royal Palace Weddings",
    },
    {
      blurb:
        "Contemporary elegance and vibrant city backdrops for memorable celebrations.",
      image:
        "https://images.unsplash.com/photo-1512455102796-467984917f4e?q=80&w=1600&auto=format&fit=crop",
      title: "Iconic City Weddings",
    },
    {
      blurb:
        "Azure horizons, golden sands and picture‑perfect sunsets by the sea.",
      image:
        "https://images.unsplash.com/photo-1473172707857-f9e276582ab6?q=80&w=1600&auto=format&fit=crop",
      title: "Vows on the Beach",
    },
    {
      blurb:
        "Breathtaking vistas where romance and nature craft an unforgettable day.",
      image:
        "https://images.unsplash.com/photo-1500043372186-8f33e95e85a6?q=80&w=1600&auto=format&fit=crop",
      title: "Mountain Wedding Vows",
    },
  ];

  const festivities = React.useMemo(
    () => [
      {
        description:
          "Dream-like escapes for two with moonlit strolls and starry nights.",
        id: "honeymoons",
        image:
          "https://images.unsplash.com/photo-1520975867597-0f2b0b1b8c6b?q=80&w=1600&auto=format&fit=crop",
        label: "Honeymoons",
      },
      {
        description:
          "Recreate memories with a heartfelt ceremony to celebrate forever.",
        id: "renewal-of-vows",
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
        label: "Renewal of Vows",
      },
      {
        description:
          "Romantic frames that capture your unique bond—elegant and timeless.",
        id: "couple-shoots",
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
        label: "Couple Shoots",
      },
      {
        description:
          "Romantic frames that capture your unique bond—elegant and timeless.",
        id: "couple-shoots",
        image:
          "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1600&auto=format&fit=crop",
        label: "Couple Shoots",
      },
      {
        description:
          "Stylish soirées that set the tone for sparkling celebrations.",
        id: "cocktail-parties",
        image:
          "https://images.unsplash.com/photo-1532634896-26909d0d4b6a?q=80&w=1600&auto=format&fit=crop",
        label: "Cocktail Parties",
      },
      {
        description:
          "Joyful gatherings with thoughtful details crafted for the bride-to-be.",
        id: "bridal-shower",
        image:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop",
        label: "Bridal Shower",
      },
      {
        description: "Vibrant colours, music and the intricate art of henna.",
        id: "mehndi",
        image:
          "https://images.unsplash.com/photo-1603521216931-1f5d4dfb9f30?q=80&w=1600&auto=format&fit=crop",
        label: "Mehndi",
      },
      {
        description:
          "Golden glow of blessings amidst fragrant blooms and cheerful hues.",
        id: "haldi",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1600&auto=format&fit=crop",
        label: "Haldi",
      },
      {
        description:
          "Dance to the rhythm of love in an evening of melodies and moves.",
        id: "sangeet",
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
        label: "Sangeet",
      },
      {
        description:
          "Bespoke moments—from grand gestures to intimate settings—made perfect.",
        id: "proposals",
        image:
          "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop",
        label: "Proposals",
      },
    ],
    []
  );

  const [index, setIndex] = React.useState(2);
  const count = destinations.length;
  // derived inside renderPanel
  const [outIndex, setOutIndex] = React.useState<null | number>(null);
  const [animDir, setAnimDir] = React.useState<"next" | "prev" | null>(null);
  const ANIM_MS = 450;

  // Festivities UI moved to component

  const handlePrev = () => {
    if (animDir) return;
    setOutIndex(index);
    setAnimDir("prev");
    setIndex((i) => (i + count - 1) % count);
    setTimeout(() => {
      setOutIndex(null);
      setAnimDir(null);
    }, ANIM_MS);
  };

  const handleNext = () => {
    if (animDir) return;
    setOutIndex(index);
    setAnimDir("next");
    setIndex((i) => (i + 1) % count);
    setTimeout(() => {
      setOutIndex(null);
      setAnimDir(null);
    }, ANIM_MS);
  };

  return (
    <main className="bg-white pt-[100px] md:pt-[140px]">
      {/* Hero */}
      <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            alt="Timeless Weddings"
            className="object-cover"
            fill
            priority
            src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2000&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full">
          <div className="max-w-screen-xl mx-auto px-4 xl:px-0 py-16 md:py-24">
            <p className="text-white/90 font-serif italic text-sm md:text-base">
              Manu Maharani Resort & Spa
            </p>
            <h1 className="mt-2 text-white text-3xl md:text-5xl font-thin tracking-[0.2em] md:tracking-[0.3em] uppercase leading-tight">
              Timeless Weddings
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 text-sm md:text-base">
              Making your wedding dreams come true with curated venues, crafted
              rituals and warm hospitality.
            </p>
            <div className="mt-8">
              <a
                className="inline-block bg-[#2b2b2b] text-[#f4efe8] px-6 py-3 text-xs md:text-sm tracking-widest uppercase"
                href="#plan"
              >
                Plan Your Dream Wedding
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Weddings */}
      <section className="w-full py-16 md:py-24" id="wedding-destination">
        <div className="max-w-screen-xl mx-auto px-4 xl:px-0">
          {/* Heading + description to match reference */}
          <div className="mb-8 md:mb-12 grid grid-cols-1 lg:grid-cols-[auto_1fr] items-start gap-6">
            <div className="flex items-center gap-4">
              <div className="h-px bg-black/20 w-16" />
              <h2 className="text-2xl md:text-4xl font-thin tracking-[0.08em] uppercase">
                Destination Weddings Redefined
              </h2>
            </div>
            <p className="text-sm md:text-base font-serif text-[#2b2b2b]/80 lg:pl-8">
              Your very own fairy tale comes alive with exquisite settings from
              majestic palaces, pristine beaches and secluded retreats amidst
              snow‑capped peaks and meandering rivers.
            </p>
          </div>
        </div>

        {/* Full-bleed carousel: only center slides; sides show titles */}
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-y-0 gap-x-6 md:gap-x-10 items-stretch">
            {/* Left panel (Prev) */}
            <button
              aria-label="Previous destination"
              className="relative border border-[#b68833]/40 bg-gradient-to-b from-rose-50 to-white p-6 md:p-8 text-left hidden lg:flex flex-col justify-between transition-transform duration-200 active:scale-[0.98]"
              onClick={handlePrev}
              type="button"
            >
              <div />
              <div>
                <span className="text-xs tracking-widest uppercase block text-[#2b2b2b]/70">
                  {destinations[(index + count - 1) % count]!.title}
                </span>
              </div>
              <div className="flex items-center justify-start">
                <span className="w-12 h-12 rounded-full border border-[#b68833] text-[#b68833] flex items-center justify-center text-xl transition-colors duration-200 hover:bg-[#b68833] hover:text-white">
                  ‹
                </span>
              </div>
            </button>

            {/* Center - animated image and details */}
            <div className="bg-white">
              <div className="relative w-full overflow-hidden">
                {outIndex !== null && animDir ? (
                  <>
                    <div
                      className={`absolute inset-0 ${
                        animDir === "next"
                          ? "animate-wedding-out-left"
                          : "animate-wedding-out-right"
                      }`}
                    >
                      <div className="relative w-full aspect-[16/9]">
                        <Image
                          alt={destinations[outIndex]!.title}
                          className="object-cover"
                          fill
                          src={destinations[outIndex]!.image}
                        />
                      </div>
                    </div>
                    <div
                      className={
                        animDir === "next"
                          ? "animate-wedding-in-right"
                          : "animate-wedding-in-left"
                      }
                    >
                      <div className="relative w-full aspect-[16/9]">
                        <Image
                          alt={destinations[index]!.title}
                          className="object-cover"
                          fill
                          src={destinations[index]!.image}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      alt={destinations[index]!.title}
                      className="object-cover"
                      fill
                      src={destinations[index]!.image}
                    />
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8 text-center">
                <h3 className="tracking-widest uppercase font-thin text-base md:text-lg">
                  {destinations[index]!.title}
                </h3>
                <p
                  className={`mt-3 md:mt-4 text-sm md:text-base font-serif text-[#2b2b2b]/80 max-w-3xl mx-auto ${
                    animDir
                      ? animDir === "next"
                        ? "animate-wedding-in-right"
                        : "animate-wedding-in-left"
                      : ""
                  }`}
                >
                  {destinations[index]!.blurb}
                </p>
              </div>
            </div>

            {/* Right panel (Next) */}
            <button
              aria-label="Next destination"
              className="relative border border-[#b68833]/40 bg-gradient-to-b from-rose-50 to-white p-6 md:p-8 text-right hidden lg:flex flex-col justify-between transition-transform duration-200 active:scale-[0.98]"
              onClick={handleNext}
              type="button"
            >
              <div />
              <div>
                <span className="text-xs tracking-widest uppercase block text-[#2b2b2b]/70">
                  {destinations[(index + 1) % count]!.title}
                </span>
              </div>
              <div className="flex items-center justify-end">
                <span className="w-12 h-12 rounded-full border border-[#b68833] text-[#b68833] flex items-center justify-center text-xl transition-colors duration-200 hover:bg-[#b68833] hover:text-white">
                  ›
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Wedding Festivities */}
      <section className="w-full" id="festivities">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-thin tracking-[0.08em] uppercase">
            Wedding Festivities
          </h2>
        </div>
        <WeddingFestivities initialIndex={2} items={festivities} />
      </section>

      {/* Editorial/press style wedding grid */}
      <WeddingAiManuMaharani />

      {/* CTA */}
      <section className="w-full py-16 md:py-24" id="plan">
        <div className="max-w-screen-xl mx-auto px-4 xl:px-0">
          <div className="bg-[#000000] text-[#b68833] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl tracking-widest uppercase font-thin">
                Plan Your Activities
              </h3>
              <p className="mt-2 text-xs md:text-sm font-serif text-white/80">
                Speak to our wedding specialists to craft a bespoke celebration.
              </p>
            </div>
            <a
              className="bg-[#f4efe8] text-[#2b2b2b] px-6 py-3 text-xs md:text-sm tracking-widest uppercase"
              href="#contact"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
