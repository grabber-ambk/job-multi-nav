import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const ScrumBoard = dynamic(() => import('../../../modules/apps/ScrumBoard'), {
  loading: () => <AppLoader />,
  ssr: false,
});
export default AppPage(() => <ScrumBoard />);
