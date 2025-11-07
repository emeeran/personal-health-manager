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
  Card,
  CardContent,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  PeopleAlt as PeopleAltIcon,
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Event as EventIcon,
  MedicalServices as MedicalServicesIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setMetrics, setLoading, setError } from '../../store/slices/dashboardSlice';
import { logout } from '../../store/slices/authSlice';
import { setSelectedProfile } from '../../store/slices/profilesSlice';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { metrics, loading, error } = useSelector((state: RootState) => state.dashboard);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { profiles, selectedProfile } = useSelector((state: RootState) => state.profiles);

  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // Simulate loading dashboard data
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setMetrics({
        totalVisits: 12,
        activeMedications: 3,
        totalDocuments: 8,
        lastVisitDate: '2024-11-01',
        upcomingAppointments: [
          { id: 1, date: '2024-11-15', type: 'Check-up', doctor: 'Dr. Smith' },
          { id: 2, date: '2024-12-01', type: 'Follow-up', doctor: 'Dr. Johnson' }
        ],
        hba1c: [
          { date: '2024-01-01', value: 7.2 },
          { date: '2024-04-01', value: 6.8 },
          { date: '2024-07-01', value: 6.5 },
          { date: '2024-10-01', value: 6.3 }
        ],
        recentActivity: [
          { id: 1, type: 'visit', description: 'Annual check-up completed', date: '2024-11-01' },
          { id: 2, type: 'medication', description: 'Updated prescription', date: '2024-10-28' },
          { id: 3, type: 'document', description: 'Lab results uploaded', date: '2024-10-25' }
        ]
      }));
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  
  const handleRefresh = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setMetrics({
        totalVisits: 12,
        activeMedications: 3,
        totalDocuments: 8,
        lastVisitDate: '2024-11-01',
        upcomingAppointments: [
          { id: 1, date: '2024-11-15', type: 'Check-up', doctor: 'Dr. Smith' },
          { id: 2, date: '2024-12-01', type: 'Follow-up', doctor: 'Dr. Johnson' }
        ],
        hba1c: [
          { date: '2024-01-01', value: 7.2 },
          { date: '2024-04-01', value: 6.8 },
          { date: '2024-07-01', value: 6.5 },
          { date: '2024-10-01', value: 6.3 }
        ],
        recentActivity: [
          { id: 1, type: 'visit', description: 'Annual check-up completed', date: '2024-11-01' },
          { id: 2, type: 'medication', description: 'Updated prescription', date: '2024-10-28' },
          { id: 3, type: 'document', description: 'Lab results uploaded', date: '2024-10-25' }
        ]
      }));
      dispatch(setLoading(false));
    }, 1000);
  };

  const handleClearError = () => {
    dispatch(setError(null));
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
      setUserMenuAnchor(null);
    } catch (error) {
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
    setProfileMenuAnchor(null);
    handleRefresh();
  };

  const getHealthScore = (metrics: any): number => {
    if (!metrics) return 0;
    let score = 0;
    let total = 100;

    // Visit regularity (30%)
    if (metrics.totalVisits > 0) {
      score += Math.min(30, (metrics.totalVisits / 12) * 30);
    }

    // Document organization (25%)
    if (metrics.totalDocuments > 0) {
      score += Math.min(25, (metrics.totalDocuments / 20) * 25);
    }

    // Medication management (25%)
    if (metrics.activeMedications > 0) {
      score += Math.min(25, (metrics.activeMedications / 5) * 25);
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

  return (
    <>
      <Helmet>
        <title>Health Dashboard - Personal Health Manager</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, maxWidth: '1400px', mx: 'auto' }}>
        {/* Modern Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 0.5,
              }}
            >
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
          <>
            {/* Welcome Message */}
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

            {/* Modern Metrics Overview */}
            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        <MedicalServicesIcon sx={{ fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            mb: 0.5,
                          }}
                        >
                          {metrics.totalVisits}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#64748b',
                            fontWeight: 500,
                          }}
                        >
                          Total Visits
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        <AssessmentIcon sx={{ fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            mb: 0.5,
                          }}
                        >
                          {metrics.activeMedications}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#64748b',
                            fontWeight: 500,
                          }}
                        >
                          Active Medications
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        <DescriptionIcon sx={{ fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            mb: 0.5,
                          }}
                        >
                          {metrics.totalDocuments}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#64748b',
                            fontWeight: 500,
                          }}
                        >
                          Documents
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        <EventIcon sx={{ fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            mb: 0.5,
                          }}
                        >
                          {metrics.upcomingAppointments.length}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#64748b',
                            fontWeight: 500,
                          }}
                        >
                          Upcoming Appointments
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Enhanced Upcoming Appointments & Recent Activity */}
            <Grid container spacing={3} mb={3}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={3}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        <EventIcon sx={{ fontSize: 20 }} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        Upcoming Appointments
                      </Typography>
                    </Box>
                    {metrics.upcomingAppointments.map((appointment: any, index: number) => (
                      <Box
                        key={appointment.id}
                        sx={{
                          py: 2,
                          px: 2,
                          mb: 1,
                          borderRadius: 2,
                          background: index % 2 === 0 ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                          border: '1px solid #f1f5f9',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <Typography variant="body1" fontWeight={600} color="primary.main" mb={0.5}>
                          {appointment.type}
                        </Typography>
                        <Typography variant="body2" fontWeight={500} color="text.primary" mb={0.5}>
                          {appointment.doctor}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {appointment.date}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={3}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        <TimelineIcon sx={{ fontSize: 20 }} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        Recent Activity
                      </Typography>
                    </Box>
                    {metrics.recentActivity.map((activity: any, index: number) => (
                      <Box
                        key={activity.id}
                        sx={{
                          py: 2,
                          px: 2,
                          mb: 1,
                          borderRadius: 2,
                          background: index % 2 === 0 ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                          border: '1px solid #dcfce7',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <Typography variant="body2" fontWeight={600} color="success.main" mb={0.5}>
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </Typography>
                        <Typography variant="body2" fontWeight={500} color="text.primary" mb={0.5}>
                          {activity.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.date}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Enhanced HbA1c Trends */}
            <Card
              sx={{
                mb: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <AssessmentIcon sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    HbA1c Trends
                  </Typography>
                </Box>
                <Box display="flex" gap={2} overflow="auto" sx={{ pt: 1 }}>
                  {metrics.hba1c.map((reading: any, index: number) => (
                    <Box
                      key={index}
                      textAlign="center"
                      minWidth={100}
                      sx={{
                        animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                        '@keyframes slideIn': {
                          from: {
                            opacity: 0,
                            transform: 'translateX(-20px)',
                          },
                          to: {
                            opacity: 1,
                            transform: 'translateX(0)',
                          },
                        },
                      }}
                    >
                      <Card
                        sx={{
                          p: 2,
                          background: reading.value < 7
                            ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)'
                            : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                          border: reading.value < 7
                            ? '1px solid #86efac'
                            : '1px solid #fcd34d',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px) scale(1.05)',
                            boxShadow: reading.value < 7
                              ? '0px 8px 20px rgba(34, 197, 94, 0.3)'
                              : '0px 8px 20px rgba(245, 158, 11, 0.3)',
                          },
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: reading.value < 7 ? '#166534' : '#92400e',
                            mb: 0.5,
                          }}
                        >
                          {reading.value}%
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: reading.value < 7 ? '#15803d' : '#b45309',
                            fontWeight: 500,
                          }}
                        >
                          {reading.date}
                        </Typography>
                      </Card>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </>
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
                `${(profile as any).age || 'Unknown'} years old`
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

export default DashboardPage;