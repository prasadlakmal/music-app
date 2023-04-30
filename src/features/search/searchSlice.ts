import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AppState } from 'src/common/store';

import { fetchSearchResult } from './searchApi';
import type {
  Result,
  SearchQueryParams,
  SearchResponse,
  Status,
} from './types';

const MAX_LIMIT = 200;

interface SearchState {
  results: Result[];
  status: Status;
  reachedLastPage: boolean;
  message: string;
}

const initialState = {
  results: [],
  status: 'idle',
  reachedLastPage: false,
  message: '',
} as SearchState;

export const searchAsync = createAsyncThunk<SearchResponse, SearchQueryParams>(
  'search',
  async (params, thunkApi) => {
    try {
      const response = await fetchSearchResult(params);
      return response;
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(searchAsync.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        if (payload.resultCount === MAX_LIMIT) {
          state.reachedLastPage = true;
        }
        if (payload.resultCount === 0) {
          state.status = 'no-data';
          state.message = 'No resutls were found';
        }
        state.results = payload.results;
      })
      .addCase(searchAsync.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.message = payload as string;
      });
  },
});

export const { reset } = searchSlice.actions;

export const selectSearch = (state: AppState) => state.search;

export default searchSlice.reducer;
