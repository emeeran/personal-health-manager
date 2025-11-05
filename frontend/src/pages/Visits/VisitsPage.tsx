import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const VisitsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Medical Visits - Personal Health Manager</title>
      </Helmet>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Medical Visits
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1">
            Medical visits management page - TODO: Implement visit tracking
            functionality
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default VisitsPage;
