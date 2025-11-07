import React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Nature as NatureIcon,
  Colorize as ColorizeIcon,
} from '@mui/icons-material';
import { useThemeContext } from '../theme/ThemeContext';
import { ThemeName } from '../theme/themes';

const themeIcons = {
  lightBlue: <LightModeIcon sx={{ color: '#2563eb' }} />,
  dark: <DarkModeIcon sx={{ color: '#f59e0b' }} />,
  green: <NatureIcon sx={{ color: '#10b981' }} />,
  purple: <ColorizeIcon sx={{ color: '#8b5cf6' }} />,
};

const themeLabels = {
  lightBlue: 'Light Blue',
  dark: 'Dark Mode',
  green: 'Nature Green',
  purple: 'Royal Purple',
};

const ThemeSelector: React.FC = () => {
  const { themeName, setTheme, availableThemes } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeSelect = (newTheme: ThemeName) => {
    setTheme(newTheme);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Switch Theme">
        <Button
          onClick={handleClick}
          sx={{
            borderRadius: 2,
            px: 1,
            py: 0.5,
            minHeight: 'auto',
            bgcolor: alpha(themeName === 'dark' ? '#f59e0b' : '#2563eb', 0.08),
            color: themeName === 'dark' ? '#f59e0b' : '#2563eb',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: alpha(themeName === 'dark' ? '#f59e0b' : '#2563eb', 0.12),
              transform: 'scale(1.02)',
            }
          }}
        >
          {themeIcons[themeName]}
        </Button>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            border: '1px solid #e2e8f0',
            boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.12)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {availableThemes.map((theme) => (
          <MenuItem
            key={theme}
            onClick={() => handleThemeSelect(theme)}
            selected={themeName === theme}
            sx={{
              py: 1.5,
              px: 2,
              '&:hover': {
                bgcolor: alpha('#2563eb', 0.06),
              },
              '&.Mui-selected': {
                bgcolor: alpha('#2563eb', 0.1),
                '&:hover': {
                  bgcolor: alpha('#2563eb', 0.15),
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {themeIcons[theme]}
            </ListItemIcon>
            <ListItemText
              primary={themeLabels[theme]}
              primaryTypographyProps={{
                fontWeight: themeName === theme ? 600 : 500,
                fontSize: '0.875rem',
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ThemeSelector;