interface Amenity {
  icon: string;
  name: string;
}

interface PropertyAmenitiesProps {
  amenities: Amenity[];
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  return (
    <section className="mb-10" id="amenities">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-8 w-1 rounded bg-[#c9a96d]" />
        <h2 className="text-2xl font-serif font-bold">Amenities</h2>
      </div>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {amenities.map((amenity) => (
          <div
            className="flex flex-col items-center text-center"
            key={amenity.name}
          >
            <div className="mb-3 text-5xl">{amenity.icon}</div>
            <div className="text-base font-medium">{amenity.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
