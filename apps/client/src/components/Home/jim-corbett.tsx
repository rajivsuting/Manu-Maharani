import Image from "next/image";

export default function JimCorbett() {
  return (
    <section className="w-full bg-[#000000] py-24 flex justify-center items-center">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col md:flex-row items-center justify-between px-6 gap-12">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl">
          <h2
            className="text-3xl md:text-4xl font-serif tracking-widest text-[#b68833] mb-8"
            style={{ fontFamily: "serif" }}
          >
            JIM CORBETT NATIONAL PARK
          </h2>
          <p className="text-white/90 text-lg mb-8">
            India&apos;s first national park and still one of its most iconic,
            Corbett is a living, breathing wilderness. Spanning over 1,300
            square kilometres, its terrain ranges from dense forests to open
            grasslands and winding riverbeds, home to over 600 species of birds,
            elephants, leopards, and the elusive tiger. Named after Edward James
            Corbett, the hunter-turned-conservationist who became the
            forest&apos;s fiercest guardian, the park offers more than just
            safaris — it&apos;s a quiet, powerful reminder of nature in its
            purest form.
          </p>
          <button className="border border-[#b68833] bg-transparent text-[#b68833] px-8 py-3 uppercase tracking-widest font-medium text-base hover:bg-white hover:text-[#000000] transition">
            Discover More
          </button>
        </div>
        {/* Right: Tiger Illustration */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            alt="Tiger Illustration"
            className="max-w-sm w-full h-auto object-contain"
            height={400}
            src="/tiger.png"
            style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.2))" }}
            width={400}
          />
        </div>
      </div>
    </section>
  );
}
