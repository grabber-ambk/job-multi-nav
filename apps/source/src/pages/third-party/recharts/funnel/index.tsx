import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const Funnel = dynamic(
  () => import('../../../../modules/thirdParty/recharts/Funnel'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <Funnel />);
