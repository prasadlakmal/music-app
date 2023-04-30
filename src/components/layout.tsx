import { ReactNode } from 'react';
import { Copyright } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Head from 'next/head';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>iTunes Music Search</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {children}
      {/* Footer */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          bottom: 0,
          position: 'fixed',
          width: '100%',
          paddingBottom: '24px',
          display: 'grid',
          justifyItems: 'center',
        }}
        component="footer"
      >
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

export default Layout;
