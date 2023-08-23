import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Products = asyncComponent(
  () => import('../../../modules/ecommerce/Products')
);
export default AppPage(() => <Products />);
