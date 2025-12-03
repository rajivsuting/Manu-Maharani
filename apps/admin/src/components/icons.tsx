import {
    IconAlertTriangle, IconArrowRight, IconBrandGithub, IconBrandTwitter, IconCheck,
    IconChevronLeft, IconChevronRight, IconCommand, IconCreditCard, IconDeviceLaptop,
    IconDotsVertical, IconFile, IconFileText, IconHelpCircle, IconLayoutDashboard, IconLayoutKanban,
    IconLoader2, IconLogin, IconMoon, IconPhoto, IconPizza, IconPlus, IconSettings, IconShoppingBag,
    IconSun, IconTrash, IconUser, IconUserCircle, IconUserEdit, IconUserX, IconX
} from '@tabler/icons-react';

import type { IconProps } from "@tabler/icons-react";

export type Icon = React.ComponentType<IconProps>;

export const Icons = {
  add: IconPlus,
  arrowRight: IconArrowRight,
  billing: IconCreditCard,
  check: IconCheck,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  close: IconX,
  dashboard: IconLayoutDashboard,
  ellipsis: IconDotsVertical,
  employee: IconUserX,
  github: IconBrandGithub,
  help: IconHelpCircle,
  kanban: IconLayoutKanban,
  laptop: IconDeviceLaptop,
  login: IconLogin,
  logo: IconCommand,
  media: IconPhoto,
  moon: IconMoon,
  page: IconFile,
  pizza: IconPizza,
  post: IconFileText,
  product: IconShoppingBag,
  settings: IconSettings,
  spinner: IconLoader2,
  sun: IconSun,
  trash: IconTrash,
  twitter: IconBrandTwitter,
  user: IconUser,
  user2: IconUserCircle,
  userPen: IconUserEdit,
  warning: IconAlertTriangle,
} as const;
