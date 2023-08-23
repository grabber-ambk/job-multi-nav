import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const ProductDetail = asyncComponent(
  () => import('../../../../modules/ecommerce/ProductDetail')
);
export default AppPage(() => <ProductDetail />);
