import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Alert,
  Breadcrumbs,
  Link as RouterLink
} from '@mui/material';
import { Navigate } from 'react-router-dom';

import AIChatInterface from '../components/ai/AIChatInterface';
import { useAppSelector } from '../store';

const AIChatPage: React.FC = () => {
  const { user, selectedProfile } = useAppSelector((state) => state.auth);

  // Show message if no profile is selected
  if (!selectedProfile) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Typography
            component={RouterLink}
            color="inherit"
            to="/dashboard"
            style={{ textDecoration: 'none' }}
          >
            Dashboard
          </Typography>
          <Typography color="text.primary">AI Health Assistant</Typography>
        </Breadcrumbs>

        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            Please select a profile to access the AI Health Assistant.
          </Alert>
          <Typography variant="h6" gutterBottom>
            Step 1: Go to Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Select or create a health profile from the dashboard
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography
              component={RouterLink}
              to="/dashboard"
              variant="body2"
              color="primary"
              sx={{ cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none' }}
            >
              → Go to Dashboard to Select Profile
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Typography
          component={RouterLink}
          color="inherit"
          to="/dashboard"
          style={{ textDecoration: 'none' }}
        >
          Dashboard
        </Typography>
        <Typography color="text.primary">AI Health Assistant</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          AI Health Assistant
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Get personalized health insights, understand your medical records, and receive general health guidance.
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Important:</strong> This AI assistant provides general health information and is not a substitute
          for professional medical advice. Always consult with qualified healthcare providers for medical decisions.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ height: 600, borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)' }}>
            <AIChatInterface profileId={selectedProfile.id} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AIChatPage;