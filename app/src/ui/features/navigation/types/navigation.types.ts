export interface NavigationContextValue {
  openWindow: (pageName:string) => Promise<void>; 
}
