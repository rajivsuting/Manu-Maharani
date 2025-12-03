import type { NavItem } from "@/types";

export type Product = {
  category: string;
  created_at: string;
  description: string;
  id: number;
  name: string;
  photo_url: string;
  price: number;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    icon: "dashboard",
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
    shortcut: ["d", "d"],
    title: "Dashboard",
    url: "/dashboard/overview",
  },
  {
    icon: "product",
    isActive: false,
    items: [], // No child items
    shortcut: ["p", "p"],
    title: "Product",
    url: "/dashboard/product",
  },
  {
    icon: "billing",
    isActive: true,
    title: "Account",
    url: "#", // Placeholder as there is no direct link for the parent

    items: [
      {
        icon: "userPen",
        shortcut: ["m", "m"],
        title: "Profile",
        url: "/dashboard/profile",
      },
      {
        icon: "login",
        shortcut: ["l", "l"],
        title: "Login",
        url: "/",
      },
    ],
  },
  {
    icon: "kanban",
    isActive: false,
    items: [], // No child items
    shortcut: ["k", "k"],
    title: "Kanban",
    url: "/dashboard/kanban",
  },
] as const;

export interface SaleUser {
  amount: string;
  email: string;
  id: number;
  image: string;
  initials: string;
  name: string;
}

export const recentSalesData: SaleUser[] = [
  {
    amount: "+$1,999.00",
    email: "olivia.martin@email.com",
    id: 1,
    image: "https://api.slingacademy.com/public/sample-users/1.png",
    initials: "OM",
    name: "Olivia Martin",
  },
  {
    amount: "+$39.00",
    email: "jackson.lee@email.com",
    id: 2,
    image: "https://api.slingacademy.com/public/sample-users/2.png",
    initials: "JL",
    name: "Jackson Lee",
  },
  {
    amount: "+$299.00",
    email: "isabella.nguyen@email.com",
    id: 3,
    image: "https://api.slingacademy.com/public/sample-users/3.png",
    initials: "IN",
    name: "Isabella Nguyen",
  },
  {
    amount: "+$99.00",
    email: "will@email.com",
    id: 4,
    image: "https://api.slingacademy.com/public/sample-users/4.png",
    initials: "WK",
    name: "William Kim",
  },
  {
    amount: "+$39.00",
    email: "sofia.davis@email.com",
    id: 5,
    image: "https://api.slingacademy.com/public/sample-users/5.png",
    initials: "SD",
    name: "Sofia Davis",
  },
];
