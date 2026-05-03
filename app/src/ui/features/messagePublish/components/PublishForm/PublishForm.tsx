import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { PublishDataTypeSelector } from "./PublishDataTypeSelector/PublishDataTypeSelector";
import type { PublishFormValues } from "../../types/publish.types";
import EncoderService from "../../service/EncoderService";

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
      dataType: "UTF-8",
      qos: 0,
      retain: false,
    },
  });

  const onSubmit = (data: PublishFormValues) => {
    const encoded = EncoderService(data.message, data.dataType);

    window.electron.publishMQTT({
      topic: data.topic,
      message: Array.from(encoded),
      qos: data.qos,
      retain: data.retain,
    });
  };

  return (
    <Card sx={{ p: "10px" }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={1}>
          <TextField
            label="Topic"
            variant="outlined"
            {...register("topic", { required: true })}
            error={!!errors.topic}
            size="small"
          />
          <TextField
            label="Message"
            variant="outlined"
            {...register("message", { required: true })}
            error={!!errors.message}
            size="small"
          />
          <Controller
            name="dataType"
            control={control}
            defaultValue={undefined}
            render={({ field }) => <PublishDataTypeSelector {...field} />}
          />
          <Controller
            name="qos"
            control={control}
            render={({ field }) => (
              <FormControl>
                <InputLabel size='small'>QoS</InputLabel>
                <Select
                  {...field}
                  label="QoS"
                  size='small'
                >
                  <MenuItem value={0}>0 – At most once</MenuItem>
                  <MenuItem value={1}>1 – At least once</MenuItem>
                  <MenuItem value={2}>2 – Exactly once</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="retain"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                label="Retain"
                control={<Checkbox {...field} checked={field.value} />}
              />
            )}
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