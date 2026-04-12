import { useState } from "react";
import type { NavigationContextValue } from "../types/navigation.types";

function navigationService(): NavigationContextValue {
  const [barOpen, setBarOpen] = useState<string>("");
  
  function handleItemBarClick (barName: string) {
    if (barName === barOpen) setBarOpen("");
    else setBarOpen(barName);
  }

  return {
    barOpen,
    handleItemBarClick
  };
}

export default navigationService;