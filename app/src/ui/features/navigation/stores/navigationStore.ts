import { create } from "zustand";

interface NavigationStore {
  openedSidebar: string;
  tableConfig: string;
  settingsOpen: boolean;
  openSidebar:    (id: string) => void;
  handleChangeTable: (id: string) => void;
  toggleSettings: () => void;
  closeSettings:  () => void;
}

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  openedSidebar: "nav/subscription",
  tableConfig: "table/history",
  settingsOpen: false,

  openSidebar: (id) => {
    const actual: string = get().openedSidebar ?? "";

    if (id === null || id === undefined || id === actual) {
      set({ openedSidebar: "" });
    } else {
      set({ openedSidebar: id });
    }
  },

  handleChangeTable: (id) => {
    const actual: string = get().tableConfig ?? "table/history";

    if (id === null || id === undefined || id === actual) {
      set({ tableConfig: "" });
    } else {
      set({ tableConfig: id });
    }
  },

  toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
  closeSettings:  () => set({ settingsOpen: false }),
}));
