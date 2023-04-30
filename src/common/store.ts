import searchReducer from '@features/search/searchSlice';
import {
  type Action,
  configureStore,
  type ThunkAction,
} from '@reduxjs/toolkit';

export function makeStore() {
  return configureStore({
    reducer: { search: searchReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
