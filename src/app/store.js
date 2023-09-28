import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authService } from '../features/auth/authService';
import { movieService } from '../features/list/movieService';
import { showtimeService } from '../features/list/showtimeService';
import CinemaSlice from '../features/theater/CinemaSlice';
import { eventService } from '../features/eventService';
import { apiService } from './apiService';
import filterReducer from '../features/admin/filterSlice';

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [apiService.reducerPath]: apiService.reducer,
    CinemaSlice,
    [eventService.reducerPath]: eventService.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,
      eventService.middleware,
      apiService.middleware,
    ]),
});
