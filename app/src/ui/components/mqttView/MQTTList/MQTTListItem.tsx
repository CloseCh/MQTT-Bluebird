import React from 'react';

type MQTTListItemProps = {
  topic: string;
  messages: MQTTmessage[];
}

const MQTTListItem = React.memo(({ topic, messages }: MQTTListItemProps) => {
  return (
    <li>
      <span>{topic}</span>
      <span>{JSON.stringify(messages?.at(-1)?.data)}</span>
    </li>
  );
});

export default MQTTListItem;