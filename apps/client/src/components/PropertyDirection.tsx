"use client";

import { useState } from 'react';

interface DirectionItem {
  id: string;
  title: string;
  content: string;
}

interface PropertyDirectionProps {
  coordinates: string;
  address: string;
  mapEmbedUrl?: string;
  directions: DirectionItem[];
}

export function PropertyDirection({
  address,
  coordinates,
  directions,
  mapEmbedUrl,
}: PropertyDirectionProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    directions[0]?.id || null
  );

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <section className="mb-10" id="directions">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-8 w-1 rounded bg-[#c9a96d]" />
        <h2 className="text-2xl font-serif font-bold">Direction</h2>
      </div>

      {/* Map */}
      <div className="mb-6 overflow-hidden rounded-xl">
        {mapEmbedUrl ? (
          <iframe
            allowFullScreen
            className="h-[400px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapEmbedUrl}
            title="Property Location Map"
          />
        ) : (
          <div className="flex h-[400px] w-full items-center justify-center bg-gray-200">
            <div className="text-center">
              <div className="mb-2 text-lg font-semibold">{coordinates}</div>
              <div className="text-sm text-gray-600">{address}</div>
              <a
                className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                href={`https://www.google.com/maps/search/?api=1&query=${coordinates}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                View larger map
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Directions Accordion */}
      <div className="space-y-4">
        {directions.map((direction) => (
          <div
            className="overflow-hidden rounded-lg border border-gray-200"
            key={direction.id}
          >
            <button
              className="flex w-full items-center justify-between bg-white p-4 text-left font-semibold transition hover:bg-gray-50"
              onClick={() => toggleSection(direction.id)}
            >
              <span>{direction.title}</span>
              <span className="text-2xl">
                {expandedSection === direction.id ? "−" : "+"}
              </span>
            </button>
            {expandedSection === direction.id && (
              <div className="bg-white p-4 pt-0 text-gray-700">
                {direction.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
