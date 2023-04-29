import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { SearchQueryParams, SearchResponse } from './searchApi';
import { fetchSearchResult } from './searchApi';
import type { AppState } from 'src/common/store';

const MAX_LIMIT = 200;

interface SearchState {
  results: SearchResponse['results'];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  reachedEnd: boolean;
}

const initialState = {
  results: [],
  loading: 'idle',
  reachedEnd: false,
} as SearchState;

export const searchAsync = createAsyncThunk<SearchResponse, SearchQueryParams>(
  'search',
  async (params) => {
    const response = await fetchSearchResult(params);
    // The value we return becomes the `fulfilled` action payload

    console.log('responseeeeee', response);
    return response;
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        console.log('fulfilled ', action.payload);
        state.loading = 'succeeded';
        if (action.payload.resultCount === MAX_LIMIT) {
          state.reachedEnd = true;
        }
        state.results = action.payload.results;
      });
  },
});

export const selectSearch = (state: AppState) => state.search;

export default searchSlice.reducer;
