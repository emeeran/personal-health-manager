import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const DashboardPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - Personal Health Manager</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Health Dashboard
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Welcome to Personal Health Manager
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is the main dashboard where you'll be able to:
          </Typography>
          <ul>
            <li>View your medical history timeline</li>
            <li>Track chronic conditions and medications</li>
            <li>Upload and organize medical documents</li>
            <li>Monitor health metrics and trends</li>
            <li>Chat with AI health assistant</li>
          </ul>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Dashboard functionality will be implemented in Phase 1.
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Development Status
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The application is currently in development. This is a placeholder
            dashboard. Full functionality including charts, metrics, and health
            insights will be available once the backend implementation is
            complete.
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default DashboardPage;
