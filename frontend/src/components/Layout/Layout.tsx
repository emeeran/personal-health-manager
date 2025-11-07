import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Badge,
  Avatar,
  Tooltip,
  Paper,
  Menu,
  MenuItem,
  Chip,
  Button,
  alpha,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  MedicalServices as MedicalIcon,
  Description as DocumentIcon,
  Medication as MedicationIcon,
  Psychology as AIIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ArrowForwardIos as ArrowIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings,
  Logout,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/index';
import { setSelectedProfile } from '../../store/slices/authSlice';
import ThemeSelector from '../ThemeSelector';

const drawerWidth = 240;

interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  avatar?: string;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'AI Health Assistant', icon: <AIIcon />, path: '/ai-chat' },
  { text: 'Profiles', icon: <PeopleIcon />, path: '/profiles' },
  { text: 'Medical Visits', icon: <MedicalIcon />, path: '/visits' },
  { text: 'Documents', icon: <DocumentIcon />, path: '/documents' },
  { text: 'Medications', icon: <MedicationIcon />, path: '/medications' },
];

const Layout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const { user, selectedProfile } = useAppSelector((state) => state.auth);

  // Mock profiles data - in real app this would come from API/store
  const [profiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      dateOfBirth: '1990-05-15',
      gender: 'Male',
      bloodType: 'O+',
    },
    {
      id: '2',
      name: 'Sarah Doe',
      email: 'sarah.doe@example.com',
      phone: '+1 234 567 8902',
      dateOfBirth: '1985-08-22',
      gender: 'Female',
      bloodType: 'A+',
    },
    {
      id: '3',
      name: 'Emily Doe',
      email: 'emily.doe@example.com',
      phone: '+1 234 567 8903',
      dateOfBirth: '2015-03-10',
      gender: 'Female',
      bloodType: 'B+',
    },
  ]);

  const isExpanded = sidebarOpen || isHovering;
  const isProfileMenuOpen = Boolean(profileMenuAnchor);

  // Initialize selected profile if not set in Redux
  useEffect(() => {
    if (!selectedProfile && profiles.length > 0) {
      dispatch(setSelectedProfile(profiles[0]));
    }
  }, [selectedProfile, profiles, dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDesktopSidebarToggle = () => {
    // Add sidebar toggle logic here
  };

  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleProfileSelect = (profile: Profile) => {
    dispatch(setSelectedProfile(profile));
    setProfileMenuAnchor(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    setProfileMenuAnchor(null);
  };

  
  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          px: 2,
          py: 2.5,
          borderBottom: '1px solid #e2e8f0',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            PH
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Family Health
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mx: 1,
                borderRadius: 2,
                minHeight: 48,
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? '#2563eb' : '#64748b',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: location.pathname === item.path ? 600 : 500,
                    fontSize: '0.875rem',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </Box>
      {/* Bottom Section with Status */}
      <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0' }}>
        <Chip
          label="Connected"
          size="small"
          sx={{
            bgcolor: alpha('#10b981', 0.1),
            color: '#059669',
            fontWeight: 500,
            fontSize: '0.75rem',
            width: '100%',
            '& .MuiChip-label': {
              width: '100%',
              textAlign: 'center',
            },
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)` },
          ml: { md: sidebarOpen ? `${drawerWidth}px` : 0 },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          background: 'linear-gradient(90deg, #ffffff 0%, #f8fafc 100%)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: 'none' },
              bgcolor: alpha('#2563eb', 0.08),
              color: '#2563eb',
              '&:hover': {
                bgcolor: alpha('#2563eb', 0.12),
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Box>
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  fontSize: '1.5rem',
                  background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Family Health Manager
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: 400,
                }}
              >
                Manage your family's health records and wellness journey
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Tooltip title="Notifications">
              <IconButton
                size="small"
                sx={{
                  bgcolor: alpha('#2563eb', 0.06),
                  color: '#2563eb',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: alpha('#2563eb', 0.1),
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <Badge
                  badgeContent={3}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.6rem',
                      height: 16,
                      minWidth: 16,
                    }
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: '1.25rem' }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <ThemeSelector />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Tooltip title="Profile Menu">
                <Button
                  onClick={handleProfileMenuClick}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    minHeight: 'auto',
                    textTransform: 'none',
                    bgcolor: alpha('#2563eb', 0.04),
                    color: '#1e293b',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha('#2563eb', 0.08),
                      transform: 'scale(1.02)',
                    }
                  }}
                  startIcon={
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {selectedProfile?.name?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                  }
                  endIcon={<ExpandMoreIcon sx={{ fontSize: '1rem' }} />}
                >
                  <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        lineHeight: 1.2,
                      }}
                    >
                      {selectedProfile?.name || 'Select Profile'}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 400, opacity: 0.8 }}>
                      {selectedProfile?.bloodType || '--'} • {selectedProfile?.gender || '--'}
                    </Typography>
                  </Box>
                </Button>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={profileMenuAnchor}
              open={isProfileMenuOpen}
              onClose={handleProfileMenuClose}
              onClick={handleProfileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  mt: 1.5,
                  minWidth: 280,
                  maxWidth: 320,
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.12)',
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {/* Profile Selector Header */}
              <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e2e8f0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                  Switch Profile
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Select a family member profile
                </Typography>
              </Box>

              {/* Profile List */}
              {profiles.map((profile) => (
                <MenuItem
                  key={profile.id}
                  onClick={() => handleProfileSelect(profile)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      bgcolor: alpha('#2563eb', 0.06),
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      mr: 2,
                      background: selectedProfile?.id === profile.id
                        ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                        : alpha('#64748b', 0.1),
                      color: selectedProfile?.id === profile.id ? 'white' : '#64748b',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {profile.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      {profile.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {profile.bloodType} • {profile.gender} • {profile.dateOfBirth}
                    </Typography>
                  </Box>
                  {selectedProfile?.id === profile.id && (
                    <Box sx={{ color: '#2563eb' }}>
                      <PersonIcon sx={{ fontSize: 20 }} />
                    </Box>
                  )}
                </MenuItem>
              ))}

              <Divider sx={{ my: 1, borderColor: '#e2e8f0' }} />

              {/* Menu Actions */}
              <MenuItem onClick={() => { navigate('/profiles'); handleProfileMenuClose(); }}>
                <ListItemIcon sx={{ color: '#64748b' }}>
                  <GroupIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Manage Profiles
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleProfileMenuClose(); }}>
                <ListItemIcon sx={{ color: '#64748b' }}>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Settings
                </Typography>
              </MenuItem>
              <Divider sx={{ my: 1, borderColor: '#e2e8f0' }} />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon sx={{ color: '#ef4444' }}>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#ef4444' }}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="persistent"
          open={sidebarOpen}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          width: { md: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ minHeight: 72 }} />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;