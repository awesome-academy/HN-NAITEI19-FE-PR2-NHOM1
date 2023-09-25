import { createSlice } from "@reduxjs/toolkit";

const cinemaSlice = createSlice({
  name: "cinema",
  initialState: { cinema: "Beta Thái Nguyên" },
  reducers: {
    selectCinema: (state, action) => {
      state.cinema = action.payload;
    },
  },
});

export const { selectCinema } = cinemaSlice.actions;
export default cinemaSlice.reducer;
