import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Import slices
import authSlice from './slices/authSlice';
import profilesSlice from './slices/profilesSlice';
import visitsSlice from './slices/visitsSlice';
import documentsSlice from './slices/documentsSlice';
import medicationsSlice from './slices/medicationsSlice';
import dashboardSlice from './slices/dashboardSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profiles: profilesSlice,
    visits: visitsSlice,
    documents: documentsSlice,
    medications: medicationsSlice,
    dashboard: dashboardSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredPaths: ['register'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
