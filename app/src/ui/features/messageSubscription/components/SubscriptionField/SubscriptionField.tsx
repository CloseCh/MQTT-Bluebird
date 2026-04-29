import { useRef, useState } from "react";

import { 
  Paper,
  InputBase,
  IconButton
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useSubscriptionContext } from "../../hooks";
import { findCoveringSubscriptions } from "../../utils";
import { DuplicateSubscriptionModal } from "../DuplicatedSubscriptionModal";

export function SubscriptionField() {
  const { subscribe, subscriptionList } = useSubscriptionContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingTopic, setPendingTopic] = useState<string | null>(null);
  const [coveringTopics, setCoveringTopics] = useState<string[]>([]);

  function trySubscribe(topic: string) {
    const covering = findCoveringSubscriptions(topic, subscriptionList);
    if (covering.length > 0) {
      setPendingTopic(topic);
      setCoveringTopics(covering);
    } else {
      subscribe([topic]);
    }
  }

  function handleClick() {
    if (!inputRef.current) return;
    const value = inputRef.current.value;
    if (value.length > 0) {
      trySubscribe(value);
      inputRef.current.value = "";
    }
  }

  function handleConfirm() {
    if (pendingTopic) subscribe([pendingTopic]);
    setPendingTopic(null);
    setCoveringTopics([]);
  }

  function handleCancel() {
    setPendingTopic(null);
    setCoveringTopics([]);
  }

  return (
    <>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
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