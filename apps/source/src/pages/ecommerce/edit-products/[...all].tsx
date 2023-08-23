import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const EditProduct = asyncComponent(
  () => import('../../../modules/ecommerce/Admin/EditProduct')
);
export default AppPage(() => <EditProduct />);
