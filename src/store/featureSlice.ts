import { createSlice } from '@reduxjs/toolkit';

type FeatureStateType = {
  gender: string[] | undefined;
  species: string[] | undefined;
  personality: string[] | undefined;
};

const initialState: FeatureStateType = {
  gender: ['여자', '남자'],
  species: undefined,
  personality: undefined,
};

const featureSlice = createSlice({
  name: 'feature',
  initialState: initialState,
  reducers: {
    setSpecies: (state, action) => {
      state.species = action.payload;
    },
    setPersonality: (state, action) => {
      state.personality = action.payload;
    },
  },
});
export const featureReducer = featureSlice.reducer;
export const { setSpecies, setPersonality } = featureSlice.actions;
