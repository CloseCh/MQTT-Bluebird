import React from 'react';
import ListItem from '@mui/material/ListItem';

type MQTTListItemProps = {
  topic: string;
  messages: MQTTmessage[];
}

const MQTTListItem = React.memo(({ topic, messages }: MQTTListItemProps) => {
  return (
    <ListItem>
      <span>{topic}</span>
      <span>{JSON.stringify(messages?.at(-1)?.data)}</span>
    </ListItem>
  );
});

export default MQTTListItem;