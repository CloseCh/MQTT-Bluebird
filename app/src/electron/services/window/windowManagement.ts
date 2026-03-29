import { BrowserWindow } from "electron";
import publisherWindow from "../../window/publisherWindow.js";

const openWindows = new Set<string>;

export function openWindow(windowId: string, parent?: BrowserWindow): BrowserWindow | null {
  if (!windowId) return null;

  if (openWindows.has(windowId)) return null;

  switch (String(windowId)) {
    case 'publish':
      openWindows.add(windowId);
      return publisherWindow(parent);
      break;
    default:
      console.warn(`Ventana desconocida: ${windowId}`);
  }

  return null;
}

export function closeWindow(windowId: string): void {
  openWindows.delete(windowId);
}