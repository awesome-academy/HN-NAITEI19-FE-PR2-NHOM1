import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movie: null,
  showtime: null,
  seats: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
    setShowtime: (state, action) => {
      state.showtime = action.payload;
    },
    setSeats: (state, action) => {
      state.seats = action.payload;
    },
    resetState: (state, action) => {
      state = initialState;
    },
  },
});

export const bookingReducer = bookingSlice.reducer;
export const { setMovie, setShowtime, setSeats, resetState } =
  bookingSlice.actions;
