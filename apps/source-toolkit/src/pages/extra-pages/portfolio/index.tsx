import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Portfolio = asyncComponent(
  () => import('../../../modules/extraPages/Portfolio')
);
export default AppPage(() => <Portfolio />);
