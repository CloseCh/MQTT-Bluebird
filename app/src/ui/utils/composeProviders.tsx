import { ConnectionProvider } from "@/features/brockerConnection";
import { MQTTProvider } from "@/features/messageRepresentacion";
import { SubscriptionProvider } from "@/features/messageSubscription";

export function composeProviders(...providers: React.ComponentType<{ children: React.ReactNode }>[]) {
  return ({ children }: { children: React.ReactNode }) =>
    providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
}

export const AppProviders = composeProviders(
  ({ children }) => <MQTTProvider dataPointCount={100}>{children}</MQTTProvider>,
  ConnectionProvider,
  SubscriptionProvider,
);