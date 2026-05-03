import { useMQTTContext } from "@/features/messageRepresentacion";
import { useSubscriptionContext } from "@/features/messageSubscription";
import { useOverlayStore } from "@/stores/overlayStore";
import { OVERLAY_IDS } from "@/stores/overlayIds";
import { filterBySubscriptions } from "@/shared/service/topicFilter";
import { useCallback, useState, type ReactElement } from "react";
import { EmptySidebar, PublishSidebar, SubscriptionSidebar } from "./SideBars";

export function useMainPage() {
  const [messageSelected, setMessageSelected] = useState<MQTTMessage | null>(null);

  const { topicList, getSelectedTopic } = useMQTTContext();
  const { getSelectedSubscriptions } = useSubscriptionContext();
  const overlays = useOverlayStore(s => s.overlays);

  const selectedTopic = getSelectedTopic();
  const selectedSubscription = getSelectedSubscriptions();
  const filteredTopicList = filterBySubscriptions(topicList, selectedSubscription);
  const showTable = filteredTopicList.includes(selectedTopic);

  const handleTableClick = useCallback((message: MQTTMessage) => {
    setMessageSelected(message);
  }, []);

  const handleCloseDetailedClick = () => {
    setMessageSelected(null);
  };

  let sideBarOpened: ReactElement;

  if (overlays[OVERLAY_IDS.NAV_SUBSCRIPTION]) {
    sideBarOpened = SubscriptionSidebar();
  } else if (overlays[OVERLAY_IDS.NAV_PUBLISH]) {
    sideBarOpened = PublishSidebar();
  } else {
    sideBarOpened = EmptySidebar();
  }

  return {
    sideBarOpened,
    selectedTopic,
    showTable,
    handleTableClick,
    messageSelected,
    handleCloseDetailedClick,
  };
}
