export const HomeHeroSection = () => {
  return (
    <section
      className="relative flex-1 flex items-end min-h-screen pt-[100px] md:pt-[140px] pb-0"
      id="hero"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          className="w-full h-full object-cover object-center"
          loop
          muted
          playsInline
          poster="https://www.fourseasons.com/alt/img-opt/~70.1530.0,0000-0,0000-1536,0000-864,0000/publish/content/dam/fourseasons/images/web/BSA/BSA_1200x800.jpg"
        >
          <source src="https://ik.imagekit.io/teggaadfo/manu%20-%201080WebShareName.mov/ik-video.mp4?updatedAt=1760112353814" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full px-4 md:px-8 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl animate-fadeInUp gap-y-8">
            <p className="text-base md:text-lg font-serif italic text-white/90">
              Manu Maharani Resort & Spa
            </p>
            <h1 className="text-2xl md:text-4xl font-thin tracking-[0.2em] md:tracking-[0.3em] uppercase text-white leading-tight pt-2 pb-4 md:pb-6">
              Your best bet in Corbett
            </h1>
            <div>
              <div className="space-y-2 mb-2 text-base md:text-lg tracking-wider">
                <p className="text-white/90 text-xs md:text-sm">
                  Village Dhikuli Ramnagar, Dhikuli, Jim Corbett National Park
                  244715 India
                </p>
              </div>
              <div className="flex gap-2 md:gap-4 flex-wrap">
                <button className="text-white text-xs font-bold h-5 tracking-widest hover:text-white/50 transition border-b-1 border-white">
                  +91 – 9971889911
                </button>
                <button className="text-white text-xs font-bold h-5 tracking-widest hover:text-white/50 transition border-b-1 border-white">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Shortcuts */}
      {/* <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
    <div className="flex gap-4">
      {[
        { label: "Location", icon: "📍" },
        { label: "Accommodations", icon: "🏠" },
        { label: "Photos & Videos", icon: "📷" },
        { label: "Facilities & Amenities", icon: "🏊" },
        { label: "Dining", icon: "🍽️" },
        { label: "Spa", icon: "🧘" },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-black/70 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-4 flex flex-col items-center gap-2 min-w-[120px] text-white shadow-xl hover:bg-black/80 transition cursor-pointer"
        >
          <div className="text-2xl mb-1">{item.icon}</div>
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-center leading-tight">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </div> */}

      {/* Pause/Play Button */}
      {/* <button
        aria-label={paused ? "Play video" : "Pause video"}
        className="absolute bottom-8 right-8 z-20 bg-black/60 hover:bg-black/80 border-2 border-white rounded-full w-5 aspect-square flex items-center justify-center text-white shadow-xl transition backdrop-blur-sm"
        onClick={handlePausePlay}
      >
        {paused ? (
          <PlayIcon className="w-3 h-3" />
        ) : (
          <PauseIcon className="w-3 h-3" />
        )}
      </button> */}
      {/* Bottom Divider Line */}
      <div className="absolute left-0 right-0" style={{ bottom: "80px" }}>
        <div className="h-0.5 bg-white/40 w-full z-20 relative" />
      </div>
      {/* Vertical Dividers */}
      {[1, 2, 3, 4].map((i) => (
        <div
          className="absolute bg-white/40 w-0.5 z-20"
          key={i}
          style={{
            bottom: 0,
            height: `calc(80px)`,
            left: `${i * 20}%`,
            top: `calc(100vh - 80px)`,
          }}
        />
      ))}
      {/* Booking Form in 5-part grid below divider */}
      <div
        className="absolute left-0 right-0 flex justify-between items-end px-4"
        style={{ bottom: 0, height: "80px", pointerEvents: "none" }}
      >
        {/* 1st box (empty) */}
        <div className="flex-1" />
        {/* 2nd box: Check In */}
        <div className="flex-1 flex items-center justify-center h-full">
          <label className="text-sm text-white/80" htmlFor="checkin">
            Check In
          </label>
        </div>
        {/* 3rd box: Check Out */}
        <div className="flex-1 flex items-center justify-center h-full">
          <label className="text-sm text-white/80" htmlFor="checkout">
            Check Out
          </label>
        </div>
        {/* 4th box: Book Now */}
        <div className="flex-1 flex items-center justify-center h-full">
          <label className="text-sm text-white/80" htmlFor="checkout">
            Book Now
          </label>
        </div>
        {/* 5th box (empty) */}
        <div className="flex-1" />
      </div>
    </section>
  );
};
