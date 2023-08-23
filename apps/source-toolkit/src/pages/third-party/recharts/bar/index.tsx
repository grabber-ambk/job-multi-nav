import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const Bar = dynamic(
  () => import('../../../../modules/thirdParty/recharts/Bar'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <Bar />);
