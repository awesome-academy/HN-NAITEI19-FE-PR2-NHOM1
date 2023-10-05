import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import CinemaSlice from './store/cinemaSlice';
import { apiService } from './apiService';
import filterReducer from './store/filterSlice';
import { bookingReducer } from './store/bookingSlice';

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    CinemaSlice,
    filter: filterReducer,
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
