import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

interface ConnectionFormValues {
  endpoint: string;
};

export function ConnectionForm(){
  const form = useForm<ConnectionFormValues>();

  const onSubmit= (data: ConnectionFormValues) => {
    console.log(data)
  };  

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Stack spacing={1}>
          <TextField 
            label="Endpoint"
            variant="outlined"
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