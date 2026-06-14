import { type ReactElement } from 'react';

import { HistoryTable, TopicTable, LastTable, useRepresentationContext, type TableType } from '@/features/messageRepresentacion';
import { useSubscriptionContext } from '@/features/messageSubscription';
import { useNavigationStore } from '@/stores/navigationStore/navigationStore';
import { filterBySubscriptions } from '@/shared/service/topicFilter';
import { SubscriptionSidebar } from './components/SubscriptionSidebar/SubscriptionSidebar';
import { PublishSidebar } from './components/PublishSidebar/PublishSidebar';
import { OVERLAY_IDS } from '@/stores/navigationStore/navigationStore.constant';

export function useMainPage() {
  const { topicList, getSelectedTopic, getMessageSelected, tableType } = useRepresentationContext();
  const { getSelectedSubscriptions } = useSubscriptionContext();
  
  const openedSidebar = useNavigationStore(s => s.openedSidebar);

  const selectedTopic = getSelectedTopic();
  const selectedSubscription = getSelectedSubscriptions();
  const filteredTopicList = filterBySubscriptions(topicList, selectedSubscription);
  const showTable = selectedTopic !== '' && filteredTopicList.includes(selectedTopic);

  const messageSelected = getMessageSelected();

  const sideBarOpened: ReactElement = sidebarToShow({openedSidebar});
  const tableOpened: ReactElement = tableToShow({ tableType });

  return {
    sideBarOpened,
    selectedTopic,
    messageSelected,
    showTable,
    tableOpened,
  };
}

interface TableToShowProps {
  tableType: TableType;
}

function tableToShow({ tableType }: TableToShowProps) {
  if (tableType === 'history') {
    return <HistoryTable />
  } else if (tableType === 'topic') {
    return <TopicTable />;
  } else if (tableType === 'last') {
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