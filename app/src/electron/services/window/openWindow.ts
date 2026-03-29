import { BrowserWindow } from "electron";
import publisherWindow from "../../window/publisherWindow.js";

export function openWindow(windowId: string | number, parent?: BrowserWindow): void {
  switch (String(windowId)) {
    case 'publisher':
      publisherWindow(parent);
      break;
    default:
      console.warn(`Ventana desconocida: ${windowId}`);
  }
}