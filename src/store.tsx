import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    pages: 1,
    curr: 1,
    next: 1,
  },
  reducers: {
    set: (state, action) => {
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
export const { set, updateCurr, updateNext } = progressSlice.actions;

const rootReducer = combineReducers({
  progress: progressSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
