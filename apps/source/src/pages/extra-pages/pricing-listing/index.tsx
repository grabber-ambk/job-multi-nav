import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Pricing = asyncComponent(
  () => import('../../../modules/extraPages/Pricing')
);
export default AppPage(() => <Pricing />);
