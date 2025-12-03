export default function AboutSection() {
  return (
    <section className="w-full mb-10 flex justify-center items-center">
      <div
        className="max-w-screen-xl mx-auto bg-gray-50 text-gray-800 py-24 flex flex-col justify-center items-center bg-cover bg-center relative"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
        <div className="text-center px-16 relative z-10">
          <h2 className="text-2xl md:text-4xl font-thin tracking-[0.08em] uppercase mb-10 leading-snug text-white">
            WHERE LUXURY MEETS COMFORT
          </h2>
          <p className="text-sm md:text-base font-serif text-gray-200 leading-relaxed">
            Nestled between the two primary Jim Corbett National Park entry
            gates of Bijrani and Dhikala, Manu Maharani Resort & Spa is the best
            place to stay in Ramnagar. With the Kosi river flowing by and the
            Shivalik range as the backdrop, the resort offers the most luxurious
            stay in the wilderness of Corbett. Very easily reachable from Delhi,
            Jaipur, Rishikesh and other cities, the resort is close to all
            tourist hotspots in Corbett.
          </p>
          <button className="mt-8 border border-white bg-transparent text-white px-8 py-3 uppercase tracking-widest font-medium text-base hover:bg-black hover:text-[#b68833] hover:border-[#b68833] transition">
            Discover More
          </button>
        </div>
      </div>
    </section>
  );
}
