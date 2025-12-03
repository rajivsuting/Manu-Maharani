import Link from 'next/link';

interface PropertyInfoProps {
  amenities: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
  checkIn: string;
  checkOut: string;
  description: string;
  location: string;
  maxCapacity: number;
  title: string;
}

export function PropertyInfo({
  amenities,
  checkIn,
  checkOut,
  description,
  location,
  maxCapacity,
  title,
}: PropertyInfoProps) {
  return (
    <div className="mb-8">
      {/* Title and Location */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-serif font-bold md:text-4xl">{title}</h1>
        <span className="text-gray-600">{location}</span>
        <Link
          className="ml-auto rounded-full bg-black px-5 py-2 text-sm text-white transition hover:bg-black/80"
          href="#directions"
        >
          View Location
        </Link>
      </div>

      {/* Amenities Grid */}
      <div className="mb-6 flex flex-wrap gap-4 border-b pb-6 text-sm">
        {amenities.map((amenity) => (
          <div className="flex items-center gap-2" key={amenity.label}>
            <span>{amenity.icon}</span>
            <span className="font-medium">{amenity.label}:</span>
            <span>{amenity.value}</span>
          </div>
        ))}
      </div>

      {/* Booking Info */}
      <p className="mb-4 text-sm text-gray-700">
        These are standard occupancy booking prices, subject to change
        seasonally. Extra people can be accommodated at an additional cost per
        person. Maximum guest capacity is limited to {maxCapacity}
      </p>

      {/* Check-in/out */}
      <div className="mb-6 flex items-center gap-4 border-b pb-6 text-sm">
        <div>
          <span className="font-bold">Check in:</span> {checkIn}
        </div>
        <span className="text-gray-400">|</span>
        <div>
          <span className="font-bold">Check Out:</span> {checkOut}
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="mb-2 leading-relaxed text-gray-700">{description}</p>
        <button className="text-sm text-gray-600 underline hover:text-black">
          Read more
        </button>
      </div>
    </div>
  );
}
