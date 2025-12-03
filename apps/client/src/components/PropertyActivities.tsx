import Image from 'next/image';

interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: "left" | "right";
}

interface PropertyActivitiesProps {
  activities: Activity[];
}

export function PropertyActivities({ activities }: PropertyActivitiesProps) {
  return (
    <section className="mb-10" id="activities">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-8 w-1 rounded bg-[#c9a96d]" />
        <h2 className="text-2xl font-serif font-bold">What Can We Do Here?</h2>
      </div>

      <div className="space-y-8">
        {activities.map((activity, index) => {
          const imageOnLeft =
            activity.imagePosition === "left" || index % 2 === 0;

          return (
            <div
              className="flex flex-col gap-6 md:flex-row md:items-center"
              key={activity.id}
            >
              {/* Image */}
              <div
                className={`md:w-1/2 ${imageOnLeft ? "md:order-1" : "md:order-2"}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    alt={activity.title}
                    className="object-cover"
                    fill
                    src={activity.image}
                  />
                </div>
              </div>

              {/* Content */}
              <div
                className={`md:w-1/2 ${imageOnLeft ? "md:order-2 md:pl-8" : "md:order-1 md:pr-8"}`}
              >
                <h3 className="mb-3 text-xl font-bold">{activity.title}</h3>
                <p className="leading-relaxed text-gray-700">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
