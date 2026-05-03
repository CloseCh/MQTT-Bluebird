import { useOverlayStore } from "@/stores/overlayStore";
import { NAV_ITEMS_CONFIG } from "../constants/navbarConstants";
import type { NavItem } from "../types/navigation.types";

export function useNavItems(): NavItem[] {
  const { overlays, open, close } = useOverlayStore();

  const handleClick = (overlayId: string) => {
    const isOpen = overlays[overlayId] ?? false;
    NAV_ITEMS_CONFIG.forEach(item => close(item.overlayId));
    if (!isOpen) open(overlayId);
  };

  return NAV_ITEMS_CONFIG.map(item => ({
    ...item,
    selected: overlays[item.overlayId] ?? false,
    onClick: () => handleClick(item.overlayId),
  }));
}