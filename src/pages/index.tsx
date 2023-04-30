import React, { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { searchAsync, selectSearch } from '@features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import useDebounce from '@hooks/useDebounce';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import {
  AppBar,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Toolbar,
} from '@mui/material';
import type { NextPage } from 'next';

const MUIComponents = {
  // eslint-disable-next-line react/display-name
  List: React.forwardRef(({ style, children }, listRef) => {
    return (
      <List
        style={{ padding: 0, ...style, margin: 0 }}
        component="div"
        ref={listRef}
      >
        {children}
      </List>
    );
  }),

  Item: ({ children, ...props }) => {
    return (
      <ListItem component="div" {...props} style={{ margin: 0 }}>
        {children}
      </ListItem>
    );
  },
  Footer: (props) => {
    return (
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Loading...
      </div>
    );
  },
  EmptyPlaceholder: () => <div>Emptyyyyy</div>,
};

const IndexPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [limit, setLimit] = useState(10);

  const dispatch = useAppDispatch();
  const { results, reachedLastPage } = useAppSelector(selectSearch);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchAsync({ term: debouncedSearchTerm, limit }));
    }
  }, [debouncedSearchTerm, dispatch, limit]);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <TextField onChange={(e) => setSearchTerm(e.target.value)} />
        </Toolbar>
      </AppBar>
      <main>
        <Virtuoso
          style={{ height: 795 }}
          data={results}
          endReached={() => {
            if (!reachedLastPage) setLimit((currentLimit) => currentLimit + 10);
          }}
          overscan={200}
          components={MUIComponents}
          itemContent={(index, result) => {
            return (
              <>
                <ListItemAvatar>
                  <Avatar src={result.artworkUrl100} />
                </ListItemAvatar>

                <ListItemText
                  primary={result.trackName}
                  secondary={<span>{result.artistName}</span>}
                />
              </>
            );
          }}
        />
      </main>
    </>
  );
};

export default IndexPage;
