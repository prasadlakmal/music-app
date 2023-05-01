import React, { useEffect, useState } from 'react';
import CircularIndeterminate from '@components/circular-indeterminate';
import SearchResult from '@features/search/search-result';
import { reset, searchAsync, selectSearch } from '@features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import useDebounce from '@hooks/useDebounce';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Alert, AppBar, InputProps, TextField, Toolbar } from '@mui/material';
import isNewSearchQuery from '@utils/search';
import type { NextPage } from 'next';

const DEBOUNCE_DELAY = 500;
const DEFAULT_LIMIT = 10;

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);

  const { results, reachedLastPage, status, message } =
    useAppSelector(selectSearch);

  const showIdleMessage = status === 'idle';
  const showLoadingSpinner = results.length === 0 && status === 'pending';
  const showFailedMessage = status === 'failed' || status === 'no-data';
  const showResults =
    !showIdleMessage && !showLoadingSpinner && !showFailedMessage;
  const shouldSendSearchRequest =
    !!searchTerm.trim().length && !!debouncedSearchTerm.trim().length;

  useEffect(() => {
    if (shouldSendSearchRequest) {
      dispatch(searchAsync({ term: debouncedSearchTerm, limit }));
    }
  }, [debouncedSearchTerm, dispatch, limit, shouldSendSearchRequest]);

  const handleTextChange: InputProps['onChange'] = (e) => {
    const value = e.target.value;
    if (!value.trim()) {
      dispatch(reset());
    }
    if (isNewSearchQuery(searchTerm, value)) {
      setLimit(DEFAULT_LIMIT);
    }
    setSearchTerm(value);
  };

  const endReached = () => {
    if (!reachedLastPage) setLimit((currentLimit) => currentLimit + 10);
  };

  const alertString = () => {
    if (showIdleMessage) {
      return 'Welcome to iTunes music search!';
    }
    if (showFailedMessage) {
      return message;
    }
    return '';
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <LibraryMusicIcon sx={{ mr: 2 }} />
          <TextField
            sx={{ bgcolor: 'white', width: 500 }}
            onChange={handleTextChange}
            label="Search for songs, albums or artists"
            variant="filled"
          />
        </Toolbar>
      </AppBar>
      <main>
        {showLoadingSpinner && <CircularIndeterminate />}
        {(showIdleMessage || showFailedMessage) && (
          <Alert
            icon={false}
            sx={{ justifyContent: 'center', mt: 2 }}
            severity={showFailedMessage ? 'error' : 'info'}
          >
            {alertString()}
          </Alert>
        )}
        {showResults && (
          <SearchResult
            data={results}
            endReached={endReached}
            showFooter={status === 'pending'}
          />
        )}
      </main>
    </>
  );
};

export default IndexPage;
