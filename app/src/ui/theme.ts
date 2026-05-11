import { createTheme } from '@mui/material';

export const createAppTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#00bcd4',
        light: '#4dd0e1',
        dark: '#0097a7',
      },
      background: {
        default: darkMode ? '#0d1117' : '#f5f7fa',
        paper: darkMode ? '#161b22' : '#ffffff',
      },
      ...(darkMode
        ? {
            divider: '#30363d',
            text: {
              primary: '#e6edf3',
              secondary: '#8b949e',
            },
          }
        : {
            divider: '#d0d7de',
            text: {
              primary: '#24292f',
              secondary: '#57606a',
            },
          }),
    },
    typography: {
      fontFamily: '"Source Code Pro", monospace',
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#161b22' : '#1976d2',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            '&:before': { display: 'none' },
            backgroundColor: theme.palette.background.paper,
          }),
        },
      },
    },
  });
