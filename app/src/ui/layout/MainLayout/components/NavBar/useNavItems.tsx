import { useLocation, useNavigate } from 'react-router';

import { useNavigationStore } from '@/stores/navigationStore/navigationStore';
import type { NavItem } from '../../types/navigation.types';
import { NAV_ITEMS_CONFIG, ROUTES } from '@/stores/navigationStore/navigationStore.constant';

export function useNavItems(): NavItem[] {
  const navigate = useNavigate();
  const location = useLocation();
  const { openedSidebar, openSidebar } = useNavigationStore();

  return NAV_ITEMS_CONFIG.map(item => {
    const isSidebarItem = item.route === ROUTES.MAIN;
    const onMainPage = location.pathname === ROUTES.MAIN;

    const selected = isSidebarItem
      ? onMainPage && item.overlayId === openedSidebar
      : location.pathname === item.route;

    return {
      ...item,
      selected,
      onClick: () => {
        if (isSidebarItem) {
          if (onMainPage) {
            // Ya en la página principal: alterna el sidebar correspondiente.
            openSidebar(item.overlayId);
          } else {
            // Desde otra página: navega y asegura que el sidebar quede abierto.
            void navigate(ROUTES.MAIN);
            if (openedSidebar !== item.overlayId) openSidebar(item.overlayId);
          }
        } else if (location.pathname !== item.route) {
          void navigate(item.route);
        }
      },
    };
  });
}
