import type { NextPage } from 'next';
import Head from 'next/head';

import { Copyright } from '@mui/icons-material';
import {
  Box,
  Typography,
  TextField,
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Toolbar,
} from '@mui/material';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import React, { useState, useCallback, useEffect } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import styled from '@emotion/styled';

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ItemContainer = styled.div`
  padding: 0.5rem;
  width: 33%;
  display: flex;
  flex: none;
  align-content: stretch;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 300px) {
    width: 100%;
  }
`;

const ItemWrapper = styled.div`
  flex: 1;
  text-align: center;
  font-size: 80%;
  padding: 1rem 1rem;
  border: 1px solid var(gray);
  white-space: nowrap;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function generateUsers(length: number, startIndex = 0) {
  return Array.from({ length }).map((_, i) => `${startIndex}: ${i}`);
}

const IndexPage: NextPage = () => {
  const [users, setUsers] = useState<string[]>(() => []);

  const loadMore = useCallback(() => {
    return setTimeout(() => {
      setUsers((users) => [...users, ...generateUsers(100, users.length)]);
    }, 200);
  }, [setUsers]);

  useEffect(() => {
    const timeout = loadMore();
    return () => clearTimeout(timeout);
  }, [loadMore]);

  return (
    <>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="sticky">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <TextField />
        </Toolbar>
      </AppBar>
      <main>
        {/* <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}> */}
        <VirtuosoGrid
          style={{ height: 795 }}
          data={users}
          endReached={loadMore}
          overscan={200}
          components={{
            Item: ItemContainer,
            List: ListContainer,
            ScrollSeekPlaceholder: ({ height, width, index }) => (
              <ItemContainer>
                <ItemWrapper>{'--'}</ItemWrapper>
              </ItemContainer>
            ),
          }}
          itemContent={(index, user) => {
            return (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading {user}
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          }}
          scrollSeekConfiguration={{
            enter: (velocity) => Math.abs(velocity) > 200,
            exit: (velocity) => Math.abs(velocity) < 30,
            change: (_, range) => console.log({ range }),
          }}
        />
        {/* {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))} */}
        {/* </Grid>
        </Container> */}
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

// const Footer = () => {
//   return (
//     <div
//       style={{
//         padding: '2rem',
//         display: 'flex',
//         justifyContent: 'center',
//       }}
//     >
//       Loading...
//     </div>
//   );
// };

export default IndexPage;
