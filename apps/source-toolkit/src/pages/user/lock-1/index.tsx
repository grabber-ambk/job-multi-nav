import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const UnlockScreen = asyncComponent(
  () => import('../../../modules/userPages/UserPages/UnlockScreen')
);
export default AppPage(() => <UnlockScreen />);
