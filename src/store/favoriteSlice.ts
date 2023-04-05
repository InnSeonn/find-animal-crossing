import { createSlice } from '@reduxjs/toolkit';

type FavoriteStateType = {
  hobby: string[] | undefined;
  color: string[] | undefined;
  style: string[] | undefined;
};

const initialState: FavoriteStateType = {
  hobby: undefined,
  color: undefined,
  style: undefined,
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialState,
  reducers: {
    setHobby: (state, action) => {
      state.hobby = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setStyle: (state, action) => {
      state.style = action.payload;
    },
  },
});
export const favoriteReducer = favoriteSlice.reducer;
export const { setHobby, setColor, setStyle } = favoriteSlice.actions;
