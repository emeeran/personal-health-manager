import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MedicalVisit {
  id: string;
  profile_id: string;
  visit_date: string;
  visit_type?: string;
  provider_name?: string;
  chief_complaint?: string;
  diagnosis: any[];
  prescriptions: any[];
  notes?: string;
}

interface VisitsState {
  visits: MedicalVisit[];
  selectedVisit: MedicalVisit | null;
  loading: boolean;
  error: string | null;
}

const initialState: VisitsState = {
  visits: [],
  selectedVisit: null,
  loading: false,
  error: null,
};

const visitsSlice = createSlice({
  name: 'visits',
  initialState,
  reducers: {
    setVisits: (state, action: PayloadAction<MedicalVisit[]>) => {
      state.visits = action.payload;
    },
    setSelectedVisit: (state, action: PayloadAction<MedicalVisit | null>) => {
      state.selectedVisit = action.payload;
    },
    addVisit: (state, action: PayloadAction<MedicalVisit>) => {
      state.visits.unshift(action.payload);
    },
    updateVisit: (state, action: PayloadAction<MedicalVisit>) => {
      const index = state.visits.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) {
        state.visits[index] = action.payload;
      }
      if (state.selectedVisit?.id === action.payload.id) {
        state.selectedVisit = action.payload;
      }
    },
    removeVisit: (state, action: PayloadAction<string>) => {
      state.visits = state.visits.filter((v) => v.id !== action.payload);
      if (state.selectedVisit?.id === action.payload) {
        state.selectedVisit = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setVisits,
  setSelectedVisit,
  addVisit,
  updateVisit,
  removeVisit,
  setLoading,
  setError,
} = visitsSlice.actions;

export default visitsSlice.reducer;
