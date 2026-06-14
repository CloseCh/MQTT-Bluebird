import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  darkMode: boolean;
  maxMessages: number;
  setDarkMode: (darkMode: boolean) => void;
  setMaxMessages: (maxMessages: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      darkMode: false,
      maxMessages: 100,
      setDarkMode: (darkMode) => set({ darkMode }),
      setMaxMessages: (maxMessages) => set({ maxMessages }),
    }),
    { name: 'mqtt-settings' }
  )
);
