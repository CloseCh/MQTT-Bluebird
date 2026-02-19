import MQTTListItem from "./MQTTListItem.jsx";
import { useMQTT } from "../../../function/messageManagement";

export default function MQTTList() {
  const { topics, messagesByTopic } = useMQTT(100);

  return (
    <ul>
      {topics.map((topic : string) => (
        <MQTTListItem
          key={topic}
          topic={topic}
          messages={messagesByTopic[topic]}
        />
      ))}
    </ul>
  );
}