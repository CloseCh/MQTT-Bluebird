import { createContext, useContext, type ReactNode } from "react";
import type { NavigationContextValue } from "../types/navigation.types";
import navigationService from "../service/navigationService";

const navigationContext = createContext<NavigationContextValue | null>(null);

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({children}: NavigationProviderProps) {
  const navigation = navigationService();

  return (
    <navigationContext.Provider value={navigation}>
      {children}
    </navigationContext.Provider>
  );
}

export function useNavigationContext(): NavigationContextValue {
  const ctx = useContext(navigationContext);
  if (!ctx) {
    throw new Error('useNavigationContext debe usarse dentro de <NavigationProvider>');
  } 
  return ctx;
}