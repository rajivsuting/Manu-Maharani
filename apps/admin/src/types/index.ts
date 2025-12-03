import { Icons } from '@/components/icons';

export interface FooterItem {
  items: {
    external?: boolean;
    href: string;
    title: string;
  }[];
  title: string;
}

export type MainNavItem = NavItemWithOptionalChildren;

export interface NavItem {
  description?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  isActive?: boolean;
  items?: NavItem[];
  label?: string;
  shortcut?: [string, string];
  title: string;
  url: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export type SidebarNavItem = NavItemWithChildren;
