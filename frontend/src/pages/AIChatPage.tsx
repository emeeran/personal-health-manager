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
import AIHealthInsights from '../components/ai/AIHealthInsights';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const AIChatPage: React.FC = () => {
  const { user, selectedProfile } = useSelector((state: RootState) => state.auth);

  // Show message if no profile is selected
  if (!selectedProfile) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <RouterLink color="inherit" to="/dashboard">
            Dashboard
          </RouterLink>
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
            <RouterLink to="/dashboard" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                → Go to Dashboard to Select Profile
              </Typography>
            </RouterLink>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <RouterLink color="inherit" to="/dashboard">
          Dashboard
        </RouterLink>
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
        <Grid item xs={12} lg={8}>
          <Paper sx={{ height: 600 }}>
            <AIChatInterface profileId={selectedProfile.id} />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AIHealthInsights profileId={selectedProfile.id} />

            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Quick Tips
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Ask about medication interactions or side effects
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Request explanations for lab results
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Get general health information and wellness tips
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Understand preparation for medical appointments
                </Typography>
              </Box>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Disclaimer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The AI assistant provides general health information and educational content.
                It cannot diagnose conditions, prescribe treatments, or replace professional medical advice.
                Always consult with qualified healthcare providers for medical decisions and treatment.
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AIChatPage;