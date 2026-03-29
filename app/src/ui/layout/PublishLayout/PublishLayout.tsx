import Header from "@/components/Header/Header";
import { CssBaseline, Stack } from "@mui/material";
import { Outlet } from "react-router";

export default function PublishLayout() {
  return (
    <>
      <CssBaseline/>
      <Stack sx={{ height: '100vh', overflow: 'hidden' }}>
        <Header title='Publish message' />
        <Outlet />
      </Stack>
    </>
  );
}