import { createTheme } from '@mui/material';

/**
 * Colores de serie fijos (independientes del modo) para gráficas y barras del
 * monitor. Fuente única — no repetir estos hex en los componentes.
 */
export const SERIES_COLORS = {
  blue: '#2196f3',
  green: '#4caf50',
  orange: '#ff9800',
  red: '#f44336',
  grey: '#9e9e9e',
} as const;

/** Acento "en vivo" de la conexión (punto/icono/glow de conectado). */
export const LIVE_ACCENT = '#00e676';

/** Fondo del bloque de mensaje decodificado, por modo. */
export const CODE_SURFACE = {
  dark: '#0d1117',
  light: '#f6f8fa',
} as const;

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
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.background.paper
                : theme.palette.primary.main,
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
