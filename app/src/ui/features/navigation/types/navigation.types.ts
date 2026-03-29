export interface NavigationContextValue {
  windowOpenList: Set<string>
  openWindow: (windowName:string) => void; 
}
