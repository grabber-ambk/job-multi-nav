import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Customers = asyncComponent(
  () => import('../../../modules/ecommerce/Customers')
);
export default AppPage(() => <Customers />);
