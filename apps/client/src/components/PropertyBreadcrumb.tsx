import Link from 'next/link';

interface BreadcrumbProps {
  items: Array<{
    href?: string;
    label: string;
  }>;
}

export function PropertyBreadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-white py-4 pt-0">
      <div className="container mx-auto px-0 md:px-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              {index > 0 && <span>/</span>}
              {item.href ? (
                <Link className="hover:text-black" href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span className="text-black">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
