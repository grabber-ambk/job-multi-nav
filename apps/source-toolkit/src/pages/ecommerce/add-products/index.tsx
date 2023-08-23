import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const AddProduct = asyncComponent(
  () => import('../../../modules/ecommerce/Admin/AddEditProduct')
);
export default AppPage(() => <AddProduct />);
