"use client";
import Image from 'next/image';
import React from 'react';

export default function FineDiningPage() {
  const categories = [
    {
      blurb:
        "A distinguished roster of world-class talent that embodies culinary excellence with passion and innovation.",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1600&auto=format&fit=crop",
      title: "Celebrated Chefs",
    },
    {
      blurb:
        "A collection of restaurants recognised for unparalleled dining experiences, authentic flavours and impeccable service.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop",
      title: "Legendary Restaurants",
    },
    {
      blurb:
        "Each a testament to our culinary passion and honed over years of dedication. These recipes define our legacy.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop",
      title: "Signature Recipes",
    },
  ];

  const restaurants = [
    {
      description:
        "LOYA takes its diners on a gastronomic journey through North India's diverse landscape, blending flavours from the Himalayan foothills to the vibrant streets of Delhi.",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1600&auto=format&fit=crop",
      name: "LOYA",
    },
    {
      description:
        "From its first location at The Taj Mahal Palace, Mumbai, Golden Dragon has introduced guests to rarefied, divine experiences that transcend mere dining.",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop",
      name: "Golden Dragon",
    },
    {
      description:
        "Experience the artistry of Japanese cuisine with the finest ingredients, masterful techniques and an unwavering commitment to authenticity.",
      image:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1600&auto=format&fit=crop",
      name: "Wasabi by Morimoto",
    },
  ];

  const [activeRestaurant, setActiveRestaurant] = React.useState(0);

  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[500px] w-full overflow-hidden">
        <Image
          alt="Fine Dining at Manu Maharani"
          className="object-cover"
          fill
          priority
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-16 bg-white/60" />
              <h1 className="font-serif text-5xl font-light tracking-[0.15em] md:text-6xl lg:text-7xl">
                FINE DINING AT TAJ RESTAURANTS
              </h1>
              <div className="h-[1px] w-16 bg-white/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center xl:px-0">
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-[#2b2b2b]" />
            <h2 className="font-serif text-3xl font-light tracking-[0.15em] uppercase text-[#2b2b2b] md:text-4xl lg:text-5xl">
              FINE DINING AT TAJ RESTAURANTS
            </h2>
            <div className="h-[1px] w-16 bg-[#2b2b2b]" />
          </div>
          <p className="font-serif text-base leading-relaxed text-[#5a5a5a] md:text-lg">
            Embark on a journey of exquisite experiences for the discerning
            connoisseur, seamlessly woven together with impeccable service,
            sophisticated ambience and masterful culinary artistry.
          </p>
        </div>
      </section>

      {/* Three Categories Section */}
      <section className="w-full bg-[#f8f8f8] py-16 md:py-24">
        <div className="mx-auto max-w-screen-xl px-4 xl:px-0">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            {categories.map((category, idx) => (
              <div
                className="group cursor-pointer transition-all duration-300"
                key={idx}
              >
                <div className="relative mb-6 h-[300px] overflow-hidden md:h-[350px]">
                  <Image
                    alt={category.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    src={category.image}
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-[#2b2b2b]" />
                  <h3 className="font-serif text-xl tracking-[0.08em] uppercase md:text-2xl">
                    {category.title}
                  </h3>
                </div>
                <p className="font-serif text-sm leading-relaxed text-[#5a5a5a] md:text-base">
                  {category.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legendary Restaurant Brands Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-screen-xl px-4 xl:px-0">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-[1px] w-12 bg-[#2b2b2b]" />
                <h2 className="font-serif text-3xl font-light tracking-[0.08em] uppercase md:text-4xl lg:text-5xl">
                  Our Legendary Restaurant Brands
                </h2>
              </div>
            </div>
            <div className="flex items-center">
              <p className="font-serif text-base leading-relaxed text-[#5a5a5a] md:text-lg">
                Step into the realm of our culinary legends where a symphony of
                flavours enchants your taste buds, ambience embraces you in a
                tapestry of elegance and the genuine warmth of our service
                leaves you feeling truly indulged.
              </p>
            </div>
          </div>

          {/* Restaurant Carousel */}
          <div className="relative">
            <button
              aria-label="Previous restaurant"
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl text-[#2b2b2b] shadow-lg transition-all hover:bg-[#f8f8f8] md:left-0 md:h-12 md:w-12 md:text-2xl"
              onClick={() =>
                setActiveRestaurant(
                  (activeRestaurant - 1 + restaurants.length) %
                    restaurants.length
                )
              }
            >
              ‹
            </button>
            <button
              aria-label="Next restaurant"
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl text-[#2b2b2b] shadow-lg transition-all hover:bg-[#f8f8f8] md:right-0 md:h-12 md:w-12 md:text-2xl"
              onClick={() =>
                setActiveRestaurant((activeRestaurant + 1) % restaurants.length)
              }
            >
              ›
            </button>

            <div className="overflow-hidden px-4 md:px-12">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${activeRestaurant * 100}%)`,
                }}
              >
                {restaurants.map((restaurant, idx) => (
                  <div
                    className="w-full flex-shrink-0 px-2 md:w-1/2 md:px-4"
                    key={idx}
                  >
                    <div className="bg-white shadow-sm">
                      <div className="relative h-[300px] overflow-hidden md:h-[400px]">
                        <Image
                          alt={restaurant.name}
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          fill
                          src={restaurant.image}
                        />
                      </div>
                      <div className="p-6 md:p-8">
                        <h3 className="mb-3 font-serif text-xl font-light tracking-[0.08em] uppercase text-[#2b2b2b] md:mb-4 md:text-2xl">
                          {restaurant.name}
                        </h3>
                        <p className="mb-4 font-serif text-sm leading-relaxed text-[#5a5a5a] md:mb-6">
                          {restaurant.description}
                        </p>
                        <button className="inline-flex items-center gap-2 font-serif text-sm tracking-[0.08em] uppercase text-[#c9a961] transition-all hover:gap-3">
                          More
                          <span className="text-lg">›</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Legacy Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <Image
          alt="A Culinary Legacy"
          className="object-cover"
          fill
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-white/80" />
            <h2 className="font-serif text-3xl font-light tracking-[0.15em] uppercase text-white md:text-4xl lg:text-5xl">
              A Culinary Legacy
            </h2>
          </div>
          <p className="max-w-2xl font-serif text-base leading-relaxed text-white/90 md:text-lg">
            For over a century, we have crafted unforgettable dining experiences
            that celebrate tradition, innovation and the art of hospitality.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-[#2b2b2b] py-16 text-center md:py-20">
        <div className="mx-auto max-w-screen-xl px-4 xl:px-0">
          <h2 className="mb-6 font-serif text-3xl font-light tracking-[0.08em] uppercase text-white md:text-4xl">
            Reserve Your Table
          </h2>
          <p className="mb-8 font-serif text-base text-white/80 md:text-lg">
            Experience the pinnacle of fine dining at Manu Maharani
          </p>
          <button className="inline-block border border-[#c9a961] bg-transparent px-10 py-3 font-serif text-sm tracking-[0.08em] uppercase text-[#c9a961] transition-all hover:bg-[#c9a961] hover:text-white">
            Book Now
          </button>
        </div>
      </section>
    </main>
  );
}
