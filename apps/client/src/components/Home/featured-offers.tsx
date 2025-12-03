import Image from "next/image";
import React from "react";

const offers = [
  {
    image:
      "https://images.unsplash.com/photo-1710330758934-865ce4e4f298?auto=format&fit=crop&w=600&q=80",
    link: "#",
    subtitle:
      "Our big-sized swimming pool, conveniently located in an adjacent clubhouse",
    title: "Outdoor Swimming Pool",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1664193968850-ee8f7ca24e6d?auto=format&fit=crop&w=600&q=80",
    link: "#",
    subtitle:
      "Upgrading your bandwidth is easy, and it can be done right from your phone.",
    title: "Work From Anywhere",
  },
  {
    image:
      "https://images.unsplash.com/photo-1596997000103-e597b3ca50df?auto=format&fit=crop&w=600&q=80",
    link: "#",
    subtitle:
      "An indoor & outdoor playground with slides, climbers and swings.",
    title: "Kids’ Playground",
  },
  {
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80",
    link: "#",
    subtitle: "Please consider your private parking or better yet.",
    title: "Parking Space",
  },
];
export default function FeaturedOffers() {
  return (
    <section className="w-full flex flex-col items-center py-10 md:py-20">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center md:justify-between mb-8 md:mb-12 px-2 md:px-0 gap-4 md:gap-0">
        <h2
          className="text-lg md:text-3xl font-light tracking-widest uppercase"
          style={{ color: "#000000" }}
        >
          Featured Offers
        </h2>
        <a
          className="text-black text-xs md:text-sm font-semibold tracking-widest border-b-2 border-black pb-1 hover:text-gray-600 transition-all uppercase"
          href="#"
        >
          All Offers
        </a>
      </div>
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 px-2 md:px-0">
        {offers.map((offer, idx) => (
          <div
            className="relative group overflow-hidden shadow-lg min-h-[260px] md:min-h-[400px] flex flex-col justify-end rounded-lg"
            key={idx}
          >
            <Image
              alt={offer.title}
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              fill
              src={offer.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="relative z-20 p-3 md:p-4 flex flex-col gap-2">
              <h3 className="text-white text-base md:text-sm font-bold tracking-widest mb-2 uppercase leading-tight">
                {offer.title}
              </h3>
              {offer.subtitle && (
                <p className="text-white/80 text-xs md:text-sm mb-2">
                  {offer.subtitle}
                </p>
              )}
              <a
                className="text-white text-xs md:text-[0.5rem] font-semibold tracking-widest border-white pb-1 hover:text-white/70 transition-all uppercase"
                href={offer.link}
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
