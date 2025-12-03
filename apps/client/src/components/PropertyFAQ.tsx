"use client";

import { useState } from "react";

interface FAQItem {
  answer: string;
  id: string;
  question: string;
}

interface PropertyFAQProps {
  faqs: FAQItem[];
}

export function PropertyFAQ({ faqs }: PropertyFAQProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<null | string>(
    faqs[0]?.id || null
  );

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <section className="mb-10" id="faqs">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-8 w-1 rounded bg-[#c9a96d]" />
        <h2 className="text-2xl font-serif font-bold">FAQs</h2>
      </div>

      <div className="space-y-0 overflow-hidden rounded-lg border border-gray-200">
        {faqs.map((faq, index) => (
          <div
            className={`${index !== 0 ? "border-t border-gray-200" : ""}`}
            key={faq.id}
          >
            <button
              className="flex w-full items-center justify-between bg-white p-4 text-left font-medium transition hover:bg-gray-50"
              onClick={() => toggleFAQ(faq.id)}
            >
              <span className="pr-4">{faq.question}</span>
              <span className="flex-shrink-0 text-2xl font-light">
                {expandedFAQ === faq.id ? "−" : "+"}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedFAQ === faq.id
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-white px-4 pb-4 text-gray-700">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
