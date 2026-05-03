import type { ReactNode } from "react";

export interface NavItem {
  id: number | string;
  label: string;
  icon: ReactNode;
  dividerAfter?: boolean;
  selected?: boolean;
  onClick: () => void;
}

export interface NavigationContextValue {
  navItems: NavItem[];
}
