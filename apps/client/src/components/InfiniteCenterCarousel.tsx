"use client";
import { AnimatePresence, motion, useSpring } from "framer-motion";
// InfiniteCenterCarousel.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

// --------- Helpers
const mod = (n: number, m: number) => ((n % m) + m) % m;

export type Item = {
  description: string; // text shown under the hero
  id: string;
  image: string; // put your local/remote image paths here
  label: string;
};

type Props = {
  className?: string;
  gap?: number; // px
  items: Item[];
  itemWidth?: number; // px
};

export function InfiniteCenterCarousel({
  className = "",
  gap = 0,
  items,
  itemWidth = 0,
}: Props) {
  const N = items.length;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerW, setContainerW] = useState(0);
  const [active, setActive] = useState(0); // 0..N-1
  const reservedPadding = 120;
  const computedW = Math.max(
    160,
    Math.floor(Math.max(0, containerW - reservedPadding) / 5)
  );
  const width = itemWidth && itemWidth > 0 ? itemWidth : computedW;
  const STRIDE = width + gap;

  // 3 copies (prev, current, next) so the active can always appear in the "middle" copy.
  const extended = useMemo(
    () =>
      [0, 1, 2].flatMap((copy) =>
        items.map((it, idx) => ({
          ...it,
          _gid: `${copy}:${idx}`, // global id for rendering
        }))
      ),
    [items]
  );

  // middle copy index for active item
  const baseIndex = N + active; // points into the extended array

  // Measure container width responsively
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerW(entry.contentRect.width);
      }
    });
    ro.observe(el);
    setContainerW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // Compute target X so that the active card's center aligns with container center
  const centerOffset = containerW / 2 - width / 2;
  const targetX = centerOffset - baseIndex * STRIDE;

  // Spring animation for x
  const x = useSpring(targetX, { damping: 28, mass: 1.1, stiffness: 220 });
  useEffect(() => {
    x.set(targetX);
  }, [targetX, x]);

  const goPrev = () => setActive((a) => mod(a - 1, N));
  const goNext = () => setActive((a) => mod(a + 1, N));

  const defaultItem: Item = {
    description: "",
    id: "placeholder",
    image: "",
    label: "",
  };
  const activeItem: Item = (N ? items[active % N] : defaultItem) as Item;

  return (
    <div className={`w-full ${className}`}>
      {/* Top strip */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
          <button
            aria-label="Previous"
            onClick={goPrev}
            style={{
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #c9a961",
              borderRadius: "50%",
              color: "#c9a961",
              cursor: "pointer",
              display: "flex",
              fontSize: "28px",
              height: "56px",
              justifyContent: "center",
              transition: "all 0.2s ease",
              width: "56px",
            }}
          >
            ‹
          </button>
        </div>

        <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <button
            aria-label="Next"
            onClick={goNext}
            style={{
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #c9a961",
              borderRadius: "50%",
              color: "#c9a961",
              cursor: "pointer",
              display: "flex",
              fontSize: "28px",
              height: "56px",
              justifyContent: "center",
              transition: "all 0.2s ease",
              width: "56px",
            }}
          >
            ›
          </button>
        </div>

        <div
          className="overflow-hidden"
          ref={containerRef}
          style={{
            background:
              "linear-gradient(180deg, rgba(255,240,235,1) 0%, rgba(255,250,248,1) 100%)",
            padding: "32px 60px",
          }}
        >
          <motion.div
            style={{
              alignItems: "center",
              display: "flex",
              gap,
              willChange: "transform",
              x,
            }}
          >
            {extended.map((it, gi) => {
              const distance = Math.abs(gi - baseIndex);
              const isActive = gi === baseIndex;
              const scale = isActive ? 1 : 1;
              const opacity = isActive ? 1 : distance === 1 ? 0.6 : 0.4;

              return (
                <motion.button
                  animate={{ opacity, scale }}
                  key={it._gid}
                  onClick={() => setActive(mod(gi - N, N))}
                  style={{
                    background: "transparent",
                    border: "none",
                    borderLeft:
                      gi % N !== 0 ? "1px solid rgba(0,0,0,0.12)" : "none",
                    borderRadius: 0,
                    cursor: "pointer",
                    flexShrink: 0,
                    padding: "20px 16px",
                    position: "relative",
                    transformOrigin: "50% 50%",
                    width,
                  }}
                  transition={{ damping: 28, stiffness: 220, type: "spring" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHighlight"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,235,215,0.5) 0%, rgba(255,245,235,0.2) 100%)",
                        borderRadius: "8px",
                        bottom: 0,
                        left: 0,
                        position: "absolute",
                        right: 0,
                        top: 0,
                        zIndex: -1,
                      }}
                      transition={{
                        damping: 30,
                        stiffness: 300,
                        type: "spring",
                      }}
                    />
                  )}
                  <div
                    style={{
                      color: isActive ? "#2b2b2b" : "#6b6b6b",
                      fontFamily: "serif",
                      fontSize: isActive ? "18px" : "16px",
                      fontWeight: isActive ? 400 : 300,
                      letterSpacing: "0.08em",
                      textAlign: "center",
                      textTransform: "uppercase",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {it.label}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom hero + text */}
      <div
        style={{
          alignItems: "stretch",
          display: "grid",
          gap: 40,
          gridTemplateColumns: "1fr 1fr",
          marginTop: 48,
        }}
      >
        <div
          style={{
            background: "#f5f5f5",
            borderRadius: 0,
            minHeight: 420,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              alt={activeItem.label}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              initial={{ opacity: 0, scale: 1.05 }}
              key={activeItem.id}
              src={activeItem.image}
              style={{
                height: "100%",
                inset: 0,
                objectFit: "cover",
                position: "absolute",
                width: "100%",
              }}
              transition={{ damping: 20, stiffness: 150, type: "spring" }}
            />
          </AnimatePresence>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "24px",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              initial={{ opacity: 0, y: 12 }}
              key={activeItem.id + "-text"}
              transition={{ damping: 20, stiffness: 150, type: "spring" }}
            >
              <div
                style={{
                  color: "#2b2b2b",
                  fontFamily: "serif",
                  fontSize: "42px",
                  fontWeight: 300,
                  letterSpacing: "0.08em",
                  lineHeight: 1.2,
                  marginBottom: "20px",
                  textTransform: "uppercase",
                }}
              >
                — {activeItem.label}
              </div>
              <p
                style={{
                  color: "#5a5a5a",
                  fontSize: "16px",
                  lineHeight: 1.7,
                }}
              >
                {activeItem.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
