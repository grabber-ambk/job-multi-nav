import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Checkout = asyncComponent(
  () => import('../../../modules/ecommerce/Checkout')
);
export default AppPage(() => <Checkout />);
