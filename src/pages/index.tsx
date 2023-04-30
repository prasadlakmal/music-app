import React, { useEffect, useState } from 'react';
import CircularIndeterminate from '@components/circular-indeterminate';
import SearchResult from '@features/search/search-result';
import { reset, searchAsync, selectSearch } from '@features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import useDebounce from '@hooks/useDebounce';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import { Alert, AppBar, InputProps, TextField, Toolbar } from '@mui/material';
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
  const shouldSendSearchRequest = !!searchTerm.length;

  useEffect(() => {
    if (shouldSendSearchRequest) {
      dispatch(searchAsync({ term: debouncedSearchTerm, limit }));
    }
  }, [debouncedSearchTerm, dispatch, limit, shouldSendSearchRequest]);

  const handleTextChange: InputProps['onChange'] = (e) => {
    const value = e.target.value.trim();
    if (!value) {
      dispatch(reset());
      setLimit(DEFAULT_LIMIT);
      setSearchTerm('');
    } else {
      setSearchTerm(e.target.value);
    }
  };

  const endReached = () => {
    if (!reachedLastPage) setLimit((currentLimit) => currentLimit + 10);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <TextField onChange={handleTextChange} />
        </Toolbar>
      </AppBar>
      <main>
        {showLoadingSpinner && <CircularIndeterminate />}
        {showIdleMessage && (
          <Alert
            icon={false}
            sx={{ justifyContent: 'center', paddingTop: '10px' }}
          >
            Welcome to iTunes music search!
          </Alert>
        )}
        {showFailedMessage && (
          <Alert
            icon={false}
            sx={{ justifyContent: 'center', paddingTop: '10px' }}
            severity="error"
          >
            {message}
          </Alert>
        )}
        {showResults && <SearchResult data={results} endReached={endReached} />}
      </main>
    </>
  );
};

export default IndexPage;
