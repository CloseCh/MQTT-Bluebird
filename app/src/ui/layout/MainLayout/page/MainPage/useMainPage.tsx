import { useCallback, useState, type ReactElement } from "react";

import { HistoryTable, TopicTable, useMQTTContext } from "@/features/messageRepresentacion";
import { useSubscriptionContext } from "@/features/messageSubscription";
import { useNavigationStore, OVERLAY_IDS } from "@/features/navigation";
import { filterBySubscriptions } from "@/shared/service/topicFilter";
import { SubscriptionSidebar } from "../SideBars/SubscriptionSidebar";
import { PublishSidebar } from "../SideBars/PublishSidebar";

export function useMainPage() {
  const [messageSelected, setMessageSelected] = useState<MQTTMessage | null>(null);

  const { topicList, getSelectedTopic } = useMQTTContext();
  const { getSelectedSubscriptions } = useSubscriptionContext();
  
  const openedSidebar = useNavigationStore(s => s.openedSidebar);
  const tableConfig = useNavigationStore(s => s.tableConfig);

  const selectedTopic = getSelectedTopic();
  const selectedSubscription = getSelectedSubscriptions();
  const filteredTopicList = filterBySubscriptions(topicList, selectedSubscription);
  const showTable = selectedTopic !== "" && filteredTopicList.includes(selectedTopic);

  const handleTableClick = useCallback((message: MQTTMessage) => {
    setMessageSelected(message);
  }, []);

  const handleCloseDetailedClick = () => {
    setMessageSelected(null);
  };

  const sideBarOpened: ReactElement = sidebarToShow({openedSidebar});
  const tableOpened: ReactElement = tableToShow({ showTable, handleTableClick, tableConfig });

  return {
    sideBarOpened,
    selectedTopic,
    showTable,
    tableOpened,
    messageSelected,
    handleCloseDetailedClick,
  };
}

interface TableToShowProps {
  showTable: boolean;
  handleTableClick: (message: MQTTMessage) => void;
  tableConfig: string;
}

function tableToShow({ showTable, handleTableClick, tableConfig }: TableToShowProps) {

  if (showTable && tableConfig === OVERLAY_IDS.TABLE_HISTORY) {
    return <HistoryTable handleClick={handleTableClick} />
  } else if (tableConfig === OVERLAY_IDS.TABLE_TOPIC) {
    return <TopicTable handleClick={handleTableClick} />;
  }
  return <></>;
}

interface SidebarToShowProps {
  openedSidebar: string;
}

function sidebarToShow({openedSidebar}: SidebarToShowProps): ReactElement {
  if (openedSidebar === OVERLAY_IDS.NAV_SUBSCRIPTION) {
    return <SubscriptionSidebar />;
  } else if (openedSidebar === OVERLAY_IDS.NAV_PUBLISH) {
    return <PublishSidebar />;
  }
  return <></>;
}