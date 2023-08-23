import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Invoice1 = asyncComponent(
  () => import('../../../modules/ecommerce/Invoice1')
);
export default AppPage(() => <Invoice1 />);
