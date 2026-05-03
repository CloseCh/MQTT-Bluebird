import { useNavigationStore } from "@/features/navigation/stores/navigationStore";
import { NAV_ITEMS_CONFIG } from "../../constants/navbarConstants";
import type { NavItem } from "../../types/navigation.types";

export function useNavItems(): NavItem[] {
  const { openedSidebar, openSidebar } = useNavigationStore();

  const handleSidebarClick = (overlayId: string) => {
    openSidebar(overlayId);
  };

  return NAV_ITEMS_CONFIG.map(item => ({
    ...item,
    selected: item.overlayId === openedSidebar,
    onClick: () => handleSidebarClick(item.overlayId),
  }));
}