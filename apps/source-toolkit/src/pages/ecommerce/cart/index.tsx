import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Carts = asyncComponent(() => import('../../../modules/ecommerce/Carts'));
export default AppPage(() => <Carts />);
