import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { searchString: '' },
  reducers: {
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

const filterReducer = filterSlice.reducer;

export default filterReducer;
export const { setSearchString } = filterSlice.actions;
