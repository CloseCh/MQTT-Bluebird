import { useCallback, useRef, useState } from 'react';
import { useRepresentationContext } from '../../context/RepresentationProvider';

export function useRepresentationDataTypeSelector(){
  const selectRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { setMessageFormat, getSelectedTopic ,getMessageFormat } = useRepresentationContext();

  const selectedTopic = getSelectedTopic();
  const messageFormat: MessageFormatEnum = getMessageFormat(selectedTopic);

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