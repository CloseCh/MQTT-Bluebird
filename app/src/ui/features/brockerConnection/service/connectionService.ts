import { useState } from "react";
import type { ConnectionContextValue } from "../types";

export function connectionService(): ConnectionContextValue {
  const [success, setSuccess] = useState<boolean>(false);


  const handleConnection = async (endpoint: string): Promise<void> => {
    const result: boolean = await window.electron.mqttConnection(endpoint);

    if (result) {
      setSuccess(result);
    } else {
      setSuccess(result);
    }
  };

  
  return {
    success,
    handleConnection
  };
}