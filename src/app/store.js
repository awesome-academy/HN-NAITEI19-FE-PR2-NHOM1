import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authService } from '../features/auth/authService';

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authService.middleware),
});
