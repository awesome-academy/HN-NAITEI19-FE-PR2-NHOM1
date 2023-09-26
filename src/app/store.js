import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authService } from '../features/auth/authService';
import { movieService } from '../features/list/movieService';
import { showtimeService } from '../features/list/showtimeService';
import CinemaSlice from '../features/theater/CinemaSlice';

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [movieService.reducerPath]: movieService.reducer,
    [showtimeService.reducerPath]: showtimeService.reducer,
    CinemaSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,
      movieService.middleware,
      showtimeService.middleware,
    ]),
});
