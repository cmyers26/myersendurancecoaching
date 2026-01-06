import { createTheme } from '@mui/material/styles';

// Calm, professional theme with deep blue/slate primary and comfortable typography
const theme = createTheme({
  palette: {
    primary: {
      main: '#334155', // Deep slate blue - calm and professional
      light: '#475569',
      dark: '#1e293b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748b', // Neutral slate accent
      light: '#94a3b8',
      dark: '#475569',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8FAFC', // Soft off-white for calmness
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1e293b', // Dark slate for readability
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    // Comfortable typography for long reading
    fontSize: 16,
    htmlFontSize: 16,
    body1: {
      fontSize: '1rem',
      lineHeight: 1.75, // Comfortable line height for reading
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01071em',
    },
    h1: {
      fontWeight: 600,
      lineHeight: 1.2,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontWeight: 600,
      lineHeight: 1.3,
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontWeight: 500,
      lineHeight: 1.5,
      fontSize: '1.25rem',
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    h6: {
      fontWeight: 500,
      lineHeight: 1.5,
      fontSize: '1rem',
    },
  },
  spacing: 8, // Base spacing unit (8px)
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#334155',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
          fontWeight: 500,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
          '@media (min-width:600px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // Ensure comfortable reading spacing
          lineHeight: 1.75,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export default theme;

