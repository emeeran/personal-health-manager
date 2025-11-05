import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Medication {
  id: string;
  profile_id: string;
  name: string;
  dosage?: string;
  frequency?: string;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  prescribing_doctor?: string;
  instructions?: string;
}

interface MedicationsState {
  medications: Medication[];
  selectedMedication: Medication | null;
  loading: boolean;
  error: string | null;
}

const initialState: MedicationsState = {
  medications: [],
  selectedMedication: null,
  loading: false,
  error: null,
};

const medicationsSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    setMedications: (state, action: PayloadAction<Medication[]>) => {
      state.medications = action.payload;
    },
    setSelectedMedication: (
      state,
      action: PayloadAction<Medication | null>
    ) => {
      state.selectedMedication = action.payload;
    },
    addMedication: (state, action: PayloadAction<Medication>) => {
      state.medications.unshift(action.payload);
    },
    updateMedication: (state, action: PayloadAction<Medication>) => {
      const index = state.medications.findIndex(
        (m) => m.id === action.payload.id
      );
      if (index !== -1) {
        state.medications[index] = action.payload;
      }
      if (state.selectedMedication?.id === action.payload.id) {
        state.selectedMedication = action.payload;
      }
    },
    removeMedication: (state, action: PayloadAction<string>) => {
      state.medications = state.medications.filter(
        (m) => m.id !== action.payload
      );
      if (state.selectedMedication?.id === action.payload) {
        state.selectedMedication = null;
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
  setMedications,
  setSelectedMedication,
  addMedication,
  updateMedication,
  removeMedication,
  setLoading,
  setError,
} = medicationsSlice.actions;

export default medicationsSlice.reducer;
