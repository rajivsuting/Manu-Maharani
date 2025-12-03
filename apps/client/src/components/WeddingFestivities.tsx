"use client";
import React from "react";

import { InfiniteCenterCarousel } from "./InfiniteCenterCarousel";

export interface FestivityItem {
  description: string;
  id: string;
  image: string;
  label: string;
}

interface WeddingFestivitiesProps {
  initialIndex?: number; // kept for API symmetry (unused internally)
  items: FestivityItem[];
}

export default function WeddingFestivities({ items }: WeddingFestivitiesProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-[#f4efe8]">
      <div style={{ margin: "0 auto", maxWidth: 1100, padding: 24 }}>
        <InfiniteCenterCarousel items={items} />
      </div>
    </section>
  );
}
