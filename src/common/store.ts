import searchReducer from '@features/search/searchSlice';
import {
  type Action,
  configureStore,
  type PreloadedState,
  StateFromReducersMapObject,
  type ThunkAction,
} from '@reduxjs/toolkit';

const reducer = {
  search: searchReducer,
};

export type AppState = StateFromReducersMapObject<typeof reducer>;

export function makeStore(preloadedState?: PreloadedState<AppState>) {
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

export default store;
