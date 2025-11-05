import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Components
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Pages
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProfilesPage from './pages/Profiles/ProfilesPage';
import VisitsPage from './pages/Visits/VisitsPage';
import DocumentsPage from './pages/Documents/DocumentsPage';
import MedicationsPage from './pages/Medications/MedicationsPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profiles" element={<ProfilesPage />} />
          <Route path="visits" element={<VisitsPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="medications" element={<MedicationsPage />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
}

export default App;
