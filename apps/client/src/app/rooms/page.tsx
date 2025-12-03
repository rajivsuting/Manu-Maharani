import { PropertyActivities } from "@/components/PropertyActivities";
import { PropertyAmenities } from "@/components/PropertyAmenities";
import { PropertyBedrooms } from "@/components/PropertyBedrooms";
import { PropertyBreadcrumb } from "@/components/PropertyBreadcrumb";
import { PropertyCancellationPolicy } from "@/components/PropertyCancellationPolicy";
import { PropertyDirection } from "@/components/PropertyDirection";
import { PropertyEnquiryForm } from "@/components/PropertyEnquiryForm";
import { PropertyFAQ } from "@/components/PropertyFAQ";
import { PropertyHeroGallery } from "@/components/PropertyHeroGallery";
import { PropertyHouseRules } from "@/components/PropertyHouseRules";
import { PropertyInfo } from "@/components/PropertyInfo";
import { PropertyMeals } from "@/components/PropertyMeals";
import { PropertyQuickNotes } from "@/components/PropertyQuickNotes";
import { PropertyRealMoments } from "@/components/PropertyRealMoments";
import { PropertyStickyNav } from "@/components/PropertyStickyNav";

export default function Page() {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/lonavala", label: "Lonavala" },
    { label: "Maison Bellevue" },
  ];

  const navItems = [
    { href: "#overview", label: "Overview" },
    { href: "#meals", label: "Meals" },
    { href: "#amenities", label: "Amenities" },
    { href: "#real-moments", label: "Real Moments" },
    { href: "#cancellation-policy", label: "Cancellation Policy" },
    { href: "#house-rules", label: "House Rules" },
    { href: "#reviews", label: "Reviews" },
  ];

  const heroImage = "/tiger.png";
  const galleryImages = [
    "/tiger.png",
    "/tiger.png",
    "/tiger.png",
    "/tiger.png",
  ];

  const propertyAmenities = [
    { icon: "👥", label: "Guests", value: "12" },
    { icon: "🛏️", label: "Bedrooms", value: "6" },
    { icon: "🛁", label: "Bathrooms", value: "6" },
    { icon: "🏊", label: "Pool", value: "1" },
  ];

  const bedrooms = [
    { id: 1, image: "/tiger.png", name: "Bedroom 1" },
    { id: 2, image: "/tiger.png", name: "Bedroom 2" },
    { id: 3, image: "/tiger.png", name: "Bedroom 3" },
    { id: 4, image: "/tiger.png", name: "Bedroom 4" },
    { id: 5, image: "/tiger.png", name: "Bedroom 5" },
    { id: 6, image: "/tiger.png", name: "Bedroom 6" },
  ];

  const amenitiesList = [
    { icon: "🛏️", name: "Ensuite Bedroom" },
    { icon: "🚗", name: "Car Parking" },
    { icon: "👤", name: "Care Taker on Site" },
    { icon: "🔊", name: "Bluetooth speaker" },
    { icon: "🐾", name: "Pet Friendly" },
    { icon: "📶", name: "WIFI" },
    { icon: "🏊", name: "Private Pool" },
  ];

  const realMoments = [
    { alt: "Real Moment 1", id: "1", image: "/tiger.png" },
    { alt: "Real Moment 2", id: "2", image: "/tiger.png" },
    { alt: "Real Moment 3", id: "3", image: "/tiger.png" },
    { alt: "Real Moment 4", id: "4", image: "/tiger.png" },
  ];

  const directionsList = [
    {
      content: "Lonavala railway station -6km",
      id: "railway",
      title: "From Railway Station",
    },
    {
      content: "Pune Airport - 65km",
      id: "airport",
      title: "From Airport",
    },
  ];

  const activitiesList = [
    {
      description:
        "Children, elders, and pets are welcome at this lovely holiday home. Take a nice break from the routine with your loved ones and enjoy fine hospitality with us.",
      id: "1",
      image: "/tiger.png",
      imagePosition: "left" as const,
      title: "Host family getaways",
    },
    {
      description:
        "With themed interiors, wallpapers, vibrant colours and stylish corners, this villa in Lonavala makes a stunning backdrop for photoshoots.",
      id: "2",
      image: "/tiger.png",
      imagePosition: "left" as const,
      title: "Plan Your Photoshoots",
    },
    {
      description:
        "Savour smoky barbecue grills (both veg and non-veg) served fresh on the lawns. Pair them with your favourite cocktails or mocktails and enjoy a laid-back evening under the stars.",
      id: "3",
      image: "/tiger.png",
      imagePosition: "left" as const,
      title: "Have BBQ Nights",
    },
  ];

  const faqsList = [
    {
      answer:
        "Yes, Maison Bellevue is a pet-friendly holiday home. However, pet parents are requested not to allow pets in the bathrooms or on beds. Please carry pets' beds for their comfort and safety.",
      id: "1",
      question: "Is this a pet-friendly villa in Lonavala?",
    },
    {
      answer: "Yes, parking is available on site for guests.",
      id: "2",
      question: "Is there parking available on site?",
    },
    {
      answer:
        "Yes, a caretaker is available throughout your stay to assist you.",
      id: "3",
      question: "Is there a caretaker available throughout our stay?",
    },
    {
      answer:
        "Yes, the villa comes with an in-house chef to prepare delicious meals for you.",
      id: "4",
      question: "Does the villa in Lonavala come with an in-house chef?",
    },
    {
      answer:
        "No, outside food is not allowed. However, our in-house chef can prepare a variety of meals for you.",
      id: "5",
      question: "Can guests order meals from outside?",
    },
    {
      answer:
        "You can book this villa by contacting us through our website or by calling our booking team.",
      id: "6",
      question: "How can I book this private pool villa near me?",
    },
  ];

  return (
    <main className="bg-white pt-[100px] md:pt-[140px]">
      <PropertyBreadcrumb items={breadcrumbItems} />
      <PropertyHeroGallery
        galleryImages={galleryImages}
        heroImage={heroImage}
      />
      <PropertyStickyNav items={navItems} />

      {/* Main Content */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2">
              <PropertyInfo
                amenities={propertyAmenities}
                checkIn="1 PM"
                checkOut="11 AM"
                description="Bring along your furry friends for a comfortable getaway at this pet-friendly villa in Lonavala. Maison Bellevue has 6 bedrooms, each designed in a distinct style, cohesively coming together to form a beautiful holiday..."
                location="Lonavala, Maharashtra"
                maxCapacity={22}
                title="Maison Bellevue"
              />
              <PropertyBedrooms bedrooms={bedrooms} />

              <PropertyMeals />

              <PropertyAmenities amenities={amenitiesList} />

              <PropertyRealMoments moments={realMoments} />

              <PropertyCancellationPolicy policyText="Stayscape offers flexible refunds: 90% or full travel credit for cancellations 40+ days prior, 50% refund for 26–40 days, and no refunds within 25 days or peak dates." />

              <PropertyHouseRules rulesText="Stayscape ensures safe, hassle-free stays with fixed check-in/out, refundable security deposit, ID verification, no outside food or parties, restricted visitors, and strict rules on smoking, noise, and illegal activities." />

              <PropertyQuickNotes notesText="To ensure a smooth and enjoyable experience, we've listed a few key notes about the property. Please review them before your stay." />

              <PropertyDirection
                address="QG72+FCG Shilatne, Maharashtra"
                coordinates="18°45'49.3&quot;N 73°30'03.9&quot;E"
                directions={directionsList}
              />

              <PropertyActivities activities={activitiesList} />

              <PropertyFAQ faqs={faqsList} />
            </div>

            {/* Right Column - Enquiry Form */}
            <aside className="lg:col-span-1">
              <PropertyEnquiryForm
                gstIncludedPrice="₹70,800"
                perNightPrice="₹60,000"
                securityDeposit="₹15,000"
              />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
