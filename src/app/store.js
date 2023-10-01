import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authService } from '../features/auth/authService';
import CinemaSlice from '../features/theater/CinemaSlice';
import { eventService } from '../features/eventService';
import { apiService } from './apiService';
import filterReducer from '../features/admin/filterSlice';
import { userService } from '../features/admin/components/userTable/userService';
import { seatService } from '../features/ticket/seatService';

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [apiService.reducerPath]: apiService.reducer,
    CinemaSlice,
    [eventService.reducerPath]: eventService.reducer,
    filter: filterReducer,
    [userService.reducerPath]: userService.reducer,
    [seatService.reducerPath]: seatService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,
      eventService.middleware,
      apiService.middleware,
      userService.middleware,
      seatService.middleware,
    ]),
});
