import { ConnectionProvider } from "@/features/brockerConnection";
import { MQTTProvider } from "@/features/messageRepresentacion";
import { SubscriptionProvider } from "@/features/messageSubscription";
import { useSettingsStore } from "@/features/settings/stores/settingsStore";
import { createAppTheme } from "@/theme";
import { ThemeProvider } from "@mui/material";

export function composeProviders(...providers: React.ComponentType<{ children: React.ReactNode }>[]) {
  return ({ children }: { children: React.ReactNode }) =>
    providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
}

function MQTTProviderWithSettings({ children }: { children: React.ReactNode }) {
  const { maxMessages } = useSettingsStore();
  return <MQTTProvider dataPointCount={maxMessages}>{children}</MQTTProvider>;
}

function ThemeProviderWithSettings({ children }: { children: React.ReactNode }) {
  const { darkMode } = useSettingsStore();
  const theme = createAppTheme(darkMode);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export const AppProviders = composeProviders(
  ThemeProviderWithSettings,
  MQTTProviderWithSettings,
  ConnectionProvider,
  SubscriptionProvider,
);
