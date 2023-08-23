import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const Metrics = dynamic(() => import('../../modules/dashboards/Metrics'), {
  loading: () => <AppLoader />,
  ssr: false,
});
export default AppPage(() => <Metrics />);
