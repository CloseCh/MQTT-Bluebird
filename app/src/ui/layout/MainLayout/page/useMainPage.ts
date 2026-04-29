import { useMQTTContext } from "@/features/messageRepresentacion";
import { useSubscriptionContext } from "@/features/messageSubscription";
import { useNavigationContext } from "@/features/navigation";
import { filterBySubscriptions } from "@/shared/service/topicFilter";
import { useCallback, useState, type ReactElement } from "react";
import { EmptySidebar, PublishSidebar, SubscriptionSidebar } from "./SideBars";

export function useMainPage() {
  const [messageSelected, setMessageSelected] = useState<MQTTMessage | null>(null);

  const { topicList, getSelectedTopic } = useMQTTContext();
  const { getSelectedSubscriptions,  } = useSubscriptionContext();
  const { barOpen } = useNavigationContext();

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

  switch(barOpen) {
    case "subcription":
      sideBarOpened = SubscriptionSidebar();
      break;
    case "publish":
      sideBarOpened = PublishSidebar();
      break;
    default:
      sideBarOpened = EmptySidebar();
  }

  return {
    sideBarOpened,
    selectedTopic,
    showTable,
    handleTableClick,
    messageSelected,
    handleCloseDetailedClick
  }
}