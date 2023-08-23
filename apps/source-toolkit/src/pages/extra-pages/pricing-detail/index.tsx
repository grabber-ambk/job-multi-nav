import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const PricingDetail = asyncComponent(
  () => import('../../../modules/extraPages/Pricing/Detail')
);
export default AppPage(() => <PricingDetail />);
