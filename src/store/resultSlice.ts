import { createSlice } from '@reduxjs/toolkit';
import { VillagerType } from 'villagers';

type ResultObjType = {
  key: string;
  data: VillagerType[];
};
type ResultStateType = {
  feature: ResultObjType | undefined;
  birthday: ResultObjType | undefined;
  favorite: ResultObjType | undefined;
};

const initialState: ResultStateType = {
  feature: undefined,
  birthday: undefined,
  favorite: undefined,
};

const resultSlice = createSlice({
  name: 'result',
  initialState: initialState,
  reducers: {
    setFeature: (state, action) => {
      state.feature = action.payload;
    },
    setBirthday: (state, action) => {
      state.birthday = action.payload;
    },
    setFavorite: (state, action) => {
      state.favorite = action.payload;
    },
  },
});

export const resultReducer = resultSlice.reducer;
export const { setFeature, setBirthday, setFavorite } = resultSlice.actions;
