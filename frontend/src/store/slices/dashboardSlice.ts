import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardMetrics {
  totalVisits: number;
  activeMedications: number;
  totalDocuments: number;
  lastVisitDate?: string;
  upcomingAppointments: any[];
  hba1c: Array<{ date: string; value: number }>;
  recentActivity: any[];
}

interface DashboardState {
  metrics: DashboardMetrics | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  metrics: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<DashboardMetrics>) => {
      state.metrics = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateMetrics: (
      state,
      action: PayloadAction<Partial<DashboardMetrics>>
    ) => {
      if (state.metrics) {
        state.metrics = { ...state.metrics, ...action.payload };
      }
    },
  },
});

export const { setMetrics, setLoading, setError, updateMetrics } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
