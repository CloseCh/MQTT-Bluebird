import { useCallback, useState } from 'react';
import { useMQTTContext } from '../../context/RepresentationProvider';

export function useMessageDetail() {
  const [drawerWidth, setDrawerWidth] = useState(400);

  const { setMessageSelected, getSelectedTopic, getMessageFormat, getMessageSelected } = useMQTTContext();

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

  const selectedTopic = getSelectedTopic();

  const messageFormat: MessageFormatEnum = getMessageFormat(selectedTopic);

  const handleCloseDetailedClick = () => {
    setMessageSelected(null);
  };

  const messageSelected: MQTTMessage | null = getMessageSelected();

  return {
    drawerWidth,
    handleMouseDown,
    messageFormat,
    handleCloseDetailedClick,
    messageSelected
  }
}