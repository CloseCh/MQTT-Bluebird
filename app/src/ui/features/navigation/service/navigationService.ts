import { useCallback, useEffect, useState } from "react";
import type { NavigationContextValue } from "../types/navigation.types";

function navigationService(): NavigationContextValue {
  const [windowOpenList, setWindowOpenList] = useState<Set<string>>(new Set<string>());
  
  const handleClosedWindow = useCallback((windowId: string) => {
    setWindowOpenList(prev => {
      const newWindowOpenList = new Set<string>([...prev].filter(item => item != windowId));
      return newWindowOpenList;
    });
  }, []);

  useEffect(() => {
    window.electron.closedWindow(handleClosedWindow);
  }, []);

  const handleOpenWindow = useCallback((windowName: string) => {
    setWindowOpenList(prev => {
      prev.add(windowName);
      const newWindowOpenList = new Set<string>([...prev]);
      return newWindowOpenList;
    });

    window.electron.openWindow(windowName);
  }, []);
  
  return {
    windowOpenList,
    openWindow: handleOpenWindow,
  };
}

export default navigationService;