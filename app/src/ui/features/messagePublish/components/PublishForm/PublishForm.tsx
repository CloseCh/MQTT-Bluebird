import { Card, Stack, TextField } from "@mui/material";

export function PublishForm(){
  return (
    <Card 
      sx={{
        p: "10px"
      }}
    >
      <Stack spacing={1}>
        <TextField label="Topic" variant="outlined"/>
        <TextField label="Message" variant="outlined"/>
      </Stack>
    </Card>
  );
}

export default PublishForm;