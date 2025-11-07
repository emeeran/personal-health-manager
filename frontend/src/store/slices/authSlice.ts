import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../services/authAPI';

// Types
interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  selectedProfile: Profile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  selectedProfile: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authAPI.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || 'Login failed'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    userData: {
      email: string;
      password: string;
      first_name?: string;
      last_name?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await authAPI.register(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || 'Registration failed'
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const refresh_token = state.auth.refreshToken;

      if (!refresh_token) {
        throw new Error('No refresh token available');
      }

      const response = await authAPI.refreshToken(refresh_token);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || 'Token refresh failed'
      );
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      return {};
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || 'Logout failed'
      );
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;

      // Store tokens in localStorage
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.selectedProfile = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;

      // Remove tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setSelectedProfile: (state, action: PayloadAction<Profile | null>) => {
      state.selectedProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isAuthenticated = true;
        state.error = null;

        // Store tokens in localStorage
        localStorage.setItem('accessToken', action.payload.access_token);
        localStorage.setItem('refreshToken', action.payload.refresh_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isAuthenticated = true;
        state.error = null;

        // Store tokens in localStorage
        localStorage.setItem('accessToken', action.payload.access_token);
        localStorage.setItem('refreshToken', action.payload.refresh_token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Refresh Token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.error = null;

        // Store tokens in localStorage
        localStorage.setItem('accessToken', action.payload.access_token);
        localStorage.setItem('refreshToken', action.payload.refresh_token);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Clear credentials on refresh failure
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;

        // Remove tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;

        // Remove tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Still clear credentials even if logout API call fails
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;

        // Remove tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  },
});

export const { clearError, setCredentials, clearCredentials, setSelectedProfile } =
  authSlice.actions;
export default authSlice.reducer;
