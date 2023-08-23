import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Maintenance = asyncComponent(
  () => import('../../modules/errorPages/Maintenance')
);
export default AppPage(() => <Maintenance />);
