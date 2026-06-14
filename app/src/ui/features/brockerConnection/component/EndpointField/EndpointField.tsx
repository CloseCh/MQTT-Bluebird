import { Typography } from "@mui/material";
import { useConnectionContext } from "../../context/ConnectionProvider";

export function EndpointField() {
  const { connectedEndpoint } = useConnectionContext();
  
  return (
    <Typography>
      {connectedEndpoint}
    </Typography>
  );
}