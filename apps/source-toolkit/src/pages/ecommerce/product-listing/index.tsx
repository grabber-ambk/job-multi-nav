import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const ProductListing = asyncComponent(
  () => import('../../../modules/ecommerce/Admin/Listing')
);
export default AppPage(() => <ProductListing />);
