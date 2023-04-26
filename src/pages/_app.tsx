import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@utils/createEmotionCache';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@themes/defaultTheme';
import store from 'src/store';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
