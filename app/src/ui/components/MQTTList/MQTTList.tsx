import MQTTListItem from "./MQTTListItem.jsx";
import { useMQTT } from "../../function/messageManagement";
import List from '@mui/material/List';

export default function MQTTList() {
  const { topics, messagesByTopic } = useMQTT(100);

  return (
    <List>
      {topics.map((topic : string) => (
        <MQTTListItem
          key={topic}
          topic={topic}
          messages={messagesByTopic[topic]}
        />
      ))}
    </List>
  );
}