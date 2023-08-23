import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const PortfolioDetail = asyncComponent(
  () => import('../../../modules/extraPages/Portfolio/PortfolioDetail')
);
export default AppPage(() => <PortfolioDetail />);
