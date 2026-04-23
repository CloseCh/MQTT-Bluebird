export interface ConnectionContextValue {
  success: boolean;
  handleConnection: (endpoint: string) => Promise<void>;
}

export interface ConnectionFormValues {
  endpoint: string;
};