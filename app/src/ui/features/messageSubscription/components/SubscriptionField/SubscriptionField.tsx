import { useRef } from "react";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useSubscriptionContext } from '../../hooks/useSubscriptionContext';

export function SubscriptionField() {
  const { subscribe } = useSubscriptionContext();

  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick () {
    if (!inputRef.current) return;

    const inputValue: string = inputRef.current.value;

    if (inputValue.length > 0){
      subscribe([inputValue]);
      inputRef.current.value = "";
    }
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add topic"
        inputProps={{ 'aria-label': 'search google maps' }}
        inputRef={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
          }
        }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="Add" onClick={handleClick}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
}

export default SubscriptionField;