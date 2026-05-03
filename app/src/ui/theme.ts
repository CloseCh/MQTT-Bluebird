import { createTheme } from "@mui/material";

export const createAppTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: '"Source Code Pro", monospace',
    },
  });