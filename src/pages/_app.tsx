import { Provider } from 'react-redux';
import Layout from '@components/layout';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@themes/defaultTheme';
import createEmotionCache from '@utils/createEmotionCache';
import type { AppProps } from 'next/app';
import { wrapper } from 'src/store';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({ Component, ...rest }: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <Layout>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
