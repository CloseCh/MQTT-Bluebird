import { create } from 'zustand';

interface NavigationStore {
  openedSidebar: string;
  settingsOpen: boolean;
  monitorOpen: boolean;
  openSidebar:    (id: string) => void;
  toggleSettings: () => void;
  closeSettings:  () => void;
}

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  openedSidebar: 'nav/subscription',
  settingsOpen: false,
  monitorOpen: false,

  openSidebar: (id) => {
    const actual: string = get().openedSidebar ?? '';

    if (id === null || id === undefined || id === actual) {
      set({ openedSidebar: '' });
    } else {
      set({ openedSidebar: id });
    }
  },

  toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
  closeSettings:  () => set({ settingsOpen: false }),
}));
