import { Typography } from "@mui/material";
import { useConnectionContext } from "../../hooks/useConnectionContext";

export function EndpointField() {
  const { connectedEndpoint } = useConnectionContext();
  
  return (
    <Typography>
      {connectedEndpoint}
    </Typography>
  );
}