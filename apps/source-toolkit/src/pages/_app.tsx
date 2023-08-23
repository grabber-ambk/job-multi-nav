import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import AppContextProvider from '@crema/context/AppContextProvider';
import AppThemeProvider from '@crema/context/AppThemeProvider';
import AppStyleProvider from '@crema/context/AppStyleProvider';
import AppLocaleProvider from '@crema/context/AppLocaleProvider';
import AppAuthProvider from '../core/AppAuthProvider';
import AuthRoutes from '@crema/components/AuthRoutes';

import '@crema/mockapi';
import '../../public/styles/vendors/index.css';
import AppPageMeta from '@crema/components/AppPageMeta';
import createEmotionCache from '../../createEmotionCache';
import { AppProps } from 'next/app';
import { store } from '../toolkit/store';
import { Provider } from 'react-redux';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Provider store={store}>
        <AppContextProvider>
          <AppThemeProvider>
            <AppStyleProvider>
              <AppLocaleProvider>
                <AppAuthProvider>
                  <AuthRoutes>
                    <CssBaseline />
                    <AppPageMeta />
                    <Component {...pageProps} />
                  </AuthRoutes>
                </AppAuthProvider>
              </AppLocaleProvider>
            </AppStyleProvider>
          </AppThemeProvider>
        </AppContextProvider>
      </Provider>
    </CacheProvider>
  );
}
