import type { NextPage } from 'next';
import Head from 'next/head';

import { Copyright } from '@mui/icons-material';
import {
  Box,
  Typography,
  TextField,
  AppBar,
  Toolbar,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  ListItem,
} from '@mui/material';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import React, { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { searchAsync, selectSearch } from '@features/search/searchSlice';
import useDebounce from '@hooks/useDebounce';

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
  Footer: () => {
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
};

const IndexPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 500);
  const [limit, setLimit] = useState(10);

  const dispatch = useAppDispatch();
  const { results } = useAppSelector(selectSearch);

  useEffect(() => {
    if (debouncedValue) {
      dispatch(searchAsync({ term: debouncedValue, limit }));
    }
  }, [debouncedValue, dispatch, limit]);

  return (
    <>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          endReached={() => setLimit((currentLimit) => currentLimit + 10)}
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
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper' }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
};

export default IndexPage;
