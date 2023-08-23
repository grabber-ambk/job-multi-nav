import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const ComingSoon = asyncComponent(
  () => import('../../modules/errorPages/ComingSoon')
);
export default AppPage(() => <ComingSoon />);
