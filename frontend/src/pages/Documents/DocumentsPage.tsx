import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const DocumentsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Documents - Personal Health Manager</title>
      </Helmet>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Medical Documents
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1">
            Documents management page - TODO: Implement document upload and OCR
            functionality
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default DocumentsPage;
