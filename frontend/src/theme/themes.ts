import { createTheme } from '@mui/material/styles';

// Base typography configuration
const baseTypography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif'
  ].join(','),
  h1: { fontWeight: 700, fontSize: '2.25rem', lineHeight: 1.2, letterSpacing: '-0.025em' },
  h2: { fontWeight: 600, fontSize: '1.875rem', lineHeight: 1.3, letterSpacing: '-0.025em' },
  h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.4 },
  h4: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
  h5: { fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.5 },
  h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 },
  subtitle1: { fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 },
  subtitle2: { fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.5 },
  body1: { fontWeight: 400, fontSize: '1rem', lineHeight: 1.6 },
  body2: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6 },
  button: { fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.5, textTransform: 'none' as const },
  caption: { fontWeight: 400, fontSize: '0.75rem', lineHeight: 1.4 },
  overline: { fontWeight: 600, fontSize: '0.75rem', lineHeight: 1.4, textTransform: 'uppercase' as const, letterSpacing: '0.1em' },
};

// Base shape configuration
const baseShape = {
  borderRadius: 12,
};

// Base shadows
const baseShadows = [
  'none',
  '0px 2px 4px rgba(0, 0, 0, 0.05)',
  '0px 4px 8px rgba(0, 0, 0, 0.06)',
  '0px 8px 16px rgba(0, 0, 0, 0.08)',
  '0px 12px 24px rgba(0, 0, 0, 0.1)',
  '0px 16px 32px rgba(0, 0, 0, 0.12)',
];

// Light Blue Theme (Current Modern Theme)
export const lightBlueTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    error: { main: '#ef4444', light: '#f87171', dark: '#dc2626' },
    warning: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
    info: { main: '#06b6d4', light: '#22d3ee', dark: '#0891b2' },
    success: { main: '#10b981', light: '#34d399', dark: '#059669' },
    background: { default: '#f8fafc', paper: '#ffffff' },
    text: { primary: '#1e293b', secondary: '#64748b', disabled: '#94a3b8' },
    divider: '#e2e8f0',
  },
  typography: baseTypography,
  shape: baseShape,
  shadows: baseShadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 500,
          textTransform: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-1px)', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' },
        },
        contained: {
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          '&:hover': { background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f1f5f9',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        elevation1: { boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)' },
        elevation2: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' },
        elevation3: { boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#ffffff', color: '#1e293b', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)', borderBottom: '1px solid #e2e8f0' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', boxShadow: 'none' },
      },
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    error: { main: '#ef4444', light: '#f87171', dark: '#dc2626' },
    warning: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
    info: { main: '#06b6d4', light: '#22d3ee', dark: '#0891b2' },
    success: { main: '#10b981', light: '#34d399', dark: '#059669' },
    background: { default: '#0f172a', paper: '#1e293b' },
    text: { primary: '#f1f5f9', secondary: '#cbd5e1', disabled: '#64748b' },
    divider: '#334155',
  },
  typography: baseTypography,
  shape: baseShape,
  shadows: baseShadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 500,
          textTransform: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-1px)', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)' },
        },
        contained: {
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          '&:hover': { background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
          border: '1px solid #334155',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.4)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        elevation1: { boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)' },
        elevation2: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)' },
        elevation3: { boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.5)' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#1e293b', color: '#f1f5f9', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.3)', borderBottom: '1px solid #334155' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#1e293b', borderRight: '1px solid #334155', boxShadow: 'none' },
      },
    },
  },
});

// Green Theme
export const greenTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    error: { main: '#ef4444', light: '#f87171', dark: '#dc2626' },
    warning: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
    info: { main: '#2563eb', light: '#60a5fa', dark: '#1d4ed8' },
    success: { main: '#10b981', light: '#34d399', dark: '#059669' },
    background: { default: '#f0fdf4', paper: '#ffffff' },
    text: { primary: '#064e3b', secondary: '#047857', disabled: '#6b7280' },
    divider: '#d1fae5',
  },
  typography: baseTypography,
  shape: baseShape,
  shadows: baseShadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 500,
          textTransform: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-1px)', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' },
        },
        contained: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          '&:hover': { background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid #d1fae5',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        elevation1: { boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)' },
        elevation2: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' },
        elevation3: { boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#ffffff', color: '#064e3b', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)', borderBottom: '1px solid #d1fae5' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#ffffff', borderRight: '1px solid #d1fae5', boxShadow: 'none' },
      },
    },
  },
});

// Purple Theme
export const purpleTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    error: { main: '#ef4444', light: '#f87171', dark: '#dc2626' },
    warning: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
    info: { main: '#06b6d4', light: '#22d3ee', dark: '#0891b2' },
    success: { main: '#10b981', light: '#34d399', dark: '#059669' },
    background: { default: '#faf5ff', paper: '#ffffff' },
    text: { primary: '#581c87', secondary: '#6b21a8', disabled: '#6b7280' },
    divider: '#e9d5ff',
  },
  typography: baseTypography,
  shape: baseShape,
  shadows: baseShadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 500,
          textTransform: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-1px)', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' },
        },
        contained: {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          '&:hover': { background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e9d5ff',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        elevation1: { boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)' },
        elevation2: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' },
        elevation3: { boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#ffffff', color: '#581c87', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)', borderBottom: '1px solid #e9d5ff' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#ffffff', borderRight: '1px solid #e9d5ff', boxShadow: 'none' },
      },
    },
  },
});

// Export all themes
export const themes = {
  lightBlue: lightBlueTheme,
  dark: darkTheme,
  green: greenTheme,
  purple: purpleTheme,
};

export type ThemeName = keyof typeof themes;