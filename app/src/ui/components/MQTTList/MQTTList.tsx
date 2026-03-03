import MQTTListItem from "./MQTTListItem.js";
import { useMQTT } from "../../function/messageManagement.js";
import List from '@mui/material/List';

export default function MQTTList() {
  const { topics } = useMQTT(100);

  return (
      <List 
        sx={{
          border: '1px solid red',
          width: '100%'
        }}
      >
        {topics.map((topic : string) => (
          <MQTTListItem
            key={topic}
            topic={topic}
          />
        ))}
      </List>
  );
}