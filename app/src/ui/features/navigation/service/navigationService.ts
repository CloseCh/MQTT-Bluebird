import type { NavigationContextValue } from "../types/navigation.types";

function navigationService(): NavigationContextValue {
  window.electron.openWindow('')

  return {
    openWindow: pageName => window.electron.openWindow(pageName),
  };
}

export default navigationService;