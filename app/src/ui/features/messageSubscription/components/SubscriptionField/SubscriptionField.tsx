import { 
  Paper,
  InputBase,
  IconButton
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { DuplicateSubscriptionModal } from "../DuplicatedSubscriptionModal/DuplicatedSubscriptionModal";
import { useSubscriptionField } from "./useSubscriptionField";

export function SubscriptionField() {
  const { 
    inputRef,
    handleClick,
    pendingTopic,
    coveringTopics,
    handleConfirm,
    handleCancel
  } = useSubscriptionField();

  return (
    <>
      <Paper
        component="form"
        elevation={0}
        square
        sx={{ 
          p: "2px 4px", 
          display: "flex", 
          alignItems: "center", 
          borderBottom: "1px solid", 
          borderColor: "divider" 
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add topic"
          inputProps={{ "aria-label": "search google maps" }}
          inputRef={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleClick();
            }
          }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="Add" onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </Paper>

      <DuplicateSubscriptionModal
        open={pendingTopic !== null}
        topic={pendingTopic ?? ""}
        coveringTopics={coveringTopics}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}

export default SubscriptionField;