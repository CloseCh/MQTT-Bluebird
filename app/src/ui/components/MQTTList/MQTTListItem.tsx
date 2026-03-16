import React from 'react';
import { useCallback } from 'react';
import ListItemButton from '@mui/material/ListItemButton';

import MailIcon from '@mui/icons-material/Mail'

interface MQTTListItemProps {
  topic: string;
  handleClick: (topic: string) => void;
}

function MQTTListItem ({ topic, handleClick }: MQTTListItemProps) {
    const handleClickMemo = useCallback(() => {
        handleClick(topic);
    }, [topic, handleClick]);

    return (
        <ListItemButton onClick={handleClickMemo}>
            <MailIcon sx={{ marginRight: '10px' }} />
            <span>{topic}</span>
        </ListItemButton>
    );
}

export default React.memo(MQTTListItem);