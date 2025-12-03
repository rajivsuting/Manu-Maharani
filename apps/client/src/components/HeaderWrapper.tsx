import Image from 'next/image';
import React from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export { HeaderWrapper } from "./HeaderWrapperClient";

// HeaderLogo - Logo with mobile menu toggle
interface HeaderLogoProps {
  alt?: string;
  className?: string;
  height?: number;
  src: string;
  subtitle?: string;
  width?: number;
}

export const HeaderLogo = ({
  alt = "Logo",
  className = "h-10 w-auto object-contain lg:h-16",
  height = 64,
  src,
  subtitle,
  width = 200,
}: HeaderLogoProps) => {
  return (
    <>
      {/* Logo container */}
      <div className="flex items-center justify-start gap-2">
        <Image
          alt={alt}
          className={className}
          height={height}
          src={src}
          width={width}
        />
      </div>

      {/* Subtitle (hidden on mobile) */}
      {subtitle && (
        <div className="hidden xl:flex ml-2 flex-1 flex-col items-start">
          <span className="text-xl tracking-widest text-white font-thin leading-none uppercase">
            {subtitle}
          </span>
        </div>
      )}
    </>
  );
};

// HeaderLink - Individual navigation link
interface HeaderLinkProps {
  children: React.ReactNode;
  href: string;
}

export const HeaderLink = ({ children, href }: HeaderLinkProps) => {
  return (
    <a
      className="text-white text-xs font-bold tracking-widest hover:text-white/50 transition-colors duration-200 leading-none pb-1 border-b-1 border-white"
      href={href}
    >
      {children}
    </a>
  );
};

// HeaderLinks - Container for navigation links (handles both desktop and mobile)
interface HeaderLinksProps {
  children: React.ReactNode;
}

export const HeaderLinks = ({ children }: HeaderLinksProps) => {
  // Convert children to array for mapping
  const childArray = React.Children.toArray(children);

  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden h-full lg:flex items-center gap-10 min-w-max">
        <nav className="flex items-center gap-8">{children}</nav>
      </div>

      {/* Mobile navigation - controlled by checkbox with animation */}
      <div className="mobile-menu lg:hidden w-full bg-black/90 px-4 pt-4 pb-8 flex-col gap-4 absolute top-full left-0">
        <nav className="flex flex-col gap-4">
          {childArray.map((child, index) => (
            <div
              className="mobile-menu-item"
              key={index}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {child}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

// HeaderActions - Container for action items (cart, user icon, etc.)
interface HeaderActionsProps {
  children: React.ReactNode;
}

export const HeaderActions = ({ children }: HeaderActionsProps) => {
  return (
    <>
      {/* Desktop actions */}
      <div className="hidden lg:flex items-center ml-8 gap-4">{children}</div>

      {/* Mobile actions - grouped with menu button */}
      <div className="flex lg:hidden items-center gap-4">
        {children}
        {/* Mobile menu toggle button - directly after actions */}
        <label className="cursor-pointer" htmlFor="mobile-menu-toggle">
          <Bars3Icon className="w-8 h-8 text-white menu-icon-open" />
          <XMarkIcon className="w-8 h-8 text-white menu-icon-close hidden" />
        </label>
      </div>
    </>
  );
};
