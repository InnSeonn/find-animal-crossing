import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { featureReducer } from './featureSlice';
import { progressReducer } from './progressSlice';

const rootReducer = combineReducers({
  progress: progressReducer,
  feature: featureReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
