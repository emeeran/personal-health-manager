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
  Avatar,
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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  MedicalServices as MedicalIcon,
  Favorite as HeartIcon,
  LocalHospital as HospitalIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  primaryPhysician: string;
  createdAt: string;
}

const ProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      dateOfBirth: '1990-05-15',
      gender: 'Male',
      bloodType: 'O+',
      allergies: ['Peanuts', 'Penicillin'],
      medications: ['Lisinopril', 'Metformin'],
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1 234 567 8901'
      },
      primaryPhysician: 'Dr. Smith',
      createdAt: '2023-01-15'
    },
    {
      id: '2',
      name: 'Sarah Doe',
      email: 'sarah.doe@example.com',
      phone: '+1 234 567 8902',
      dateOfBirth: '1985-08-22',
      gender: 'Female',
      bloodType: 'A+',
      allergies: ['Shellfish'],
      medications: ['Vitamin D', 'Calcium'],
      conditions: ['Osteoporosis'],
      emergencyContact: {
        name: 'John Doe',
        relationship: 'Husband',
        phone: '+1 234 567 8900'
      },
      primaryPhysician: 'Dr. Johnson',
      createdAt: '2023-02-20'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Partial<Profile>>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    allergies: [],
    medications: [],
    conditions: [],
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    primaryPhysician: ''
  });

  const handleOpenDialog = (profile?: Profile) => {
    if (profile) {
      setEditingProfile(profile);
      setFormData(profile);
    } else {
      setEditingProfile(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        bloodType: '',
        allergies: [],
        medications: [],
        conditions: [],
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        },
        primaryPhysician: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProfile(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      bloodType: '',
      allergies: [],
      medications: [],
      conditions: [],
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      },
      primaryPhysician: ''
    });
  };

  const handleSaveProfile = () => {
    if (editingProfile) {
      setProfiles(profiles.map(p =>
        p.id === editingProfile.id
          ? { ...p, ...formData, id: editingProfile.id }
          : p
      ));
    } else {
      const newProfile: Profile = {
        ...formData as Profile,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProfiles([...profiles, newProfile]);
    }
    handleCloseDialog();
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles(profiles.filter(p => p.id !== id));
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other'];

  return (
    <>
      <Helmet>
        <title>Health Profiles - Personal Health Manager</title>
      </Helmet>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Health Profiles
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ borderRadius: 2 }}
          >
            Add Profile
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Manage health profiles for family members. Each profile stores medical history,
            allergies, medications, and emergency contact information.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {profiles.map((profile) => (
            <Grid item xs={12} sm={6} md={4} key={profile.id}>
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        mr: 2,
                        bgcolor: 'primary.main',
                        fontSize: '1.2rem'
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="h2">
                        {profile.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {profile.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Birth Date:</strong> {profile.dateOfBirth}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Gender:</strong> {profile.gender}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Blood Type:</strong>
                      <Chip
                        label={profile.bloodType}
                        size="small"
                        color="error"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Phone:</strong> {profile.phone}
                    </Typography>
                  </Box>

                  {profile.allergies.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        <HeartIcon sx={{ fontSize: 16, mr: 0.5, color: 'error' }} />
                        Allergies:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {profile.allergies.map((allergy, index) => (
                          <Chip
                            key={index}
                            label={allergy}
                            size="small"
                            color="error"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {profile.medications.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        <MedicalIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary' }} />
                        Medications:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {profile.medications.map((medication, index) => (
                          <Chip
                            key={index}
                            label={medication}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {profile.emergencyContact && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        <PhoneIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        Emergency Contact
                      </Typography>
                      <Typography variant="body2">
                        {profile.emergencyContact.name} ({profile.emergencyContact.relationship})
                      </Typography>
                      <Typography variant="body2">
                        {profile.emergencyContact.phone}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => handleOpenDialog(profile)}
                    size="small"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteProfile(profile.id)}
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

        {/* Add/Edit Profile Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingProfile ? 'Edit Profile' : 'Add New Profile'}
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
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={formData.gender || ''}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      label="Gender"
                    >
                      {genders.map((gender) => (
                        <MenuItem key={gender} value={gender}>
                          {gender}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Blood Type</InputLabel>
                    <Select
                      value={formData.bloodType || ''}
                      onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                      label="Blood Type"
                    >
                      {bloodTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Primary Physician"
                    value={formData.primaryPhysician || ''}
                    onChange={(e) => setFormData({ ...formData, primaryPhysician: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Emergency Contact
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Contact Name"
                    value={formData.emergencyContact?.name || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      emergencyContact: {
                        ...formData.emergencyContact,
                        name: e.target.value
                      }
                    })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Relationship"
                    value={formData.emergencyContact?.relationship || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      emergencyContact: {
                        ...formData.emergencyContact,
                        relationship: e.target.value
                      }
                    })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Contact Phone"
                    value={formData.emergencyContact?.phone || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      emergencyContact: {
                        ...formData.emergencyContact,
                        phone: e.target.value
                      }
                    })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSaveProfile}
              variant="contained"
              disabled={!formData.name || !formData.phone}
            >
              {editingProfile ? 'Update' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add profile"
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

export default ProfilesPage;
