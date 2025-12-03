import Image from "next/image";

export default function WeddingAiManuMaharani() {
  return (
    <section className="w-full py-24 ">
      <div className="w-full px-0">
        <h2
          className="text-3xl md:text-4xl font-thin tracking-widest text-center mb-12 uppercase"
          style={{ color: "#000000" }}
        >
          Wedding at Manu Maharani
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-auto">
          {/* Card 1 */}
          <div className="flex flex-col h-full bg-white overflow-hidden">
            <Image
              alt="Wedding 1"
              className="w-full h-80 object-cover object-center"
              height={400}
              src="https://images.unsplash.com/flagged/photo-1572534779127-b64758946728?auto=format&fit=crop&w=600&q=80"
              width={600}
            />
            <div className="bg-[#000000] text-[#b68833] text-center py-3 text-lg font-serif tracking-widest flex flex-col items-center justify-center">
              <span className="text-xs font-sans tracking-normal mb-1">
                ELLE x
              </span>
              <span className="text-base font-serif">MANU MAHARANI</span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col h-full bg-white overflow-hidden">
            <Image
              alt="Wedding 2"
              className="w-full h-80 object-cover object-center"
              height={400}
              src="https://images.unsplash.com/photo-1587271636175-90d58cdad458?auto=format&fit=crop&w=600&q=80"
              width={600}
            />
            <div className="bg-[#000000] text-[#b68833] text-center py-3 text-lg font-serif tracking-widest flex flex-col items-center justify-center">
              <span className="text-xs font-sans tracking-normal mb-1">
                BRIDES x
              </span>
              <span className="text-base font-serif">MANU MAHARANI</span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col h-full bg-white overflow-hidden">
            <Image
              alt="Wedding 3"
              className="w-full h-80 object-cover object-center"
              height={400}
              src="https://www.manumaharaniresorts.com/wp-content/uploads/2024/04/romantic-getaway-1.webp"
              width={600}
            />
            <div className="bg-[#000000] text-[#b68833] text-center py-3 text-lg font-serif tracking-widest flex flex-col items-center justify-center">
              <span className="text-xs font-sans tracking-normal mb-1">
                TRAVEL+LEISURE x
              </span>
              <span className="text-base font-serif">MANU MAHARANI</span>
            </div>
          </div>
          {/* Card 4 */}
          <div className="flex flex-col h-full bg-white overflow-hidden">
            <Image
              alt="Wedding 4"
              className="w-full h-80 object-cover object-center"
              height={400}
              src="https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=600&q=80"
              width={600}
            />
            <div className="bg-[#000000] text-[#b68833] text-center py-3 text-lg font-serif tracking-widest flex flex-col items-center justify-center">
              <span className="text-xs font-sans tracking-normal mb-1">
                VOGUE x
              </span>
              <span className="text-base font-serif">MANU MAHARANI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
