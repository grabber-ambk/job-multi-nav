import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const Line = dynamic(
  () => import('../../../../modules/thirdParty/recharts/Line'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <Line />);
