import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import AppContextProvider from '@crema/context/AppContextProvider';
import AppThemeProvider from '@crema/context/AppThemeProvider';
import AppStyleProvider from '@crema/context/AppStyleProvider';
import AppLocaleProvider from '@crema/context/AppLocaleProvider';
import AppAuthProvider from './src/core/AppAuthProvider';
import AuthRoutes from '@crema/components/AuthRoutes';

import '@crema/mockapi';
import '../../public/styles/vendors/index.css';
import InfoViewContextProvider from '@crema/context/InfoViewContextProvider';
import createEmotionCache from './createEmotionCache';

type AppProvidersProps = {
  children: React.ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <AppContextProvider>
        <AppThemeProvider>
          <AppStyleProvider>
            <AppLocaleProvider>
              <InfoViewContextProvider>
                <AppAuthProvider>
                  <AuthRoutes>{children}</AuthRoutes>
                </AppAuthProvider>
              </InfoViewContextProvider>
            </AppLocaleProvider>
          </AppStyleProvider>
        </AppThemeProvider>
      </AppContextProvider>
    </CacheProvider>
  );
};

export default AppProviders;
