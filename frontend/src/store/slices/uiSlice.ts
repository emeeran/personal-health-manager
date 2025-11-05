import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  currentPage: string;
  loading: boolean;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  };
  selectedProfileId: string | null;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  sidebarOpen: true,
  currentPage: 'dashboard',
  loading: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
  selectedProfileId: null,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        severity?: 'success' | 'error' | 'warning' | 'info';
      }>
    ) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
    setSelectedProfileId: (state, action: PayloadAction<string | null>) => {
      state.selectedProfileId = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setCurrentPage,
  setLoading,
  showSnackbar,
  hideSnackbar,
  setSelectedProfileId,
  toggleTheme,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
