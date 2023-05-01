import searchReducer from '@features/search/searchSlice';
import {
  type Action,
  configureStore,
  type PreloadedState,
  StateFromReducersMapObject,
  type ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const reducer = {
  search: searchReducer,
};

export type AppState = StateFromReducersMapObject<typeof reducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeStore(preloadedState?: PreloadedState<any>) {
  return configureStore({
    reducer,
    preloadedState,
  });
}

const store = makeStore();

export type AppStore = typeof store;

export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });
