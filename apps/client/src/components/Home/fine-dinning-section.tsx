import Image from "next/image";

export default function FineDiningSection() {
  return (
    <section className="w-full py-24">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-thin tracking-widest text-center mb-12 uppercase"
          style={{ color: "#000000" }}
        >
          Fine Dining
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Dasos */}
          <div className="relative group rounded-lg overflow-hidden">
            <Image
              alt="Dasos"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              height={600}
              src="https://www.manumaharaniresorts.com/wp-content/uploads/2022/10/pexels-pixabay-533325-scaled-1024x654.jpg"
              width={800}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
              <h3 className="text-2xl font-serif text-white mb-2">
                Dasos, River Side Dining
              </h3>
              <p className="text-white/80 mb-4">All Day / night Menu</p>
              <button className="border border-white px-4 py-2 text-white uppercase tracking-widest font-medium text-xs hover:bg-white hover:text-black transition w-max">
                View More
              </button>
            </div>
          </div>
          {/* Gurney&apos;s Grill */}
          <div className="relative group rounded-lg overflow-hidden">
            <Image
              alt="Gurney's Grill"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              height={600}
              src="https://www.manumaharaniresorts.com/wp-content/uploads/2022/09/DSC_9880-scaled-2048x1366.jpg"
              width={800}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
              <h3 className="text-2xl font-serif text-white mb-2">
                Gurney&apos;s Grill
              </h3>
              <p className="text-white/80 mb-4">Timing: 7 p.m - 10 p.m</p>
              <button className="border border-white px-4 py-2 text-white uppercase tracking-widest font-medium text-xs hover:bg-white hover:text-black transition w-max">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
