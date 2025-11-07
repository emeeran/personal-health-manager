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
  Divider,
  Container,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  LocalHospital as HospitalIcon,
  Person as DoctorIcon,
  AccessTime as TimeIcon,
  Description as NotesIcon,
  Close as CloseIcon,
  MedicalServices as MedicalIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

interface MedicalVisit {
  id: string;
  profileId: string;
  profileName: string;
  date: string;
  time: string;
  type: 'checkup' | 'specialist' | 'emergency' | 'followup' | 'lab_test' | 'imaging' | 'vaccination';
  doctor: string;
  specialty: string;
  hospital: string;
  location: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  medications: string[];
  notes: string;
  followUpDate: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in_progress';
  cost: number;
  insurance: string;
  createdAt: string;
}

const VisitsPage: React.FC = () => {
  const [visits, setVisits] = useState<MedicalVisit[]>([
    {
      id: '1',
      profileId: '1',
      profileName: 'John Doe',
      date: '2024-01-15',
      time: '10:30 AM',
      type: 'checkup',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Internal Medicine',
      hospital: 'City Medical Center',
      location: '123 Main St, Suite 200, City, State 12345',
      reason: 'Annual health checkup and routine screening',
      diagnosis: 'Controlled hypertension, healthy overall condition',
      treatment: 'Continued current medication regimen, lifestyle counseling',
      medications: ['Lisinopril 10mg daily', 'Vitamin D3 1000 IU daily'],
      notes: 'Blood pressure well controlled at 120/80. Patient adhering to medication and diet plan. Follow up in 6 months.',
      followUpDate: '2024-07-15',
      status: 'completed',
      cost: 250,
      insurance: 'BlueCross BlueShield',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      profileId: '2',
      profileName: 'Sarah Doe',
      date: '2024-02-28',
      time: '2:00 PM',
      type: 'specialist',
      doctor: 'Dr. Michael Chen',
      specialty: 'Endocrinology',
      hospital: 'Specialty Care Hospital',
      location: '456 Oak Ave, Floor 3, City, State 12345',
      reason: 'Diabetes management follow-up',
      diagnosis: 'Type 2 diabetes, well-controlled with current treatment',
      treatment: 'Metformin continued, dietary adjustments recommended',
      medications: ['Metformin 500mg twice daily', 'Insulin glargine 10 units nightly'],
      notes: 'HbA1c improved to 6.8%. Continue current regimen. Patient educated on carbohydrate counting.',
      followUpDate: '2024-05-28',
      status: 'completed',
      cost: 350,
      insurance: 'Aetna',
      createdAt: '2024-02-20'
    },
    {
      id: '3',
      profileId: '1',
      profileName: 'John Doe',
      date: '2024-12-15',
      time: '11:00 AM',
      type: 'followup',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Internal Medicine',
      hospital: 'City Medical Center',
      location: '123 Main St, Suite 200, City, State 12345',
      reason: '6-month follow-up for hypertension',
      diagnosis: 'Pending',
      treatment: 'Pending',
      medications: [],
      notes: 'Routine follow-up visit scheduled',
      followUpDate: '',
      status: 'scheduled',
      cost: 0,
      insurance: 'BlueCross BlueShield',
      createdAt: '2024-11-01'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingVisit, setEditingVisit] = useState<MedicalVisit | null>(null);
  const [formData, setFormData] = useState<Partial<MedicalVisit>>({
    profileId: '',
    profileName: '',
    date: '',
    time: '',
    type: 'checkup',
    doctor: '',
    specialty: '',
    hospital: '',
    location: '',
    reason: '',
    diagnosis: '',
    treatment: '',
    medications: [],
    notes: '',
    followUpDate: '',
    status: 'scheduled',
    cost: 0,
    insurance: '',
  });

  const visitTypes = [
    { value: 'checkup', label: 'Annual Checkup' },
    { value: 'specialist', label: 'Specialist Visit' },
    { value: 'emergency', label: 'Emergency Room' },
    { value: 'followup', label: 'Follow-up Visit' },
    { value: 'lab_test', label: 'Lab Test' },
    { value: 'imaging', label: 'Imaging Study' },
    { value: 'vaccination', label: 'Vaccination' },
  ];

  const visitStatuses = [
    { value: 'scheduled', label: 'Scheduled', color: 'info' },
    { value: 'in_progress', label: 'In Progress', color: 'warning' },
    { value: 'completed', label: 'Completed', color: 'success' },
    { value: 'cancelled', label: 'Cancelled', color: 'error' },
  ];

  const profiles = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Sarah Doe' },
  ];

  const handleOpenDialog = (visit?: MedicalVisit) => {
    if (visit) {
      setEditingVisit(visit);
      setFormData(visit);
    } else {
      setEditingVisit(null);
      setFormData({
        profileId: '',
        profileName: '',
        date: '',
        time: '',
        type: 'checkup',
        doctor: '',
        specialty: '',
        hospital: '',
        location: '',
        reason: '',
        diagnosis: '',
        treatment: '',
        medications: [],
        notes: '',
        followUpDate: '',
        status: 'scheduled',
        cost: 0,
        insurance: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingVisit(null);
    setFormData({
      profileId: '',
      profileName: '',
      date: '',
      time: '',
      type: 'checkup',
      doctor: '',
      specialty: '',
      hospital: '',
      location: '',
      reason: '',
      diagnosis: '',
      treatment: '',
      medications: [],
      notes: '',
      followUpDate: '',
      status: 'scheduled',
      cost: 0,
      insurance: '',
    });
  };

  const handleSaveVisit = () => {
    if (editingVisit) {
      setVisits(visits.map(v =>
        v.id === editingVisit.id
          ? { ...v, ...formData, id: editingVisit.id }
          : v
      ));
    } else {
      const newVisit: MedicalVisit = {
        ...formData as MedicalVisit,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setVisits([...visits, newVisit]);
    }
    handleCloseDialog();
  };

  const handleDeleteVisit = (id: string) => {
    setVisits(visits.filter(v => v.id !== id));
  };

  const handleProfileChange = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    setFormData({
      ...formData,
      profileId,
      profileName: profile?.name || ''
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return <HospitalIcon color="error" />;
      case 'specialist':
        return <MedicalIcon color="primary" />;
      case 'lab_test':
      case 'imaging':
        return <MedicalIcon color="secondary" />;
      default:
        return <CalendarIcon color="action" />;
    }
  };

  const getStatusColor = (status: string) => {
    const statusConfig = visitStatuses.find(s => s.value === status);
    return statusConfig?.color || 'default';
  };

  const upcomingVisits = visits.filter(v => v.status === 'scheduled' || v.status === 'in_progress');
  const pastVisits = visits.filter(v => v.status === 'completed' || v.status === 'cancelled');

  return (
    <>
      <Helmet>
        <title>Medical Visits - Personal Health Manager</title>
      </Helmet>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Medical Visits
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ borderRadius: 2 }}
          >
            Schedule Visit
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Track and manage medical appointments, visit history, diagnoses, and treatments
            for all family members. Keep comprehensive records of healthcare interactions.
          </Typography>
        </Alert>

        {/* Upcoming Visits */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventIcon color="primary" />
            Upcoming Visits
          </Typography>
          <Grid container spacing={3}>
            {upcomingVisits.map((visit) => (
              <Grid item xs={12} md={6} lg={4} key={visit.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease-in-out',
                    border: visit.status === 'in_progress' ? 2 : 1,
                    borderColor: visit.status === 'in_progress' ? 'warning.main' : 'divider',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getTypeIcon(visit.type)}
                        <Typography variant="h6" component="h2">
                          {visit.type === 'checkup' ? 'Annual Checkup' :
                           visit.type === 'specialist' ? 'Specialist Visit' :
                           visit.type === 'emergency' ? 'Emergency' :
                           visit.type === 'followup' ? 'Follow-up' :
                           visit.type === 'lab_test' ? 'Lab Test' :
                           visit.type === 'imaging' ? 'Imaging' : 'Vaccination'}
                        </Typography>
                      </Box>
                      <Chip
                        label={visit.status === 'scheduled' ? 'Scheduled' : 'In Progress'}
                        color={getStatusColor(visit.status) as any}
                        size="small"
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
                          {visit.profileName.charAt(0)}
                        </Avatar>
                        {visit.profileName}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <CalendarIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {visit.date} at {visit.time}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <DoctorIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        Dr. {visit.doctor}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <MedicalIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {visit.specialty}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <HospitalIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {visit.hospital}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {visit.location}
                      </Typography>
                    </Box>

                    {visit.reason && (
                      <Box sx={{ mb: 2, p: 1.5, bgcolor: 'info.light', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          Reason for Visit:
                        </Typography>
                        <Typography variant="body2">
                          {visit.reason}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => handleOpenDialog(visit)}
                      size="small"
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteVisit(visit.id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Past Visits */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon color="action" />
            Visit History
          </Typography>
          <Grid container spacing={3}>
            {pastVisits.map((visit) => (
              <Grid item xs={12} md={6} lg={4} key={visit.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease-in-out',
                    opacity: visit.status === 'cancelled' ? 0.7 : 1,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getTypeIcon(visit.type)}
                        <Typography variant="h6" component="h2">
                          {visit.type === 'checkup' ? 'Annual Checkup' :
                           visit.type === 'specialist' ? 'Specialist Visit' :
                           visit.type === 'emergency' ? 'Emergency' :
                           visit.type === 'followup' ? 'Follow-up' :
                           visit.type === 'lab_test' ? 'Lab Test' :
                           visit.type === 'imaging' ? 'Imaging' : 'Vaccination'}
                        </Typography>
                      </Box>
                      <Chip
                        label={visit.status === 'completed' ? 'Completed' : 'Cancelled'}
                        color={getStatusColor(visit.status) as any}
                        size="small"
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
                          {visit.profileName.charAt(0)}
                        </Avatar>
                        {visit.profileName}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <CalendarIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {visit.date} at {visit.time}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <DoctorIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        Dr. {visit.doctor}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <MedicalIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {visit.specialty}
                      </Typography>
                    </Box>

                    {visit.diagnosis && (
                      <Box sx={{ mb: 2, p: 1.5, bgcolor: 'success.light', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          Diagnosis:
                        </Typography>
                        <Typography variant="body2">
                          {visit.diagnosis}
                        </Typography>
                      </Box>
                    )}

                    {visit.treatment && (
                      <Box sx={{ mb: 2, p: 1.5, bgcolor: 'primary.light', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          Treatment:
                        </Typography>
                        <Typography variant="body2">
                          {visit.treatment}
                        </Typography>
                      </Box>
                    )}

                    {visit.medications.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          Medications Prescribed:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {visit.medications.map((medication, index) => (
                            <Chip
                              key={index}
                              label={medication}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => handleOpenDialog(visit)}
                      size="small"
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteVisit(visit.id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Add/Edit Visit Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingVisit ? 'Edit Visit' : 'Schedule New Visit'}
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
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Visit Type</InputLabel>
                    <Select
                      value={formData.type || ''}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      label="Visit Type"
                    >
                      {visitTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Time"
                    type="time"
                    value={formData.time || ''}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Doctor Name"
                    value={formData.doctor || ''}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Specialty"
                    value={formData.specialty || ''}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Hospital/Clinic"
                    value={formData.hospital || ''}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    sx={{ mb: 2 }}
                    placeholder="123 Main St, Suite 200, City, State 12345"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Reason for Visit"
                    multiline
                    rows={2}
                    value={formData.reason || ''}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Diagnosis"
                    multiline
                    rows={2}
                    value={formData.diagnosis || ''}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Treatment Plan"
                    multiline
                    rows={2}
                    value={formData.treatment || ''}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Follow-up Date"
                    type="date"
                    value={formData.followUpDate || ''}
                    onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status || ''}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      label="Status"
                    >
                      {visitStatuses.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cost ($)"
                    type="number"
                    value={formData.cost || ''}
                    onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Insurance"
                    value={formData.insurance || ''}
                    onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={3}
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSaveVisit}
              variant="contained"
              disabled={!formData.profileId || !formData.doctor || !formData.date}
            >
              {editingVisit ? 'Update' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="schedule visit"
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

export default VisitsPage;
