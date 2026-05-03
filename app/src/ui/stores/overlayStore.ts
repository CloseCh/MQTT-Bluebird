import { create } from "zustand";

interface OverlayStore {
  overlays: Record<string, boolean>;
  open:   (id: string) => void;
  close:  (id: string) => void;
  toggle: (id: string) => void;
  isOpen: (id: string) => boolean;
}

export const useOverlayStore = create<OverlayStore>((set, get) => ({
  overlays: {},
  open:   (id) => set(s => ({ overlays: { ...s.overlays, [id]: true  } })),
  close:  (id) => set(s => ({ overlays: { ...s.overlays, [id]: false } })),
  toggle: (id) => set(s => ({ overlays: { ...s.overlays, [id]: !s.overlays[id] } })),
  isOpen: (id) => get().overlays[id] ?? false,
}));
