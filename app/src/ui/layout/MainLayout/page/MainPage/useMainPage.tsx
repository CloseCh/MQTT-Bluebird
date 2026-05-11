import { type ReactElement } from 'react';

import { HistoryTable, TopicTable, LastTable, useMQTTContext } from '@/features/messageRepresentacion';
import { useSubscriptionContext } from '@/features/messageSubscription';
import { useNavigationStore, OVERLAY_IDS } from '@/features/navigation';
import { filterBySubscriptions } from '@/shared/service/topicFilter';
import { SubscriptionSidebar } from '../SideBars/SubscriptionSidebar';
import { PublishSidebar } from '../SideBars/PublishSidebar';

export function useMainPage() {

  const { topicList, getSelectedTopic, getMessageSelected } = useMQTTContext();
  const { getSelectedSubscriptions } = useSubscriptionContext();
  
  const openedSidebar = useNavigationStore(s => s.openedSidebar);
  const tableConfig = useNavigationStore(s => s.tableConfig);

  const selectedTopic = getSelectedTopic();
  const selectedSubscription = getSelectedSubscriptions();
  const filteredTopicList = filterBySubscriptions(topicList, selectedSubscription);
  const showTable = selectedTopic !== '' && filteredTopicList.includes(selectedTopic);

  const messageSelected = getMessageSelected();

  const sideBarOpened: ReactElement = sidebarToShow({openedSidebar});
  const tableOpened: ReactElement = tableToShow({ showTable, tableConfig });

  return {
    sideBarOpened,
    selectedTopic,
    messageSelected,
    showTable,
    tableOpened,
  };
}

interface TableToShowProps {
  showTable: boolean;
  tableConfig: string;
}

function tableToShow({ showTable, tableConfig }: TableToShowProps) {

  if (showTable && tableConfig === OVERLAY_IDS.TABLE_HISTORY) {
    return <HistoryTable />
  } else if (tableConfig === OVERLAY_IDS.TABLE_TOPIC) {
    return <TopicTable />;
  } else if (tableConfig === OVERLAY_IDS.TABLE_LAST) {
    return <LastTable />
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