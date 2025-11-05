import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const ProfilesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Profiles - Personal Health Manager</title>
      </Helmet>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Health Profiles
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1">
            Profiles management page - TODO: Implement profile management
            functionality
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default ProfilesPage;
