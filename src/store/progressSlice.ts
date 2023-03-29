import { createSlice } from '@reduxjs/toolkit';

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    pages: 1,
    curr: 1,
    next: 1,
  },
  reducers: {
    setInit: (state, action) => {
      state.pages = action.payload.pages;
      state.curr = action.payload.curr;
      state.next = action.payload.next;
    },
    updateCurr: (state, action) => {
      state.curr = action.payload;
    },
    updateNext: (state, action) => {
      state.next = action.payload;
    },
  },
});
export const progressReducer = progressSlice.reducer;
export const { setInit, updateCurr, updateNext } = progressSlice.actions;
