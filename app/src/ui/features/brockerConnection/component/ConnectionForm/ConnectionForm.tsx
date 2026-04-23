import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import type { ConnectionFormValues } from "../../types";

interface Prop {
  handleConnection: (endpoint: string) => Promise<void>;
}

export function ConnectionForm({ handleConnection }: Prop){
  const form = useForm<ConnectionFormValues>();

  const onSubmit= (data: ConnectionFormValues) => {
    handleConnection(data.endpoint);
  };  

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Stack spacing={1}>
          <TextField 
            label="Endpoint"
            variant="outlined"
            placeholder="https://ejemplo.com"
            {...form.register("endpoint", { required: "El endpoint es necesario."})}
            error={!!form.formState.errors.endpoint}
            helperText={form.formState.errors.endpoint?.message}
          />
        </Stack>

        <Button type="submit" variant="contained">
          Conectar
        </Button>
      </form>
    </>
  );
}

export default ConnectionForm;