import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router";

export default function PublishLayout() {
  return (
    <>
      <CssBaseline/>
      <Outlet/>
    </>
  );
}