import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Profile {
  id: string;
  name: string;
  date_of_birth?: string;
  gender?: string;
  blood_group?: string;
  chronic_conditions: string[];
  allergies: string[];
  is_primary_profile: boolean;
}

interface ProfilesState {
  profiles: Profile[];
  selectedProfile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfilesState = {
  profiles: [],
  selectedProfile: null,
  loading: false,
  error: null,
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setProfiles: (state, action: PayloadAction<Profile[]>) => {
      state.profiles = action.payload;
    },
    setSelectedProfile: (state, action: PayloadAction<Profile | null>) => {
      state.selectedProfile = action.payload;
    },
    addProfile: (state, action: PayloadAction<Profile>) => {
      state.profiles.push(action.payload);
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      const index = state.profiles.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
      if (state.selectedProfile?.id === action.payload.id) {
        state.selectedProfile = action.payload;
      }
    },
    removeProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter((p) => p.id !== action.payload);
      if (state.selectedProfile?.id === action.payload) {
        state.selectedProfile = null;
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
  setProfiles,
  setSelectedProfile,
  addProfile,
  updateProfile,
  removeProfile,
  setLoading,
  setError,
} = profilesSlice.actions;

export default profilesSlice.reducer;
