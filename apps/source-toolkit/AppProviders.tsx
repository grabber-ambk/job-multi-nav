import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import AppContextProvider from '@crema/context/AppContextProvider';
import AppThemeProvider from '@crema/context/AppThemeProvider';
import AppStyleProvider from '@crema/context/AppStyleProvider';
import AppLocaleProvider from '@crema/context/AppLocaleProvider';
import AuthRoutes from '@crema/components/AuthRoutes';

import '@crema/mockapi';
import '../../public/styles/vendors/index.css';
import { Provider } from 'react-redux';
import createEmotionCache from './createEmotionCache';
import { store } from './src/toolkit/store';
import AppAuthProvider from './src/core/AppAuthProvider';

type AppProvidersProps = {
  children: React.ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Provider store={store}>
        <AppContextProvider>
          <AppThemeProvider>
            <AppStyleProvider>
              <AppLocaleProvider>
                <AppAuthProvider>
                  <AuthRoutes>{children}</AuthRoutes>
                </AppAuthProvider>
              </AppLocaleProvider>
            </AppStyleProvider>
          </AppThemeProvider>
        </AppContextProvider>
      </Provider>
    </CacheProvider>
  );
};

export default AppProviders;
