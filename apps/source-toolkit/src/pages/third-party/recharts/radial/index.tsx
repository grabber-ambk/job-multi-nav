import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const Radial = dynamic(
  () => import('../../../../modules/thirdParty/recharts/Radial'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <Radial />);
