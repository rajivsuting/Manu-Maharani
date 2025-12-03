"use client";

interface PropertyEnquiryFormProps {
  gstIncludedPrice: string;
  perNightPrice: string;
  securityDeposit: string;
}

export function PropertyEnquiryForm({
  gstIncludedPrice,
  perNightPrice,
  securityDeposit,
}: PropertyEnquiryFormProps) {
  return (
    <>
      {/* Pricing Card */}
      <div className="rounded-xl space-y-6 bg-white p-6 shadow-sm">
        <div className="mb-2 text-sm text-gray-600">Starts from</div>
        <div className="mb-1 text-4xl font-bold">{perNightPrice}</div>
        <div className="mb-4 text-sm text-gray-600">
          Per night excluding taxes*
        </div>
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-bold">Total Price:</span>
            {gstIncludedPrice}(Incl. 18% GST)
          </div>
          <div>
            <span className="font-bold">{securityDeposit}</span> Security
            Deposit
          </div>
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="sticky space-y-6 mt-6 top-[146px] md:top-[136px] rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-6 w-1 rounded bg-[#c9a96d]" />
          <h3 className="text-xl font-serif font-bold">Enquire now</h3>
        </div>

        <form className="space-y-4">
          {/* Full Name */}
          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            placeholder="Full Name*"
            type="text"
          />

          {/* Phone and Email */}
          <div className="grid grid-cols-2 gap-4">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Phone*"
              type="tel"
            />
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Email*"
              type="email"
            />
          </div>

          {/* Check In and Check Out */}
          <div className="grid grid-cols-2 gap-4">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Check In*"
              type="date"
            />
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Check Out*"
              type="date"
            />
          </div>

          {/* Adults and Children */}
          <div className="grid grid-cols-2 gap-4">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              min="1"
              placeholder="No of Adults"
              type="number"
            />
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              min="0"
              placeholder="No of Children"
              type="number"
            />
          </div>

          {/* reCAPTCHA */}
          <div className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 p-3 text-xs text-white">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span>protected by reCAPTCHA</span>
          </div>

          {/* Submit Button */}
          <button
            className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 font-medium text-white transition hover:bg-black/80"
            type="button"
          >
            Submit
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
