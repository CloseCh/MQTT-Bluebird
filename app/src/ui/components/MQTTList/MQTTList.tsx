import MQTTListItem from "./MQTTListItem.js";
import { useMQTT } from "../../function/messageManagement.js";
import List from '@mui/material/List';

interface MQTTListProps {
  handleClick: (topic: string) => void;
}

export default function MQTTList({ handleClick }: MQTTListProps) {
  const { topics } = useMQTT(100);
  
  return (
      <List 
        sx={{
          width: '100%'
        }}
      >
        {topics.map((topic : string) => (
          <MQTTListItem
            key={topic}
            topic={topic}
            handleClick={handleClick}
          />
        ))}
      </List>
  );
}