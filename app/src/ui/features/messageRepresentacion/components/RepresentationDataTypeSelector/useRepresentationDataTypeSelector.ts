import { useCallback, useRef, useState } from "react";
import { useMQTTContext } from "../../hooks/useMQTTContext";
import type { Topic } from "../../types/mqtt.types";

interface Prop {
  selectedTopic: Topic;
}

export function useRepresentationDataTypeSelector({ 
  selectedTopic
}: Prop){
  const selectRef = useRef<HTMLDivElement>(null);

  const { setMessageFormat, getMessageFormat } = useMQTTContext();
  const messageFormat: MessageFormatEnum = getMessageFormat(selectedTopic);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchorEl(selectRef.current);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSelect = useCallback((format: MessageFormatEnum) => {
    setAnchorEl(null);
    setTimeout(() => {
      setMessageFormat(selectedTopic, format);
    }, 0);
  }, [selectedTopic, setMessageFormat]);

  return {
    selectRef,
    messageFormat,
    open,
    anchorEl,
    handleOpen,
    handleClose,
    handleSelect
  }
}