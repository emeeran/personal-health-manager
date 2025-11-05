import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const MedicationsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Medications - Personal Health Manager</title>
      </Helmet>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Medications
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1">
            Medications management page - TODO: Implement medication tracking
            functionality
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default MedicationsPage;
