import { useForm, Controller } from "react-hook-form";
import { Button, Card, Stack, TextField } from "@mui/material";
import { PublishDataTypeSelector } from "../PublishDataTypeSelector";

type PublishFormValues = {
  topic: string;
  message: string;
  dataType: MessageFormatEnum;
};

export function PublishForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PublishFormValues>({
    defaultValues: {
      topic: "",
      message: "",
      dataType: undefined,
    },
  });

  const onSubmit = (data: PublishFormValues) => {
    const publishData: PublishPayload = {
      topic: data.topic,
      format: data.dataType,
      payload: data.message
    };

    window.electron.publishMQTT(publishData);
  };

  return (
    <Card sx={{ p: "10px" }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={1}>
          <TextField
            label="Topic"
            variant="outlined"
            {...register("topic", { required: "El topic es requerido" })}
            error={!!errors.topic}
            helperText={errors.topic?.message}
          />
          <TextField
            label="Message"
            variant="outlined"
            {...register("message", { required: "El mensaje es requerido" })}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
          <Controller
            name="dataType"
            control={control}
            defaultValue={undefined}
            render={({ field }) => <PublishDataTypeSelector {...field} />}
          />
          <Button type="submit" variant="contained">
            Enviar
          </Button>
        </Stack>
      </form>
    </Card>
  );
}

export default PublishForm;