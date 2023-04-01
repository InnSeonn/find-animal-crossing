import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { featureReducer } from './featureSlice';
import { progressReducer } from './progressSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { resultReducer } from './resultSlice';

const rootReducer = combineReducers({
  progress: progressReducer,
  feature: featureReducer,
  result: resultReducer,
});

const persistConfig = {
  key: 'root',
  storage, //localstorage
  whitelist: ['feature', 'result'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  //redux-toolkit이 생성한 action 객체(생성자 함수 형태)를 string으로 변환하기 위해
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
