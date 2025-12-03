"use client";

import { useState } from 'react';

interface PropertyCancellationPolicyProps {
  policyText: string;
  fullPolicyText?: string;
}

export function PropertyCancellationPolicy({
  policyText,
  fullPolicyText,
}: PropertyCancellationPolicyProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="mb-10" id="cancellation-policy">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-8 w-1 rounded bg-[#c9a96d]" />
        <h2 className="text-2xl font-serif font-bold">Cancellation Policy</h2>
      </div>

      <p className="mb-4 leading-relaxed text-gray-700">
        {isExpanded && fullPolicyText ? fullPolicyText : policyText}
      </p>

      {fullPolicyText && (
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
