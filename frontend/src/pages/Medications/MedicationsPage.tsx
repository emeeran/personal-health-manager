import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Container,
  LinearProgress,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Menu,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Medication as MedIcon,
  Schedule as ScheduleIcon,
  LocalPharmacy as PharmacyIcon,
  Alarm as AlarmIcon,
  CheckCircle as CompletedIcon,
  Cancel as MissedIcon,
  Event as CalendarIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  CalendarToday as DateIcon,
  AccessTime as TimeIcon,
  Science as LabIcon,
  HealthAndSafety as SafetyIcon,
  Notes as NotesIcon,
  MoreVert as MoreVertIcon,
  NotificationsActive as NotificationIcon,
  NotificationsOff as NotificationOffIcon,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Medication {
  id: string;
  profileId: string;
  profileName: string;
  name: string;
  genericName: string;
  brandName: string;
  dosage: string;
  frequency: string;
  route: 'oral' | 'topical' | 'injection' | 'inhalation' | 'other';
  strength: string;
  form: 'tablet' | 'capsule' | 'liquid' | 'cream' | 'inhaler' | 'other';
  prescriber: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  purpose: string;
  instructions: string;
  sideEffects: string[];
  contraindications: string[];
  interactions: string[];
  refills: {
    current: number;
    total: number;
    lastFilled: string;
    nextRefillDate: string;
  };
  pharmacy: {
    name: string;
    phone: string;
    address: string;
  };
  notes: string;
  adherence: {
    taken: number;
    scheduled: number;
    percentage: number;
  };
  reminderEnabled: boolean;
  reminderTimes: string[];
  createdAt: string;
}

interface MedicationLog {
  id: string;
  medicationId: string;
  scheduledTime: string;
  takenTime?: string;
  status: 'scheduled' | 'taken' | 'missed' | 'skipped';
  notes?: string;
}

const MedicationsPage: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      profileId: '1',
      profileName: 'John Doe',
      name: 'Lisinopril',
      genericName: 'Lisinopril',
      brandName: 'Zestril',
      dosage: '10mg',
      frequency: 'Once daily',
      route: 'oral',
      strength: '10 mg',
      form: 'tablet',
      prescriber: 'Dr. Sarah Johnson',
      startDate: '2024-01-15',
      isActive: true,
      purpose: 'Blood pressure control',
      instructions: 'Take with or without food. Do not stop taking without consulting doctor.',
      sideEffects: ['Dry cough', 'Dizziness', 'Headache'],
      contraindications: ['Pregnancy', 'Angioedema history'],
      interactions: ['Potassium supplements', 'NSAIDs'],
      refills: {
        current: 8,
        total: 12,
        lastFilled: '2024-02-01',
        nextRefillDate: '2024-05-01'
      },
      pharmacy: {
        name: 'CVS Pharmacy',
        phone: '(555) 123-4567',
        address: '123 Main St, City, State 12345'
      },
      notes: 'Take in the morning. Monitor blood pressure regularly.',
      adherence: {
        taken: 45,
        scheduled: 50,
        percentage: 90
      },
      reminderEnabled: true,
      reminderTimes: ['08:00'],
      createdAt: '2024-01-15T09:00:00Z'
    },
    {
      id: '2',
      profileId: '2',
      profileName: 'Sarah Doe',
      name: 'Metformin',
      genericName: 'Metformin hydrochloride',
      brandName: 'Glucophage',
      dosage: '500mg',
      frequency: 'Twice daily',
      route: 'oral',
      strength: '500 mg',
      form: 'tablet',
      prescriber: 'Dr. Michael Chen',
      startDate: '2023-06-01',
      isActive: true,
      purpose: 'Type 2 diabetes management',
      instructions: 'Take with meals to reduce gastrointestinal side effects.',
      sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset'],
      contraindications: ['Kidney disease', 'Metabolic acidosis'],
      interactions: ['Contrast media', 'Excessive alcohol'],
      refills: {
        current: 15,
        total: 20,
        lastFilled: '2024-02-15',
        nextRefillDate: '2024-04-15'
      },
      pharmacy: {
        name: 'Walgreens',
        phone: '(555) 987-6543',
        address: '456 Oak Ave, City, State 12345'
      },
      notes: 'Monitor blood glucose levels. Report any lactic acidosis symptoms.',
      adherence: {
        taken: 85,
        scheduled: 90,
        percentage: 94
      },
      reminderEnabled: true,
      reminderTimes: ['08:00', '20:00'],
      createdAt: '2023-06-01T10:30:00Z'
    },
    {
      id: '3',
      profileId: '2',
      profileName: 'Sarah Doe',
      name: 'Insulin Glargine',
      genericName: 'Insulin glargine',
      brandName: 'Lantus',
      dosage: '10 units',
      frequency: 'Once daily',
      route: 'injection',
      strength: '100 units/mL',
      form: 'other',
      prescriber: 'Dr. Michael Chen',
      startDate: '2023-06-01',
      isActive: true,
      purpose: 'Blood sugar control',
      instructions: 'Inject subcutaneously at the same time each day, usually at bedtime.',
      sideEffects: ['Hypoglycemia', 'Weight gain', 'Injection site reactions'],
      contraindications: ['Hypoglycemia'],
      interactions: ['Other diabetes medications', 'Beta blockers'],
      refills: {
        current: 2,
        total: 3,
        lastFilled: '2024-02-20',
        nextRefillDate: '2024-03-20'
      },
      pharmacy: {
        name: 'Walgreens',
        phone: '(555) 987-6543',
        address: '456 Oak Ave, City, State 12345'
      },
      notes: 'Rotate injection sites. Always have fast-acting glucose available.',
      adherence: {
        taken: 42,
        scheduled: 45,
        percentage: 93
      },
      reminderEnabled: true,
      reminderTimes: ['22:00'],
      createdAt: '2023-06-01T11:00:00Z'
    }
  ]);

  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>([
    {
      id: '1',
      medicationId: '1',
      scheduledTime: '2024-03-10T08:00:00Z',
      takenTime: '2024-03-10T08:15:00Z',
      status: 'taken',
      notes: 'Taken with breakfast'
    },
    {
      id: '2',
      medicationId: '2',
      scheduledTime: '2024-03-10T08:00:00Z',
      takenTime: '2024-03-10T08:05:00Z',
      status: 'taken'
    },
    {
      id: '3',
      medicationId: '2',
      scheduledTime: '2024-03-10T20:00:00Z',
      status: 'scheduled'
    },
    {
      id: '4',
      medicationId: '3',
      scheduledTime: '2024-03-09T22:00:00Z',
      status: 'missed'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string>('all');
  const [showInactive, setShowInactive] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const [formData, setFormData] = useState<Partial<Medication>>({
    profileId: '',
    profileName: '',
    name: '',
    genericName: '',
    brandName: '',
    dosage: '',
    frequency: '',
    route: 'oral',
    strength: '',
    form: 'tablet',
    prescriber: '',
    startDate: '',
    endDate: '',
    isActive: true,
    purpose: '',
    instructions: '',
    sideEffects: [],
    contraindications: [],
    interactions: [],
    pharmacy: {
      name: '',
      phone: '',
      address: ''
    },
    notes: '',
    reminderEnabled: true,
    reminderTimes: [],
  });

  const routeOptions = [
    { value: 'oral', label: 'Oral' },
    { value: 'topical', label: 'Topical' },
    { value: 'injection', label: 'Injection' },
    { value: 'inhalation', label: 'Inhalation' },
    { value: 'other', label: 'Other' },
  ];

  const formOptions = [
    { value: 'tablet', label: 'Tablet' },
    { value: 'capsule', label: 'Capsule' },
    { value: 'liquid', label: 'Liquid' },
    { value: 'cream', label: 'Cream' },
    { value: 'inhaler', label: 'Inhaler' },
    { value: 'other', label: 'Other' },
  ];

  const frequencyOptions = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'Four times daily',
    'Every 4 hours',
    'Every 6 hours',
    'Every 8 hours',
    'Every 12 hours',
    'Weekly',
    'Monthly',
    'As needed',
  ];

  const profiles = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Sarah Doe' },
  ];

  const handleOpenDialog = (medication?: Medication) => {
    if (medication) {
      setEditingMedication(medication);
      setFormData(medication);
    } else {
      setEditingMedication(null);
      setFormData({
        profileId: '',
        profileName: '',
        name: '',
        genericName: '',
        brandName: '',
        dosage: '',
        frequency: '',
        route: 'oral',
        strength: '',
        form: 'tablet',
        prescriber: '',
        startDate: '',
        endDate: '',
        isActive: true,
        purpose: '',
        instructions: '',
        sideEffects: [],
        contraindications: [],
        interactions: [],
        pharmacy: {
          name: '',
          phone: '',
          address: ''
        },
        notes: '',
        reminderEnabled: true,
        reminderTimes: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMedication(null);
  };

  const handleSaveMedication = () => {
    if (editingMedication) {
      setMedications(medications.map(m =>
        m.id === editingMedication.id
          ? { ...m, ...formData, id: editingMedication.id }
          : m
      ));
    } else {
      const newMedication: Medication = {
        ...formData as Medication,
        id: Date.now().toString(),
        refills: {
          current: 0,
          total: 12,
          lastFilled: new Date().toISOString().split('T')[0],
          nextRefillDate: ''
        },
        adherence: {
          taken: 0,
          scheduled: 0,
          percentage: 0
        },
        createdAt: new Date().toISOString(),
      };
      setMedications([...medications, newMedication]);
    }
    handleCloseDialog();
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const handleProfileChange = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    setFormData({
      ...formData,
      profileId,
      profileName: profile?.name || ''
    });
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, medication: Medication) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedMedication(medication);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMedication(null);
  };

  const getAdherenceColor = (percentage: number) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 75) return 'warning';
    return 'error';
  };

  const getRefillStatus = (refills: Medication['refills']) => {
    const percentage = (refills.current / refills.total) * 100;
    if (percentage <= 25) return { status: 'Refill Soon', color: 'error' };
    if (percentage <= 50) return { status: 'Refill Recommended', color: 'warning' };
    return { status: 'Adequate', color: 'success' };
  };

  const filteredMedications = medications.filter(med => {
    const matchesProfile = selectedProfile === 'all' || med.profileId === selectedProfile;
    const matchesActive = showInactive || med.isActive;
    return matchesProfile && matchesActive;
  });

  const activeMedications = filteredMedications.filter(med => med.isActive);
  const inactiveMedications = filteredMedications.filter(med => !med.isActive);

  const upcomingDoses = medicationLogs
    .filter(log => log.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime())
    .slice(0, 5);

  return (
    <>
      <Helmet>
        <title>Medications - Personal Health Manager</title>
      </Helmet>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Medications
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ borderRadius: 2 }}
          >
            Add Medication
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Track medications, set reminders, monitor adherence, and manage refills.
            Get alerts for potential drug interactions and refill reminders.
          </Typography>
        </Alert>

        {/* Upcoming Doses */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AlarmIcon color="primary" />
            Upcoming Doses
          </Typography>
          <Grid container spacing={2}>
            {upcomingDoses.map((dose) => {
              const medication = medications.find(m => m.id === dose.medicationId);
              if (!medication) return null;
              return (
                <Grid item xs={12} sm={6} md={4} key={dose.id}>
                  <Card sx={{
                    p: 2,
                    border: 1,
                    borderColor: 'primary.main',
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                          {medication.name}
                        </Typography>
                        <Typography variant="body2">
                          {medication.profileName} • {medication.dosage}
                        </Typography>
                        <Typography variant="caption">
                          {new Date(dose.scheduledTime).toLocaleTimeString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" variant="contained" color="success">
                          <CompletedIcon />
                        </Button>
                        <Button size="small" variant="outlined" color="error">
                          <MissedIcon />
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Profile</InputLabel>
                <Select
                  value={selectedProfile}
                  onChange={(e) => setSelectedProfile(e.target.value)}
                  label="Profile"
                >
                  <MenuItem value="all">All Profiles</MenuItem>
                  {profiles.map((profile) => (
                    <MenuItem key={profile.id} value={profile.id}>
                      {profile.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showInactive}
                    onChange={(e) => setShowInactive(e.target.checked)}
                  />
                }
                label="Show Inactive Medications"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Active Medications */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MedIcon color="success" />
            Active Medications ({activeMedications.length})
          </Typography>
          <Grid container spacing={3}>
            {activeMedications.map((medication) => {
              const refillStatus = getRefillStatus(medication.refills);
              return (
                <Grid item xs={12} md={6} lg={4} key={medication.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <MedIcon color="primary" />
                          <Typography variant="h6" component="h2">
                            {medication.name}
                          </Typography>
                        </Box>
                        <Chip
                          label="Active"
                          color="success"
                          size="small"
                        />
                      </Box>

                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        <Avatar sx={{ width: 20, height: 20, mr: 1, fontSize: '0.75rem' }}>
                          {medication.profileName.charAt(0)}
                        </Avatar>
                        {medication.profileName}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Dosage:</strong> {medication.dosage} - {medication.frequency}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Form:</strong> {medication.form} ({medication.route})
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Prescriber:</strong> {medication.prescriber}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Pharmacy:</strong> {medication.pharmacy.name}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<NotificationIcon />}
                          label={medication.reminderEnabled ? 'Reminders ON' : 'Reminders OFF'}
                          color={medication.reminderEnabled ? 'success' : 'default'}
                          size="small"
                        />
                        <Chip
                          label={`Refills: ${medication.refills.current}/${medication.refills.total}`}
                          color={refillStatus.color as any}
                          size="small"
                        />
                      </Box>

                      <Accordion sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="body2">
                            Adherence: {medication.adherence.percentage}%
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ width: '100%' }}>
                            <LinearProgress
                              variant="determinate"
                              value={medication.adherence.percentage}
                              color={getAdherenceColor(medication.adherence.percentage) as any}
                              sx={{ mb: 1 }}
                            />
                            <Typography variant="caption">
                              Taken {medication.adherence.taken} of {medication.adherence.scheduled} scheduled doses
                            </Typography>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </CardContent>
                    <CardActions>
                      <IconButton size="small" color="primary">
                        <ScheduleIcon />
                      </IconButton>
                      <IconButton size="small" color="secondary">
                        <PharmacyIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleMenuClick(event as any, medication)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Inactive Medications */}
        {showInactive && inactiveMedications.length > 0 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MedIcon color="action" />
              Inactive Medications ({inactiveMedications.length})
            </Typography>
            <Grid container spacing={3}>
              {inactiveMedications.map((medication) => (
                <Grid item xs={12} md={6} lg={4} key={medication.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.2s ease-in-out',
                      opacity: 0.7,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <MedIcon color="action" />
                          <Typography variant="h6" component="h2">
                            {medication.name}
                          </Typography>
                        </Box>
                        <Chip
                          label="Inactive"
                          color="default"
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        <Avatar sx={{ width: 20, height: 20, mr: 1, fontSize: '0.75rem' }}>
                          {medication.profileName.charAt(0)}
                        </Avatar>
                        {medication.profileName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {medication.dosage} • {medication.frequency}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        size="small"
                        onClick={() => handleMenuClick(event as any, medication)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: { minWidth: 200 }
          }}
        >
          <MenuItem onClick={() => {
            if (selectedMedication) {
              handleOpenDialog(selectedMedication);
            }
            handleMenuClose();
          }}>
            <EditIcon sx={{ mr: 1 }} />
            Edit Medication
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              if (selectedMedication) {
                setMedications(medications.map(m =>
                  m.id === selectedMedication.id ? { ...m, isActive: !m.isActive } : m
                ));
              }
              handleMenuClose();
            }}
          >
            {selectedMedication?.isActive ? <InfoIcon sx={{ mr: 1 }} /> : <MedIcon sx={{ mr: 1 }} />}
            {selectedMedication?.isActive ? 'Mark as Inactive' : 'Mark as Active'}
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (selectedMedication) {
                handleDeleteMedication(selectedMedication.id);
              }
              handleMenuClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon sx={{ mr: 1 }} />
            Delete Medication
          </MenuItem>
        </Menu>

        {/* Add/Edit Medication Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingMedication ? 'Edit Medication' : 'Add New Medication'}
            <IconButton
              onClick={handleCloseDialog}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Profile</InputLabel>
                    <Select
                      value={formData.profileId || ''}
                      onChange={(e) => handleProfileChange(e.target.value)}
                      label="Profile"
                    >
                      {profiles.map((profile) => (
                        <MenuItem key={profile.id} value={profile.id}>
                          {profile.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Medication Name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Generic Name"
                    value={formData.genericName || ''}
                    onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Brand Name"
                    value={formData.brandName || ''}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Dosage"
                    value={formData.dosage || ''}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    sx={{ mb: 2 }}
                    placeholder="e.g., 10mg"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Frequency</InputLabel>
                    <Select
                      value={formData.frequency || ''}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                      label="Frequency"
                    >
                      {frequencyOptions.map((freq) => (
                        <MenuItem key={freq} value={freq}>
                          {freq}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Route</InputLabel>
                    <Select
                      value={formData.route || ''}
                      onChange={(e) => setFormData({ ...formData, route: e.target.value as any })}
                      label="Route"
                    >
                      {routeOptions.map((route) => (
                        <MenuItem key={route.value} value={route.value}>
                          {route.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Prescriber"
                    value={formData.prescriber || ''}
                    onChange={(e) => setFormData({ ...formData, prescriber: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={formData.startDate || ''}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Purpose"
                    value={formData.purpose || ''}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Instructions"
                    multiline
                    rows={2}
                    value={formData.instructions || ''}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Pharmacy Name"
                    value={formData.pharmacy?.name || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pharmacy: { ...formData.pharmacy!, name: e.target.value }
                    })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isActive || false}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                    }
                    label="Active Medication"
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSaveMedication}
              variant="contained"
              disabled={!formData.profileId || !formData.name}
            >
              {editingMedication ? 'Update' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add medication"
          onClick={() => handleOpenDialog()}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
        >
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
};

export default MedicationsPage;
