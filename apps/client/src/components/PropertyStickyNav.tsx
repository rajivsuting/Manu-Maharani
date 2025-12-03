"use client";

interface PropertyStickyNavProps {
  items: Array<{
    href: string;
    label: string;
  }>;
}

export function PropertyStickyNav({ items }: PropertyStickyNavProps) {
  return (
    <nav className="sticky top-[72px] md:top-[68px] z-30 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex gap-8 overflow-x-auto py-4 text-sm font-medium scrollbar-hide">
          {items.map((item) => (
            <a
              className="whitespace-nowrap text-black transition hover:opacity-70"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
