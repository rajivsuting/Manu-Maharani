import Image from "next/image";
import React from "react";

const experiences = [
  {
    img: "https://www.manumaharaniresorts.com/wp-content/uploads/2024/04/friends-and-family-4.webp",
    title: "Family & Friends",
  },
  {
    img: "https://www.manumaharaniresorts.com/wp-content/uploads/2024/04/outdoor-trails-4-1.webp",
    title: "Wilderness Traveller",
  },
  {
    img: "https://www.manumaharaniresorts.com/wp-content/uploads/2024/04/outdoor-trails-1-1.webp",
    title: "Social or Corporate",
  },
  {
    img: "https://www.manumaharaniresorts.com/wp-content/uploads/2024/04/romantic-getaway-2.webp",
    title: "Couple Traveller",
  },
];

export const HomeExperiencesSection = () => {
  return (
    <section
      className="w-full flex flex-col items-center relative py-16 md:py-20"
      id="experiences"
      style={{
        backgroundAttachment: "fixed",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/70 z-0 pointer-events-none" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <h2 className="text-white text-center font-light tracking-wide text-2xl sm:text-4xl md:text-5xl leading-tight">
          Experience Manu
          <br className="hidden sm:block" />
          Maharani As
        </h2>

        <div className="mt-14 md:mt-8 grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center min-h-[50vh]">
          {experiences.map((item, idx) => (
            <div className="flex flex-col items-center text-center" key={idx}>
              <div className="relative h-34 w-34 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-4 ring-[#bde058] outline-[6px] outline-white">
                <Image
                  alt={item.title}
                  className="object-cover object-center"
                  fill
                  src={item.img}
                />
              </div>
              <p className="mt-5 text-white text-lg md:text-xl font-light leading-tight">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
