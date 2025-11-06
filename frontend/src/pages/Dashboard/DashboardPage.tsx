import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Button,
  Fab,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  PeopleAlt as PeopleAltIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  fetchAllDashboardData,
  clearError,
  fetchDashboardMetrics,
} from '../../store/slices/dashboardSlice';
import { logout } from '../../store/slices/authSlice';
import { fetchProfiles, setCurrentProfile } from '../../store/slices/profileSlice';
import { setSelectedProfile } from '../../store/slices/profilesSlice';
import { useNavigate } from 'react-router-dom';
import HealthMetricsOverview from '../../components/dashboard/HealthMetricsOverview';
import HealthTrendsChart from '../../components/dashboard/HealthTrendsChart';
import HealthAlerts from '../../components/dashboard/HealthAlerts';
import RecentActivities from '../../components/dashboard/RecentActivities';
import HealthProfileOverview from '../../components/dashboard/HealthProfileOverview';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { metrics, stats, alerts, trends, recentActivities, loading, error } =
    useSelector((state: RootState) => state.dashboard);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { profiles, selectedProfile } = useSelector((state: RootState) => state.profiles);

  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    dispatch(fetchAllDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfiles());
    }
  }, [dispatch, isAuthenticated]);

  const handleRefresh = () => {
    dispatch(fetchAllDashboardData());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
      setUserMenuAnchor(null);
    } catch (error) {
      // Even if API call fails, redirect to login
      navigate('/login');
      setUserMenuAnchor(null);
    }
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleSelectProfile = (profile: any) => {
    dispatch(setSelectedProfile(profile));
    dispatch(setCurrentProfile(profile));
    setProfileMenuAnchor(null);
    // Refresh dashboard data for the new profile
    dispatch(fetchAllDashboardData());
  };

  return (
    <>
      <Helmet>
        <title>Health Dashboard - Personal Health Manager</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h4" component="h1">
              Health Dashboard
            </Typography>
            {/* Profile Selector */}
            {selectedProfile ? (
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Typography variant="body2" color="text.secondary">
                  Viewing profile for:
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleProfileMenuOpen}
                  startIcon={<PersonIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  {selectedProfile.name}
                  {selectedProfile.is_primary_profile && (
                    <Chip
                      label="Primary"
                      size="small"
                      sx={{ ml: 1 }}
                      color="primary"
                    />
                  )}
                </Button>
                {profiles.length > 1 && (
                  <Tooltip title="Switch Profile">
                    <IconButton size="small" onClick={handleProfileMenuOpen}>
                      <PeopleAltIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            ) : profiles.length > 0 ? (
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Typography variant="body2" color="text.secondary">
                  No profile selected
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleProfileMenuOpen}
                  startIcon={<PersonIcon />}
                >
                  Select Profile
                </Button>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Typography variant="body2" color="text.secondary">
                  No profiles available
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate('/profiles')}
                  startIcon={<PersonIcon />}
                >
                  Create Profile
                </Button>
              </Box>
            )}
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Refresh Dashboard">
              <IconButton onClick={handleRefresh} disabled={loading}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Tooltip title="User Menu">
              <IconButton onClick={handleUserMenuOpen}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {user?.first_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            action={
              <Button color="inherit" size="small" onClick={handleClearError}>
                Dismiss
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && !metrics && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              Loading your health data...
            </Typography>
          </Paper>
        )}

        {/* Dashboard Content */}
        {!loading && metrics && (
          <Grid container spacing={3}>
            {/* Health Metrics Overview */}
            <Grid item xs={12}>
              <HealthMetricsOverview metrics={metrics} loading={loading} />
            </Grid>

            {/* Health Trends Charts */}
            <Grid item xs={12}>
              <HealthTrendsChart
                metrics={metrics}
                stats={stats}
                trends={trends}
                loading={loading}
              />
            </Grid>

            {/* Health Alerts and Profile */}
            <Grid item xs={12} md={8}>
              <HealthAlerts alerts={alerts} loading={loading} />
            </Grid>
            <Grid item xs={12} md={4}>
              <HealthProfileOverview
                stats={stats}
                loading={loading}
                onEditProfile={() => {
                  // Navigate to profile page
                  window.location.href = '/profiles';
                }}
              />
            </Grid>

            {/* Recent Activities */}
            <Grid item xs={12}>
              <RecentActivities
                activities={recentActivities}
                loading={loading}
              />
            </Grid>
          </Grid>
        )}

        {/* Quick Actions */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: { xs: 'flex', sm: 'none' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Fab
            color="primary"
            aria-label="refresh"
            onClick={handleRefresh}
            disabled={loading}
            size="medium"
          >
            <RefreshIcon />
          </Fab>
          <Fab
            color="secondary"
            aria-label="edit profile"
            onClick={() => {
              window.location.href = '/profiles';
            }}
            size="small"
          >
            <EditIcon />
          </Fab>
          <Fab
            color="default"
            aria-label="settings"
            onClick={() => {
              window.location.href = '/settings';
            }}
            size="small"
          >
            <SettingsIcon />
          </Fab>
        </Box>

        {/* Welcome Message */}
        {!loading && metrics && (
          <Box mb={3}>
            <Paper
              sx={{
                p: 3,
                bgcolor: 'primary.light',
                border: 1,
                borderColor: 'primary.main',
              }}
            >
              <Typography variant="h6" color="primary.dark" gutterBottom>
                Welcome to Your Health Dashboard! 🏥
              </Typography>
              <Typography variant="body1" color="primary.dark">
                Your health score is <strong>{getHealthScore(metrics)}%</strong>
                .{getHealthScoreText(getHealthScore(metrics))}
              </Typography>
              <Typography variant="body2" color="primary.dark" sx={{ mt: 1 }}>
                Track your health journey with comprehensive insights into your
                medical history, medications, and wellness trends.
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>

      {/* Profile Selection Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: { minWidth: 250 }
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Select Profile
          </Typography>
        </Box>
        {profiles.map((profile) => (
          <MenuItem
            key={profile.id}
            onClick={() => handleSelectProfile(profile)}
            selected={selectedProfile?.id === profile.id}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary={profile.name}
              secondary={
                profile.is_primary_profile ? 'Primary Profile' :
                `${profile.age || 'Unknown'} years old`
              }
            />
            {selectedProfile?.id === profile.id && (
              <Chip label="Active" size="small" color="primary" />
            )}
          </MenuItem>
        ))}
        {profiles.length === 0 && (
          <MenuItem disabled>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="No profiles available"
              secondary="Create a profile to get started"
            />
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => { navigate('/profiles'); handleProfileMenuClose(); }}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Profiles" />
        </MenuItem>
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        PaperProps={{
          sx: { minWidth: 200 }
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" noWrap>
            {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.email}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user?.email}
          </Typography>
        </Box>
        <MenuItem onClick={() => { navigate('/profiles'); handleUserMenuClose(); }}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="My Profiles" />
        </MenuItem>
        <MenuItem onClick={() => { navigate('/settings'); handleUserMenuClose(); }}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

// Helper functions
const getHealthScore = (metrics: any): number => {
  if (!metrics) return 0;
  let score = 0;
  let total = 100;

  // Visit regularity (30%)
  if (metrics.totalVisits > 0) {
    score += Math.min(30, (metrics.totalVisits / 12) * 30); // Max 12 visits per year
  }

  // Document organization (25%)
  if (metrics.totalDocuments > 0) {
    score += Math.min(25, (metrics.totalDocuments / 20) * 25); // Max 20 documents
  }

  // Medication management (25%)
  if (metrics.activeMedications > 0) {
    score += Math.min(25, (metrics.activeMedications / 5) * 25); // Max 5 medications
  }

  // Appointments (20%)
  if (metrics.upcomingAppointments.length > 0) {
    score += 20;
  }

  return Math.round((score / total) * 100);
};

const getHealthScoreText = (score: number): string => {
  if (score >= 80) return 'Excellent health management!';
  if (score >= 60) return 'Good progress on health goals.';
  if (score >= 40) return 'Room for improvement in health tracking.';
  return "Let's work together on better health management.";
};

export default DashboardPage;