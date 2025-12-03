"use client";

import { useState } from 'react';

interface PropertyHouseRulesProps {
  rulesText: string;
  fullRulesText?: string;
}

export function PropertyHouseRules({
  rulesText,
  fullRulesText,
}: PropertyHouseRulesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="mb-10" id="house-rules">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-8 w-1 rounded bg-[#c9a96d]" />
        <h2 className="text-2xl font-serif font-bold">House Rules</h2>
      </div>

      <p className="mb-4 leading-relaxed text-gray-700">
        {isExpanded && fullRulesText ? fullRulesText : rulesText}
      </p>

      {fullRulesText && (
        <button
          className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium transition hover:bg-gray-50"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </section>
  );
}
