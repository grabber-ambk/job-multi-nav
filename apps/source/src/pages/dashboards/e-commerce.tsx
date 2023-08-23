import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const ECommerce = dynamic(() => import('../../modules/dashboards/ECommerce'), {
  loading: () => <AppLoader />,
  ssr: false,
});
export default AppPage(() => <ECommerce />);
