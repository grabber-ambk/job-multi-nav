import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Confirmation = asyncComponent(
  () => import('../../../modules/ecommerce/Confirmation')
);
export default AppPage(() => <Confirmation />);
