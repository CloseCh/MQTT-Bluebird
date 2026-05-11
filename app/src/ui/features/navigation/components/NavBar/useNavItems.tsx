import { useNavigationStore } from '@/features/navigation/stores/navigationStore';
import { NAV_ITEMS_CONFIG } from '../../constants/navbarConstants';
import type { NavItem } from '../../types/navigation.types';

export function useNavItems(): NavItem[] {
  const { openedSidebar, openSidebar, tableConfig, handleChangeTable } = useNavigationStore();

  return NAV_ITEMS_CONFIG.map(item => {
    const isTableItem = item.overlayId.startsWith('table/');
    return {
      ...item,
      selected: isTableItem ? item.overlayId === tableConfig : item.overlayId === openedSidebar,
      onClick: () => isTableItem ? handleChangeTable(item.overlayId) : openSidebar(item.overlayId),
    };
  });
}