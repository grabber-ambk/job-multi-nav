import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const GoogleMap = dynamic(
  () => import('../../../modules/thirdParty/googleMap'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <GoogleMap />);
