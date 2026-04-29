import { useCallback, useState } from "react";
import { useMQTTContext } from "../../hooks/useMQTTContext";
import type { Topic } from "../../types/mqtt.types";

interface Prop {
  selectedTopic: Topic;
}

export function useMessageDetail ({
  selectedTopic
} : Prop) {
  const [drawerWidth, setDrawerWidth] = useState(400);

  const { getMessageFormat } = useMQTTContext();

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = drawerWidth;

    const onMouseMove = (e: MouseEvent) => {
      const delta = startX - e.clientX;
      const newWidth = Math.min(Math.max(startWidth + delta, 200), 800);
      setDrawerWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [drawerWidth]);


  const messageFormat: MessageFormatEnum = getMessageFormat(selectedTopic);

  return {
    drawerWidth,
    handleMouseDown,
    messageFormat
  }
}