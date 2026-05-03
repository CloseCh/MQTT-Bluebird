import { create } from "zustand";

interface NavigationStore {
  openedSidebar: string;
  tableConfig: string;
  openConfigModal: boolean;
  openSidebar:   (id: string) => void;
}

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  openedSidebar: "nav/subscription",
  tableConfig: "table/history",
  openConfigModal: false,
  
  openSidebar:   (id) => {
    const actual: string = get().openedSidebar ?? "";

    if (id === null || id === undefined || id === actual) {
      set({openedSidebar: ""});
    } else {
      set({openedSidebar: id});
    }
  }
}));
