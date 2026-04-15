import { useState, useCallback, type ReactElement } from "react";

import { TopicList, HistoryTable, DataTypeSelector, MessageDetail } from "@/features/messageRepresentacion";

import { useMQTTContext } from '@/features/messageRepresentacion';

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SideBar, useNavigationContext } from "@/features/navigation/index.js";
import { SubscriptionField, SubscriptionList } from "@/features/messageSubscription";
import { Divider } from "@mui/material";
import { PublishForm } from "@/features/messagePublish";

export default function MainPage() {
  const [messageSelected, setMessageSelected] = useState<MQTTMessage | null>(null);

  const { getSelectedTopic } = useMQTTContext();

  const { barOpen } = useNavigationContext();

  const selectedTopic = getSelectedTopic();

  const handleTableClick = useCallback((message: MQTTMessage) => {
    setMessageSelected(message);
  }, []);

  const handleCloseDetailedClick = () => {
    setMessageSelected(null);
  };

  let sideBarOpened: ReactElement;

  switch(barOpen) {
    case "subcription":
      sideBarOpened = SubscriptionSideBar();
      break;
    case "publish":
      sideBarOpened = PublishSideBar();
      break;
    default:
      sideBarOpened = <></>;
  }

  return (
    <>
      <Stack direction="row" sx={{ height: '100%', width: '100%' }}>

        
        {sideBarOpened}

        {selectedTopic !== "" &&
          <Stack sx={{ height: '100%', flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <Stack direction="row" sx={{ minHeight: 0, minWidth: 0, padding: '10px 10px 10px 10px' }}>
              <Box>
                <DataTypeSelector selectedTopic={selectedTopic} />
              </Box>
            </Stack>
            <Box sx={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <HistoryTable handleClick={handleTableClick} />
            </Box>
          </Stack>
        }

      </Stack>
      {messageSelected
        ? <MessageDetail messageSelected={messageSelected} selectedTopic={selectedTopic} handleClick={handleCloseDetailedClick} />
        : <></>
      }
    </>
  );
}

function SubscriptionSideBar() {
  return (
    <SideBar>
      <Stack sx={{ height: '100%', width: '100%' }}>
        <Box sx={{ height: '40%', width: '100%', overflow: 'auto' }}>
          <Stack>
            <Box sx={{ height: '40%', width: '100%', overflow: 'auto' }}>
              <SubscriptionField />
            </Box>
            <Divider />
            <Box sx={{ height: '60%', width: '100%', overflow: 'auto' }}>
              <SubscriptionList />
            </Box>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ height: '60%', width: '100%', overflow: 'auto' }}>
          <TopicList />
        </Box>
      </Stack>
    </SideBar>
  );
}

function PublishSideBar() {
  return (
    <SideBar>
      <Stack sx={{ height: '100%', width: '100%' }}>
        <Box sx={{ height: '50%', width: '100%', overflow: 'auto' }}>
          <PublishForm />
        </Box>
      </Stack>
    </SideBar>
  );
}