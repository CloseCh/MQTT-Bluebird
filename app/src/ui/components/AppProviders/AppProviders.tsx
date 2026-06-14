/* eslint-disable react-refresh/only-export-components */
import { ConnectionProvider } from '@/features/brockerConnection';
import { BrockerMonitorProvider } from '@/features/brockerMonitor';
import { RepresentationProvider } from '@/features/messageRepresentacion';
import { SubscriptionProvider } from '@/features/messageSubscription';
import { useSettingsStore } from '@/stores/settingsStore/settingsStore';
import { TransportProvider } from '@/transport';
import { createAppTheme } from '@/theme';
import { GlobalStyles, ThemeProvider } from '@mui/material';

export function composeProviders(...providers: React.ComponentType<{ children: React.ReactNode }>[]) {
  return ({ children }: { children: React.ReactNode }) =>
    providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
}

function RepresentationProviderWithSettings({ children }: { children: React.ReactNode }) {
  const { maxMessages } = useSettingsStore();
  return <RepresentationProvider dataPointCount={maxMessages}>{children}</RepresentationProvider>;
}

function ThemeProviderWithSettings({ children }: { children: React.ReactNode }) {
  const { darkMode } = useSettingsStore();
  const theme = createAppTheme(darkMode);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={(t) => ({
        '*::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '*::-webkit-scrollbar-track': {
          background: t.palette.background.default,
        },
        '*::-webkit-scrollbar-thumb': {
          background: t.palette.divider,
          borderRadius: '3px',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: t.palette.text.secondary,
        },
      })} />
      {children}
    </ThemeProvider>
  );
}

export const AppProviders = composeProviders(
  TransportProvider,
  ThemeProviderWithSettings,
  RepresentationProviderWithSettings,
  ConnectionProvider,
  SubscriptionProvider,
  BrockerMonitorProvider,
);
