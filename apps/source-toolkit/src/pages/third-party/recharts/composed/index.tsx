import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const Composed = dynamic(
  () => import('../../../../modules/thirdParty/recharts/Composed'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <Composed />);
